# Technical Overview

This document describes the current technical structure of the repository. It focuses on route behavior, content loading, configuration, and cross-cutting implementation details rather than the current portfolio copy.

Companion reference: [docs/page-component-map.md](docs/page-component-map.md)

## Stack

- Framework: Next.js 16 with the App Router
- UI system: Once UI (`@once-ui-system/core`)
- Language: TypeScript with strict mode enabled
- Rendering: React 19 server components by default with client islands for interactive behavior
- Content: structured TypeScript content plus local MDX files
- Styling: Once UI global CSS, SCSS modules, and optional CSS variable overrides
- Formatting/linting: Biome plus the standard Next.js toolchain

## Runtime Setup

- Package manager: the repo ships with `pnpm-lock.yaml`, but scripts are standard package scripts and also work with `npm`
- Main scripts from `package.json`:

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm biome-write
```

- `next.config.mjs` enables MDX page extensions, transpiles `next-mdx-remote`, and configures Sass support
- `tsconfig.json` defines the `@/*` alias to `src/*`

## Deployment

- Hosting target: Vercel
- Infrastructure provisioning: Terraform under `terraform/`
- Pull request CI: `.github/workflows/pull-request.yml` installs dependencies with pnpm and runs `pnpm run lint` plus `pnpm run build` for every pull request
- Release automation: `.github/workflows/vercel-release-deploy.yml` deploys published GitHub releases to Vercel with the Vercel CLI

The current Terraform config links the GitHub repository to the Vercel project and sets a production branch. If release-driven deployments are intended to be the only production trigger, the configured Vercel production branch should not be an actively used branch such as `main`, otherwise Vercel will still create a production deployment for direct pushes to that branch.

## High-Level Structure

```text
src/
  app/          App Router routes, layouts, metadata, and API handlers
  components/   Shared UI and client/server view components
  resources/    Site config, structured content, icons, and CSS overrides
  types/        Type definitions for config and structured content
  utils/        MDX loading utilities and small helpers
public/         Static assets served from the site root
docs/           Repo documentation
```

## Route Architecture

Routes live under `src/app`.

- `layout.tsx` is the global shell
- `page.tsx` renders the primary about/profile experience at `/`
- `blog/page.tsx` and `blog/[slug]/page.tsx` render the blog index and detail pages
- `projects/page.tsx` and `projects/[slug]/page.tsx` render the projects index and detail pages
- `not-found.tsx`, `robots.ts`, and `sitemap.ts` provide framework-level support routes
- `api/*` contains OG image, metadata proxy, and RSS handlers

The older `/about`, `/work`, and `/gallery` routes are intentionally absent. `RouteGuard` treats them as disabled and they resolve through the shared 404 path.

## Root Layout

`src/app/layout.tsx` is the main composition point for the site. It:

1. Imports Once UI base CSS plus `src/resources/custom.css`
2. Applies font variables from `src/resources/once-ui.config.ts`
3. Injects the theme bootstrap script before hydration
4. Wraps the app in `Providers`
5. Renders `Header`, `RouteGuard`, page content, and `Footer`

Global behavior changes usually start in this file.

## Configuration Model

The main configuration surface lives under `src/resources`.

### `src/resources/once-ui.config.ts`

This file controls technical behavior and theme setup.

Important exports:

- `baseURL`: canonical domain used by metadata, schema, sitemap, robots, RSS, and OG generation
- `routes`: feature flags for `/`, `/projects`, and `/blog`
- `display`: header toggles such as location, time, and theme switching
- `fonts`, `style`, `effects`, `dataStyle`: Once UI theme and visual configuration
- `schema`, `sameAs`, `socialSharing`: supporting integration config

### `src/resources/content.tsx`

This file stores the structured content objects used directly by the app:

- `person`
- `social`
- `about`
- `blog`
- `projects`

These objects are not plain JSON. Many fields are `ReactNode`, so JSX in content is expected.

Notable current behavior:

- `about.path` is `/`, because the root page now owns the profile/about experience
- the old `home` and `gallery` page objects have been removed
- about-page photo arrays have been removed, so the structured content no longer depends on local non-avatar images

### `src/resources/index.ts`

This file re-exports content and config so the rest of the app can import from `@/resources`.

## Content and MDX Pipeline

The app uses two content sources in parallel:

1. Structured TypeScript content in `src/resources/content.tsx`
2. Local MDX files under:
   - `src/app/blog/posts`
   - `src/app/projects/projects`

### MDX Loading

`src/utils/utils.ts` reads MDX files from disk using `fs`, `path`, and `gray-matter`, then returns normalized objects with:

- `slug`
- `content`
- `metadata`

`getPosts()` is a generic loader despite its name. It is used for both blog posts and project entries.

Because the loader is synchronous and file-system based, it is best suited to local repo content. A move to a CMS or database would require updating this utility and its call sites.

### MDX Rendering

`src/components/mdx.tsx` maps markdown and MDX elements to Once UI components.

Examples:

- headings become `HeadingLink`
- paragraphs become Once UI `Text`
- images become Once UI `Media`
- code fences become Once UI `CodeBlock`
- links become internal `SmartLink` or external anchors depending on the URL

### Frontmatter Contract

Current MDX metadata fields include:

```yaml
title: string
subtitle: string
publishedAt: string
summary: string
image: string
images: string[]
tag: string
team:
  - name: string
    role: string
    avatar: string
    linkedIn: string
link: string
```

Projects can now omit `images` without breaking list or detail rendering. `ProjectCard` and the project detail page both guard against empty media arrays.

## Route Gating

`src/components/RouteGuard.tsx` runs on the client after navigation and checks whether the route is enabled in `routes`.

Important implementation detail:

- exact route matches come from the `routes` config
- dynamic route allowance is hard-coded for `/blog` and `/projects`

If a future dynamic section is added, `RouteGuard.tsx` must be updated or the new route tree will be treated as disabled.

## Shared UI and Providers

### Providers

`src/components/Providers.tsx` wires the Once UI providers:

- `LayoutProvider`
- `ThemeProvider`
- `DataThemeProvider`
- `ToastProvider`
- `IconProvider`

### Header and Footer

`src/components/Header.tsx` builds navigation from the `routes` config. The visible top-level nav now centers on:

- `/`
- `/projects`
- `/blog`

The header reads `person.location` for the visible location label, `person.timezone` for the live clock, and `display` for optional controls.

### Icons

`src/resources/icons.ts` is the local icon registry. Add new icon mappings there before referencing them in content or components.

## SEO and Generated Assets

SEO behavior is distributed across page files and API routes.

- most pages call `Meta.generate(...)` from Once UI inside `generateMetadata()`
- pages render `Schema` components for structured data
- `src/app/sitemap.ts` combines enabled static routes with blog and project MDX entries
- `src/app/robots.ts` points crawlers to the sitemap
- `src/app/api/og/generate/route.tsx` renders dynamic OG images
- `src/app/api/rss/route.ts` builds RSS XML from blog MDX content

## Static Assets

The remaining essential local image asset is `public/images/avatar.jpg`.

The old gallery and project photo directories are no longer part of the intended runtime model. Project and blog content has been updated to avoid depending on those deleted photo paths.

## Type System

- `src/types/content.types.ts` defines the structured content contract for `about`, `blog`, and `projects`
- `src/types/config.types.ts` defines the route, theme, effects, and integration config contracts

If the content/config model changes again, treat these files as part of the implementation contract rather than passive documentation.

## Practical Refactoring Boundaries

If this repo keeps evolving away from the original template, the highest-leverage files remain:

1. `src/resources/once-ui.config.ts`
2. `src/resources/content.tsx`
3. `src/components/RouteGuard.tsx`
4. `src/components/mdx.tsx`
5. `src/utils/utils.ts`
6. `next.config.mjs`

The main current assumptions worth remembering are:

- route availability is config-driven, not only file-driven
- dynamic route support is explicit in `RouteGuard`
- the root page is the about/profile experience
- project media is optional
- content is still local and file-based
