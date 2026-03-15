# Root About and Projects Cleanup Plan

## Goal

Replace the current home page with the about experience at `/`, rename the work section to `/projects`, remove the gallery section, and remove all non-avatar photos from the site.

## Scope Decisions

- `/` should render the current about-page experience.
- `/about` should be removed and return 404.
- `/work` should be renamed to `/projects` at both the route and UI-label level.
- `/work/*` should be removed and return 404.
- `/gallery` should be removed and return 404.
- Keep `/public/images/avatar.jpg`.
- Remove other photo assets and references.
- Keep non-photo media only where it still renders correctly.

## Implementation Steps

### 1. Move the about experience to `/`

- Replace the current root page in `src/app/page.tsx` with the composition currently implemented in `src/app/about/page.tsx`.
- Update `src/app/layout.tsx` so root metadata no longer depends on the obsolete `home` content object.
- Remove `src/app/about/page.tsx` after the root page is updated so `/about` becomes unavailable.

### 2. Refactor the content/config model

- Update `src/resources/content.tsx` to remove the obsolete `home` and `gallery` page objects.
- Rename the `work` content object to `projects` and change its path and labels to `/projects` and `Projects`.
- Remove photo arrays from the about-page structured content while keeping the avatar-based profile section intact.
- Update `src/resources/index.ts` exports to match the new content model.
- Update `src/types/content.types.ts` if the removed page configs or image-heavy structures are no longer needed.

### 3. Rename the work route tree to projects

- Rename the route directory from `src/app/work` to `src/app/projects`.
- Update all internal links, metadata paths, and route checks that currently reference `/work`.
- Update `src/components/Header.tsx` navigation and selected-state logic.
- Update `src/components/RouteGuard.tsx` so dynamic route support tracks `/projects` instead of `/work`.
- Update `src/resources/once-ui.config.ts` route flags and protected route keys.
- Update `src/app/sitemap.ts` so generated project URLs use `/projects`.

### 4. Rename shared project components and references

- Rename `src/components/work/Projects.tsx` and any related imports so internal naming also matches `projects`.
- Update `src/components/ProjectCard.tsx` callers and any project-detail references so code and docs no longer describe this section as work.

### 5. Remove the gallery feature

- Delete `src/app/gallery/page.tsx`.
- Delete `src/components/gallery/GalleryView.tsx`.
- Remove gallery imports/exports from `src/resources/content.tsx` and `src/resources/index.ts`.
- Remove the gallery route flag from `src/resources/once-ui.config.ts`.
- Remove gallery navigation from `src/components/Header.tsx`.
- Remove any now-unused gallery-specific icon or type references.

### 6. Remove non-avatar photo usage from content

- Update project MDX in the current project content directory so photo arrays and deleted team-avatar photo paths are removed.
- Update blog MDX under `src/app/blog/posts` to remove gallery thumbnails and deleted project-photo references.
- Update visible blog copy that still tells readers to use `/work` or `/gallery` so published site content matches the new route structure.

### 7. Harden image-dependent UI

- Update `src/components/ProjectCard.tsx` so empty image arrays do not render broken carousels.
- Update the project listing component and project detail page so missing images do not leave broken hero media.
- Verify blog cards and blog detail pages still behave correctly when optional thumbnails are removed.
- Verify `src/app/api/rss/route.ts` still produces valid output when posts no longer provide image enclosures.

### 8. Remove unused assets

- Delete `public/images/gallery` after references are removed.
- Delete obsolete photo files under `public/images/projects` after references are removed.
- Keep `public/images/avatar.jpg`.
- Keep any non-photo assets that are still intentionally used.

### 9. Update architecture documentation

- Update `docs/technical-overview.md` to reflect the new root route, the `/projects` route tree, removal of `/about` and `/gallery`, updated RouteGuard behavior, and reduced local-photo usage.
- Update `docs/page-component-map.md` to reflect the new route tree and component composition.

## Primary Files Affected

- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/layout.tsx`
- `src/app/work/page.tsx` and its renamed `src/app/projects/page.tsx` equivalent
- `src/app/work/[slug]/page.tsx` and its renamed `src/app/projects/[slug]/page.tsx` equivalent
- `src/resources/content.tsx`
- `src/resources/index.ts`
- `src/resources/once-ui.config.ts`
- `src/types/content.types.ts`
- `src/components/Header.tsx`
- `src/components/RouteGuard.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/work/Projects.tsx` and its renamed equivalent
- `src/app/blog/[slug]/page.tsx`
- `src/components/blog/Post.tsx`
- `src/app/api/rss/route.ts`
- `src/app/sitemap.ts`
- `src/app/blog/posts/*.mdx`
- `src/app/work/projects/*.mdx`
- `docs/technical-overview.md`
- `docs/page-component-map.md`

## Verification

1. Search for remaining references to `/about`, `/work`, `/gallery`, `/images/gallery`, and deleted project-photo paths.
2. Run lint and production build checks to catch route, MDX, type, and asset regressions.
3. Verify `/`, `/projects`, `/projects/[slug]`, and `/blog` render correctly.
4. Verify `/about`, `/work`, `/work/[slug]`, and `/gallery` now return 404.
5. Verify project cards, project pages, blog cards, and blog detail pages render cleanly without removed photos.
6. Verify sitemap and RSS output no longer emit removed routes or deleted image references.

## Risks to Watch

- `RouteGuard` currently has hardcoded dynamic-route assumptions that must be updated with the route rename.
- Project cards currently assume image arrays exist and need a no-image path.
- Published blog content includes instructional references to the old route and gallery structure.
- Asset deletion must happen after code and content references are removed to avoid broken builds.