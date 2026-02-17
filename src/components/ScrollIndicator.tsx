"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator({ scrollY }: { scrollY: MotionValue<number> }) {
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      style={{ opacity }}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-6 text-muted-foreground/60" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}
