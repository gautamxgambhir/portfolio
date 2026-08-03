# Gautam Gambhir — Portfolio

Personal portfolio built as a high-performance, animation-heavy web experience. Features a custom cursor, 3D scenes, scroll-driven interactions, a periodic table of tech, and smooth GSAP + Framer Motion transitions throughout.

**Live:** [forgebygautam.in](https://forgebygautam.in)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | GSAP 3 + Framer Motion |
| 3D | Three.js + React Three Fiber |
| Icons | React Icons |
| Font | Syne (Google Fonts) |

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx        # Root layout, metadata, fonts
│   ├── page.tsx          # Entry point — assembles all sections
│   └── globals.css       # Base styles
├── components/
│   ├── Hero.tsx          # Full-screen hero with Silk background
│   ├── About.tsx         # Bio, skills, PeriodicTechTable
│   ├── Experience.tsx    # Scroll-pinned 3D card stack
│   ├── Work.tsx          # Projects accordion / mobile carousel
│   ├── Achievements.tsx  # Stats counters + achievement cards
│   ├── Contact.tsx       # Contact section with shuffle animation
│   ├── Preloader.tsx     # Entry preloader animation
│   ├── CustomCursor.tsx  # Custom cursor
│   ├── TargetCursor.tsx  # Magnetic target cursor
│   ├── Scene3D.tsx       # Three.js scene
│   ├── PeriodicTechTable.tsx  # Interactive periodic table of skills
│   ├── TechShowcase.tsx  # Tech cards showcase
│   ├── TiltedCard.tsx    # 3D tilt card component
│   ├── SplitText.tsx     # GSAP SplitText wrapper
│   ├── TypewriterTitle.tsx    # Typewriter heading effect
│   ├── VariableProximity.tsx  # Variable font proximity effect
│   ├── Shuffle.tsx       # Character shuffle animation
│   ├── AvatarPill.tsx    # Avatar pill component
│   ├── Silk.tsx          # WebGL Silk shader background
│   └── Footer.tsx        # Footer
├── lib/
│   ├── data.ts           # All content — projects, testimonials, skills
│   └── utils.ts          # Utility helpers
└── public/               # Static assets and project images
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type-check + lint
npm run check
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

---

## Sections

- **Hero** — Full-screen name display with animated Silk WebGL background
- **About** — Bio paragraphs with variable proximity font effect + interactive periodic tech table
- **Experience** — Scroll-pinned card stack cycling through 6 career roles
- **Work** — Four featured projects in an expanding accordion (desktop) / snap carousel (mobile)
- **Achievements** — Animated stat counters and milestone cards
- **Contact** — Social links and email with shuffle text animation

---

## Content

All portfolio data lives in `lib/data.ts` — projects, testimonials, and skills are exported from there and consumed by the relevant components. Bio copy, experience entries, and achievement cards are colocated in their respective component files.

---

## License

Personal portfolio — not open for reuse or redistribution.
