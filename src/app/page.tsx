"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { TerminalHero } from "@/components/terminal/TerminalHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { projects } from "@/content/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  
  // Content Reveal: Remains invisible until the terminal command (0-500px) 
  // and morph (500-700px) are mostly complete.
  const contentOpacity = useTransform(scrollY, [600, 850], [0, 1]);

  return (
    <main className="min-h-[250vh] bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-accent-foreground">
      
      {/* Fixed Hero Layer */}
      <div className="fixed inset-0 z-50 flex flex-col items-center pointer-events-none">
        {/* TerminalHero handles its own alignment via margins/layout animation */}
        <div className="w-full flex justify-center pointer-events-auto">
           <TerminalHero scrollY={scrollY} />
        </div>
      </div>

      {/* Scrollable Content Layer */}
      {/* Starts after the "boot" scroll distance. Opacity ensures it doesn't peek early. */}
      <motion.div 
        className="relative z-10 w-full" 
        style={{ marginTop: "85vh", opacity: contentOpacity }}
      >
        <Container className="pb-24">
          
          {/* Intro Section */}
          <Section className="max-w-2xl mx-auto text-center md:text-left pt-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Building polished <span className="text-accent">digital products</span> that scale.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a Full Stack Engineer focused on design systems, performance, and developer experience.
              Currently building tools that bridge the gap between design and engineering.
            </p>
          </Section>

          {/* Selected Projects */}
          <Section delay={100}>
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
              <h2 className="text-2xl font-semibold flex items-center">
                <span className="text-accent mr-2">01.</span> Projects
              </h2>
              <Link 
                href="/projects" 
                className="hidden md:flex items-center text-sm text-muted-foreground hover:text-accent transition-colors group"
              >
                View all 
                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.slice(0, 2).map((project) => (
                <Link 
                  key={project.slug} 
                  href={`/projects/${project.slug}`}
                  className="group block p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
                      {project.status}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-mono text-accent/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link href="/projects" className="text-sm font-medium text-accent hover:underline">
                View all projects →
              </Link>
            </div>
          </Section>

          {/* Connect */}
          <Section delay={200} className="pb-24">
            <h2 className="text-2xl font-semibold mb-8 flex items-center">
              <span className="text-accent mr-2">02.</span> Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-mono text-sm text-muted-foreground mb-2">GitHub</h3>
                <a href="https://github.com" target="_blank" className="hover:text-accent transition-colors">@username</a>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-mono text-sm text-muted-foreground mb-2">Twitter / X</h3>
                <a href="https://twitter.com" target="_blank" className="hover:text-accent transition-colors">@username</a>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-mono text-sm text-muted-foreground mb-2">Email</h3>
                <a href="mailto:hello@example.com" className="hover:text-accent transition-colors">hello@example.com</a>
              </div>
            </div>
          </Section>

        </Container>
      </motion.div>
    </main>
  );
}
