"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/sections/Footer";
import { Project, projects } from "@/content/projects";
import { SystemCard } from "@/components/sections/Systems";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { TerminalHero } from "@/components/terminal/TerminalHero";

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors = {
    Live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "In Development": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function RelatedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block p-6 rounded-lg bg-card/50 border border-border hover:border-accent/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors truncate">
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {project.tagline}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
      </div>
    </Link>
  );
}

export function ProjectClient({ project }: { project: Project }) {
  const { scrollY } = useScroll();

  // Get related projects (other projects, excluding current)
  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <TerminalHero scrollY={scrollY} alwaysHeader={true} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Container className="pt-28 pb-16">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-12 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
              All Projects
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.header
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
              {/* Left - Title & Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <StatusBadge status={project.status} />
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  {project.title}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                  {project.tagline}
                </p>

                {/* Action Buttons */}
                {(project.repo || project.link) && (
                  <div className="flex flex-wrap gap-3 mt-8">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-card border border-border text-foreground font-medium hover:border-accent/50 hover:text-accent transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Right - Screen Tile */}
              <SystemCard
                title={project.title}
                isEven={false}
                className="w-full lg:w-[420px] aspect-video shrink-0"
              />
            </div>
          </motion.header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column - Description */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <section>
                <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                  Overview
                </h2>
                <div className="space-y-4">
                  {project.description.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-lg text-foreground/80 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Placeholder for future content */}
              <section className="p-6 rounded-lg bg-card/30 border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/50" />
                <p className="text-sm text-muted-foreground italic pl-4">
                  Detailed technical documentation, architecture diagrams, and
                  implementation notes for this project are being prepared.
                </p>
              </section>
            </motion.div>

            {/* Right Column - Metadata */}
            <motion.aside
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Tech Stack */}
              <div className="p-6 rounded-lg bg-card/50 border border-border">
                <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-mono bg-accent/5 text-accent border border-accent/20 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-lg bg-card/50 border border-border">
                <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  Links
                </h3>
                <div className="space-y-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-foreground hover:text-accent transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-accent" />
                      Live Application
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-foreground hover:text-accent transition-colors group"
                    >
                      <Github className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-accent" />
                      GitHub Repository
                    </a>
                  )}
                  {!project.link && !project.repo && (
                    <p className="text-sm text-muted-foreground italic">
                      No external links available
                    </p>
                  )}
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.section
              className="mt-24 pt-12 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  Other Projects
                </h2>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProjects.map((relatedProject) => (
                  <RelatedProjectCard
                    key={relatedProject.slug}
                    project={relatedProject}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </Container>

        <Footer />
      </div>
    </main>
  );
}
