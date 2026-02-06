"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { projects, getProjectImagePath } from "@/content/projects";
import CardSwap, { Card } from "@/components/ui/CardSwap";

interface SystemCardProps {
  title: string;
  isEven: boolean;
  className?: string;
  image?: string;
  secondaryImages?: string[];
  video?: string;
}

export function SystemCard({ title, isEven, className, image, secondaryImages, video }: SystemCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollTiltX, setScrollTiltX] = useState(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic scroll-based tilt for mobile
  useEffect(() => {
    if (!isMobile || !ref.current) return;

    const updateScrollTilt = () => {
      if (!ref.current || isDragging) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate card center relative to viewport center (-0.5 to 0.5)
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const relativePosition = (cardCenter - viewportCenter) / viewportHeight;

      // Tilt based on position: cards at top have top closer, cards at bottom have bottom closer
      // Max tilt of ~12 degrees
      setScrollTiltX(relativePosition * 24);
    };

    updateScrollTilt();
    window.addEventListener('scroll', updateScrollTilt, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollTilt);
  }, [isMobile, isDragging]);

  // All images: main first, then secondaries
  const allImages = image ? [image, ...(secondaryImages || [])] : [];
  const imageCount = allImages.length;
  const hasMultipleImages = imageCount > 1;

  // Image rotation effect
  useEffect(() => {
    if (!hasMultipleImages) return;

    const mainDuration = 6000; // Main image shows for 6 seconds
    const secondaryDuration = 1500; // Secondary images show for 1.5 seconds each

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const scheduleNext = () => {
      const delay = currentIndex === 0 ? mainDuration : secondaryDuration;
      timeoutId = setTimeout(() => {
        currentIndex = (currentIndex + 1) % imageCount;
        setCurrentImageIndex(currentIndex);
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, [hasMultipleImages, imageCount]);

  // Default resting angles - mobile: dynamic vertical tilt based on scroll, no horizontal
  const defaultRotateY = isMobile ? 0 : (isEven ? 12 : -12);
  const defaultRotateX = isMobile ? scrollTiltX : -6;

  // Motion values
  const targetRotateX = useMotionValue(defaultRotateX);
  const targetRotateY = useMotionValue(defaultRotateY);
  const scale = useMotionValue(1);

  // Update tilt when scroll position changes (mobile) or when isMobile changes
  useEffect(() => {
    if (!isDragging) {
      targetRotateX.set(defaultRotateX);
      targetRotateY.set(defaultRotateY);
    }
  }, [isMobile, defaultRotateX, defaultRotateY, isDragging, targetRotateX, targetRotateY, scrollTiltX]);

  // Smooth springs
  const rotateX = useSpring(targetRotateX, { stiffness: 300, damping: 20 });
  const rotateY = useSpring(targetRotateY, { stiffness: 300, damping: 20 });
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return;
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
    if (isMobile) return;
    targetRotateX.set(defaultRotateX);
    targetRotateY.set(defaultRotateY);
    scale.set(1);
  };

  // Touch handlers for mobile drag
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
    scale.set(1.02);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || !ref.current || !dragStart.current) return;
    const touch = e.touches[0];
    const rect = ref.current.getBoundingClientRect();

    // Calculate drag delta relative to card size
    const deltaX = (touch.clientX - dragStart.current.x) / rect.width;
    const deltaY = (touch.clientY - dragStart.current.y) / rect.height;

    // Apply tilt based on drag (max +/- 20deg)
    targetRotateY.set(deltaX * 40);
    targetRotateX.set(deltaY * -40);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    dragStart.current = null;
    setIsDragging(false);
    targetRotateX.set(defaultRotateX);
    targetRotateY.set(defaultRotateY);
    scale.set(1);
  };

  const currentImage = allImages[currentImageIndex] || image;

  return (
    <div className={cn("w-full md:w-1/2 perspective-[1200px]", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full group cursor-pointer touch-none"
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="w-full h-full bg-[#101010] border border-white/10 rounded-lg shadow-2xl relative overflow-hidden">
          {video ? (
            <video
              src={getProjectImagePath(video)}
              autoPlay
              loop
              muted
              playsInline
              aria-label={`${title} demo`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          ) : currentImage ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={getProjectImagePath(currentImage)}
                  alt={title}
                  fill
                  className="object-cover pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-mono text-sm pointer-events-none">
                [ Project Preview: {title} ]
              </div>
            </>
          )}
        </div>
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
                <SystemCard
                  title={system.title}
                  isEven={isEven}
                  image={system.image}
                  secondaryImages={system.secondaryImages}
                  video={system.video}
                  className={system.video ? "aspect-[5/3]" : "aspect-video"}
                />

                {/* Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    {index === 0 && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-accent mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Flagship Project
                      </span>
                    )}
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
            {/* Card Swap Display - Above text on mobile, right on desktop */}
            <div className="relative h-[180px] w-full md:w-[320px] shrink-0 md:order-2">
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
                    {(() => {
                      // Collect media items - prioritize one from each project first
                      const mediaItems: { src: string; type: 'image' | 'video'; title: string; tagline: string }[] = [];

                      // First pass: one primary media per project (video or main image)
                      for (const project of projects) {
                        if (project.video) {
                          mediaItems.push({
                            src: project.video,
                            type: 'video',
                            title: project.title,
                            tagline: project.tagline
                          });
                        } else if (project.image) {
                          mediaItems.push({
                            src: project.image,
                            type: 'image',
                            title: project.title,
                            tagline: project.tagline
                          });
                        }
                      }

                      // Second pass: fill remaining slots with secondary images
                      if (mediaItems.length < 6) {
                        for (const project of projects) {
                          if (project.secondaryImages) {
                            for (const img of project.secondaryImages) {
                              if (mediaItems.length >= 6) break;
                              mediaItems.push({
                                src: img,
                                type: 'image',
                                title: project.title,
                                tagline: project.tagline
                              });
                            }
                          }
                          if (mediaItems.length >= 6) break;
                        }
                      }

                      return mediaItems.slice(0, 6).map((item, idx) => (
                        <Card key={`${item.src}-${idx}`}>
                          <div className="relative w-full h-full">
                            {item.type === 'video' ? (
                              <video
                                src={getProjectImagePath(item.src)}
                                autoPlay
                                loop
                                muted
                                playsInline
                                aria-label={`${item.title} demo`}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <Image
                                src={getProjectImagePath(item.src)}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            )}
                            <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                              <h4 className="text-xs font-medium text-white truncate">
                                {item.title}
                              </h4>
                              <p className="text-[10px] text-white/60 truncate">
                                {item.tagline}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ));
                    })()}
                  </CardSwap>
                </div>
              </div>
            </div>

            {/* Text and Link */}
            <div className="flex flex-col gap-4 md:order-1">
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
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}