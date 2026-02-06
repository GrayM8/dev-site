import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const monoFont = await fetch(
    "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3pQP8lc.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          borderRadius: 36,
          border: "6px solid rgba(255, 122, 26, 0.4)",
        }}
      >
        <span
          style={{
            fontSize: 88,
            fontWeight: 700,
            fontFamily: "IBM Plex Mono",
            color: "#FF7A1A",
            letterSpacing: -4,
          }}
        >
          GM
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: monoFont,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
