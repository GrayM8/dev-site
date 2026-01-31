"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { motion } from "framer-motion";
import { experiences, getPeriodString, getTenureString, getLogoPath } from "@/content/experience";

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

export function Experience() {
  return (
    <Section id="experience" className="relative z-10">
      <Container>
        <h2 className="text-2xl font-bold mb-12 text-foreground">Experience</h2>

        <div className="space-y-10">
          {experiences.map((role, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-lg bg-card/30 border border-border/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded bg-muted/50 border border-white/5 flex items-center justify-center overflow-hidden relative">
                    {role.logo ? (
                      <Image
                        src={getLogoPath(role.logo)}
                        alt={`${role.org} logo`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-muted-foreground/40 font-mono">LOGO</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
                    <div className="text-accent">{role.org}</div>
                    {role.location && (
                      <div className="text-sm text-muted-foreground/60">{role.location}</div>
                    )}
                  </div>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="font-mono text-sm text-muted-foreground">
                    {getPeriodString(role.startDate, role.endDate)}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground/60">
                    {getTenureString(role.startDate, role.endDate)}
                  </div>
                </div>
              </div>

              {/* Impact Points */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {role.impact.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Skills Banner */}
              {role.skills && role.skills.length > 0 && (
                <SkillsBanner skills={role.skills} />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
