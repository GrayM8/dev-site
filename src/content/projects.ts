export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Live" | "In Development" | "Archived";
  link?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    slug: "design-system-core",
    title: "Design System Core",
    tagline: "A framework-agnostic component library for enterprise apps.",
    description: "Built to solve consistency issues across 5 different products. Reduced UI debt by 40% and improved accessibility scores significantly.",
    tech: ["TypeScript", "React", "Tailwind", "Storybook"],
    status: "Live",
    link: "https://example.com",
    repo: "https://github.com/example/design-system"
  },
  {
    slug: "dev-terminal",
    title: "DevTerminal",
    tagline: "A browser-based CLI for managing cloud resources.",
    description: "Experimental interface combining the speed of CLI with the visual feedback of a dashboard. specific focus on AWS/Vercel integrations.",
    tech: ["Rust", "WebAssembly", "Next.js"],
    status: "In Development",
    repo: "https://github.com/example/dev-terminal"
  },
  {
    slug: "async-notes",
    title: "Async Notes",
    tagline: "Local-first note taking app with p2p sync.",
    description: "Leveraging CRDTs for conflict-free editing. Designed for offline-first workflows and privacy.",
    tech: ["Svelte", "Yjs", "IndexedDB"],
    status: "Archived",
    repo: "https://github.com/example/async-notes"
  }
];
