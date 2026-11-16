"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import MusicPlayer from "./MusicPlayer";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const WORDS = ["Creates", "Builds", "Ships"];

type Obj = {
  id: string;
  side: "left" | "right";
  ax: number;
  ayf: number;
  depth: number;
  rot: number;
  w: number;
  h: number;
  label: string;
  title?: string;
  desc?: string;
  href?: string;
};

const OBJECTS: Obj[] = [
  { id: "film", side: "left", ax: 205, ayf: 0.14, depth: 1.05, rot: 9, w: 148, h: 96, label: "filmstrip" },
  {
    id: "laptop", side: "left", ax: 195, ayf: 0.3, depth: 1.1, rot: -4, w: 196, h: 140,
    label: "development", title: "Development",
    desc: "Front-end builds in React, motion, and the small experiments in between.",
    href: "/development",
  },
  {
    id: "camera", side: "left", ax: 185, ayf: 0.57, depth: 1.25, rot: 6, w: 168, h: 118,
    label: "ugc", title: "Content & UGC",
    desc: "Short-form brand content, product shots, and the gear that gets it done.",
    href: "/ugc",
  },
  { id: "headphones", side: "left", ax: 175, ayf: 0.83, depth: 0.85, rot: 8, w: 124, h: 124, label: "music" },
  { id: "coffee", side: "right", ax: 200, ayf: 0.14, depth: 0.9, rot: -5, w: 116, h: 96, label: "coffee" },
  {
    id: "journal", side: "right", ax: 190, ayf: 0.3, depth: 1.3, rot: 5, w: 158, h: 206,
    label: "blogs", title: "Blogs",
    desc: "Longer writing on building, travelling, and what the two teach each other.",
    href: "/blogs",
  },
  { id: "vinyl", side: "right", ax: 180, ayf: 0.83, depth: 1.35, rot: 0, w: 152, h: 152, label: "press play" },
];

/* Object art. Uses the token colors so both themes work with no extra logic. */
const plate = "bg-[color-mix(in_srgb,var(--foreground)_10%,var(--surface))]";
const plateDeep = "bg-[color-mix(in_srgb,var(--foreground)_18%,var(--surface))]";
const screen = "bg-[color-mix(in_srgb,var(--foreground)_5%,var(--surface))]";

