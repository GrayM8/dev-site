"use client";

import React, { useRef, useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { motion } from "framer-motion";
import { education, getEducationPeriodString } from "@/content/education";

function SkillsBanner({ skills }: { skills: string[] }) {
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    if (firstSetRef.current) {
      setSetWidth(firstSetRef.current.offsetWidth);
    }
  }, [skills]);

  return (
    <div className="mt-6 overflow-hidden">
      <div className="relative">
        {/* Subtle gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[rgb(10,10,10)] via-[rgba(10,10,10,0.5)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[rgb(10,10,10)] via-[rgba(10,10,10,0.5)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex w-fit"
          animate={setWidth > 0 ? { x: [0, -setWidth] } : undefined}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {/* First set */}
          <div ref={firstSetRef} className="flex gap-3 shrink-0 pr-3">
            {skills.map((skill, idx) => (
              <span
                key={`a-${idx}`}
                className="inline-flex items-center px-3 py-1 text-xs font-mono text-accent/70 bg-accent/5 rounded-full border border-accent/10 shrink-0"
              >
                {skill}
              </span>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-3 shrink-0 pr-3">
            {skills.map((skill, idx) => (
              <span
                key={`b-${idx}`}
                className="inline-flex items-center px-3 py-1 text-xs font-mono text-accent/70 bg-accent/5 rounded-full border border-accent/10 shrink-0"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Education() {
  const periodString = getEducationPeriodString(education.startDate, education.expectedGraduation);

  return (
    <Section id="education">
      <Container>
        <h2 className="text-2xl font-bold mb-12 text-foreground">Education</h2>

        <motion.div
          className="p-6 rounded-lg bg-card/30 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded bg-muted/50 border border-white/5 flex items-center justify-center text-[10px] text-muted-foreground/40 font-mono">
                LOGO
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{education.degree}</h3>
                <div className="text-accent">{education.school}</div>
                {education.location && (
                  <div className="text-sm text-muted-foreground/60">{education.location}</div>
                )}
              </div>
            </div>
            <div className="sm:text-right shrink-0">
              <div className="font-mono text-sm text-muted-foreground">
                {periodString}
              </div>
              {education.expectedGraduation && (
                <div className="font-mono text-xs text-muted-foreground/60">
                  Expected {education.expectedGraduation.getFullYear()}
                </div>
              )}
            </div>
          </div>

          {/* Coursework */}
          {education.coursework && education.coursework.length > 0 && (
            <div className="text-sm">
              <div className="text-muted-foreground/60 mb-1">Relevant Coursework</div>
              <div className="text-muted-foreground">
                {education.coursework.join(" • ")}
              </div>
            </div>
          )}

          {/* Skills Banner */}
          {education.skills && education.skills.length > 0 && (
            <SkillsBanner skills={education.skills} />
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
