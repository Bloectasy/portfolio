# Portfolio Rebuild

A personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. The site lists selected GitHub repositories, shows per-project README pages, and includes a contact form.

## Features

- Projects page showing selected GitHub repositories
- Per-project pages rendering repository README (Markdown)
- Client-side search and language filters for repositories
- Loading skeletons for project cards
- Contact form integrated with Web3Forms (configurable)

## Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- react-markdown, remark-gfm, rehype-highlight for README rendering
- react-icons
- GSAP for animations

## Getting started

### Prerequisites

- Node.js 18+ (recommended)
- npm, pnpm, or yarn

### Install

```bash
git clone <repo-url>
cd portfolio
npm install
```

### Run (development)

```bash
npm run dev
# or
pnpm dev
```

### Build & start (production)

```bash
npm run build
npm start
```

## Environment variables

Create a `.env` file in the project root or set environment variables in your hosting platform.

Required / optional variables used by this project:

- `GITHUB_TOKEN` — (optional, server-only) GitHub personal access token to increase API quota and avoid rate limits when fetching repository data. Keep this secret and do not prefix with `NEXT_PUBLIC_`.
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — (optional) public key used by the client-side contact form when submitting to Web3Forms. If you prefer not to expose keys to the browser, you can switch to a server-side proxy and use a server-only key instead.

## Project structure (high level)

- `src/app/` — Next.js App Router routes and components
  - `_components/` — shared React components (Navigation, Footer, ProjectCard, etc.)
  - `_lib/` — helper libraries
  - `projects/` — projects list and per-project pages
  - `api/github/route.ts` — API route used for client-side GitHub requests

## Docker

A `docker-compose.yaml` is included for local containerized runs. Example:

```bash
docker compose up --build
```

## Scripts

- `dev` — start Next.js dev server
- `build` — build for production
- `start` — start the built app
- `lint` — run ESLint

## License

No license specified. Add a `LICENSE` file if you want to open-source this repository under a specific license.