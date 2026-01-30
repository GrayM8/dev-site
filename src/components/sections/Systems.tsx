"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "@/content/projects";

function SystemCard({ title, isEven }: { title: string; isEven: boolean }) {
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
    <div className="w-full md:w-1/2 perspective-[1200px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "w-full aspect-video bg-[#101010] border border-white/10 rounded-lg shadow-2xl relative overflow-hidden group cursor-pointer"
        )}
        style={{ 
          rotateX, 
          rotateY, 
          scale: scaleSpring,
          transformStyle: "preserve-3d" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-mono text-sm pointer-events-none">
          [ System Preview: {title} ]
        </div>
      </motion.div>
    </div>
  );
}

export function Systems() {
  return (
    <Section id="systems">
      <Container>
        <h2 className="text-2xl font-bold mb-16 text-foreground">Systems</h2>
        
        <div className="space-y-24 md:space-y-32">
          {projects.map((system, index) => {
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
                <SystemCard title={system.title} isEven={isEven} />

                {/* Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{system.title}</h3>
                    <p className="text-lg text-accent font-medium">{system.tagline}</p>
                  </div>

                  <ul className="space-y-3 text-muted-foreground">
                    {system.description.map((item, i) => (
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
                       View System <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                     </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}