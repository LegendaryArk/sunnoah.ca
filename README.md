# sunnoah.ca

Personal portfolio site for Noah Sun, built with React, TypeScript, and Tailwind CSS. Deployed on GitHub Pages at [sunnoah.ca](https://sunnoah.ca).

## Stack

- **Frontend:** React 19 + React Router, Vite, Tailwind CSS 4, TypeScript
- **Contact form backend:** Cloudflare Worker (`worker/`) that validates submissions and sends email via [Resend](https://resend.com)

## Project structure

```
src/
  components/   UI sections (Hero, Experience, Projects, Contact, ...)
  pages/        Route-level views (Home, Projects, Detail)
  data/         Content — profile info, experience, projects, education, skills
  hooks/        Shared React hooks
  lib/          Utilities
worker/         Cloudflare Worker for the contact form's email backend
```

## Development

```bash
npm install
npm run dev       # start the Vite dev server
npm run build      # type-check and build for production
npm run lint       # run oxlint
npm run preview    # preview the production build locally
```

To work on the contact form backend locally:

```bash
cd worker
npm install
npm run dev        # run the worker locally with wrangler
```

## Deployment

The frontend is built and published to GitHub Pages. The contact form worker is deployed separately to Cloudflare with:

```bash
cd worker
npm run deploy
```
