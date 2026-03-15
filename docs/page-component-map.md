# Page and Component Map

This document is a route and composition reference for the current codebase.

## Reading Guide

- `[S]` means a server component or server-side file
- `[C]` means a client component (`"use client"`)
- `API` means a route handler under `src/app/api`

## Top-Level Route Tree

```text
src/app
├── [S] layout.tsx
├── [S] page.tsx                         -> /
├── [S] not-found.tsx                    -> 404 fallback
├── [S] robots.ts                        -> /robots.txt
├── [S] sitemap.ts                       -> /sitemap.xml
├── blog/
│   ├── [S] page.tsx                     -> /blog
│   ├── [S] [slug]/page.tsx              -> /blog/[slug]
│   └── posts/*.mdx                      -> local blog content source
├── projects/
│   ├── [S] page.tsx                     -> /projects
│   ├── [S] [slug]/page.tsx              -> /projects/[slug]
│   └── projects/*.mdx                   -> local project content source
└── api/
    ├── rss/route.ts                     -> GET /api/rss
    └── og/
        ├── fetch/route.ts               -> GET /api/og/fetch
        ├── generate/route.tsx           -> GET /api/og/generate
        └── proxy/route.ts               -> GET /api/og/proxy
```

There is no live `/about`, `/work`, or `/gallery` route tree anymore.

## Root Composition

Everything flows through `src/app/layout.tsx`.

```text
[S] RootLayout
└── [C] Providers
    └── body shell
        ├── [C] Header
        │   └── [C] ThemeToggle
        ├── [C] RouteGuard
        │   └── [S] Active route page
        └── [S] Footer
```

`RouteGuard` is a client wrapper around otherwise server-authored pages, so route enablement checks happen after navigation while the route pages themselves remain server components.

## Route-Level Composition

### `/`

```text
[S] src/app/page.tsx
├── Once UI metadata/schema blocks
├── [C] TableOfContents
├── static profile/about sections
└── social/profile UI from structured content
```

This route now owns the former about-page experience. It is primarily server-rendered with a small client island for the table of contents scrolling behavior.

### `/blog`

```text
[S] src/app/blog/page.tsx
├── Once UI metadata/schema blocks
├── [S] Posts
│   └── [C] Post
└── [S] Posts
    └── [C] Post
```

`Posts` loads and sorts MDX entries on the server. Individual post cards are client components.

### `/blog/[slug]`

```text
[S] src/app/blog/[slug]/page.tsx
├── generateStaticParams() from local MDX
├── generateMetadata() from MDX frontmatter
├── Once UI metadata/schema blocks
├── [S] CustomMDX
│   └── markdown/MDX element mapping
│       └── [C] HeadingLink
├── [C] ShareSection
├── [S] Posts
│   └── [C] Post
└── [C] ScrollToHash
```

### `/projects`

```text
[S] src/app/projects/page.tsx
├── Once UI metadata/schema blocks
└── [S] Projects
    └── [C] ProjectCard
```

### `/projects/[slug]`

```text
[S] src/app/projects/[slug]/page.tsx
├── generateStaticParams() from local MDX
├── generateMetadata() from MDX frontmatter
├── Once UI metadata/schema blocks
├── optional hero Media
├── [S] CustomMDX
│   └── [C] HeadingLink
├── [S] Projects
│   └── [C] ProjectCard
└── [C] ScrollToHash
```

Project media is optional. Both the route and `ProjectCard` handle empty `images` arrays without rendering broken carousels or hero media.

### `404`

```text
[S] src/app/not-found.tsx
```

## Shared Component Roles

### Shared server components

| Component | Role |
| --- | --- |
| `Footer.tsx` | Site footer and attribution/social links |
| `mdx.tsx` (`CustomMDX`) | MDX rendering pipeline using `next-mdx-remote/rsc` |
| `blog/Posts.tsx` | Loads, sorts, filters, and lays out blog entries |
| `projects/Projects.tsx` | Loads, sorts, filters, and lays out project entries |

### Shared client components

| Component | Why it is client-side |
| --- | --- |
| `Providers.tsx` | Mounts Once UI providers that depend on client runtime state |
| `Header.tsx` | Uses `usePathname`, live time updates, and nav interaction |
| `ThemeToggle.tsx` | Reads and updates theme state |
| `RouteGuard.tsx` | Uses `usePathname` and client-side route enablement checks |
| `HeadingLink.tsx` | Copies heading URLs to clipboard and shows toast feedback |
| `ScrollToHash.tsx` | Scrolls to DOM nodes using browser APIs |
| `ProjectCard.tsx` | Uses interactive carousel/card presentation |
| `blog/Post.tsx` | Uses interactive card UI |
| `blog/ShareSection.tsx` | Uses clipboard, toast notifications, and sharing actions |
| `about/TableOfContents.tsx` | Scrolls to sections with browser APIs |

## API Surface Map

```text
API routes
├── [S] /api/rss            -> builds RSS XML from blog MDX
├── [S] /api/og/generate    -> renders dynamic OG image via next/og
├── [S] /api/og/fetch       -> fetches remote page metadata
└── [S] /api/og/proxy       -> fetches and returns remote images
```

## Content Flow Map

```text
src/app/blog/posts/*.mdx          ┐
                                  ├── [S] src/utils/utils.ts:getPosts()
src/app/projects/projects/*.mdx   ┘
                                           │
                                           ├── [S] blog/page.tsx via Posts
                                           ├── [S] blog/[slug]/page.tsx
                                           ├── [S] projects/page.tsx via Projects
                                           ├── [S] projects/[slug]/page.tsx
                                           ├── [S] sitemap.ts
                                           └── [S] api/rss/route.ts
```

Structured content and config flow through:

```text
[S] src/resources/content.tsx
[S] src/resources/once-ui.config.ts
        │
        ├── layout.tsx
        ├── Header.tsx
        ├── Footer.tsx
        ├── page.tsx
        ├── blog/page.tsx
        ├── projects/page.tsx
        ├── RouteGuard.tsx
        └── metadata and API helpers
```

## Current Client Boundary Summary

The app is still mostly server-rendered. The main client islands are:

1. Global shell behavior: providers, header, route guard, and theme switching
2. Interactive content display: project cards and blog cards
3. In-page helpers: table of contents, heading permalinks, share actions, and hash scrolling

Compared with the original template, the gallery island has been removed and the root page is now much closer to a traditional server-rendered profile page with one small client helper.
