# DESIGN.md — Portfolio Design System (Terminal Entry → Polished Product)

This document is the single source of truth for UI/UX decisions. When implementing or modifying UI, follow this spec strictly. Do not invent new styles, colors, or animation patterns unless explicitly described here.

---

## 0) North Star

**Goal:** A personal portfolio that feels like a polished developer product — terminal-inspired, dark, neutral, with a single bright orange accent.  
**Not allowed:** “hacker” roughness, retro CRT effects, loud gradients, random UI kits, or excessive animations.

**Tagline for the feel:**
> Terminal as entry point → dissolves into clean product UI.

---

## 1) Visual Identity

### 1.1 Color Philosophy
- Site is **dark + neutral**.
- Accent orange is **rare** and used for meaning, not decoration.
- Avoid pure black backgrounds; use near-black / charcoal for depth.

### 1.2 Color Tokens (CSS variables)
Implement via CSS variables (shadcn-style). Use semantic names. Example values are placeholders and can be tuned, but keep the relationships.

**Background & Surfaces**
- `--background`: near-black
- `--foreground`: near-white
- `--card`: dark charcoal (slightly lighter than background)
- `--card-foreground`: near-white
- `--muted`: dark gray
- `--muted-foreground`: soft gray text
- `--border`: subtle border gray (1px lines)

**Accent**
- `--accent`: bright orange
- `--accent-foreground`: near-black or near-white depending on legibility

**Strict accent rule**
Orange may ONLY be used for:
- Terminal cursor
- Terminal prompt symbol / command highlight
- Primary CTA emphasis (max 1 per view)
- Interactive hover/focus state (borders, underlines, icons)
- Active nav indicator (if applicable)

Do NOT use orange for:
- Large backgrounds
- Whole section headings
- Repeated decorative marks
- Multiple simultaneous elements in the same viewport

---

## 2) Typography

### 2.1 Font Roles (no exceptions)
- **Mono (terminal/dev):** used for prompts, labels, metadata, tiny headings, code-like UI.
- **Sans (body/product):** used for paragraphs, descriptions, longer reading.

### 2.2 Hierarchy Rules
- Strong hierarchy: H1 is clearly dominant, H2/H3 distinct, body readable.
- Body text must be comfortable on dark backgrounds (avoid low contrast).
- Mono font should be used sparingly for long paragraphs (no walls of mono).

---

## 3) Layout System

### 3.1 Grid and Spacing
- Use a consistent spacing scale (Tailwind default is fine; do not invent random pixel values).
- Use a consistent max width for content (e.g. container pattern).
- Sections should feel calm: generous vertical spacing, strong alignment.

### 3.2 Component Shape
- Corners: subtle rounding (avoid overly “bubbly” UI).
- Borders: prefer 1px border + subtle shadow to heavy drop shadows.
- Cards: consistent padding and header/body structure.

---

## 4) Motion System (VERY IMPORTANT)

### 4.1 Motion Philosophy
Motion should feel like:
- *process starting*
- *panels coming online*
- *content revealing itself*
  Not like:
- showy marketing animations
- bouncy UI
- excessive parallax

### 4.2 Allowed Motions
Allowed:
- Fade in/out
- Translate Y (slide up from bottom) with subtle easing
- Minor scale (very subtle, only for hover)
- Cursor blink in terminal
- “Line reveal” (content appears line-by-line) in terminal only

Not allowed:
- Bounce / overshoot / springy effects
- Parallax
- Continuous floating elements
- Typewriter effect outside the terminal hero
- Animations longer than necessary

### 4.3 Timing Guidance
- Keep transitions fast and confident.
- Most reveals should be ~150–350ms.
- Terminal typing can be slightly slower, but should not become a gimmick.

---

## 5) Terminal Hero (Entry Point)

### 5.1 Terminal Window
- Looks like a modern terminal, not a retro CRT.
- No scanlines, glow, noise overlays, or “hacker” cliches.
- Include subtle border, slight radius, and minimal chrome.

### 5.2 Script Rules
Terminal should:
- Display name + short tagline in terminal output style
- Type `npm run dev` as the final “boot” command
- After the command completes, content sections slide up from below

Do:
- Animate commands with typing (controlled)
- Reveal output lines without typing (line-by-line is fine)
- Use orange for cursor and minimal command emphasis

Do NOT:
- Type out entire paragraphs
- Animate every line
- Include multiple gimmick commands

### 5.3 Transition to Site
Terminal is an entry point. After the boot sequence:
- The main content takes over
- Terminal can fade upward or reduce prominence
- Content blocks emerge from bottom (consistent with motion rules)

---

## 6) Content Sections

### 6.1 Site Sections (baseline)
- Home: Terminal hero + short overview + primary projects
- Projects index: list of projects as “modules/services”
- Project detail: structured case-study layout
- Optional later: About / Now / Notes

### 6.2 Project Card Design
Project cards should feel like “services”:
- Title (mono or strong sans)
- Short tagline
- Stack (mono labels)
- Status (small, subtle)
- One primary link (“View”, “Read case study”, etc.)

Avoid:
- Big loud thumbnails everywhere (optional, not required)
- Overly busy tag clouds

---

## 7) UI Component Rules (shadcn + Tailwind)

- Use shadcn primitives where helpful, but do not make the UI look like a default shadcn demo.
- Keep components consistent across pages.
- Prefer semantic components: `Section`, `Container`, `Card`, `Button`, `Separator`.
- Maintain consistent focus styles and accessible contrast.

---

## 8) Copy & Tone (no verbatim content required)

### 8.1 Voice
- Calm, direct, confident.
- Avoid hype words (“revolutionary”, “game-changing”).
- Avoid cringe dev jokes.
- Focus on clarity and outcomes.

### 8.2 Structure
- Each project should have:
    - 1-line what it is
    - why it matters (impact)
    - key technical decisions (brief)
    - link(s) to demo/repo (if available)

### 8.3 Terminal Copy
- Terminal output should be minimal and tasteful.
- Use a short tagline, not a mission statement.

---

## 9) Implementation Constraints for Gemini

When generating UI:
1. Follow this document as the highest priority.
2. Do not introduce new colors outside tokens.
3. Do not introduce new animation patterns outside motion rules.
4. Use the mono font ONLY for terminal/labels/metadata.
5. Orange accent must remain scarce.
6. Keep layout calm: whitespace, alignment, and readable typography.

---

## 10) Definition of Done (visual check)
A page is “done” when:
- Dark neutral baseline is consistent
- Orange accent is used sparingly and meaningfully
- Typography hierarchy is clear
- Layout is aligned and calm
- Motion is subtle, fast, and intentional
- Terminal hero feels polished, not gimmicky
