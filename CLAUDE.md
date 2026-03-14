# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build (output: dist/)
npm run preview   # Preview production build locally
```

There are no tests or linting configured.

## Architecture

Single-page portfolio app built with React 19 + TypeScript + Vite. Navigation is managed via a `ViewState` enum in `App.tsx` component state (`HOME`, `PROJECTS`, `BLOG`, `BLOG_DETAIL`) with URL sync via `history.pushState` / `popstate` (routes: `/`, `/projects`, `/blog`, `/blog/:id`).

### Content system

All portfolio content lives in `contentData.ts`, which exports `{ en, es }` — two full `AppContent` objects for English and Spanish. The active language is selected at runtime and passed as `data` throughout the app.

Projects and blog articles are defined as bilingual `{ en, es }` objects in separate files:
- `data/projects/*.ts` — each exports a `ProjectItem` pair
- `data/articles/*.ts` — each exports a `BlogPost` pair

These are imported and assembled in `contentData.ts`. To add a new project or article, create a file in the appropriate `data/` subfolder and import it in `contentData.ts`.

All TypeScript interfaces are in `types.ts` (`AppContent`, `ProjectItem`, `BlogPost`, `ExperienceItem`, etc.).

### App structure

`App.tsx` contains the full UI. Components (`Header`, `Footer`, `HomeView`, `ProjectsView`, `BlogView`, `BlogPostDetail`) are extracted as proper React components with explicit props to avoid re-creation on each render.

### Styling

Tailwind CSS v4 via PostCSS (configured in `postcss.config.js` and `tailwind.config.ts`). Custom animations (`animate-fade-in-up`, `animate-soft-ping`, etc.) are defined in `styles.css`. The `dark` class on `<html>` drives dark mode via Tailwind's `dark:` variant.

### Static assets

`/cv.pdf` and `/profile.png` are served from the `public/` directory and referenced directly by path in `App.tsx`.

### Path alias

`@` resolves to the project root (configured in `vite.config.ts`).
