# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Architecture

Next.js 16 personal portfolio site using the App Router, React 19, and Tailwind CSS 4. The defining UX concept is a terminal that types `npm run dev`, then morphs into the site header as the user scrolls.

**React Compiler** is enabled (`reactCompiler: true` in next.config.ts). Never use `useMemo`, `useCallback`, or `React.memo` — the compiler handles optimization automatically.

**Path Alias**: `@/*` maps to `src/*`.

### Scroll-Driven Home Page (`src/app/page.tsx`)

The home page is built around scroll position (0–850px) controlling multiple Framer Motion transforms:

- **0–500px**: TerminalHero types the `npm run dev` command letter-by-letter
- **500–700px**: Terminal morphs to fixed header (margin, width, border-radius, 3D rotation)
- **600–850px**: Main content fades in; LaserFlow background fades out

Fixed layers (LaserFlow canvas, Galaxy starfield, TerminalHero) sit behind scrollable content that begins at `85vh` margin-top.

### TerminalHero (`src/components/terminal/TerminalHero.tsx`)

The most complex component. Operates in two modes swapped via opacity transforms:

- **Hero mode**: Centered terminal window with typing animation, window controls, headshot reveal
- **Header mode**: Fixed navbar with animated boot sequence — shows `localhost:3000` at 2s, navigation links at 3s, resume download button at 4s

### Content Data (`src/content/`)

All site content is stored as typed TypeScript arrays/objects:

- `projects.ts` — `Project[]` with slug-based routing (`/projects/[slug]`)
- `experience.ts` — `ExperienceRole[]` with date-based tenure calculations
- `education.ts` — `EducationInfo` with coursework
- `about.ts` — `AboutContent` with paragraphs and headshot path
- `social.ts` — `SocialLink[]`

Helper functions (`getImagePath()`, `getProjectImagePath()`, `getLogoPath()`, `getPeriodString()`, `getTenureString()`) handle path resolution and date formatting. Dates use JS 0-indexed months: `new Date(2024, 0, 15)` = January 15, 2024.

### Dynamic Project Pages (`src/app/projects/[slug]/`)

Uses `generateStaticParams()` for static generation and `generateMetadata()` for per-project SEO. The interactive UI is split into a client component (`ProjectClient.tsx`).

### Layout Components

- `Container` — Max-width wrapper (`max-w-5xl`) with responsive padding
- `Section` — Fade-in + slide-up animation with `delay` prop for staggered reveals

### Animation Libraries

- **Framer Motion** — Scroll transforms (`useScroll`, `useTransform`), layout animations, `AnimatePresence`
- **GSAP** — Available for complex timeline animations
- **Lenis** — Smooth scrolling provider (1.2s duration) wrapping the app in `SmoothScroll.tsx`
- **OGL** — Powers the LaserFlow 3D canvas (laser beams / wisps)
- **Three.js** — Powers the Galaxy starfield background

### Styling

Uses Tailwind CSS 4 with CSS variables (OKLch color space) defined in `globals.css`. The `cn()` utility from `@/lib/utils` merges Tailwind classes via `clsx` + `tailwind-merge`.

**Accent color**: Bright orange `#FF7A1A` — used sparingly per DESIGN.md rules (terminal cursor, command highlight, primary CTAs, hover/focus states, active nav indicators only). Never for large backgrounds, section headings, or repeated decorative elements.

### Scroll Anchor IDs

Sections use these IDs for navigation: `about`, `featured-projects`, `experience`, `education`, `contact`.

## Design System (DESIGN.md)

DESIGN.md is the authoritative source for all UI/UX decisions. Key constraints:

- **Dark + neutral** baseline; avoid pure black; use near-black/charcoal for depth
- **Motion**: Fade in/out, translate Y, subtle hover scale only. No bounce, parallax, floating elements, or typewriter effects outside the terminal. Transitions 150–350ms.
- **Typography**: Geist Mono for terminal/labels/metadata/code UI. Geist Sans for body/paragraphs. No walls of monospace text.
- **Component shape**: Subtle rounding, 1px borders + subtle shadows, consistent card padding
- **Spacing**: Use Tailwind's spacing scale; no arbitrary pixel values
