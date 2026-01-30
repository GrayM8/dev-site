"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TerminalHero } from "@/components/terminal/TerminalHero";
import { Footer } from "@/components/sections/Footer";
import { SystemCard } from "@/components/sections/Systems";
import { Project } from "@/content/projects";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { useScroll } from "framer-motion";

export function ProjectClient({ project }: { project: Project }) {
  const { scrollY } = useScroll();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header Layer */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <TerminalHero scrollY={scrollY} alwaysHeader={true} />
        </div>
      </div>

      <Container className="pt-32 pb-12 md:pb-20">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <Section className="py-0 md:py-0 space-y-12">
          {/* Header with Title and Angled Screen */}
          <header className="border-b border-border pb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                    {project.title}
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex gap-3">
                  {project.repo && (
                    <a 
                      href={project.repo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 rounded-md bg-card border border-border hover:border-accent hover:text-accent transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 rounded-md bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider">Status:</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-foreground text-xs font-medium">
                      {project.status}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-border self-center hidden md:block" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider">Tech:</span>
                    <div className="flex gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Angled Tile (Facing Left - corresponds to isEven=true logic) */}
              <div className="w-full md:w-1/2 max-w-md">
                <SystemCard title={project.title} isEven={true} />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 pb-24">
            <div className="prose prose-invert prose-lg max-w-none">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Overview</h3>
              <div className="space-y-4">
                {project.description.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              
              <div className="my-12 p-8 bg-muted/20 rounded-lg border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-50" />
                <p className="text-sm font-mono text-muted-foreground/80 italic relative z-10">
                  Detailed technical case study, system architecture diagrams, and 
                  performance benchmarks for {project.title} are currently being 
                  compiled for the next iteration of this portfolio.
                </p>
              </div>
            </div>

            {/* Sidebar / Metadata */}
            <div className="space-y-8">
              <div className="p-6 rounded-lg bg-card border border-border">
                <h4 className="text-sm font-mono uppercase text-muted-foreground mb-4 tracking-widest">Core Capabilities</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-accent mr-2 mt-1 shrink-0">➜</span>
                    <span>High-performance system architecture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2 mt-1 shrink-0">➜</span>
                    <span>Scalable data pipelines and state management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2 mt-1 shrink-0">➜</span>
                    <span>End-to-end integration and testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </Container>
      <Footer />
    </main>
  );
}
