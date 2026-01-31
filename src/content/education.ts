export interface EducationInfo {
  school: string;
  degree: string;
  location?: string;
  startDate: Date;
  endDate?: Date; // undefined means "Present" or expected graduation
  expectedGraduation?: Date;
  coursework?: string[];
  skills?: string[];
  /** Filename of the logo (e.g., "university-logo.png"). Logos are stored in /public/logos/ */
  logo?: string;
}

/** Helper to get the full logo path */
export function getLogoPath(filename: string): string {
  return `/logos/${filename}`;
}

/** Calculate period string from dates */
export function getEducationPeriodString(startDate: Date, endDate?: Date): string {
  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const startStr = formatDate(startDate);
  const endStr = endDate ? formatDate(endDate) : "Present";
  return `${startStr} — ${endStr}`;
}

export const education: EducationInfo = {
  school: "The University of Texas at Austin",
  degree: "Bachelor of Science - BS, Computer Science",
  location: "Austin, Texas",
  startDate: new Date(2024, 7, 1), // August 2024
  expectedGraduation: new Date(2028, 4, 1), // May 2028
  coursework: [
    "Data Structures",
    "Operating Systems",
    "Algorithms & Complexity",
    "Computer Architecture",
    "Cloud Computing",
    "Machine Learning I"
  ],
  skills: [
    "Data Structures",
    "Operating Systems",
    "Computer Architecture",
    "Cloud Computing",
    "Machine Learning",
    "Amazon EC2",
    "Test-Driven Development",
    "Java",
    "Python (Programming Language)",
    "Git",
    "Software Development",
    "C (Programming Language)"
  ],
  logo: "texas.png"
};
