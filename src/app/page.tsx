"use client";

import React, { useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { TerminalHero } from "@/components/terminal/TerminalHero";
import { About } from "@/components/sections/About";
import { Systems } from "@/components/sections/Systems";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { ContactBar } from "@/components/sections/ContactBar";
import { Footer } from "@/components/sections/Footer";
import Galaxy from "@/components/background/Galaxy";
import LaserFlow from "@/components/terminal/LaserFlow";

export default function Home() {
  const { scrollY } = useScroll();
  
  // Content Reveal: Remains invisible until the terminal command (0-500px) 
  // and morph (500-700px) are mostly complete.
  const contentOpacity = useTransform(scrollY, [600, 850], [0, 1]);

  // LaserFlow fades out as terminal morphs to header
    const laserOpacity = useTransform(scrollY, [400, 650], [1, 0]);

  // After client-side navigation, Framer Motion's useScroll may hold a stale
  // scrollY from the previous route. Dispatching a scroll event after mount
  // forces it to re-read window.scrollY (which Next.js has already reset to 0).
  useEffect(() => {
    // Initial sync
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    
    // Backup sync after a short delay to ensure Lenis and Next.js are done
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-[250vh] bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-accent-foreground">

        {/* LaserFlow Effect - from top of screen to centered terminal's top edge */}
        {/* Terminal center is at 50vh, terminal is ~280px tall, so top edge is at 50vh - 140px */}
        <motion.div
            className="fixed inset-x-0 top-0 z-40 pointer-events-none"
            style={{
                height: 'calc(50vh - 100px)',
                opacity: laserOpacity
            }}
        >
            <LaserFlow
                key="laser-flow-home"
                color="#6366f1"
                horizontalBeamOffset={0}
                verticalBeamOffset={-0.30}
                verticalSizing={1.8}
                horizontalSizing={0.5}
                wispDensity={0.5}
                wispSpeed={5}
                wispIntensity={4}
                flowSpeed={0.3}
                flowStrength={0.25}
                fogIntensity={0.45}
                fogScale={0.4}
                decay={1.45}
                falloffStart={1.0}
            />
        </motion.div>

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Galaxy
          density={2}
          speed={0.2}
          twinkleIntensity={0.5}
          glowIntensity={0.15}
          rotationSpeed={0.00}
          hueShift={220}
        />
      </div>

      {/* Fixed Hero Layer */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* TerminalHero handles its own alignment via margins/layout animation */}
        <div className="w-full pointer-events-auto">
           <TerminalHero scrollY={scrollY} />
        </div>
      </div>

      {/* Scrollable Content Layer */}
      {/* Starts after the "boot" scroll distance. Opacity ensures it doesn't peek early. */}
      <motion.div 
        className="relative z-10 w-full" 
        style={{ marginTop: "95vh", opacity: contentOpacity }}
      >
        <About />
        <Systems />
        <Experience />
        <Education />
        <ContactBar />
        <Footer />
      </motion.div>
    </main>
  );
}
