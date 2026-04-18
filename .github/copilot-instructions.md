# Copilot Instructions for Fuwari

Fuwari is a static blog template built on **Astro 6** with **Svelte 5** islands, **Tailwind CSS v4** (CSS-first), and **Stylus**. It ships with a Cloudflare adapter and Pagefind-based search.

## Package manager

This repo enforces **pnpm** via a `preinstall` hook (`npx only-allow pnpm`). Do not use `npm install` or `yarn`; it will fail. Use `pnpm install`.

## Commands

- `pnpm dev` – start Astro dev server
- `pnpm build` – runs `astro build` then `pagefind --site dist` (the Pagefind step is required; do not split it)
- `pnpm preview` – preview the built site
- `pnpm check` – `astro check` (type-check `.astro`/content). Run before submitting per `CONTRIBUTING.md`.
- `pnpm type-check` – `tsc --noEmit --isolatedDeclarations`
- `pnpm format` – `biome format --write ./src`
- `pnpm lint` – `biome check --write ./src` (auto-fixes)
- `pnpm new-post -- <filename>` – scaffolds `src/content/posts/<filename>.md` with required front-matter (see `scripts/new-post.js`)

There is no test suite. Don't add one unless asked.

### Pre-submit (from `CONTRIBUTING.md`)

Always run `pnpm check` and `pnpm format` before submitting. Use [Conventional Commits](https://www.conventionalcommits.org/). Keep PRs focused on a single purpose.

## Architecture

- **Astro config (`astro.config.mjs`)** is the central wiring point: it registers the Tailwind Vite plugin (`@tailwindcss/vite`), Swup page transitions, `astro-icon`, Expressive Code (with custom plugins from `src/plugins/expressive-code/`), Svelte, and the sitemap integration. It also defines the markdown pipeline (remark → rehype) and the Cloudflare adapter with `imageService: 'compile'`.
- **Content collections (`src/content.config.ts`)** (Astro 6 location) define two collections via the `glob()` loader from `astro/loaders`: `posts` (Zod schema from direct `zod` import — `title`, `published`, optional `updated`, `draft`, `description`, `image`, `tags`, `category`, `lang`, plus internal `prevTitle/prevSlug/nextTitle/nextSlug`) and `spec` (for special pages like `about`). New post front-matter must match this schema. Use `entry.id` (not `entry.slug`) and `render(entry)` from `astro:content` (not `entry.render()`).
- **Tailwind v4 CSS-first config (`src/styles/main.css`)**: there is no `tailwind.config.cjs` or `postcss.config.mjs`. The file uses `@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, `@custom-variant dark (...)`, and a `@theme` block. Reusable utilities that are `@apply`'d from other CSS files (e.g. `.link`, `.expand-animation`, `.btn-regular-dark`) must be defined with `@utility <name> { ... }`, not inside `@layer components`. Any scoped CSS context (`<style>` blocks, standalone `.css` files) that uses `@apply` must start with `@reference "tailwindcss";`. Use the per-utility `!` suffix (e.g. `bg-black/40!`) instead of trailing `!important` on `@apply`.
- **Site configuration (`src/config.ts`)** exports `siteConfig`, `navBarConfig`, `profileConfig`, `licenseConfig`, `expressiveCodeConfig`. User-facing customization lives here — not scattered through components. Types are in `src/types/config.ts`.
- **Markdown pipeline** is extended via custom plugins in `src/plugins/`:
  - `remark-reading-time.mjs`, `remark-excerpt.js`, `remark-directive-rehype.js` inject frontmatter/data and parse `:::directive` syntax.
  - `rehype-component-admonition.mjs` and `rehype-component-github-card.mjs` render `:::note/tip/important/caution/warning` and `::github{repo="..."}` directives (registered through `rehype-components` in `astro.config.mjs`).
  - `src/plugins/expressive-code/` adds the language badge and custom copy button to code blocks.
- **Pages** live in `src/pages/`: `[...page].astro` (home pagination), `archive.astro`, `posts/[...slug].astro`, `about.astro`, plus `rss.xml.ts` and `robots.txt.ts` endpoints.
- **Layouts/components/styles** are split across `src/layouts/`, `src/components/` (Astro + Svelte), `src/styles/` (Stylus + Tailwind). Swup containers are `main` and `#toc`; components inside these must tolerate being re-rendered on navigation.
- **i18n** strings live in `src/i18n/`; `siteConfig.lang` selects the active locale.

## Conventions

- **Formatter/linter: Biome** (`biome.json`). Indentation is **tabs**, JS strings are **double quotes**. Biome ignores `src/**/*.css`, `src/public/**`, `dist/**`, `node_modules/**`. For `.svelte`/`.astro`/`.vue` files, `useConst`, `useImportType`, `noUnusedVariables`, and `noUnusedImports` are disabled — do not "fix" those manually in those file types.
- **Strict style rules enabled**: `noParameterAssign`, `useSelfClosingElements`, `useSingleVarDeclarator`, `noInferrableTypes`, `noUselessElse`, `useNumberNamespace` (use `Number.parseInt` etc., not globals).
- **TypeScript** uses `isolatedDeclarations` — exported symbols need explicit return/property types.
- **Adding a directive/component to markdown**: register it in the `rehypeComponents` block of `astro.config.mjs` and add the rehype/remark plugin file under `src/plugins/`.
- **New post creation**: prefer `pnpm new-post -- <name>` so the frontmatter matches the Zod schema; posts go under `src/content/posts/` and may use subdirectories.
- **Deployment targets**: Cloudflare (`wrangler.jsonc`, `@astrojs/cloudflare` v13 adapter which bundles `@cloudflare/vite-plugin` — do not add a `main` field to `wrangler.jsonc`, the adapter resolves it) and Vercel (`vercel.json`) are both configured. The Cloudflare adapter is the one wired in `astro.config.mjs`.
