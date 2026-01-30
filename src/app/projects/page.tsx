import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { projects } from "@/content/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Projects | Dev Portfolio",
  description: "A collection of my work.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 md:py-20">
      <Container>
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-6 group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            A selection of open source tools, experiments, and production applications.
          </p>
        </div>

        <Section className="py-0 md:py-0">
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="group block p-6 md:p-8 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-medium group-hover:text-accent transition-colors">
                        {project.title}
                      </h2>
                      <span className="text-xs font-mono px-2 py-0.5 rounded border border-border text-muted-foreground">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-mono text-accent/80 bg-accent/5 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:text-right text-sm text-muted-foreground font-mono mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Project ➜
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </Container>
    </main>
  );
}
