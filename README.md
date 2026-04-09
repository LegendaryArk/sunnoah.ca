# Noah Sun Portfolio Website

This repository contains my personal portfolio website, built to showcase:

- Projects (software, robotics, and engineering work)
- Resume
- Contact information

The site is built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- React Router

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server

```bash
npm run dev
```

Vite will print a local URL (usually http://localhost:5173).

## Build and Preview

Create a production build:

```bash
npm run build
```

Preview the built site locally:

```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment.

Deploy command:

```bash
npm run deploy
```

How it works:

- predeploy runs npm run build
- deploy publishes the dist folder to the gh-pages branch

## Useful Scripts

- npm run dev: start local development server
- npm run build: production build
- npm run build:dev: development-mode build
- npm run lint: run ESLint
- npm run preview: preview production build locally
- npm run deploy: build + publish to GitHub Pages

## Project Structure

- src/components: page sections (Hero, About, Projects, Resume, Contact, Footer)
- src/components/ui: reusable UI primitives
- src/pages: route pages (Index, NotFound)
- public: static assets

## Notes

- Resume preview is embedded in-page and also available as a direct PDF link.
- This site is actively updated as I complete new projects and competitions.