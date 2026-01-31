import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Mail, Github, Linkedin, LucideIcon } from "lucide-react";
import { socialLinks } from "@/content/social";

const icons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail
};

export function ContactBar() {
  const emailLink = socialLinks.find(l => l.id === "email");
  const otherLinks = socialLinks.filter(l => l.id !== "email");

  return (
    <Section id="contact" className="py-24">
      <Container>
        <div className="border-t border-b border-white/5 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
             <h2 className="text-2xl font-bold text-foreground mb-2">Let's build something scalable.</h2>
             <p className="text-muted-foreground">Always open to discussing projects, roles, and Summer 2026 SWE internships.<br />Let&apos;s Connect!</p>
           </div>
           
           <div className="flex items-center gap-6">
             {emailLink && (
               <a 
                 href={emailLink.href} 
                 className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded font-medium hover:bg-accent hover:text-white transition-colors"
               >
                 <Mail className="w-4 h-4" />
                 Get in touch
               </a>
             )}
             <div className="h-8 w-px bg-white/10" />
             <div className="flex gap-4 text-muted-foreground">
               {otherLinks.map((link) => {
                 const Icon = icons[link.id];
                 return (
                   <a 
                     key={link.id} 
                     href={link.href} 
                     target="_blank" 
                     className="hover:text-foreground transition-colors"
                     aria-label={link.label}
                   >
                     {Icon && <Icon className="w-5 h-5" />}
                   </a>
                 );
               })}
             </div>
           </div>
        </div>
      </Container>
    </Section>
  );
}
