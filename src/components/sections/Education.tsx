import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function Education() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-12 text-foreground">Education</h2>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 border-l-2 border-white/5 pl-6 md:pl-0 md:border-l-0">
          <div className="w-full md:w-1/3 shrink-0 md:text-right md:border-r-2 md:border-white/5 md:pr-12">
            <div className="font-mono text-sm text-muted-foreground">The University of Texas at Austin</div>
            <div className="text-xs text-muted-foreground/60 mt-1">Class of 2025</div>
          </div>
          
          <div className="w-full md:w-2/3">
             <h3 className="text-lg font-semibold text-foreground">B.S. Computer Science</h3>
             <p className="text-muted-foreground mt-2">
               Focus on Systems Engineering and Computer Architecture.
             </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
