import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemProject {
  title: string;
  slug: string;
  tagline: string;
  description: string[];
  tech: string[];
}

const systems: SystemProject[] = [
  {
    title: "lofi.world",
    slug: "lofi-world",
    tagline: "Immersive Audio Environment",
    description: [
      "A real-time collaborative audio space for focus and productivity.",
      "Optimized audio streaming with minimal latency.",
      "Served over 10k monthly active users."
    ],
    tech: ["Next.js", "Web Audio API", "Supabase"]
  },
  {
    title: "Longhorn Sim Racing",
    slug: "longhorn-sim-racing",
    tagline: "Competition Management Platform",
    description: [
      "Centralized hub for league management and driver statistics.",
      "Automated race result ingestion and leaderboard processing.",
      "Reduced administrative workload by 80%."
    ],
    tech: ["React", "PostgreSQL", "Node.js"]
  },
  {
    title: "Telemetry Dashboard",
    slug: "telemetry-dashboard",
    tagline: "Real-Time Vehicle Analytics",
    description: [
      "Visualizes sensor data from competition vehicles in real-time.",
      "Custom WebSocket implementation for sub-50ms latency.",
      "Used by engineering teams for track-side analysis."
    ],
    tech: ["TypeScript", "D3.js", "WebSockets"]
  },
  {
    title: "Multiplayer Room System",
    slug: "multiplayer-room-system",
    tagline: "Scalable Game Networking",
    description: [
      "Framework-agnostic lobby and state synchronization system.",
      "Handles state reconciliation and authoritative server logic.",
      "Designed for drop-in integration with existing engines."
    ],
    tech: ["Rust", "Redis", "gRPC"]
  }
];

export function Systems() {
  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-bold mb-16 text-foreground">Systems</h2>
        
        <div className="space-y-24 md:space-y-32">
          {systems.map((system, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={system.slug} 
                className={cn(
                  "flex flex-col gap-8 md:gap-16 items-center",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Angled Screen Placeholder */}
                <div className="w-full md:w-1/2 perspective-[1000px]">
                  <div 
                    className={cn(
                      "w-full aspect-video bg-[#101010] border border-white/10 rounded-lg shadow-2xl relative overflow-hidden group transition-transform duration-700 hover:scale-[1.02]",
                      isEven ? "rotate-y-3 -rotate-x-2" : "-rotate-y-3 -rotate-x-2"
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-mono text-sm">
                      [ System Preview: {system.title} ]
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{system.title}</h3>
                    <p className="text-lg text-accent font-medium">{system.tagline}</p>
                  </div>

                  <ul className="space-y-3 text-muted-foreground">
                    {system.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                     <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-mono text-muted-foreground/60 mb-6">
                       {system.tech.map((t) => (
                         <span key={t}>#{t}</span>
                       ))}
                     </div>

                     <Link 
                       href={`/projects/${system.slug}`}
                       className="inline-flex items-center text-foreground font-medium hover:text-accent transition-colors group"
                     >
                       View System <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                     </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
