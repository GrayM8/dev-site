import type { Transition } from 'framer-motion';

/** Shared cubic-bezier used across the site */
export const EASE: Transition['ease'] =
    [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Fade + slight slide up, runs once when tile enters viewport */
export const fadeSlide = (reduced: boolean) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-15% 0px -15% 0px' },
    transition: { duration: 0.28, ease: EASE } as Transition,
});

/** Optional: quick hover spring you can spread on motion elements */
export const hoverLift: Transition = {
    type: 'spring',
    stiffness: 420,
    damping: 30,
    mass: 0.5,
};