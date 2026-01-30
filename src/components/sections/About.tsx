import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function About() {
  return (
    <Section>
      <Container className="max-w-3xl text-left">
        <h2 className="text-2xl font-bold mb-6 text-foreground">About</h2>
        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>
            I am a software engineer focused on building scalable systems and product-driven interfaces. 
            My work centers on bridging the gap between complex backend logic and intuitive user experiences.
          </p>
          <p>
            Currently, I am architecting simulation platforms and telemetry systems, ensuring high-performance data handling for real-time applications.
            Previously, I led development teams in delivering robust full-stack solutions.
          </p>
          <p>
            I am driven by a practical approach to engineering—prioritizing maintainability, system integrity, and tangible user value over trends.
          </p>
        </div>
      </Container>
    </Section>
  );
}
