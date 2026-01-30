"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { projects, Project } from "@/content/projects";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
      className={`px-2 py-0.5 text-xs font-mono uppercase tracking-wider rounded-full border ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block p-6 md:p-8 rounded-lg bg-card/50 border border-border hover:border-accent/50 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-xl md:text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h2>
              <StatusBadge status={project.status} />
              {project.featured && (
                <span className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider rounded-full border bg-accent/10 text-accent border-accent/20">
                  Featured
                </span>
              )}
            </div>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono text-accent/80 bg-accent/5 px-2 py-1 rounded border border-accent/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground font-mono md:mt-0 group-hover:text-accent transition-colors">
            <span className="hidden md:inline mr-2">View</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { scrollY } = useScroll();

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
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-12 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A collection of open source tools, experiments, and production
              applications I&apos;ve built.
            </p>
          </motion.header>

          {/* Projects List */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </Container>

        <Footer />
      </div>
    </main>
  );
}
