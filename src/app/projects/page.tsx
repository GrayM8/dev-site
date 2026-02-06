"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import {
  Project,
  getProjectImagePath,
  getMainProjects,
  getAcademicProjects,
  getAcademicMinorProjects,
} from "@/content/projects";
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
  const hasMedia = project.image || project.video;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-lg bg-card/50 border border-border hover:border-accent/50 transition-all duration-300 relative overflow-hidden"
      >
        {/* Mobile: Image/Video at top in 16:9 with angled plane effect */}
        {hasMedia && (
          <div className="md:hidden relative aspect-video overflow-hidden rounded-t-lg bg-[#0a0a0a]">
            <div
              className="absolute inset-0"
              style={{
                perspective: "600px",
                perspectiveOrigin: "50% 50%"
              }}
            >
              <div
                className={project.video ? "absolute aspect-[5/3]" : "absolute aspect-video"}
                style={{
                  width: "300px",
                  left: "50%",
                  top: "50%",
                  transform: "translateX(-50%) translateY(-50%) rotateX(50deg) rotateZ(20deg) scale(2.2)",
                  transformOrigin: "center center"
                }}
              >
                {project.video ? (
                  <video
                    src={getProjectImagePath(project.video)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                  />
                ) : (
                  <Image
                    src={getProjectImagePath(project.image!)}
                    alt=""
                    fill
                    className="object-cover object-center rounded-lg"
                  />
                )}
              </div>
            </div>
            {/* Bottom gradient fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(10, 10, 10, 0.9), transparent)"
              }}
            />
            {/* Top right corner fade */}
            <div
              className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 100% 0%, rgba(10, 10, 10, 0.7) 0%, transparent 70%)"
              }}
            />
          </div>
        )}

        {/* Desktop: Background Image/Video with Radial Vignette */}
        {hasMedia && (
          <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                perspective: "600px",
                perspectiveOrigin: "85% 50%"
              }}
            >
              <div
                className={project.video ? "absolute aspect-[5/3]" : "absolute aspect-video"}
                style={{
                  width: "300px",
                  left: "55%",
                  top: "50%",
                  transform: "translateY(-50%) rotateX(50deg) rotateZ(20deg) scale(2.2)",
                  transformOrigin: "center center"
                }}
              >
                {project.video ? (
                  <video
                    src={getProjectImagePath(project.video)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                  />
                ) : (
                  <Image
                    src={getProjectImagePath(project.image!)}
                    alt=""
                    fill
                    className="object-cover object-center rounded-lg"
                  />
                )}
              </div>
            </div>
            {/* Radial vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 40% 160% at 70% 50%, transparent 30%, rgba(10, 10, 10, 0.9) 55%, rgb(10, 10, 10) 65%)"
              }}
            />
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative z-10">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-xl md:text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h2>
              <StatusBadge status={project.status} />
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

function AcademicMinorCard({
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
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-5 rounded-lg bg-card/30 border border-border/50"
    >
      <h3 className="text-base font-medium text-foreground/80 mb-1">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {project.tagline}
      </p>
      {project.overview && (
        <p className="text-sm text-muted-foreground/80 mb-3">
          {project.overview}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-1.5 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { scrollY } = useScroll();

  const mainProjects = getMainProjects();
  const academicProjects = getAcademicProjects();
  const academicMinorProjects = getAcademicMinorProjects();

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
              A collection of platforms, systems, and tools I&apos;ve built.
            </p>
          </motion.header>

          {/* Projects Section */}
          <section className="mb-16">
            <motion.h2
              className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              Projects
            </motion.h2>
            <div className="space-y-4">
              {mainProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </section>

          {/* Academic Projects Section */}
          {academicProjects.length > 0 && (
            <section className="mb-16">
              <motion.h2
                className="text-sm font-mono uppercase tracking-widest text-muted-foreground/70 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                Academic Projects
              </motion.h2>
              <div className="space-y-4">
                {academicProjects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Other Academic Systems Section (no own pages, highly de-emphasized) */}
          {academicMinorProjects.length > 0 && (
            <section className="pt-8 border-t border-border/30">
              <motion.h2
                className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Other Academic Systems
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {academicMinorProjects.map((project, index) => (
                  <AcademicMinorCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            </section>
          )}
        </Container>

        <Footer />
      </div>
    </main>
  );
}
