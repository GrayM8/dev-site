export interface Project {
  title: string;
  slug: string;
  tagline: string;
  description: string[];
  tech: string[];
  status: "Live" | "In Development" | "Archived";
  featured?: boolean;
  image?: string;
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
    status: "Live",
    featured: true,
    image: "/projects/sim-racing.jpg"
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
    status: "In Development",
    featured: true,
    image: "/projects/telemetry.jpg"
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
    status: "Archived",
    featured: true
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
    status: "Archived",
    featured: true
  },
  {
    title: "Cloud Infrastructure Dashboard",
    slug: "cloud-dashboard",
    tagline: "Multi-Cloud Resource Management",
    description: [
      "Unified dashboard for monitoring AWS, GCP, and Azure resources.",
      "Real-time cost analytics and optimization recommendations.",
      "Custom alerting system with Slack and PagerDuty integrations."
    ],
    tech: ["Go", "React", "Terraform", "GraphQL"],
    status: "Live",
    image: "/projects/cloud-dashboard.jpg"
  },
  {
    title: "Neural Style Transfer App",
    slug: "neural-style",
    tagline: "AI-Powered Image Transformation",
    description: [
      "Apply artistic styles to photos using deep neural networks.",
      "Optimized inference pipeline for sub-second processing.",
      "Mobile-first progressive web app with offline support."
    ],
    tech: ["Python", "PyTorch", "FastAPI", "React Native"],
    status: "Live",
    image: "/projects/neural-style.jpg"
  },
  {
    title: "Distributed Task Queue",
    slug: "task-queue",
    tagline: "High-Throughput Job Processing System",
    description: [
      "Horizontally scalable task queue handling 100k+ jobs per minute.",
      "Priority-based scheduling with dead letter queue support.",
      "Built-in monitoring dashboard and retry mechanisms."
    ],
    tech: ["Rust", "Redis", "PostgreSQL", "Prometheus"],
    status: "In Development",
    image: "/projects/task-queue.jpg"
  }
];