import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { about } from "@/content/about";

export function About() {
  return (
    <Section id="about">
      <Container className="max-w-3xl text-left">
        <h2 className="text-2xl font-bold mb-6 text-foreground">About</h2>
        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          {about.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
