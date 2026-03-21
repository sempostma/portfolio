# CLAUDE.md - Project Context for AI Assistants

## Project Overview

This is **Sem Postma's Portfolio Website** — a modern, performant personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. The site showcases professional experience, skills, and project case studies.

**Live Site:** https://sem-postma.com

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Content:** MDX (Markdown + JSX)
- **Visualizations:** D3.js for interactive skill charts
- **Deployment:** GitHub Pages via gh-pages

## Project Structure

```
├── src/
│   ├── components/     # React components (CasePage, ContentPage, Glitch, etc.)
│   ├── content/        # MDX content files (numbered for ordering)
│   ├── styles/         # CSS styles (main.css with Tailwind)
│   └── types/          # TypeScript type definitions
├── plugins/            # Custom Vite plugins
│   ├── favicon-generator/  # Auto-generates favicons from SVG
│   ├── humans-txt/         # Generates humans.txt
│   ├── remark/             # MDX processing plugins
│   └── sitemap/            # Auto-generates sitemap.xml
├── public/             # Static assets
│   ├── fonts/          # JetBrains Mono & Material Design Icons
│   └── images/         # Project images and tech logos
└── dist/               # Build output (gitignored)
```

## Key Commands

```bash
pnpm dev        # Start development server with HMR
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm deploy     # Build and deploy to GitHub Pages
pnpm typecheck  # Run TypeScript type checking
pnpm format     # Format code with Prettier
```

## Content Management

Content is written in MDX files in `src/content/`. Files are numbered for ordering:

- `01_home.mdx` - Landing section
- `01a_about.mdx` - About section
- `02_values.mdx` - Core values
- `03_recommendations.mdx` - Testimonials
- `04_skills.mdx` - Skills overview
- `04b_skillchart.mdx` - Interactive D3 skill chart
- `05_interests.mdx` - Personal interests
- `08-15_*.mdx` - Project case studies

## Custom Plugins

The project uses custom Vite plugins in `plugins/`:

- **favicon-generator:** Converts `public/favicon.svg` to multiple favicon formats
- **humans-txt:** Generates `humans.txt` with author info
- **sitemap:** Auto-generates `sitemap.xml` from routes
- **remark/external-links:** Adds `target="_blank"` to external links in MDX

## Coding Conventions

- Use TypeScript for all new code
- Follow dprint formatting (see `dprint.json`)
- Use Tailwind CSS utility classes for styling
- Components go in `src/components/`
- Content goes in `src/content/` as MDX files
- Keep images optimized and in appropriate formats (SVG preferred for icons)

## Important Notes

- The site deploys to `sem-postma.com` via GitHub Pages
- Node.js 20+ is required (see `.nvmrc`)
- Use pnpm as the package manager
- The D3 skill chart in `src/d3-techs-bubblechart.ts` creates an interactive bubble visualization
