export type Education = {
    degree: string;
    school: string;
    when: string;
    bullets?: string[];
    logo?: string;
};

export const education: Education[] = [
    {
        degree: 'B.S. Computer Science',
        school: 'The University of Texas at Austin',
        when: '2024 — 2028 (expected)',
        bullets: [
            'Relevant: Data Structures, Algorithms, Operating Systems',
            'Orgs: Longhorn Racing Electric (Telemetry), Longhorn Sim Racing, Longhorn Car Club',
        ],
        logo: '/logos/theuniversityoftexasataustin__logo.jfif',
    },
];