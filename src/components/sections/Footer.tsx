"use client";

import React, { useRef, useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { socialLinks } from "@/content/social";
import { motion } from "framer-motion";

const skills = [
  "Full-Stack Development",
  "Distributed Systems",
  "Software Development",
  "TypeScript",
  "Python",
  "Web Application Development",
  "Real-time Data Acquisition",
  "Telemetry",
  "Data Visualization",
  "Reliability Engineering",
  "APIs",
  "Data Structures",
  "Operating Systems",
  "Computer Architecture",
  "Cloud Computing",
  "SQL",
  "Git",
  "Machine Learning",
  "Embedded Systems",
  "Time Series Analysis",
  "Performance Analysis",
  "Software Systems Engineering",
  "Technical Leadership",
  "React.js",
  "Next.js",
  "Digital Authentication",
  "Electronic Payments",
  "SEO",
  "Java",
  "JavaScript",
  "C",
  "Tailwind CSS",
  "PostgreSQL",
  "Amazon EC2",
  "MQTT",
  "Test-Driven Development",
  "Cross-functional Collaboration",
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Adaptability",
];

// Split skills into two rows
const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
const secondRow = skills.slice(Math.ceil(skills.length / 2));

function InfiniteBanner({
  items,
  direction = "left",
  duration = 50
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    if (firstSetRef.current) {
      setSetWidth(firstSetRef.current.offsetWidth);
    }
  }, [items]);

  const animateX = direction === "left"
    ? [0, -setWidth]
    : [-setWidth, 0];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex w-fit"
        animate={setWidth > 0 ? { x: animateX } : undefined}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {/* First set */}
        <div ref={firstSetRef} className="flex gap-x-8 shrink-0 pr-8">
          {items.map((skill, idx) => (
            <span
              key={`a-${idx}`}
              className="text-sm font-mono text-muted-foreground/50 shrink-0 whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-x-8 shrink-0 pr-8">
          {items.map((skill, idx) => (
            <span
              key={`b-${idx}`}
              className="text-sm font-mono text-muted-foreground/50 shrink-0 whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      {/* Skills Banners */}
      <div className="relative py-8 overflow-hidden">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        <div className="space-y-4">
          <InfiniteBanner items={firstRow} direction="left" duration={90} />
          <InfiniteBanner items={secondRow} direction="right" duration={100} />
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-8 border-t border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">Gray Marshall</span> — Full Stack Engineer
            </div>

            <div className="flex gap-6">
              <span>© {new Date().getFullYear()}</span>
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
