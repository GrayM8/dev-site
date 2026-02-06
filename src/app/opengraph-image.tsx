import { ImageResponse } from "next/og";

export const alt = "Gray Marshall — Software Engineering Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          fontFamily: "monospace",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: 60,
            height: 4,
            backgroundColor: "#FF7A1A",
            marginBottom: 32,
            borderRadius: 2,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Gray Marshall
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginBottom: 48,
          }}
        >
          Software Engineering • Systems & Full-Stack
        </div>

        {/* Footer line */}
        <div
          style={{
            fontSize: 18,
            color: "#52525b",
            fontFamily: "monospace",
          }}
        >
          graymarshall.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
