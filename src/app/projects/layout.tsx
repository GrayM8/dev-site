import type { Metadata } from "next";

const projectsDescription =
  "Platforms, systems, and tools built by Gray Marshall — from real-time telemetry dashboards to full-stack web applications.";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Gray Marshall",
    description: projectsDescription,
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Gray Marshall",
    description: projectsDescription,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