function Art({ id }: { id: string }) {
  switch (id) {
    case "laptop":
      return (
        <div className="h-full w-full">
          <div className={`mx-auto h-[106px] w-[172px] rounded-[10px] border-[7px] border-transparent p-1.5 ${plateDeep}`}>
            <div className={`flex h-full w-full items-center rounded pl-2.5 ${screen}`}>
              <span className="font-mono text-[11px] text-emerald-500">&gt;_ npm run dev</span>
            </div>
          </div>
          <div className={`h-[11px] w-[196px] rounded-b-xl ${plateDeep}`} />
        </div>
      );
    case "camera":
      return (
        <div className={`flex h-full w-full items-center justify-center rounded-2xl border border-border ${plate}`}>
          <div className={`h-[58px] w-[58px] rounded-full border-[7px] border-[color-mix(in_srgb,var(--foreground)_22%,var(--surface))] ${screen}`} />
        </div>
      );
    case "headphones":
      return (
        <div className="h-full w-full">
          <div className="mx-auto h-[62px] w-[112px] rounded-t-full border-[12px] border-b-0 border-[color-mix(in_srgb,var(--foreground)_18%,var(--surface))]" />
          <div className="mx-auto -mt-1.5 flex w-[126px] justify-between">
            <div className={`h-[54px] w-[38px] rounded-2xl ${plateDeep}`} />
            <div className={`h-[54px] w-[38px] rounded-2xl ${plateDeep}`} />
          </div>
        </div>
      );
    case "journal":
      return (
        <div
          className={`flex h-full w-full flex-col justify-between rounded-l-md rounded-r-2xl border-l-8 border-[color-mix(in_srgb,var(--foreground)_24%,var(--surface))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)] ${plate}`}
        >
          <span className="font-display text-3xl">Journal</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted">notes</span>
        </div>
      );
    case "vinyl":
      return (
        <div
          data-spin
          className={`flex h-full w-full items-center justify-center rounded-full shadow-[0_16px_34px_rgba(0,0,0,0.28)] ${screen}`}
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.10) 0 3px, rgba(0,0,0,0.02) 3px 6px)",
          }}
        >
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-accent font-mono text-[9px] tracking-wide text-background">
            A-SIDE
          </div>
        </div>
      );
    case "coffee":
      return (
        <div className="h-full w-full">
          <div className={`h-[76px] w-[86px] rounded-t-lg rounded-b-[28px] ${plate}`} />
          <div className={`-mt-[52px] ml-[82px] h-[30px] w-[30px] rounded-full border-8 border-[color-mix(in_srgb,var(--foreground)_18%,var(--surface))]`} />
        </div>
      );
    case "film":
      return (
        <div className={`flex h-full w-full items-center gap-1.5 rounded-md border-y-[10px] border-dotted border-[color-mix(in_srgb,var(--foreground)_18%,var(--surface))] px-2 ${screen}`}>
          <div className={`h-[46px] flex-1 ${plate}`} />
          <div className={`h-[46px] flex-1 ${plate}`} />
        </div>
      );
    default:
      return null;
  }
}

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<Record<string, HTMLDivElement | null>>({});
  const spin = useRef<HTMLDivElement | null>(null);
  const [peek, setPeek] = useState<{ obj: Obj; left: number; top: number; below: boolean } | null>(null);
  const [word, setWord] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  playingRef.current = playing;

  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const state = OBJECTS.map((o) => ({
      cfg: o,
      phase: Math.random() * 6.28,
      drag: { x: 0, y: 0 },
      hover: 0,
      held: false,
      frontZ: 0,
    }));
    type S = (typeof state)[number];

    const cur = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let entry = 0;
    let hovered: string | null = null;
    let dragging: S | null = null;
    let ds = { x: 0, y: 0, dx: 0, dy: 0 };
    let frontCounter = 0;
    const t0 = performance.now();

    const find = (el: Element | null) => state.find((s) => s.cfg.id === (el as HTMLElement)?.dataset.obj) || null;

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      cur.tx = (e.clientX - r.left) / r.width;
      cur.ty = (e.clientY - r.top) / r.height;
      if (dragging) {
        dragging.drag.x = ds.dx + (e.clientX - ds.x);
        dragging.drag.y = ds.dy + (e.clientY - ds.y);
        setPeek(null);
      }
    };
    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element).closest("[data-obj]") as HTMLElement | null;
      const s = find(el);
      if (!s) return;
      dragging = s;
      s.held = true;
      frontCounter += 1;
      s.frontZ = frontCounter;
      el?.setPointerCapture(e.pointerId);
      ds = { x: e.clientX, y: e.clientY, dx: s.drag.x, dy: s.drag.y };
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      const s = dragging;
      const far = Math.abs(e.clientX - ds.x) + Math.abs(e.clientY - ds.y) > 6;
      s.held = false;
      dragging = null;
      if (far) return;
      if (s.cfg.href) window.location.href = s.cfg.href;
      else if (s.cfg.id === "vinyl" || s.cfg.id === "headphones") setPlaying((p) => !p);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest("[data-obj]") as HTMLElement | null;
      const s = find(el);
      if (!s || dragging || hovered === s.cfg.id) return;
      hovered = s.cfg.id;
      if (!s.cfg.title && s.cfg.id !== "vinyl") return;
      const r = el!.getBoundingClientRect();
      const below = r.bottom + 250 < window.innerHeight;
      setPeek({
        obj: s.cfg,
        left: Math.min(window.innerWidth - 300, Math.max(20, r.left + r.width / 2 - 140)),
        top: below ? r.bottom + 14 : r.top - 14,
        below,
      });
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element).closest("[data-obj]");
      if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
      hovered = null;
      setPeek(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointerover", onOver);
    stage.addEventListener("pointerout", onOut);

    let raf = 0;
    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      entry = Math.min(1, entry + 0.01);
      const e = 1 - Math.pow(1 - entry, 3);
      cur.x += (cur.tx - cur.x) * 0.08;
      cur.y += (cur.ty - cur.y) * 0.08;
      const nx = (cur.x - 0.5) * 2;
      const ny = (cur.y - 0.5) * 2;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const room = Math.max(0, Math.min(1, (w - 980) / 260));
      const edge = Math.min(1, w / 1440);

      for (const s of state) {
        const el = nodes.current[s.cfg.id];
        if (!el) continue;
        const target = hovered === s.cfg.id || s.held ? 1 : 0;
        s.hover += (target - s.hover) * 0.16;
        const hv = s.hover * 0.7;
        const ax = s.cfg.ax * edge;
        const hx = s.cfg.side === "left" ? ax : w - ax;
        const hy = Math.max(190, Math.min(h - 185, s.cfg.ayf * h));
        const x = hx + (w / 2 - hx) * (1 - e) * 0.92 + s.drag.x - nx * 16 * s.cfg.depth * 0.6;
        const y =
          hy + (h / 2 - hy) * (1 - e) * 0.92 + s.drag.y - ny * 12 * s.cfg.depth * 0.6 +
          Math.sin(t * 0.9 + s.phase) * 5 * s.cfg.depth * 0.5;
        const rot = s.cfg.rot * (0.4 + 0.6 * e) + hv * (s.cfg.rot > 0 ? -3 : 3) + nx * 1.2 * s.cfg.depth;
        const sc = (0.88 + 0.12 * e) * (1 + hv * 0.07) * (0.68 + 0.32 * room);
        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
        el.style.opacity = (e * (0.25 + 0.75 * room)).toFixed(3);
        // Objects that have been grabbed at least once jump above the z-20
        // content column so a dropped object never gets stuck un-clickable
        // behind the hero text/buttons. Most-recently-grabbed wins ties.
        const base = Math.min(19, Math.round(10 + s.cfg.depth * 5 + hv * 10));
        el.style.zIndex = String(s.frontZ > 0 ? 30 + s.frontZ : base);
      }

      if (playingRef.current && spin.current) {
        spin.current.style.transform = `rotate(${(t * 110).toFixed(1)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointerover", onOver);
      stage.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[620px] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,color-mix(in_srgb,var(--accent)_30%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_70%)]"
      />
      {/* Dot texture, faded out toward the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(color-mix(in_srgb,var(--foreground)_22%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_45%,black,transparent_75%)]"
      />

      {/* Desk layer: hidden below lg so the mobile hero stays as it was */}
      <div ref={stageRef} aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {OBJECTS.map((o) => (
          <div
            key={o.id}
            data-obj={o.id}
            ref={(el) => {
              nodes.current[o.id] = el;
            }}
            style={{ width: o.w, height: o.h, opacity: 0, willChange: "transform", touchAction: "none" }}
            className={`absolute left-0 top-0 ${o.href || o.id === "vinyl" ? "pointer-events-auto cursor-pointer" : "pointer-events-auto"}`}
          >
            {o.id === "vinyl" ? <div ref={spin} className="h-full w-full"><Art id={o.id} /></div> : <Art id={o.id} />}
          </div>
        ))}
      </div>

      {peek && (
        <div
          className="pointer-events-none fixed z-40 w-[280px] rounded-2xl border border-border bg-surface p-5 shadow-lift"
          style={{ left: peek.left, top: peek.top, transform: peek.below ? undefined : "translateY(-100%)" }}
        >
          <div className="font-mono text-[11px] text-muted">{peek.obj.label}</div>
          {peek.obj.title && <div className="font-display mt-1.5 text-2xl font-semibold tracking-tight">{peek.obj.title}</div>}
          <div className="mt-2 text-sm leading-relaxed text-muted">
            {peek.obj.desc ?? "Spins up the record while you look around."}
          </div>
          <div className="mt-4 text-[13px] font-semibold text-accent">
            {peek.obj.href ? `Opens ${peek.obj.href} →` : playing ? "Click to stop ■" : "Click to play ▶"}
          </div>
        </div>
      )}

      <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-16 text-center md:px-10 md:pb-24 md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pl-3 pr-4 text-sm text-muted shadow-soft backdrop-blur"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            <span className="font-medium text-foreground">{site.name}</span>, open for freelance &amp; collabs
          </span>
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl"
        >
          <motion.span variants={line} className="block">
            Developer who
          </motion.span>
          <motion.span variants={line} className="relative block h-[1.16em] overflow-hidden text-accent">
            {WORDS.map((w, i) => (
              <motion.span
                key={w}
                className="absolute inset-x-0 top-0 whitespace-nowrap"
                initial={false}
                animate={
                  i === word
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : { y: 96, opacity: 0, filter: "blur(6px)" }
                }
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/development"
            className="press group inline-flex items-center gap-2 rounded-full bg-foreground py-3 pl-6 pr-5 text-sm font-medium text-background hover:bg-accent"
          >
            See my work
            <ArrowRight
              size={16}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/ugc"
            className="press inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground/80 hover:bg-accent-soft hover:text-accent"
          >
            Content &amp; UGC
          </Link>
        </motion.div>

        <div className="relative mt-12 w-full">
          <MusicPlayer />
        </div>
      </div>
    </section>
  );
}
