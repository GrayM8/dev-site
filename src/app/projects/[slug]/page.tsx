import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { projects } from "@/content/projects";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Projects`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-12 md:py-20">
      <Container>
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <Section className="py-0 md:py-0 space-y-12">
          {/* Header */}
          <header className="border-b border-border pb-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
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
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
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
          </header>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              
              <div className="my-8 p-6 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-sm font-mono text-muted-foreground italic">
                  Note: This is a placeholder description. In a real application, 
                  this area would contain a detailed case study, screenshots, 
                  technical challenges, and architecture diagrams stored in MDX or a CMS.
                </p>
              </div>
            </div>

            {/* Sidebar / Metadata Placeholder */}
            <div className="space-y-8">
              <div className="p-6 rounded-lg bg-card border border-border">
                <h4 className="text-sm font-mono uppercase text-muted-foreground mb-4">Key Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">➜</span>
                    Feature one description
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">➜</span>
                    Another cool capability
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">➜</span>
                    Performance optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
