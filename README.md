# Matthew Shan | Personal Website

This repository contains the source for my personal website, [mattshan.dev](https://mattshan.dev).

The site functions as a web resume and writing space. It is built with Next.js, Once UI, and local MDX content for posts and project pages. While the project started from the Magic Portfolio starter, this repo is maintained as a custom personal site rather than a reusable template.

## What is in the site

- A root about page with experience, education, technical skills, and contact links
- A blog powered by MDX files in the repository
- Project pages backed by MDX content when the route is enabled in config
- Generated metadata, sitemap, RSS, and Open Graph images

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Once UI
- MDX via local filesystem content
- Biome for formatting and linting

## Local development

Prerequisites:

- Node.js
- pnpm

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm start
```

Run linting:

```bash
pnpm lint
```

Format the repo:

```bash
pnpm biome-write
```

## Content and configuration

Most ongoing edits happen in a small set of files:

- `src/resources/content.tsx` for personal info, social links, experience, education, and skills
- `src/resources/once-ui.config.ts` for the canonical URL, theme configuration, and route toggles
- `src/app/blog/posts/*.mdx` for blog posts
- `src/app/projects/projects/*.mdx` for project entries

Routes are controlled in config. Keeping a route in the app tree does not automatically make it public.

## Project structure

```text
src/
	app/          App Router pages, route handlers, blog posts, and project MDX
	components/   Shared UI components
	resources/    Site config, structured content, icons, and CSS overrides
	types/        TypeScript types for config and content
	utils/        MDX loading and small utilities
public/         Static assets
docs/           Internal technical documentation
```

## Documentation

Repository-specific docs live here:

- `docs/technical-overview.md`
- `docs/page-component-map.md`

These files document the current architecture and are a better reference than the original Magic Portfolio upstream docs.

## License

This project inherits the upstream license included in this repository. See `LICENSE` for the current terms. 

This repository was originally forked from [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio), and has been modified and updated to my own needs.
