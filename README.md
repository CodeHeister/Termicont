# Termicont Frontend

Marketing/corporate website for **Termicont SRL** — accounting, tax, and 1C/AI automation services for businesses in Moldova (termicont.md).

Built with [SolidJS](https://www.solidjs.com/) and [Vite](https://vitejs.dev/), written in TypeScript.

## Tech Stack

- **Framework:** Solid.js + `@solidjs/router`
- **Bundler:** Vite 6
- **Styling:** SCSS (with shared variables/mixins auto-injected via Vite)
- **Realtime:** `@microsoft/signalr`
- **Language:** TypeScript (strict)
- **Linting/Formatting:** ESLint + Prettier

## Requirements

- Node.js (LTS recommended)
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server (http://localhost:5173):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build locally (http://localhost:4173):

```bash
npm run preview
```

## Scripts

| Script                | Description                                              |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`           | Start the Vite dev server                                 |
| `npm run build`         | Type-check-free production build to `dist/`               |
| `npm run preview`       | Serve the built `dist/` output locally                    |
| `npm run analyze`       | Production build with a bundle size report (`dist/bundle-analysis.html`) |
| `npm run lint`          | Run ESLint on `src`                                        |
| `npm run lint:fix`      | Run ESLint with `--fix`                                    |
| `npm run format`        | Format the codebase with Prettier                          |
| `npm run gen:lib`       | Regenerate barrel (`index.ts`) files under `src/lib`       |
| `npm run docker:build`  | Build the Docker image                                     |
| `npm run docker:tag`    | Tag the Docker image for the configured registry           |
| `npm run docker:push`   | Push the tagged image to the registry                       |
| `npm run docker:publish`| Build, tag, and push in one step                            |

`gen:lib` and `format` also run automatically before every `build` via a custom Vite plugin (`plugins/vite-plugin-run-before-build.ts`).

## Project Structure

```
src/
  components/   Reusable and page-level UI components (incl. landing/ sections)
  forms/        Form components/logic
  lib/          Framework-agnostic modules (i18n, theming, nav, cookies, CSRF, drag-and-drop, ...)
  pages/        Route-level page components
  static/       Static assets served as-is
  styles/       Shared SCSS (variables, mixins, media queries, ...)
  Layout.tsx    App shell/layout
  Router.tsx    Route definitions
  index.tsx     App entry point
plugins/        Custom Vite plugins
scripts/        Standalone dev/build scripts (e.g. lib index generation)
```

### Path aliases

Configured in both `vite.config.ts` and `tsconfig.json`:

| Alias          | Path                        |
| -------------- | ---------------------------- |
| `@/*`           | `src/*`                      |
| `@lib/*`        | `src/lib/*`                  |
| `@forms/*`      | `src/forms/*`                |
| `@styles/*`     | `src/styles/*`                |
| `@static/*`     | `src/static/*`                |
| `@assets/*`     | `src/static/assets/*`         |
| `@components/*` | `src/components/*`            |

## Docker

The app is containerized as a static build served by Nginx (see `Dockerfile` / `nginx.conf`):

```bash
npm run docker:build
npm run docker:publish   # build + tag + push
```

Registry/image name/tag are configured via the `config` block in `package.json`.

## License

ISC
