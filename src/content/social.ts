export interface SocialLink {
  label: string;
  href: string;
  id: string;
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/GrayM8", id: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/graymarshall/", id: "linkedin" },
  { label: "Email", href: "mailto:matthew.gray.marshall@gmail.com", id: "email" }
];
