import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#10131a",
          color: "#fbfbfd",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        IO
      </div>
    ),
    { ...size }
  );
}
