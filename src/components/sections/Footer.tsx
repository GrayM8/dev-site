import React from "react";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">Gray Marshall</span> — Full Stack Engineer
          </div>
          
          <div className="flex gap-6">
            <span>© {new Date().getFullYear()}</span>
            <a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://linkedin.com" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="mailto:hello@example.com" className="hover:text-foreground transition-colors">Email</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
