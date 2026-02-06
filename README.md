# Gray Marshall - Personal Portfolio

A modern, interactive personal portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. The site features a unique "Terminal as Entry Point" UX where a coding terminal boots up the portfolio, morphing into a clean, product-style interface.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/) (with React Compiler enabled)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (using CSS variables & OKLch colors)
- **Typography:** [Geist](https://vercel.com/font) (Sans & Mono)
- **Animations:**
  - [Framer Motion](https://www.framer.com/motion/) (Scroll transforms & layout animations)
  - [Lenis](https://github.com/darkroomengineering/lenis) (Smooth scrolling)
  - [OGL](https://github.com/oframe/ogl) (3D LaserFlow background effect)
  - [Three.js](https://threejs.org/) (Galaxy starfield background)
- **Deployment:** [Vercel](https://vercel.com) (Analytics & Speed Insights)

## ✨ Key Features

- **Terminal Hero:** A complex, scroll-driven component that simulates a terminal environment. It types `npm run dev` to "boot" the site, then seamlessly transforms into a fixed navigation header as the user scrolls.
- **Scroll-Driven Storytelling:** Content reveals and background effects (like the LaserFlow and Galaxy) react dynamically to scroll position.
- **Performance Optimized:** Uses Next.js App Router, React Compiler, and optimized assets for a fast, fluid experience.
- **Typed Content:** All site content (projects, experience, education) is managed via strongly-typed TypeScript files in `src/content/`.
- **Design System:** A strict "Dark + Neutral" aesthetic with a single bright orange accent, focusing on clarity, hierarchy, and subtle motion.

## 🛠️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/dev-site.git
    cd dev-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open locally:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
src/
├── app/                 # Next.js App Router pages & layouts
│   ├── projects/        # Dynamic project pages ([slug])
│   └── page.tsx         # Main scroll-driven home page
├── components/
│   ├── background/      # Three.js/OGL background effects
│   ├── layout/          # Layout wrappers (Container, Section)
│   ├── sections/        # Main page sections (About, Experience, etc.)
│   ├── terminal/        # Terminal hero & typing logic
│   └── ui/              # Shared UI components
├── content/             # Static content data (TS files)
└── lib/                 # Utilities (cn, formatting helpers)
```

## 🎨 Design Philosophy

> **"Terminal as entry point → dissolves into clean product UI."**

The design follows a strict set of rules defined in `DESIGN.md`:
- **Visual Identity:** Dark & neutral baseline. No "hacker" cliches (scanlines, green text).
- **Motion:** Purposeful and subtle. No bounce or excessive parallax. Transitions feel like "panels coming online."
- **Typography:** **Geist Mono** for code/data/terminal, **Geist Sans** for human-readable text.

## 📄 License

This project is a personal portfolio. All rights reserved.