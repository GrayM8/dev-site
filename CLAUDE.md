# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Architecture

This is a Next.js 16 personal portfolio site using the App Router, React 19, and Tailwind CSS 4.

### Key Patterns

**React Compiler**: Enabled via `reactCompiler: true` in next.config.ts. Avoid manual memoization (useMemo, useCallback, React.memo) as the compiler handles this automatically.

**Scroll-Driven Animations**: The home page uses Framer Motion's `useScroll` and `useTransform` to create scroll-linked animations. The TerminalHero component morphs from a centered terminal to a fixed header as the user scrolls (0-500px types command, 500-700px morphs to header).

**Path Alias**: Use `@/*` to import from `src/*`.

**Styling**: Uses Tailwind CSS 4 with CSS variables for theming defined in `globals.css`. The `cn()` utility from `@/lib/utils` merges Tailwind classes. Accent color is bright orange (#FF7A1A).

### Content

Project data, experience, and social links are stored as typed arrays in `src/content/`. Projects use a slug-based routing pattern (`/projects/[slug]`).

### Layout Components

- `Container` - Max-width wrapper (max-w-5xl) with responsive padding
- `Section` - Page section with fade-in animation, accepts `delay` prop for staggered reveals
