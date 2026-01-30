"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { motion } from "framer-motion";
import { education } from "@/content/education";

export function Education() {
  return (
    <Section id="education">
      <Container className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-12 text-foreground">Education</h2>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-4 md:gap-12 border-l-2 border-white/5 pl-6 md:pl-0 md:border-l-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full md:w-1/3 shrink-0 md:text-right md:border-r-2 md:border-white/5 md:pr-12">
            <div className="font-mono text-sm text-muted-foreground">{education.school}</div>
            <div className="text-xs text-muted-foreground/60 mt-1">Class of {education.classOf}</div>
          </div>
          
          <div className="w-full md:w-2/3 flex gap-4 md:gap-6">
             <div className="w-12 h-12 shrink-0 rounded bg-muted/50 border border-white/5 flex items-center justify-center text-[10px] text-muted-foreground/40 font-mono mt-1">
               LOGO
             </div>
             <div className="flex-1">
               <h3 className="text-lg font-semibold text-foreground">{education.degree}</h3>
               <div className="text-accent text-sm md:hidden">{education.school}</div>
               <p className="text-muted-foreground mt-2">
                 {education.focus}
               </p>
             </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
