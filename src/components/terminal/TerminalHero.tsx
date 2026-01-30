"use client";

import React, { useState, useEffect } from "react";
import { motion, useTransform, MotionValue, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Download } from "lucide-react";

interface TerminalHeroProps {
  scrollY: MotionValue<number>;
  alwaysHeader?: boolean;
}

export function TerminalHero({ scrollY, alwaysHeader = false }: TerminalHeroProps) {
  const [isWhoamiDone, setIsWhoamiDone] = useState(alwaysHeader);
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [isHeaderMode, setIsHeaderMode] = useState(alwaysHeader);
  
  // Animation Phases
  const [headerPhase, setHeaderPhase] = useState<"boot" | "nav">(alwaysHeader ? "nav" : "boot");
  const [leftPhase, setLeftPhase] = useState<"running" | "role">(alwaysHeader ? "role" : "running");
  const [rightPhase, setRightPhase] = useState<"active" | "resume">(alwaysHeader ? "active" : "active"); // Status usually active initially

  // --- Scroll Mappings (Pixels) ---
  // 0 - 500px: Type "npm run dev"
  // 500 - 700px: Morph to header
  
  const commandLength = useTransform(scrollY, [0, 500], [0, 11]); // "npm run dev"
  
  // Layout Transforms for Smooth Morph
  const marginTop = useTransform(scrollY, [500, 700], [alwaysHeader ? "0vh" : "50vh", "0vh"]);
  const y = useTransform(scrollY, [500, 700], [alwaysHeader ? "0%" : "-50%", "0%"]);
  const maxWidth = useTransform(scrollY, [500, 700], [alwaysHeader ? "100vw" : "46rem", "100vw"]); 
  const borderRadius = useTransform(scrollY, [500, 700], [alwaysHeader ? 0 : 12, 0]);
  
  // Physical / 3D Transforms
  const rotation = useTransform(scrollY, [0, 500], [alwaysHeader ? 0 : 1, 0]); 
  const chassisY = useTransform(scrollY, [500, 700], [alwaysHeader ? 0 : 12, 0]); 
  const chassisOpacity = useTransform(scrollY, [500, 650], [alwaysHeader ? 0 : 1, 0]); 
  
  // Opacity Transforms for Content Switching
  const heroContentOpacity = useTransform(scrollY, [500, 600], [alwaysHeader ? 0 : 1, 0]);
  const headerContentOpacity = useTransform(scrollY, [600, 700], [alwaysHeader ? 1 : 0, 1]);
  
  // State for DOM switching
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (alwaysHeader) return; // Prevent scroll interaction if forced
    if (latest > 600 && !isHeaderMode) setIsHeaderMode(true);
    if (latest <= 600 && isHeaderMode) {
      setIsHeaderMode(false);
      // Reset all phases
      setHeaderPhase("boot");
      setLeftPhase("running");
      setRightPhase("active");
    }
  });

  // Header Animation Sequence
  useEffect(() => {
    if (alwaysHeader) return; // Skip sequence if already header
    if (isHeaderMode) {
      const t1 = setTimeout(() => setHeaderPhase("nav"), 2000);
      const t2 = setTimeout(() => setLeftPhase("role"), 3000);
      const t3 = setTimeout(() => setRightPhase("resume"), 4000);
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isHeaderMode, alwaysHeader]);

  // Initial "whoami" sequence
  useEffect(() => {
    if (alwaysHeader) return;
    let isMounted = true;
    
    const sequence = async () => {
      const cmd = "whoami";
      for (let i = 1; i <= cmd.length; i++) {
        if (!isMounted) return;
        setLines([<div key="cmd" className="flex items-center"><span className="text-accent mr-2">➜</span><span className="text-blue-400 mr-2">~</span>{cmd.slice(0, i)}</div>]);
        await new Promise(r => setTimeout(r, 50));
      }
      
      if (!isMounted) return;
      await new Promise(r => setTimeout(r, 300));

      if (isMounted) {
        setLines(prev => [
          ...prev,
          <div key="output" className="mt-12 mb-12 flex items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted border-2 border-accent/20 flex items-center justify-center overflow-hidden relative shadow-lg">
               <User className="w-10 h-10 text-muted-foreground/50" />
               <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
             </div>
             <div className="text-left">
               <div className="text-xl md:text-3xl font-bold text-foreground tracking-tight">Hey, I'm Gray Marshall.</div>
               <div className="text-muted-foreground mt-2 text-sm md:text-base font-medium">Software Engineer & Full-Stack @ LHRE</div>
               <div className="text-muted-foreground/80 text-sm md:text-base">CS @ UT Austin • Co-Founder @ LSR</div>
             </div>
          </div>,
          <div key="spacer" className="h-4" />
        ]);
        setIsWhoamiDone(true);
      }
    };

    sequence();
    return () => { isMounted = false; };
  }, []);

  const [typedCommand, setTypedCommand] = useState("");
  useMotionValueEvent(commandLength, "change", (latest) => {
    const text = "npm run dev";
    setTypedCommand(text.slice(0, Math.round(latest)));
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.div 
      className="relative z-50 w-full"
      style={{
        marginTop,
        y,
        maxWidth,
        perspective: "1000px" // Enable 3D space
      }}
    >
      {/* 3D Container */}
      <motion.div 
        style={{ rotateX: rotation, transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        
        {/* Base Layer (Chassis) - The "Thickness" */}
        <motion.div
          className="absolute inset-0 bg-[#050505] shadow-2xl z-0"
          style={{
            borderRadius,
            y: chassisY,
            x: -6, // Shift left for visual weight
            opacity: chassisOpacity,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)" // Heavy manual shadow
          }}
        />

        {/* Energy Border Glow - matches LaserFlow */}
        <motion.div
          className="absolute -inset-[1px] z-[5] rounded-xl"
          style={{
            borderRadius,
            opacity: heroContentOpacity,
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(99, 102, 241, 0.1) 100%)',
            filter: 'blur(1px)',
          }}
        />
        <motion.div
          className="absolute -inset-[2px] z-[4] rounded-xl energy-border-glow"
          style={{
            borderRadius,
            opacity: heroContentOpacity,
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(99, 102, 241, 0.05) 100%)',
            filter: 'blur(4px)',
          }}
        />
        <motion.div
          className="absolute -inset-[4px] z-[3] rounded-xl"
          style={{
            borderRadius,
            opacity: heroContentOpacity,
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.02) 100%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Top Layer (Face) - The Terminal */}
        <motion.div
          className={cn(
            "relative z-10 bg-[#101010] overflow-hidden transition-colors",
            "shadow-xl ring-1 ring-white/5 border-t border-t-white/10 border-b border-b-black/80",
            isHeaderMode ? "border-b border-border" : ""
          )}
          style={{
            borderRadius,
          }}
        >
          {/* Window Controls (Fade out) */}
          <motion.div 
            className={cn("flex items-center px-5 py-4 bg-muted/10 border-b border-white/5", isHeaderMode && "hidden")}
            style={{ opacity: heroContentOpacity }}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <div className="ml-4 text-xs text-muted-foreground font-mono">bash — user@dev-portfolio</div>
          </motion.div>

          {/* Hero Content (Increased padding) */}
          <motion.div 
            className={cn("p-8 font-mono text-sm md:text-base", isHeaderMode ? "hidden" : "block")}
            style={{ opacity: heroContentOpacity }}
          >
            {lines}
            {isWhoamiDone && (
              <div className="flex items-center mt-2">
                <span className="text-accent mr-2">➜</span>
                <span className="text-blue-400 mr-2">~</span>
                <span>{typedCommand}</span>
                <span className="inline-block w-2.5 h-5 bg-accent ml-1 animate-pulse" />
              </div>
            )}
          </motion.div>

          {/* Header Mode Content */}
          <motion.div 
            className={cn("flex items-center justify-between px-6 h-16 w-full max-w-5xl mx-auto relative", !isHeaderMode && "hidden")}
            style={{ opacity: headerContentOpacity }}
          >
            {/* Left: Identity */}
            <div 
              className="flex items-center gap-3 relative z-10 w-[200px] cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <div className="w-8 h-8 rounded bg-muted border border-border flex items-center justify-center text-accent shrink-0 transition-transform group-hover:scale-105">
                  <span className="font-bold text-xs">GM</span>
                </div>
                <div className="hidden sm:block overflow-hidden h-8 flex flex-col justify-center">
                  <div className="font-bold text-sm leading-none transition-colors group-hover:text-accent">Gray Marshall</div>
                  <AnimatePresence mode="wait">
                    {leftPhase === "running" ? (
                      <motion.div
                        key="running"
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[10px] text-muted-foreground font-mono"
                      >
                        npm run dev: running...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="role"
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-[10px] text-accent font-medium"
                      >
                        Full Stack Developer
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </div>

            {/* Center: Animated Sequence */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[200px] sm:max-w-md flex justify-center z-0">
              <AnimatePresence mode="wait">
                {headerPhase === "boot" ? (
                  <motion.div 
                    key="boot"
                    className="flex flex-col items-center justify-center font-mono text-xs"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-muted-foreground whitespace-nowrap">Local: <span className="text-foreground">http://localhost:3000</span></div>
                    <div className="text-accent mt-0.5 text-[10px]">✓ Ready in 800ms</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="nav"
                    className="flex gap-4 sm:gap-6 text-sm font-medium"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      onClick={() => scrollToSection("about")}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      About
                    </button>
                    <button
                      onClick={() => scrollToSection("featured-projects")}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => scrollToSection("experience")}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      Experience
                    </button>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      Contact
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Status */}
            <div className="flex items-center justify-end gap-4 text-xs font-mono text-muted-foreground relative z-10 w-[200px]">
              <AnimatePresence mode="wait">
                {rightPhase === "active" ? (
                  <motion.div
                    key="active"
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="hidden sm:inline">Server Active</span>
                  </motion.div>
                ) : (
                  <motion.a
                    key="resume"
                    href="/resume.pdf"
                    target="_blank"
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors cursor-pointer group"
                  >
                    <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline font-medium">Resume</span>
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        
        </motion.div>
      </motion.div>
    </motion.div>
  );
}