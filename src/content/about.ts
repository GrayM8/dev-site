export interface AboutContent {
  paragraphs: string[];
  /** Filename of headshot (e.g., "headshot.jpg"). Stored in /public/logos/ */
  headshot?: string;
}

/** Helper to get the full image path from logos folder */
export function getImagePath(filename: string): string {
  return `/logos/${filename}`;
}

export const about: AboutContent = {
  headshot: "headshot.jpg",
  paragraphs: [
    "I’m a second-year CS major translating raw race-car bytes into winning insights for UT Austin’s Formula SAE EV Team — and building the real-time systems that keep competition software reliable under pressure. At Longhorn Racing, I work on a distributed telemetry stack spanning on-car data ingest, real-time streaming, persistent storage, and live visualization, turning high-frequency vehicle data into actionable insight for engineers and drivers in the moment.\n",
    "That same systems-first mindset carries beyond the car. I co-founded and lead the technical direction of Longhorn Sim Racing, where I’ve designed and shipped a production-grade web platform built with Next.js, React, and TypeScript. The platform supports member accounts, event registration, admin tooling, statistics dashboards, and the foundation for digital payments and notifications — all built for scale, reliability, and real organizational use.\n",
    "Across both domains, I optimize for tight feedback loops, clear abstractions, and durable software that ships fast and performs under pressure. Iterate • Improve • Deploy. Open to Summer 2026 SWE internships — let’s connect."
  ]
};
