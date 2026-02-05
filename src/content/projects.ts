export interface Project {
  title: string;
  slug: string;
  tagline: string;
  /** Bullet points shown on home page featured section */
  homeBullets?: string[];
  /** Overview paragraph shown at top of project detail page */
  overview?: string;
  /** Detailed bullet points shown only on project detail page */
  detailBullets?: string[];
  tech: string[];
  status: "Live" | "In Development" | "Archived";
  featured?: boolean;
  /** Category determines where project appears:
   * - "main": Regular project with its own page
   * - "academic": Academic project with its own page (shown in separate section)
   * - "academic-minor": Academic project without its own page (shown at very end)
   */
  category: "main" | "academic" | "academic-minor";
  /** Filename of the project image (e.g., "my-project.jpg"). Images are stored in /public/project-images/ */
  image?: string;
  repo?: string;
  link?: string;
}

/** Helper to get the full image path for a project */
export function getProjectImagePath(filename: string): string {
  return `/project-images/${filename}`;
}

export const projects: Project[] = [
  // ==================== FEATURED PROJECTS ====================
  {
    title: "Longhorn Sim Racing Platform",
    slug: "longhorn-sim-racing",
    tagline: "Events, Membership & Competition Management Platform",
    homeBullets: [
      "Centralized membership, events, and competition results into a single self-serve platform.",
      "Automated race result ingestion and leaderboard/statistics processing.",
      "Reduced administrative workload and improved consistency across event operations."
    ],
    overview: "A unified operations hub for Longhorn Sim Racing that replaced scattered spreadsheets and manual workflows with structured registration, admin tools, and automated results processing — built for real day-to-day use.",
    detailBullets: [
      "Architected and shipped the club's core digital platform end-to-end in TypeScript (React / Next.js), used for day-to-day operations.",
      "Implemented member accounts and event registration workflows with officer-facing admin tooling for management and approvals.",
      "Built automated race results ingestion and computation pipelines powering driver statistics, leaderboards, and season standings.",
      "Integrated a custom merchandise storefront with Shopify-backed checkout, payments, and fulfillment workflows.",
      "Owned platform discoverability and indexing (structured metadata, sitemaps, Search Console) to ensure reliable SEO and sharing previews."
    ],
    tech: ["TypeScript", "Next.js", "PostgreSQL", "React"],
    status: "Live",
    featured: true,
    category: "main",
    image: "lsr-og.png",
    link: "https://longhornsimracing.com"
  },
  {
    title: "Formula SAE EV Telemetry System",
    slug: "fsae-telemetry",
    tagline: "Distributed Real-Time Vehicle Telemetry & Analytics Platform",
    homeBullets: [
      "Powers live telemetry, timing, and analytics for engineers and drivers during testing and competition.",
      "Streams high-frequency vehicle data end-to-end with low latency and fault tolerance.",
      "Enables trackside decision-making through real-time visualization and post-session analysis."
    ],
    overview: "A distributed, real-time telemetry platform for a Formula SAE electric vehicle, supporting live data ingestion, streaming, storage, and visualization during testing and competition. Designed to deliver reliable, low-latency insight to engineers and drivers under real-world track conditions.",
    detailBullets: [
      "Co-architected and maintain a distributed telemetry system spanning on-car ingestion, real-time streaming, persistent storage, and live visualization.",
      "Led system redesign and modernization after original authorship transitioned, replacing legacy components with a more robust and scalable architecture.",
      "Owned the design and implementation of the web backend and frontend, delivering real-time dashboards for timing, deltas, vehicle state, driver inputs, and energy usage across mobile and trackside devices.",
      "Built trackside tooling and configuration workflows to support session setup, data grouping, and reliable live operation.",
      "Integrated streaming data with backend storage and processing pipelines to support analytics such as energy prediction and performance modeling.",
      "Focused on system reliability and latency, ensuring graceful behavior under intermittent connectivity and high-frequency data loads."
    ],
    tech: ["Distributed Systems", "Real-Time Data Processing", "TypeScript", "Python", "Telemetry Systems"],
    status: "In Development",
    featured: true,
    category: "main",
    image: "telemetry.jpg"
  },
  {
    title: "In-Vehicle Driver Dash System",
    slug: "driver-dash",
    tagline: "Real-Time Driver Display for Vehicle State, Timing, and Energy Data",
    homeBullets: [
      "Displays live timing, energy deltas, and vehicle state directly to the driver in real time.",
      "Designed for clarity and reliability under high-speed, safety-critical conditions.",
      "Integrates live telemetry and vehicle bus data through a structured, low-latency pipeline."
    ],
    overview: "A real-time, in-vehicle driver display designed to present critical telemetry, timing, and energy information during testing and competition. Built to operate under strict latency, reliability, and clarity constraints in a high-speed driving environment.",
    detailBullets: [
      "Designed and implemented the in-vehicle driver dashboard frontend, presenting real-time telemetry, timing, and energy data with an emphasis on clarity and reliability.",
      "Defined the data schema and WebSocket interface used to transmit live data to the dash, establishing a clear contract between vehicle-side systems and the display layer.",
      "Architected the end-to-end data flow from backend telemetry processors through cellular transport to the vehicle, ensuring low-latency delivery of driver-relevant signals.",
      "Integrated telemetry-derived data (e.g., lap and energy deltas) with vehicle bus signals provided by a Rust-based CAN interface, combining multiple data sources into a unified display model.",
      "Designed the display for use in a safety- and latency-sensitive environment, prioritizing readable layouts, stable updates, and graceful degradation over visual complexity."
    ],
    tech: ["Real-Time Systems", "WebSockets", "HMI", "TypeScript", "Systems Integration"],
    status: "In Development",
    featured: true,
    category: "main"
  },

  // ==================== ALL PROJECTS (non-featured) ====================
  {
    title: "Personal Website (v2)",
    slug: "personal-website",
    tagline: "Technical Portfolio & Personal Platform",
    homeBullets: [
      "Designed and built a performant, mobile-first personal platform for projects and experience.",
      "Implemented structured metadata, SEO, and sharing previews for reliable discoverability.",
      "Deployed with a fast iteration workflow to support ongoing content updates."
    ],
    overview: "A second-generation personal website built to present projects, experience, and technical writing with clarity and performance in mind. Designed as a production-quality platform rather than a static résumé page.",
    detailBullets: [
      "Rebuilt the site from the ground up with a focus on content architecture, readability, and performance across devices.",
      "Designed a reusable project and writing layout system to support future expansion without restructuring the site.",
      "Implemented production-grade SEO practices including metadata, sitemaps, and social sharing previews.",
      "Optimized for fast iteration and deployment, enabling frequent updates without breaking live content.",
      "Treated the site as a long-lived platform, prioritizing maintainability over one-off visual effects."
    ],
    tech: ["TypeScript", "Next.js", "Web Performance"],
    status: "Live",
    featured: false,
    category: "main"
  },

  // ==================== ACADEMIC PROJECTS ====================
  {
    title: "Operating Systems Kernel (Pintos)",
    slug: "pintos-kernel",
    tagline: "Educational Operating System with Scheduling, Virtual Memory, and File Systems",
    homeBullets: [
      "Implemented core OS kernel subsystems including scheduling, synchronization, and virtual memory.",
      "Built kernel-level file system support with persistence and concurrency considerations.",
      "Debugged race conditions and correctness issues in a multi-threaded kernel environment."
    ],
    overview: "An educational operating system kernel implementing core OS abstractions including process management, synchronization, virtual memory, and file systems. Built to explore how kernel subsystems interact under concurrency and resource constraints.",
    detailBullets: [
      "Implemented kernel-level process and thread management, including scheduling and synchronization primitives.",
      "Built virtual memory support with paging, address translation, and page fault handling.",
      "Designed and implemented a file system with persistent storage, buffering, and concurrent access control.",
      "Debugged complex kernel behavior using low-level tooling and test harnesses to ensure correctness under concurrency."
    ],
    tech: ["C", "Operating Systems", "Concurrency", "Virtual Memory"],
    status: "Archived",
    featured: false,
    category: "academic"
  },
  {
    title: "chArm-v3 CPU Pipeline & Cache Simulator",
    slug: "cpu-simulator",
    tagline: "Cycle-Accurate Simulation of a Pipelined 64-bit ISA with Caching",
    homeBullets: [
      "Implemented a pipelined CPU simulator with full hazard detection and resolution.",
      "Modeled cache behavior and memory latency to analyze performance tradeoffs.",
      "Validated execution correctness against reference binaries and trace-driven tests."
    ],
    overview: "A cycle-accurate simulator for a pipelined 64-bit instruction set architecture, modeling CPU execution, hazard resolution, and a two-level memory hierarchy. Built to explore how pipeline control and cache behavior impact correctness and performance.",
    detailBullets: [
      "Built emulated hardware components including an ALU, register file, and condition logic, then integrated them into a multi-stage PIPE CPU simulator.",
      "Implemented hazard detection and resolution mechanisms (stalling, squashing, forwarding) to correctly handle data and control dependencies.",
      "Designed and integrated a write-back, write-allocate cache simulator with LRU replacement, modeling variable memory latency and its impact on pipeline performance.",
      "Debugged and validated the system against reference binaries and trace-driven test suites."
    ],
    tech: ["C", "Computer Architecture", "CPU Pipelines", "Cache Simulation"],
    status: "Archived",
    featured: false,
    category: "academic"
  },

  // ==================== OTHER ACADEMIC SYSTEMS (no own page) ====================
  {
    title: "Dynamic Memory Allocator (MM)",
    slug: "memory-allocator",
    tagline: "Explicit free-list memory allocator with coalescing and validation",
    overview: "Implemented a custom dynamic memory allocator supporting aligned allocation, block splitting, coalescing, and heap consistency checking.",
    detailBullets: [
      "Reasoned about memory layout, fragmentation, and performance tradeoffs in low-level heap management."
    ],
    tech: ["C", "Memory Management", "Data Structures", "Low-Level Systems"],
    status: "Archived",
    featured: false,
    category: "academic-minor"
  },
  {
    title: "Command Interpreter (CI)",
    slug: "command-interpreter",
    tagline: "User-space command interpreter with parsing and execution control",
    overview: "Built a command interpreter with structured parsing, command execution, and robust error handling.",
    detailBullets: [
      "Designed internal representations to manage control flow and extensibility while maintaining correctness."
    ],
    tech: ["C", "Parsing", "Systems Programming", "Software Design"],
    status: "Archived",
    featured: false,
    category: "academic-minor"
  },
  {
    title: "Assembly-Level Programming (AC)",
    slug: "assembly-programming",
    tagline: "Instruction-level programming and ISA reasoning",
    overview: "Wrote and debugged programs directly in assembly, reasoning about control flow, calling conventions, and memory access.",
    detailBullets: [
      "Developed a deeper understanding of instruction execution and low-level program behavior."
    ],
    tech: ["Assembly", "Computer Architecture", "Low-Level Debugging", "ISA Fundamentals"],
    status: "Archived",
    featured: false,
    category: "academic-minor"
  }
];

/** Get featured projects (shown on home page) */
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

/** Get main projects that have their own pages (featured + non-featured main) */
export function getMainProjects(): Project[] {
  return projects.filter(p => p.category === "main");
}

/** Get academic projects that have their own pages */
export function getAcademicProjects(): Project[] {
  return projects.filter(p => p.category === "academic");
}

/** Get minor academic projects (no own page) */
export function getAcademicMinorProjects(): Project[] {
  return projects.filter(p => p.category === "academic-minor");
}

/** Get all projects that have their own pages */
export function getProjectsWithPages(): Project[] {
  return projects.filter(p => p.category !== "academic-minor");
}
