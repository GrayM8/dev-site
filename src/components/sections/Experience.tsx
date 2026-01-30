import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface Role {
  period: string;
  title: string;
  org: string;
  impact: string[];
}

const roles: Role[] = [
  {
    period: "2023 — Present",
    title: "Co-Founder / CTO",
    org: "Longhorn Sim Racing",
    impact: [
      "Architected the league's competition platform, handling registration and scoring for 500+ drivers.",
      "Implemented a real-time race control dashboard used for live stewarding decisions.",
      "Scaled infrastructure to support high-concurrency race events with zero downtime."
    ]
  },
  {
    period: "2022 — 2024",
    title: "Telemetry Software Engineer",
    org: "Longhorn Racing (LHR)",
    impact: [
      "Developed data acquisition software for the team's electric competition vehicle.",
      "Built a custom visualization suite for analyzing battery thermal performance and motor efficiency.",
      "Optimized data transmission protocols to maximize bandwidth over low-quality connections."
    ]
  }
];

export function Experience() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-12 text-foreground">Experience</h2>
        
        <div className="space-y-12">
          {roles.map((role, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="w-full md:w-1/3 shrink-0">
                <div className="font-mono text-sm text-muted-foreground pt-1.5">{role.period}</div>
              </div>
              
              <div className="w-full md:w-2/3 flex gap-4 md:gap-6">
                <div className="w-12 h-12 shrink-0 rounded bg-muted/50 border border-white/5 flex items-center justify-center text-[10px] text-muted-foreground/40 font-mono mt-1">
                  LOGO
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                    <div className="text-accent text-base">{role.org}</div>
                  </div>
                  
                  <ul className="space-y-2 text-muted-foreground leading-relaxed">
                    {role.impact.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                         <span className="mr-2.5 mt-2 w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                         {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
