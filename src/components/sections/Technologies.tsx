import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const techs = [
  "TypeScript", "React", "Next.js", "Node.js", 
  "Rust", "Go", "Python", 
  "PostgreSQL", "Redis", "Docker", "AWS", "Terraform"
];

export function Technologies() {
  return (
    <Section className="py-12">
      <Container>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {techs.map((tech) => (
            <span key={tech} className="text-sm font-mono text-muted-foreground cursor-default hover:text-foreground transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
