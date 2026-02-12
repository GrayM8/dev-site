import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Gray Marshall — Software Engineering Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFonts() {
  try {
    const fontsDir = join(process.cwd(), "node_modules", "geist", "dist", "fonts");
    const [geistRegular, geistBold, geistMono] = await Promise.all([
      readFile(join(fontsDir, "geist-sans", "Geist-Regular.ttf")),
      readFile(join(fontsDir, "geist-sans", "Geist-Bold.ttf")),
      readFile(join(fontsDir, "geist-mono", "GeistMono-Regular.ttf")),
    ]);
    return [
      { name: "Geist", data: geistRegular, weight: 400 as const, style: "normal" as const },
      { name: "Geist", data: geistBold, weight: 700 as const, style: "normal" as const },
      { name: "Geist Mono", data: geistMono, weight: 400 as const, style: "normal" as const },
    ];
  } catch {
    return [];
  }
}

async function loadHeadshot() {
  try {
    const buffer = await readFile(join(process.cwd(), "public", "logos", "headshot.jpg"));
    const base64 = buffer.toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const [fonts, headshot] = await Promise.all([loadFonts(), loadHeadshot()]);
  const hasFonts = fonts.length > 0;
  const sans = hasFonts ? "Geist" : "sans-serif";
  const mono = hasFonts ? "Geist Mono" : "monospace";

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
          padding: "48px",
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: "#101010",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Window controls bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "rgba(239, 68, 68, 0.2)" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "rgba(234, 179, 8, 0.2)" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "rgba(34, 197, 94, 0.2)" }} />
            </div>
            <div
              style={{
                marginLeft: 16,
                fontSize: 13,
                color: "#71717a",
                fontFamily: mono,
              }}
            >
              bash — user@dev-portfolio
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: 13,
                color: "#52525b",
                fontFamily: mono,
              }}
            >
              graymarshall.dev
            </div>
          </div>

          {/* Terminal body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "36px 40px",
              fontFamily: mono,
              fontSize: 16,
            }}
          >
            {/* whoami command */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "#FF7A1A", marginRight: 8 }}>$</span>
              <span style={{ color: "#60a5fa", marginRight: 8 }}>~</span>
              <span style={{ color: "#fafafa" }}>whoami</span>
            </div>

            {/* Centered headshot + info */}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 36,
                }}
              >
                {/* Headshot */}
                {headshot && (
                  <div
                    style={{
                      display: "flex",
                      width: 160,
                      height: 160,
                      borderRadius: 16,
                      border: "2px solid rgba(255, 122, 26, 0.4)",
                      backgroundColor: "#1a1a1a",
                      padding: 5,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={headshot}
                      width={146}
                      height={146}
                      style={{
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                {/* Identity text */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 700,
                      color: "#fafafa",
                      fontFamily: sans,
                      lineHeight: 1.2,
                    }}
                  >
                    Hey, I&apos;m Gray Marshall.
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: "#a1a1aa",
                      fontFamily: sans,
                      marginTop: 10,
                      fontWeight: 500,
                    }}
                  >
                    Software Engineering &bull; Full-Stack &amp; Systems
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: "rgba(161, 161, 170, 0.8)",
                      fontFamily: sans,
                    }}
                  >
                    Co-Founder &amp; CTO, LSR | CS @ UT Austin
                  </div>
                </div>
              </div>
            </div>

            {/* npm run dev command + output */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#FF7A1A", marginRight: 8 }}>$</span>
                <span style={{ color: "#60a5fa", marginRight: 8 }}>~</span>
                <span style={{ color: "#fafafa" }}>npm run dev</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 4 }}>
                <span style={{ color: "#71717a" }}>Local:</span>
                <span style={{ color: "#fafafa" }}>localhost:3000</span>
                <span style={{ color: "#FF7A1A", marginLeft: 4 }}>✓</span>
                <span style={{ color: "#FF7A1A" }}>Ready in 800ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
