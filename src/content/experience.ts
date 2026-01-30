export interface ExperienceRole {
  period: string;
  title: string;
  org: string;
  impact: string[];
}

export const experiences: ExperienceRole[] = [
  {
    period: "2025 — Present",
    title: "Co-Founder / CTO",
    org: "Longhorn Sim Racing (LSR)",
    impact: [
      "Architected the league's competition platform, handling registration and scoring for 500+ drivers.",
      "Implemented a real-time race control dashboard used for live stewarding decisions.",
      "Scaled infrastructure to support high-concurrency race events with zero downtime."
    ]
  },
  {
    period: "2024 — Present",
    title: "Telemetry Software Engineer | Electronics System",
    org: "Longhorn Racing Electric (FSAE)",
    impact: [
      "Developed data acquisition software for the team's electric competition vehicle.",
      "Built a custom visualization suite for analyzing battery thermal performance and motor efficiency.",
      "Optimized data transmission protocols to maximize bandwidth over low-quality connections."
    ]
  }
];
