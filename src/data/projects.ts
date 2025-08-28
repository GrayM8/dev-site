export type Project = {
    title: string;
    blurb: string;
    tech: string[];
    link?: string;
    image?: string;
};

export const projects: Project[] = [
    {
        title: 'FSAE Telemetry Web Tool',
        blurb: 'Real-time telemetry ingestion, data monitoring, and intuitive labeling for LHR-E. Built for trackside operations with synchronous & collaberative data tools, live-tuning, and over-the-air firmware flashing.',
        tech: ['Python', 'JavaScript', 'Flask', 'MQTT', 'Docker', 'JSON', 'PostgreSQL'],
        link: 'https://www.longhornracing.org/',
        image: '/images/lhrwebtool.svg',
    },
    {
        title: 'Personal Portfolio Website',
        blurb: 'Personal portfolio built from scratch to learn react and showcase projects, experience, and contact info. ' +
            'Designed for recruiters with responsive layout, dark/light theming, filterable project grid, and animated ' +
            'interactions using Framer Motion.',
        tech: ['React', 'TypeScript', 'CSS Modules', 'CRA', 'Vercel', 'npm'],
        link: 'https://github.com/GrayM8/dev-site',
        image: '/images/og-image.svg',
    },
];