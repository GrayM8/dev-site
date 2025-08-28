export type Experience = {
    role: string;
    org: string;
    when: string;
    bullets: string[];
    logo?: string;
};

export const experience: Experience[] = [
    {
        role: 'Telemetry Software Engineer | Electronics System',
        org: 'Longhorn Racing Electric (FSAE)',
        when: '2024 — Present',
        bullets: [
            'Built Flask/MQTT ingestion + React dashboard for real-time car data.',
            'Designed data labeling interface for trackside event tagging and analysis.',
        ],
        logo: '/logos/longhorn_racing_logo.jfif',
    },
    {
        role: 'Co‑Founder, Software & Digital Platforms Director',
        org: 'Longhorn Sim Racing Club (LSR)',
        when: '2025 — Present',
        bullets: [
            'Building recruiting/events site with modern TypeScript stack.',
            'Owned UX, authentication, and roster workflows.',
        ],
        logo: '/logos/longhorn_sim_racing_logo.jfif',
    },
];