# Repository Guidelines

## Project Structure & Module Organization

This repository contains two independently deployable Node.js packages:

- `frontend/`: React 18/Vite site. Entry points are `src/main.jsx` and `src/App.jsx`; reusable UI, directory content, and global styles live under `src/components/`, `src/data/`, and `src/styles/`.
- `frontend/public/assets/`: static brand and demonstration images. Reference these through Vite’s base-aware public path.
- `backend/`: contact API. `api/contact.js` is the Vercel handler, `server.js` is its local HTTP wrapper, and `templates/` contains email markup.
- `.github/workflows/deploy-pages.yml`: production frontend build and GitHub Pages deployment.

## Build, Test, and Development Commands

Use Node.js 20+ and install from lockfiles:

```bash
cd frontend && npm ci
npm run dev                 # Vite development server
npm run build               # production bundle in frontend/dist
npm run preview             # serve the built bundle locally

cd ../backend && npm ci
npm run dev                 # local API on port 3002 by default
npm run lint                # syntax-check the serverless handler
```

Copy each `.env.example` to `.env` before local development. Set `VITE_CONTACT_API_URL` to the local endpoint and keep `CONTACT_DRY_RUN=true` during routine testing.

## Coding Style & Naming Conventions

Follow the existing ES module style: two-space indentation, double quotes, semicolons, and concise arrow functions. Name React components in `PascalCase`, variables/functions in `camelCase`, and CSS classes in kebab-case. Keep employee IDs stable as `employee-001` through `employee-030`; frontend data and backend mappings must remain aligned. No formatter is configured, so preserve surrounding style.

## Testing Guidelines

There is no automated test framework or coverage threshold yet. Before submitting, run the frontend build and backend lint command. Manually verify English and Arabic/RTL layouts, responsive navigation, contact validation, dry-run submission, invalid attachments, and CORS. If adding tests, use names such as `ContactModal.test.jsx` and add a script to `package.json`.

## Commit & Pull Request Guidelines

Recent history uses short, imperative, sentence-case subjects (for example, `Add English and Arabic language switcher`). Keep each commit scoped to one logical change. Pull requests should summarize user-visible and API effects, list validation performed, link relevant issues, and include screenshots for visual or RTL changes. Never commit `.env`, credentials, recipient email addresses, generated `dist/`, or `node_modules/`.

## Security & Configuration

Only `VITE_*` variables are public. Keep Resend credentials and `EMPLOYEE_*_EMAIL` values backend-only. Preserve server-side validation, exact-origin CORS checks, attachment limits, and dry-run behavior when modifying the contact flow.
