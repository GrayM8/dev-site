export interface ExperienceRole {
  title: string;
  org: string;
  location?: string;
  startDate: Date;
  endDate?: Date; // undefined means "Present"
  impact: string[];
  skills?: string[];
}

/** Calculate tenure string from start date to end date (or present) */
export function getTenureString(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date();
  const months = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth());

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
    title: "Telemetry Software Engineer | Electronics System",
    org: "Longhorn Racing Electric (FSAE)",
    startDate: new Date(2024, 0, 1), // January 2024
    impact: [
      "Developed data acquisition software for the team's electric competition vehicle.",
      "Built a custom visualization suite for analyzing battery thermal performance and motor efficiency.",
      "Optimized data transmission protocols to maximize bandwidth over low-quality connections."
    ]
  }
];
