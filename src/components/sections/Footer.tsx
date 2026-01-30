import React from "react";
import { Container } from "@/components/layout/Container";
import { socialLinks } from "@/content/social";

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
            {socialLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.href} 
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
