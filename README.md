# Faall Contracting website

Production website for Faall Contracting, built with React and Vite and backed by a same-origin Cloudflare contact endpoint.

- Production: [faallconstructions.com](https://faallconstructions.com/)
- Frontend: React 18 + Vite 6
- Runtime: Cloudflare Workers/Pages
- Email delivery: Resend
- Languages: English and Arabic/RTL

## Start here

The complete architecture, deployment, DNS, email, employee-routing, SEO, testing, and incident guide is in [`docs/PROJECT-HANDBOOK.md`](docs/PROJECT-HANDBOOK.md).

Agent-specific invariants and repository rules are in [`AGENTS.md`](AGENTS.md).

## Local development

Use Node.js 24:

```bash
npm ci
npm run dev
```

Vite serves the UI but not the Cloudflare Function. For integrated testing:

```bash
npm run build
npx wrangler pages dev dist
```

## Required checks

```bash
npm run build
npm run check:functions
git diff --check
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`, which builds and uploads `dist/` plus the `functions/` directory to the Direct Upload Pages project `faall-constructions`.

The Cloudflare account also contains a Git-connected Worker named `faallconstructions`. See the handbook before changing either project: the duplicate deployment paths are a known operational concern.

Never commit `dist/`, API keys, deployment credentials, or private recipient addresses.
