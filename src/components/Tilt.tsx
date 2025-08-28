import React, { useRef } from 'react';

type Props = React.PropsWithChildren<{
    maxTiltDeg?: number;   // e.g., 4
    hoverLift?: number;    // e.g., 4px
    className?: string;
}>;

export default function Tilt({ children, maxTiltDeg = 6, hoverLift = 4, className }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0..1
        const y = (e.clientY - rect.top) / rect.height;   // 0..1
        const rx = (0.5 - y) * (maxTiltDeg * 2);          // -max..max
        const ry = (x - 0.5) * (maxTiltDeg * 2);
        el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        el.style.setProperty('--lift', `${hoverLift}px`);
    };

    const reset = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--lift', '0px');
    };

    return (
        <div
            ref={ref}
            className={`tilt ${className ?? ''}`}
            onMouseMove={onMove}
            onMouseLeave={reset}
            onMouseEnter={onMove}
        >
            {children}
        </div>
    );
}