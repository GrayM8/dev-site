import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 6,
          border: "2px solid rgba(255, 122, 26, 0.4)",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "IBM Plex Mono",
            color: "#FF7A1A",
            letterSpacing: -1,
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
