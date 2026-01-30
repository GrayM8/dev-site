"use client";

import React, { useState, useEffect } from "react";
import { motion, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface TerminalHeroProps {
  scrollY: MotionValue<number>;
}

export function TerminalHero({ scrollY }: TerminalHeroProps) {
  const [isWhoamiDone, setIsWhoamiDone] = useState(false);
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [isHeaderMode, setIsHeaderMode] = useState(false);

  // --- Scroll Mappings (Pixels) ---
  // 0 - 500px: Type "npm run dev"
  // 500 - 700px: Morph to header
  
  const commandLength = useTransform(scrollY, [0, 500], [0, 11]); // "npm run dev"
  
  // Layout Transforms for Smooth Morph
  const marginTop = useTransform(scrollY, [500, 700], ["50vh", "0vh"]);
  const y = useTransform(scrollY, [500, 700], ["-50%", "0%"]);
  const maxWidth = useTransform(scrollY, [500, 700], ["42rem", "100vw"]);
  const borderRadius = useTransform(scrollY, [500, 700], [10, 0]);
  
  // Opacity Transforms for Content Switching
  // Fade out window controls & hero content
  const heroContentOpacity = useTransform(scrollY, [500, 600], [1, 0]);
  // Fade in header content
  const headerContentOpacity = useTransform(scrollY, [600, 700], [0, 1]);
  
  // State for DOM switching (pointer events, visibility toggles)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 600 && !isHeaderMode) setIsHeaderMode(true);
    if (latest <= 600 && isHeaderMode) setIsHeaderMode(false);
  });

  // Initial "whoami" sequence
  useEffect(() => {
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
          <div key="output" className="mt-4 mb-6 flex items-start gap-6 animate-in fade-in slide-in-from-left-2 duration-500">
             <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded bg-muted border border-border flex items-center justify-center overflow-hidden relative">
               <User className="w-10 h-10 text-muted-foreground/50" />
               <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
             </div>
             <div>
               <div className="text-xl md:text-2xl font-bold text-foreground">Gray Marshall</div>
               <div className="text-muted-foreground mt-1 text-sm md:text-base">Full Stack Engineer</div>
               <div className="text-accent/80 text-xs font-mono mt-2">@graymarshall</div>
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

  return (
    <motion.div 
      className={cn(
        "bg-[#101010] border-border overflow-hidden relative z-50 transition-colors shadow-2xl",
        isHeaderMode ? "border-b" : "border"
      )}
      style={{
        marginTop,
        y,
        maxWidth,
        width: "100%", // Always take full available width up to maxWidth
        borderRadius,
      }}
    >
      {/* Window Controls (Fade out) */}
      <motion.div 
        className={cn("flex items-center px-4 py-3 bg-muted/10 border-b border-border/50", isHeaderMode && "hidden")}
        style={{ opacity: heroContentOpacity }}
      >
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
          <div className="w-3 h-3 rounded-full bg-green-500/20" />
        </div>
        <div className="ml-4 text-xs text-muted-foreground font-mono">bash — user@dev-portfolio</div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className={cn("p-6 font-mono text-sm md:text-base", isHeaderMode ? "hidden" : "block")}
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
        className={cn("flex items-center justify-between px-6 h-16 w-full max-w-5xl mx-auto", !isHeaderMode && "hidden")}
        style={{ opacity: headerContentOpacity }}
      >
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-muted border border-border flex items-center justify-center text-accent">
              <span className="font-bold text-xs">GM</span>
            </div>
            <div>
              <div className="font-bold text-sm leading-none">Gray Marshall</div>
              <div className="text-[10px] text-muted-foreground font-mono">npm run dev: running...</div>
            </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">Server Active</span>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}