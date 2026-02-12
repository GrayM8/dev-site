import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProjectsWithPages } from "@/content/projects";

export const alt = "Project";
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

export async function generateStaticParams() {
  return getProjectsWithPages().map((project) => ({
    slug: project.slug,
  }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectsWithPages().find((p) => p.slug === slug);
  const fonts = await loadFonts();
  const hasFonts = fonts.length > 0;
  const sans = hasFonts ? "Geist" : "sans-serif";
  const mono = hasFonts ? "Geist Mono" : "monospace";

  if (!project) {
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
            color: "#fafafa",
            fontSize: 48,
            fontFamily: sans,
          }}
        >
          Project Not Found
        </div>
      ),
      { ...size, fonts: fonts.length > 0 ? fonts : undefined }
    );
  }

  const statusColor: Record<string, string> = {
    Live: "#34d399",
    "In Development": "#fbbf24",
    Archived: "#71717a",
  };

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
              justifyContent: "space-between",
            }}
          >
            {/* Top section */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* cat command */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
                <span style={{ color: "#FF7A1A", marginRight: 8 }}>➜</span>
                <span style={{ color: "#60a5fa", marginRight: 8 }}>~</span>
                <span style={{ color: "#fafafa" }}>cat projects/{slug}.md</span>
              </div>

              {/* Project title */}
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#fafafa",
                  lineHeight: 1.15,
                  fontFamily: sans,
                  marginBottom: 12,
                }}
              >
                {project.title}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: 20,
                  color: "#a1a1aa",
                  lineHeight: 1.4,
                  maxWidth: 900,
                  fontFamily: sans,
                }}
              >
                {project.tagline}
              </div>
            </div>

            {/* Bottom section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Tech tags */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  maxWidth: 700,
                }}
              >
                {project.tech.slice(0, 5).map((t) => (
                  <div
                    key={t}
                    style={{
                      fontSize: 14,
                      color: "#a1a1aa",
                      padding: "6px 14px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: 6,
                      fontFamily: mono,
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>

              {/* Status badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 15,
                  color: statusColor[project.status] || "#71717a",
                  fontFamily: mono,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: statusColor[project.status] || "#71717a",
                  }}
                />
                {project.status}
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
