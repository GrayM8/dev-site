import { useEffect, useState } from 'react';

function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
    const [dark, setDark] = useState<boolean>(() => {
        // init from localStorage or system
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') return true;
        if (stored === 'light') return false;
        return getSystemPrefersDark();
    });

    // Apply/remove the class on <body>
    useEffect(() => {
        document.body.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    // React to system changes (only when not explicitly chosen)
    useEffect(() => {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            const stored = localStorage.getItem('theme');
            if (!stored) setDark(e.matches);
        };
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return (
        <button
            className="btn small"
            aria-pressed={dark}
            onClick={() => setDark((d) => !d)}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {dark ? 'Dark • on' : 'Dark • off'}
        </button>
    );
}