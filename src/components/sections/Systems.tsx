"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects, getProjectImagePath } from "@/content/projects";
import CardSwap, { Card } from "@/components/ui/CardSwap";

interface SystemCardProps {
  title: string;
  isEven: boolean;
  className?: string;
  image?: string;
}

export function SystemCard({ title, isEven, className, image }: SystemCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Default resting angles
  const defaultRotateY = isEven ? 12 : -12;
  const defaultRotateX = -6;

  // Motion values
  const targetRotateX = useMotionValue(defaultRotateX);
  const targetRotateY = useMotionValue(defaultRotateY);
  const scale = useMotionValue(1);

  // Smooth springs
  const rotateX = useSpring(targetRotateX, { stiffness: 300, damping: 20 });
  const rotateY = useSpring(targetRotateY, { stiffness: 300, damping: 20 });
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Normalize mouse position (-0.5 to 0.5)
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    // Calculate tilt (Max +/- 15deg swing)
    targetRotateY.set(xPct * 30);
    targetRotateX.set(yPct * -30);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    targetRotateX.set(defaultRotateX);
    targetRotateY.set(defaultRotateY);
    scale.set(1);
  };

  return (
    <div className={cn("w-full md:w-1/2 perspective-[1200px]", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full bg-[#101010] border border-white/10 rounded-lg shadow-2xl relative overflow-hidden group cursor-pointer"
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: "preserve-3d"
        }}
      >
        {image ? (
          <Image
            src={getProjectImagePath(image)}
            alt={title}
            fill
            className="object-cover pointer-events-none"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-mono text-sm pointer-events-none">
              [ Project Preview: {title} ]
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export function Systems() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <Section id="featured-projects">
      <Container>
        <h2 className="text-2xl font-bold mb-16 text-foreground">Featured Projects</h2>

        <div className="space-y-24 md:space-y-32">
          {featuredProjects.map((system, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={system.slug}
                className={cn(
                  "flex flex-col gap-8 md:gap-16 items-center",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Interactive Angled Screen */}
                <SystemCard title={system.title} isEven={isEven} image={system.image} className="aspect-video" />

                {/* Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{system.title}</h3>
                    <p className="text-lg text-accent font-medium">{system.tagline}</p>
                  </div>

                  <ul className="space-y-3 text-muted-foreground">
                    {system.homeBullets?.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                     <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-mono text-muted-foreground/60 mb-6">
                       {system.tech.map((t) => (
                         <span key={t}>#{t}</span>
                       ))}
                     </div>

                     <Link
                       href={`/projects/${system.slug}`}
                       className="inline-flex items-center text-foreground font-medium hover:text-accent transition-colors group"
                     >
                       View Project <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                     </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Section with Card Swap */}
        <motion.div
          className="mt-24 pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Text and Link - Left */}
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-foreground">
                More Projects
              </h3>
              <p className="text-muted-foreground max-w-md">
                Explore the full collection of tools, experiments, and applications.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center text-lg text-foreground hover:text-accent transition-colors group mt-2"
              >
                View all projects <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Card Swap Display - Right */}
            <div className="relative h-[180px] w-full md:w-[320px] shrink-0 hidden md:block">
              <div
                className="absolute -inset-20"
                style={{
                  maskImage: 'radial-gradient(ellipse 80% 70% at 55% 45%, black 50%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 55% 45%, black 50%, transparent 90%)'
                }}
              >
                <div className="absolute top-20 left-10 right-28 bottom-20">
                  <CardSwap
                width={200}
                height={125}
                cardDistance={30}
                verticalDistance={30}
                delay={4000}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
              >
                {projects
                  .filter((p) => p.image)
                  .slice(0, 5)
                  .map((project) => (
                    <Card key={project.slug}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getProjectImagePath(project.image!)}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <h4 className="text-xs font-medium text-white truncate">
                            {project.title}
                          </h4>
                          <p className="text-[10px] text-white/60 truncate">
                            {project.tagline}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </CardSwap>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}