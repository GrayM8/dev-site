import ThemeToggle from './ThemeToggle';
import { useEffect, useId, useState } from 'react'

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}

function HamburgerIcon({ open }: { open: boolean }) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            {open ? (
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
        </svg>
    );
}

type NavProps = {
    title: string;
    links: { label: string; href: string }[];
};

export default function Nav({ title, links }: NavProps) {
    const [open, setOpen] = useState(false);
    const menuId = useId();

    // Close on route hash change or window resize > 600
    useEffect(() => {
        const onHash = () => setOpen(false);
        const onResize = () => { if (window.innerWidth > 600) setOpen(false); };
        window.addEventListener('hashchange', onHash);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('hashchange', onHash);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <header className="panel" style={{ position: 'sticky', top: 0, zIndex: 10, marginBottom: 12 }}>
            <div className="container row nav-bar" style={{ justifyContent: 'space-between', padding: 12 }}>
                {/* Left Brand, Resume */}
                <div className="row" style={{ gap: 12 }}>
                    <strong>{title}</strong>
                    <a className="btn small row nav-resume" href="/Gray-Marshall-Resume.pdf" download style={{ gap: 6 }}>
                        <DownloadIcon />
                        Resume
                    </a>
                </div>

                {/* Right Links (Desktop) */}
                <nav className="row nav-links-desktop">
                {links.map((l) => (
                    <a key={l.href} href={l.href} className="small">{l.label}</a>
                ))}
                <ThemeToggle />
                </nav>

                {/* Right Hamburger (mobile) */}
                <button
                    className="btn small nav-burger"
                    aria-controls={menuId}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <HamburgerIcon open={open} />
                </button>
            </div>
            {/* Mobile menu panel */}
            <div
                id={menuId}
                className={`nav-mobile ${open ? 'open' : ''}`}
                // click a link closes menu
                onClick={(e) => {
                    const el = e.target as HTMLElement;
                    if (el.tagName === 'A') setOpen(false);
                }}
            >
                {links.map((l) => (
                    <a key={l.href} href={l.href} className="small">{l.label}</a>
                ))}
            </div>
        </header>
    );
}