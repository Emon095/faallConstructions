# Repository Guidelines

## Project Structure & Module Organization

This is one Cloudflare Pages project. The React/Vite application lives in `src/`; reusable UI is under `src/components/`, company content is in `src/data/content.js`, and global styles are in `src/styles/main.css`. Employee records live in `src/data/employees.js`, with profile placeholders and the fallback avatar under `public/images/employees/`. Other brand and leadership assets belong in `public/assets/`. The same-origin contact endpoint is the native Pages Function `functions/api/contact.js`. Production output is generated in `dist/`; do not edit or commit it.

## Build, Test, and Development Commands

Use Node.js 20+ and install from the root lockfile:

```bash
npm ci
npm run dev              # start the Vite UI
npm run build            # create the production dist/ bundle
npm run preview          # preview the static production build
npm run check:functions  # syntax-check the Pages Function
npx wrangler pages dev dist  # serve the build with /api/contact
```

Run `npm run build` before Wrangler. Plain `npm run dev` serves only the Vite UI.

## Coding Style & Naming Conventions

Use ES modules, two-space indentation, double quotes, and semicolons. Name React components in `PascalCase`, variables/functions in `camelCase`, and CSS classes in kebab-case. Keep components focused: directory presentation belongs in `EmployeeList`/`EmployeeCard`, while form behavior belongs in `ContactModal`.

Employee public IDs follow `emp_01` through `emp_30`; server secrets follow `EMPLOYEE_001_EMAIL` through `EMPLOYEE_030_EMAIL`. Keep array order and secret numbering aligned. Every employee needs `id`, `name`, `role`, and `image`; retain localized fields used by the Arabic interface.

## Testing Guidelines

No automated test framework is configured. Before submitting, run `npm run build`, `npm run check:functions`, and `git diff --check`. Manually verify responsive and Arabic/RTL layouts, missing-image fallbacks, employee selection, modal recipient details, form validation, dry-run submission, attachment limits, rate limiting, and same-origin CORS behavior.

## Commit & Pull Request Guidelines

Use short, imperative, sentence-case commit subjects. Keep commits focused. Pull requests should describe UI and Function effects, list validation performed, link relevant issues, and include screenshots for visual or RTL changes.

## Security & Configuration

Never place recipient addresses or Resend credentials in `src/`, API responses, or committed `.env` files. Configure `.env.example` values as encrypted Cloudflare variables. The frontend must call relative `/api/contact`; do not add a public API URL variable. Preserve server-side ID mapping, validation, attachment limits, HTML escaping, same-origin CORS, rate limiting, and `CONTACT_DRY_RUN`.
