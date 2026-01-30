export interface Project {
  title: string;
  slug: string;
  tagline: string;
  description: string[];
  tech: string[];
  status: "Live" | "In Development" | "Archived";
  repo?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Longhorn Sim Racing",
    slug: "longhorn-sim-racing",
    tagline: "Events & Competition Management Platform",
    description: [
      "Centralized hub for league management and driver statistics.",
      "Automated race result ingestion and leaderboard processing.",
      "Reduced administrative workload by 80%."
    ],
    tech: ["React", "PostgreSQL", "Next.js"],
    status: "Live"
  },
  {
    title: "FSAE Telemetry Webtool",
    slug: "telemetry-webtool",
    tagline: "Real-Time Vehicle Analytics",
    description: [
      "Visualizes sensor data from competition vehicles in real-time.",
      "Custom WebSocket implementation for sub-50ms latency.",
      "Used by engineering teams for track-side analysis."
    ],
    tech: ["TypeScript", "D3.js", "WebSockets"],
    status: "In Development"
  },
  {
    title: "Legacy Portfolio Website",
    slug: "legacy-site",
    tagline: "Project & Experience Display",
    description: [
      "Framework-agnostic lobby and state synchronization system.",
      "Handles state reconciliation and authoritative server logic.",
      "Designed for drop-in integration with existing engines."
    ],
    tech: ["Rust", "Redis", "gRPC"],
    status: "Archived"
  },
  {
    title: "Portfolio Website",
    slug: "dev-site",
    tagline: "Reimagined Portfolio Website",
    description: [
      "Framework-agnostic lobby and state synchronization system.",
      "Handles state reconciliation and authoritative server logic.",
      "Designed for drop-in integration with existing engines."
    ],
    tech: ["Rust", "Redis", "gRPC"],
    status: "Archived"
  },
];