"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.sin((t * Math.PI) / 2),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Re-sync Lenis and scroll tracking after client-side navigation
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Tell Lenis to recalculate dimensions for the new page
    lenis.resize();

    // After the next frame (once Next.js scroll restoration is complete),
    // dispatch a scroll event so Framer Motion's useScroll() re-reads
    // the actual window.scrollY instead of a stale value from the previous page.
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}
