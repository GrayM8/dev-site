import { ImageResponse } from "next/og";
import { getProjectsWithPages } from "@/content/projects";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getProjectsWithPages().map((project) => ({
    slug: project.slug,
  }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectsWithPages().find((p) => p.slug === slug);

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
          }}
        >
          Project Not Found
        </div>
      ),
      { ...size }
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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          fontFamily: "monospace",
        }}
      >
        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
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

          {/* Project title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#fafafa",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 900,
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
              gap: 12,
              flexWrap: "wrap",
              maxWidth: 700,
            }}
          >
            {project.tech.slice(0, 5).map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 16,
                  color: "#71717a",
                  padding: "6px 14px",
                  border: "1px solid #27272a",
                  borderRadius: 6,
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Right side: status + branding */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 12,
            }}
          >
            {/* Status badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 16,
                color: statusColor[project.status] || "#71717a",
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

            {/* Branding */}
            <div style={{ fontSize: 18, color: "#52525b" }}>
              graymarshall.dev
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
