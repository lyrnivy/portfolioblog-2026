"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Camera, ScanLine, Sparkles, Volume2, VolumeX } from "lucide-react";

// A-Frame's published package inconsistently includes a plain
// "aframe.min.js" across versions (1.5.0 doesn't have one, 404s); the
// "-master" build is the one every version actually ships.
const AFRAME_SRC = "https://cdn.jsdelivr.net/npm/aframe@1.5.0/dist/aframe-master.min.js";
const MINDAR_SRC =
  "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js";

const TARGET_SRC = "/ar/busan-targets.mind";
const AR_VIDEO = "/videos/AR.mp4";
const POSTCARD_IMAGE = "/photos/ar-postcard-busan.png";

type Stage = "intro" | "scanning" | "watch";

type MindARSystem = {
  start: () => void;
  stop: () => void;
  video?: HTMLVideoElement;
};

type ThreeRenderer = {
  setClearColor: (color: number, alpha: number) => void;
};

type ARSceneEl = HTMLElement & {
  systems?: Record<string, MindARSystem | undefined>;
  renderer?: ThreeRenderer;
};

export default function BusanARExperience() {
  const [stage, setStage] = useState<Stage>("intro");
  const [aframeReady, setAframeReady] = useState(false);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [found, setFound] = useState(false);
  const [muted, setMuted] = useState(true);
  const [needsTapToPlay, setNeedsTapToPlay] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const sceneRef = useRef<ARSceneEl | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // The scene mounts as soon as the scripts are ready (not gated behind a
  // click) so that by the time the visitor taps "Start Scanning", a-frame has
  // already finished initializing the mindar-image-system. That lets the tap
  // call `.start()` -> getUserMedia() synchronously, inside the same user
  // gesture — iOS Safari silently rejects camera access if that call happens
  // even a frame or two removed from the tap (which is what autoStart:true
  // does internally, waiting for a "renderstart" event).
  //
  // "Ready" here means the exact thing startScanning() needs: the
  // mindar-image-system object actually present on the scene. A-Frame
  // registers systems as soon as <a-scene> connects (well before the full
  // "loaded" event, which waits on the heavier renderer/entity setup), so
  // poll for it directly each frame instead of trusting "loaded" — that's
  // what let the button read as ready while the system wasn't there yet.
  useEffect(() => {
    if (!scriptsReady) return;
    let cancelled = false;
    let raf = 0;

    const check = () => {
      if (cancelled) return;
      if (sceneRef.current?.systems?.["mindar-image-system"]) {
        setSceneLoaded(true);
        return;
      }
      raf = requestAnimationFrame(check);
    };
    check();

    // If the system still isn't there after a while, something's actually
    // wrong (e.g. a script failed to load) — say so instead of pretending.
    const giveUp = window.setTimeout(() => {
      cancelled = true;
      if (!sceneRef.current?.systems?.["mindar-image-system"]) {
        setCameraError("The scanner failed to load. Refresh the page and try again.");
      }
    }, 8000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(giveUp);
    };
  }, [scriptsReady]);

  // `renderer="alpha: true"` only enables the *capability* for a transparent
  // canvas. Confirmed via diagnostics that the capability was real
  // (ctxAlpha=true) but the camera still never showed through — meaning
  // something (A-Frame's own render loop very likely resets the clear color
  // on later frames) was winning over a one-time setClearColor() call made
  // when the scene first loaded. Reassert it every single frame instead, so
  // nothing else gets the last word.
  useEffect(() => {
    if (!sceneLoaded) return;
    let raf = 0;
    const enforce = () => {
      sceneRef.current?.renderer?.setClearColor(0x000000, 0);
      raf = requestAnimationFrame(enforce);
    };
    raf = requestAnimationFrame(enforce);
    return () => cancelAnimationFrame(raf);
  }, [sceneLoaded]);

  // Tag MindAR's camera <video> (it gives it no class/id of its own) with
  // `.ar-camera-feed` as soon as it exists, so the CSS above can take over
  // its sizing instead of MindAR's own per-device-inconsistent pixel math.
  useEffect(() => {
    if (stage !== "scanning") return;
    let raf = 0;
    const tag = () => {
      const video = sceneRef.current?.systems?.["mindar-image-system"]?.video;
      if (video) {
        video.classList.add("ar-camera-feed");
        return;
      }
      raf = requestAnimationFrame(tag);
    };
    raf = requestAnimationFrame(tag);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  // Wire target-found / target-lost once the scene + entity exist.
  useEffect(() => {
    const entity = targetRef.current;
    if (!entity) return;

    const onFound = () => {
      setFound(true);
      const video = videoRef.current;
      if (!video) return;
      video
        .play()
        .then(() => setNeedsTapToPlay(false))
        .catch((err) => {
          // Autoplay can still be refused in some mobile contexts even when
          // muted; fall back to a manual tap, which always satisfies the
          // gesture requirement.
          console.error("AR video play() failed:", err);
          setNeedsTapToPlay(true);
        });
    };
    const onLost = () => setFound(false);

    entity.addEventListener("targetFound", onFound);
    entity.addEventListener("targetLost", onLost);
    return () => {
      entity.removeEventListener("targetFound", onFound);
      entity.removeEventListener("targetLost", onLost);
    };
  }, [sceneLoaded]);

  // Surface failures instead of leaving a silent, stuck camera view:
  // - "arError" fires when the browser denies/can't open the camera.
  // - the scanner never fires "arReady" (and MindAR swallows the failure as
  //   an unhandled rejection) if the .mind target file is missing or bad, so
  //   a watchdog timeout covers that case too.
  // - a global unhandledrejection listener catches that rejection directly
  //   when the browser does surface it, for a more specific message.
  useEffect(() => {
    if (stage !== "scanning") return;
    const scene = sceneRef.current;
    if (!scene) return;

    let ready = false;
    const onReady = () => {
      ready = true;
    };
    const onArError = () => {
      setCameraError(
        "Couldn't access the camera. Check that this site has camera permission (Safari → Settings → this site), then try again."
      );
      setStage("intro");
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      if (ready) return;
      setCameraError("Couldn't load the scanner. Try again, or watch the video instead.");
      setStage("intro");
      e.preventDefault();
    };

    scene.addEventListener("arReady", onReady);
    scene.addEventListener("arError", onArError);
    window.addEventListener("unhandledrejection", onRejection);

    const watchdog = window.setTimeout(() => {
      if (!ready) {
        setCameraError(
          "The scanner is taking too long to load. Try again, or watch the video instead."
        );
        setStage("intro");
      }
    }, 10000);

    return () => {
      scene.removeEventListener("arReady", onReady);
      scene.removeEventListener("arError", onArError);
      window.removeEventListener("unhandledrejection", onRejection);
      window.clearTimeout(watchdog);
    };
  }, [stage]);

  // On-screen diagnostics for the scanning view — there's no reliable way to
  // get real devtools output from an iPhone, so surface the numbers that
  // actually matter directly in the UI instead.
  useEffect(() => {
    const interval = window.setInterval(() => {
      const system = sceneRef.current?.systems?.["mindar-image-system"];
      const camVideo = system?.video;
      const camRect = camVideo?.getBoundingClientRect();
      const arVideo = videoRef.current;
      const enterVr = document.querySelector(".a-enter-vr") as HTMLElement | null;
      const enterVrStyle = enterVr && getComputedStyle(enterVr);
      const scene = sceneRef.current;
      const sceneStyle = scene && getComputedStyle(scene);
      const introEl = document.querySelector("[data-intro-screen]") as HTMLElement | null;
      const introStyle = introEl && getComputedStyle(introEl);
      const introRect = introEl?.getBoundingClientRect();
      const lines = [
        `stage=${stage} sceneLoaded=${sceneLoaded} error=${cameraError ?? "none"}`,
        `scene parent: ${scene?.parentElement?.tagName ?? "n/a"} (${scene?.parentElement === document.body ? "IS body — reparented!" : "ok, expected wrapper"})`,
        `scene class="${scene?.getAttribute("class") ?? "n/a"}"`,
        `scene computed: position=${sceneStyle?.position} z=${sceneStyle?.zIndex} display=${sceneStyle?.display} w=${sceneStyle?.width} h=${sceneStyle?.height}`,
        `intro el: ${introEl ? "exists" : "MISSING FROM DOM"}`,
        introEl &&
          `  computed: display=${introStyle?.display} visibility=${introStyle?.visibility} opacity=${introStyle?.opacity} z=${introStyle?.zIndex}`,
        introEl &&
          `  rect=${Math.round(introRect?.width ?? 0)}x${Math.round(introRect?.height ?? 0)} @ (${Math.round(introRect?.left ?? 0)},${Math.round(introRect?.top ?? 0)})`,
        `.a-enter-vr: ${enterVr ? `exists, display=${enterVrStyle?.display}` : "gone"}`,
        `camera video: ${camVideo ? "exists" : "MISSING"}`,
        camVideo &&
          `  readyState=${camVideo.readyState} paused=${camVideo.paused} size=${camVideo.videoWidth}x${camVideo.videoHeight}`,
        camVideo && `  rect=${Math.round(camRect?.width ?? 0)}x${Math.round(camRect?.height ?? 0)} @ (${Math.round(camRect?.left ?? 0)},${Math.round(camRect?.top ?? 0)})`,
        camVideo && `  parent=${camVideo.parentElement?.tagName} style.zIndex=${camVideo.style.zIndex}`,
        camVideo &&
          (() => {
            const s = getComputedStyle(camVideo);
            return `  computed: display=${s.display} visibility=${s.visibility} opacity=${s.opacity} filter=${s.filter}`;
          })(),
        camVideo &&
          (() => {
            try {
              const tmp = document.createElement("canvas");
              tmp.width = 8;
              tmp.height = 8;
              const tctx = tmp.getContext("2d");
              tctx?.drawImage(camVideo, 0, 0, 8, 8);
              const d = tctx?.getImageData(4, 4, 1, 1).data;
              return `  actual frame pixel: rgba(${d?.[0]},${d?.[1]},${d?.[2]},${d?.[3]})`;
            } catch (e) {
              return `  actual frame pixel: error: ${e}`;
            }
          })(),
        `found=${found}`,
        `ar overlay video: readyState=${arVideo?.readyState ?? "n/a"} paused=${arVideo?.paused ?? "n/a"}`,
        `window: ${window.innerWidth}x${window.innerHeight}`,
        `body bg: ${getComputedStyle(document.body).backgroundColor}`,
        `three renderer: ${scene?.renderer ? "exists" : "MISSING"}`,
        (() => {
          const canvasEl = scene?.querySelector("canvas.a-canvas") as HTMLCanvasElement | null;
          if (!canvasEl) return "canvas: MISSING";
          const ctx = (canvasEl.getContext("webgl2") ||
            canvasEl.getContext("webgl")) as WebGLRenderingContext | null;
          const bg = getComputedStyle(canvasEl).backgroundColor;
          let pixel = "n/a";
          try {
            if (ctx) {
              const px = new Uint8Array(4);
              ctx.readPixels(
                Math.floor(canvasEl.width / 2),
                Math.floor(canvasEl.height / 2),
                1,
                1,
                ctx.RGBA,
                ctx.UNSIGNED_BYTE,
                px
              );
              pixel = `rgba(${px[0]},${px[1]},${px[2]},${px[3]})`;
            }
          } catch (e) {
            pixel = `error: ${e}`;
          }
          return `canvas: ctxAlpha=${ctx?.getContextAttributes?.()?.alpha} cssBg=${bg} centerPixel=${pixel}`;
        })(),
      ].filter(Boolean);
      // setDebugInfo(lines.join("\n"));
    }, 500);
    return () => window.clearInterval(interval);
  }, [stage, found, sceneLoaded, cameraError]);

  function startScanning() {
    const system = sceneRef.current?.systems?.["mindar-image-system"];
    if (!system) {
      setCameraError("The scanner isn't ready yet — give it a second and try again.");
      return;
    }
    setCameraError(null);
    setFound(false);
    setNeedsTapToPlay(false);
    // Call .start() first, synchronously, before any React state update —
    // this is the actual getUserMedia() trigger and must stay inside the
    // click's user-activation window.
    system.start();
    setStage("scanning");
  }

  function exitScanning() {
    sceneRef.current?.systems?.["mindar-image-system"]?.stop();
    setFound(false);
    setStage("intro");
  }

  return (
    // `h-dvh` instead of `min-h-screen` (100vh): iOS Safari's 100vh is based
    // on the browser's smallest-toolbar viewport, taller than what's actually
    // visible when the address bar is showing — that mismatch was pushing the
    // camera feed and scan overlay out of view. `h-dvh` (dynamic viewport
    // height) tracks the real, current visible area instead, while staying
    // `relative` (not `fixed`) so MindAR's injected camera <video> — appended
    // as a plain sibling, not through React — keeps stacking the same way it
    // did when this did show a (misaligned) camera feed.
    //
    // No `bg-black` here deliberately: this div doesn't establish its own
    // CSS stacking context (no z-index), so its background was painting
    // ABOVE the camera <video>'s negative z-index instead of safely behind
    // it — confirmed directly in devtools by disabling this exact rule,
    // which revealed the live camera feed underneath. The intro/watch
    // screens already set their own `bg-black` directly, so this isn't
    // needed here and was the actual cause of the black screen.
    <div className="relative h-dvh w-full overflow-hidden text-white">
      {/* A-Frame injects its own "enter VR/fullscreen" button into the DOM
          regardless of the vr-mode-ui="enabled: false" scene attribute in
          this version — confirmed via devtools: a `.a-enter-vr` div with
          `width: 100%` and overridden position offsets, sitting on top of
          the camera view. Force it out directly rather than depending on
          that attribute. */}
      <style>{`
        .a-enter-vr, .a-enter-ar { display: none !important; }
        /* A-Frame injects its own stylesheet after ours loads, which was
           winning the cascade and forcing position:relative on <a-scene>
           despite our "absolute" class — confirmed via the on-screen
           diagnostics (computed position showed "relative", not "absolute").
           At full viewport size, that kept it in normal document flow,
           pushing our intro/watch content entirely below the visible area
           instead of layering it underneath. Force it back. */
        a-scene { position: absolute !important; top: 0 !important; left: 0 !important; z-index: 0 !important; }
        /* MindAR sizes the camera <video> itself with manual pixel math
           (cover-fit width/height + centering top/left offsets) meant to
           always fill the container — but it was leaving a visible gap on
           mobile regardless of timing nudges. Bypass that math entirely:
           force it to fill the viewport with plain CSS object-fit, which
           every browser handles identically and doesn't depend on any JS
           calculation running at the right moment. Tagged with this class
           once found (see the effect below), since MindAR gives it no
           class/id of its own to target directly. */
        .ar-camera-feed {
          position: fixed !important;
          inset: 0 !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100dvh !important;
          object-fit: cover !important;
        }
      `}</style>
      {/* MindAR registers itself onto the global AFRAME object the moment it
          executes, so it must not even start loading until A-Frame has
          actually finished — next/script doesn't guarantee load order
          between two independent "afterInteractive" scripts. */}
      <Script src={AFRAME_SRC} strategy="afterInteractive" onReady={() => setAframeReady(true)} />
      {aframeReady && (
        <Script
          src={MINDAR_SRC}
          strategy="afterInteractive"
          onReady={() => setScriptsReady(true)}
        />
      )}

      {scriptsReady && (
        // A-Frame's own default loading screen (separate from MindAR's
        // uiLoading option below) takes over the full viewport, on top of
        // everything, until the scene finishes loading — and the 21MB
        // AR.mp4 sitting in <a-assets> was keeping it "loading" indefinitely
        // on a real connection. That screen — light-blue background, two
        // pulsing dots — is what was actually showing instead of our UI.
        // `loading-screen="enabled: false"` below turns it off.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <a-scene
          ref={sceneRef as any}
          mindar-image={`imageTargetSrc: ${TARGET_SRC}; autoStart: false; uiLoading: no; uiScanning: no; uiError: no;`}
          loading-screen="enabled: false"
          color-space="sRGB"
          embedded="true"
          renderer="colorManagement: true; alpha: true"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          className="absolute inset-0 z-0 h-full w-full"
        >
          <a-assets>
            <video
              ref={videoRef}
              id="ar-postcard-video"
              src={AR_VIDEO}
              preload="auto"
              loop
              playsInline
              muted={muted}
              crossOrigin="anonymous"
            />
          </a-assets>

          <a-camera
            position="0 0 0"
            look-controls="enabled: false"
            cursor="fuse: false; rayOrigin: mouse;"
          />

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <a-entity ref={targetRef as any} mindar-image-target="targetIndex: 0">
            {/* height matches the postcard photo's real aspect ratio
                (1748x1240px ≈ 1:0.71) so the video sits correctly on the
                tracked image instead of being stretched/mispositioned */}
            <a-video src="#ar-postcard-video" width="1" height="0.71" position="0 0 0" />
          </a-entity>
        </a-scene>
      )}

      <Link
        href="/"
        className="absolute left-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Back to site"
      >
        <ArrowLeft size={18} />
      </Link>

      {stage === "intro" && (
        <div
          data-intro-screen
          className="relative z-10 flex h-full flex-col items-center justify-center overflow-y-auto bg-black px-6 py-16 text-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <Sparkles size={26} />
          </span>
          <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/50">
            October Photo Mail — AR Edition
          </div>
          <h1 className="font-display mt-3 w-full max-w-sm text-3xl font-medium leading-tight">
            Scan the Busan postcard to bring it to life.
          </h1>
          <p className="mt-4 w-full max-w-sm text-sm leading-relaxed text-white/60">
            Point your camera at the physical postcard I mailed you. Once it&apos;s recognized,
            the photo will come to life.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTCARD_IMAGE}
            alt="Busan, Korea AR postcard"
            className="mt-8 h-56 w-44 rounded-2xl border border-white/15 object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />

          {cameraError && (
            <p className="mt-6 w-full max-w-sm rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-200">
              {cameraError}
            </p>
          )}

          <button
            onClick={startScanning}
            disabled={!sceneLoaded}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Camera size={17} />
            {sceneLoaded ? "Start Scanning" : "Preparing scanner…"}
          </button>

          <button
            onClick={() => setStage("watch")}
            className="mt-4 text-xs font-medium text-white/50 underline-offset-4 hover:text-white hover:underline"
          >
            No camera? Just watch the video
          </button>
        </div>
      )}

      {stage === "watch" && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 overflow-y-auto bg-black px-6 py-16">
          <video
            src={AR_VIDEO}
            controls
            autoPlay
            playsInline
            className="w-full max-w-md rounded-2xl border border-white/15"
          />
          <button
            onClick={() => setStage("intro")}
            className="text-sm font-medium text-white/60 hover:text-white"
          >
            ← Back
          </button>
        </div>
      )}

      {stage === "scanning" && (
        <>
          {/* Scan guidance overlay */}
          {!found && (
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
              <div className="h-56 w-44 rounded-2xl border-2 border-dashed border-white/50" />
              <span className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium backdrop-blur-sm">
                <ScanLine size={14} />
                Point your camera at the postcard
              </span>
            </div>
          )}

          {found && (
            <div className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">
              ✨ Found it — take time to breathe
            </div>
          )}

          {found && needsTapToPlay && (
            <button
              onClick={() => {
                videoRef.current
                  ?.play()
                  .then(() => setNeedsTapToPlay(false))
                  .catch((err) => console.error("AR video play() failed:", err));
              }}
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg"
            >
              <Camera size={16} />
              Tap to play video
            </button>
          )}

          <button
            onClick={() => {
              const next = !muted;
              setMuted(next);
              if (videoRef.current) videoRef.current.muted = next;
            }}
            className="absolute bottom-8 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            onClick={exitScanning}
            className="absolute bottom-8 left-5 z-20 rounded-full bg-black/50 px-4 py-2.5 text-xs font-medium backdrop-blur-sm"
          >
            Exit scanner
          </button>
        </>
      )}

      {/* Temporary on-screen diagnostics, always on (not stage-gated) and
          `fixed` with a very high z-index so nothing — including whatever is
          causing the black screen — can cover it. Remove once that's fixed. */}
      <pre className="pointer-events-none fixed left-2 top-16 z-[999] max-w-[calc(100%-1rem)] whitespace-pre-wrap rounded-lg bg-black/80 p-2 text-[9px] leading-tight text-lime-300">
        {debugInfo}
      </pre>
    </div>
  );
}
