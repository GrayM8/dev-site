import React from "react";
import { notFound } from "next/navigation";
import { getProjectsWithPages } from "@/content/projects";
import { ProjectClient } from "./ProjectClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectsWithPages().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectsWithPages().find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Projects`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectsWithPages().find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}
