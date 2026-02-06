import React from "react";
import type { Metadata } from "next";
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

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectsWithPages().find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  const description = project.metaDescription || project.overview || project.tagline;

  return {
    title: project.title,
    description,
    keywords: project.tech,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Gray Marshall`,
      description,
      url: `/projects/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Gray Marshall`,
      description,
    },
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
