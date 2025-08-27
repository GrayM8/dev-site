import { useMemo, useState, useEffect } from 'react';
import Nav from './components/Nav';
import ProjectCard from './components/ProjectCard';
import FilterBar from './components/FilterBar';
import TimelineItem from './components/TimelineItem';
import { experience } from './data/experience';
import Contact from './components/Contact';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projects } from './data/projects';
import EducationItem from './components/EducationItem';
import { education } from './data/education';
import Footer from './components/Footer';
import { fadeSlide } from './utils/motion';
import { Analytics } from '@vercel/analytics/react';


export default function App() {
    const [tag, setTag] = useState<string | null>(null);

    // Collect unique tags once
    const allTags = useMemo(() => {
        const s = new Set<string>();
        projects.forEach(p => p.tech.forEach(t => s.add(t)));
        return Array.from(s).sort();
    }, []);

    // Derive filtered list from state
    const filtered = useMemo(
        () => (!tag ? projects : projects.filter(p => p.tech.includes(tag))),
        [tag]
    );

    // (Step 4) Effect: update document title when tag changes
    useEffect(() => {
        document.title = tag ? `Gray • ${tag} projects` : 'Gray • Projects';
    }, [tag]);

    // Highlight nav link for the section in view
    useEffect(() => {
        // IDs must match your sections & nav hrefs
        const sectionIds = ['about', 'projects', 'experience', 'education', 'contact'];
        const sections = sectionIds
            .map(id => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el);

        const navLinks = Array.from(
            document.querySelectorAll('header nav a')
        ) as HTMLAnchorElement[];

        // helper: set active on the matching href
        const setActive = (id: string | null) => {
            navLinks.forEach(a => {
                const match = id && a.getAttribute('href') === `#${id}`;
                a.classList.toggle('active', !!match);
                if (match) a.setAttribute('aria-current', 'page');
                else a.removeAttribute('aria-current');
            });
        };

        // Observer favors the section near the middle of the viewport
        const io = new IntersectionObserver(
            (entries) => {
                // pick the most visible entry that’s intersecting
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible?.target?.id) setActive(visible.target.id);
            },
            {
                // Adjust for sticky header: treat the “center” as the active region
                root: null,
                rootMargin: '-40% 0px -55% 0px', // top/bottom margins carve out the active band
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach(s => io.observe(s));

        // highlight initial hash on load (e.g., direct link)
        if (window.location.hash) {
            const id = window.location.hash.replace('#', '');
            setActive(id);
            // optional: scroll to account for sticky header on hard loads
            // setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 0);
        }

        // also update on hashchange (e.g., clicking nav links)
        const onHash = () => setActive(window.location.hash.replace('#', '') || null);
        window.addEventListener('hashchange', onHash);

        return () => {
            io.disconnect();
            window.removeEventListener('hashchange', onHash);
        };
    }, []);

    const prefersReduced = Boolean(useReducedMotion());
    return (
        <>
            <Nav
                title="Gray Marshall"
                links={[
                    { label: 'About', href: '#about' },
                    { label: 'Projects', href: '#projects' },
                    { label: 'Experience', href: '#experience' },
                    { label: 'Education', href: '#education' },
                    { label: 'Contact', href: '#contact' },
                ]}
            />

            <div className="container stack">
                {/* Hero */}
                <section className="panel" style={{ padding: 16 }}>
                    <div className="row hero-row" style={{ alignItems: 'center' }}>
                        <div className="hero-left" style={{ flex: 1 }}>
                            <h1 className="h1">Hey, I’m Gray Marshall.</h1>
                            <p className="small">Software Engineer & Full-Stack @ LHRE • CS @ UT Austin • Co-Founder @ LSR</p>
                        </div>

                        {/* NEW: headshot on the right */}
                        <div className="hero-right">
                            <img
                                src="/images/headshot.jfif"
                                alt="Gray Marshall headshot"
                                className="hero-headshot"
                            />
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="stack">
                    <div className="panel" style={{ padding: 16 }}>
                        <h2 className="h2" style={{ margin: 0 }}>About</h2>
                        <p className="small" style={{ marginTop: 8, maxWidth: 720 }}>
                            I'm a second-year CS major translating raw race-car bytes into winning insights for UT Austin's Formula SAE EV Team. At Longhorn Racing I keep a JavaScript • Python • Flask • MQTT real-time ingest tool running and design TypeScript • T3 Stack systems for smarter recruiting. Comfortable with Java • Git • AWS EC2 • TDD, and more, I chase millisecond gains and steep learning curves. My mantra: Iterate • Improve • Deploy. Open to summer 2026 SWE internships—let’s connect!
                        </p>

                        {/* Quick facts */}
                        <div className="row" style={{ flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                            <span className="tag">Languages: TypeScript, Java, JavaScript, Python, C/C++, ARM Assembly</span>
                            <span className="tag">Interests: Telemetry, UI/UX, Full-Stack, Web Development</span>
                            <span className="tag">Tools: React, Vite/CRA, Docker, Git, AWS EC2, MQTT, Flask</span>
                            <span className="tag">Hobbies: Motorcycling, Coffee, Simracing, Cars</span>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" className="stack">
                    <div className="panel" style={{ padding: 16}}>
                        <div className="row"
                             style={{ justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
                        >
                            <div>
                                <h2 className="h2" style={{ marginBottom: 2 }}>Projects</h2>
                                <div className="small" style={{
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    color: 'var(--muted)',
                                    marginTop: 2,
                                    marginBottom: 2,
                                }}>
                                    Total {projects.length} • Showing {filtered.length}
                                </div>
                            </div>

                            <FilterBar allTags={allTags} active={tag} onChange={setTag} />
                        </div>

                        <motion.div layout className="grid" initial={false} style={{marginTop: 12}}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                {filtered.map((p) => (
                                    <motion.div key={p.title} {...fadeSlide(prefersReduced)} layout="position">
                                        <ProjectCard p={p} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                        {filtered.length === 0 && <p className="small">No projects found with this tech.</p>}
                    </div>
                </section>


                {/* Experience */}
                <section id="experience" className="stack">
                    <h2 className="h2">Experience</h2>
                    <div className="stack">
                        {experience.map((e) => (
                            <motion.div key={e.role} {...fadeSlide(prefersReduced)}>
                                <TimelineItem item={e} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section id="education" className="stack">
                    <h2 className="h2">Education</h2>
                    <div className="stack">
                        {education.map((ed) => (
                            <motion.div key={ed.degree} {...fadeSlide(prefersReduced)}>
                                <EducationItem item={ed} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="stack">
                    <h2 className="h2">Contact</h2>
                    <motion.div {...fadeSlide(prefersReduced)}>
                        <div className="panel" style={{ padding: 16 }}>
                            <Contact />
                        </div>
                    </motion.div>
                </section>
                <Footer />
            </div>
            <Analytics />
        </>
    );
}