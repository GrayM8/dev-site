import { useEffect, useRef, useState } from 'react';

type FilterBarProps = {
    allTags: string[];
    active: string | null;
    onChange: (next: string | null) => void;
};

const FADE = 12; // px fade width at edges

export default function FilterBar({ allTags, active, onChange }: FilterBarProps) {
    const railRef = useRef<HTMLDivElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    // Keep arrow state + fade in sync
    const updateArrows = () => {
        const el = railRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const left = scrollLeft > 1;
        const right = scrollLeft + clientWidth < scrollWidth - 1;

        setCanLeft(left);
        setCanRight(right);

        // Drive the CSS mask (0px = no fade)
        el.style.setProperty('--fade-left', left ? `${FADE}px` : '0px');
        el.style.setProperty('--fade-right', right ? `${FADE}px` : '0px');
    };

    useEffect(() => {
        updateArrows();
        const el = railRef.current;
        if (!el) return;

        const onScroll = () => updateArrows();
        el.addEventListener('scroll', onScroll, { passive: true });

        const ro = new ResizeObserver(updateArrows);
        ro.observe(el);

        // Translate vertical wheel to horizontal scroll
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                el.scrollBy({ left: e.deltaY, behavior: 'auto' });
            }
        };
        el.addEventListener('wheel', onWheel, { passive: true });

        return () => {
            el.removeEventListener('scroll', onScroll);
            el.removeEventListener('wheel', onWheel);
            ro.disconnect();
        };
    }, []);

    // Fixed-distance scroll (responsive step, clamped)
    const scrollByAmount = (dir: -1 | 1) => {
        const el = railRef.current;
        if (!el) return;

        // Step ≈ one viewport minus some padding; min step to ensure movement on tiny screens
        const step = Math.max(200, Math.floor(el.clientWidth - 80));
        const maxLeft = el.scrollWidth - el.clientWidth;

        const target = Math.max(0, Math.min(el.scrollLeft + dir * step, maxLeft));
        el.scrollTo({ left: target, behavior: 'smooth' });

        // Nudge arrow state to feel responsive even before 'scroll' fires
        // (scroll event will still correct it precisely)
        requestAnimationFrame(updateArrows);
    };

    return (
        <div className="filter-rail-wrap">
            {/* Left arrow */}
            <button
                type="button"
                className="carousel-btn left"
                aria-label="Scroll filters left"
                onClick={() => scrollByAmount(-1)}
                disabled={!canLeft}
            >
                <Chevron direction="left" />
            </button>

            {/* Scrollable rail (mask fade via CSS variables) */}
            <div
                ref={railRef}
                className="filter-rail"
                role="group"
                aria-label="Project filters"
            >
                <button
                    className="btn small"
                    onClick={() => onChange(null)}
                    aria-pressed={!active}
                    style={
                        !active
                            ? { background: 'var(--btn-active-bg)', color: 'var(--btn-active-text)' }
                            : undefined
                    }
                >
                    All
                </button>

                {allTags.map((t) => (
                    <button
                        key={t}
                        className="btn small"
                        onClick={() => onChange(active === t ? null : t)}
                        aria-pressed={active === t}
                        style={
                            active === t
                                ? { background: 'var(--btn-active-bg)', color: 'var(--btn-active-text)' }
                                : undefined
                        }
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Right arrow */}
            <button
                type="button"
                className="carousel-btn right"
                aria-label="Scroll filters right"
                onClick={() => scrollByAmount(1)}
                disabled={!canRight}
            >
                <Chevron direction="right" />
            </button>
        </div>
    );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
    const d = direction === 'left' ? 'M14 18l-6-6 6-6' : 'M10 6l6 6-6 6';
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}