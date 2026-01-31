export interface ExperienceRole {
  title: string;
  org: string;
  location?: string;
  startDate: Date;
  endDate?: Date; // undefined means "Present"
  impact: string[];
  skills?: string[];
  /** Filename of the logo (e.g., "company-logo.png"). Logos are stored in /public/logos/ */
  logo?: string;
}

/** Helper to get the full logo path */
export function getLogoPath(filename: string): string {
  return `/logos/${filename}`;
}

/** Calculate tenure string from start date to end date (or present), rounding up */
export function getTenureString(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date();
  let months = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth());

  // Round up: if we're past the start day in the current month, count it as a full month
  if (end.getDate() >= startDate.getDate()) {
    months += 1;
  }

  if (months < 1) return "< 1 mo";
  if (months === 1) return "1 mo";
  if (months < 12) return `${months} mos`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return years === 1 ? "1 yr" : `${years} yrs`;
  }

  const yearStr = years === 1 ? "1 yr" : `${years} yrs`;
  const monthStr = remainingMonths === 1 ? "1 mo" : `${remainingMonths} mos`;
  return `${yearStr} ${monthStr}`;
}

/** Format period string from dates */
export function getPeriodString(startDate: Date, endDate?: Date): string {
  const startYear = startDate.getFullYear();
  const endYear = endDate ? endDate.getFullYear() : "Present";
  return `${startYear} — ${endYear}`;
}

export const experiences: ExperienceRole[] = [
  {
    title: "Co-Founder & Chief Technology Officer (CTO)",
    org: "Longhorn Sim Racing",
    logo: "white_logo_black_square.png",
    location: "Austin, Texas, United States",
    startDate: new Date(2025, 2, 1), // March 2025
    impact: [
      "Co-founded Longhorn Sim Racing and serve as Chief Technology Officer, owning the design, implementation, and evolution of the organization's core digital platform.",
      "Architected and implemented a full-stack TypeScript application (Next.js / React) supporting member accounts, event registration, admin tooling, and statistics dashboards.",
      "Built internal admin tools to manage events, registrations, and member data, prioritizing reliability, clarity, and low operational overhead for non-technical officers.",
      "Implemented production-grade SEO and platform discoverability, including structured metadata, sitemaps, breadcrumbing, and Google Search Console integration.",
      "Integrated third-party commerce infrastructure into the core platform, building a custom storefront UI while leveraging Shopify for checkout, payments, and fulfillment workflows.",
      "Established the technical foundation for future digital payments and notification systems, enabling scalable growth without re-architecting core infrastructure.",
      "Owned the platform end-to-end, from system design and implementation to deployment, iteration, and ongoing maintenance."
    ],
    skills: [
      "Web Application Development",
      "React.js",
      "Application Programming Interfaces (API)",
      "Git",
      "TypeScript",
      "Electronic Payments",
      "Technical Leadership",
      "Software Systems Engineering",
      "Next.js",
      "Digital Authentication",
      "Software Development",
      "Full-Stack Development",
      "Search Engine Optimization (SEO)"
    ]
  },
  {
    title: "Telemetry Software Engineer | Electronics System (Formula SAE EV Team)",
    org: "Longhorn Racing",
    logo: "lhr.png",
    location: "Austin, Texas, United States",
    startDate: new Date(2024, 8, 1), // September 2024
    impact: [
      "Develop and maintain a distributed, real-time telemetry system for a Formula SAE EV race car, supporting live data ingest, streaming, storage, and visualization during testing and competition.",
      "Designed the on-car telemetry dashboard, balancing real-time data density, clarity, and reliability for use in high-speed, safety-critical conditions.",
      "Work across the full telemetry pipeline, from on-car data ingestion through real-time distribution and persistent storage, enabling engineers and drivers to make time-critical decisions trackside.",
      "Build web-based visualization tools in TypeScript / React for live timing, deltas, vehicle state, driver inputs, and energy usage, used across mobile devices, laptops, and trackside systems.",
      "Integrate real-time streaming with backend data stores and processing pipelines to support analytics such as energy prediction and performance modeling.",
      "Contribute to a safety- and reliability-critical codebase where correctness, latency, and fault tolerance directly impact on-track decision-making."
    ],
    skills: [
      "Distributed Systems",
      "SQL",
      "TypeScript",
      "Time Series Analysis",
      "Data Visualization",
      "Real-time Data Acquisition",
      "Python (Programming Language)",
      "Software Development",
      "Reliability Engineering",
      "Performance Analysis",
      "Embedded Systems",
      "Telemetry"
    ]
  }
];
