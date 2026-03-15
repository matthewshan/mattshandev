# Resume-Driven Content Plan

## Goal

Replace the hardcoded portfolio data in `src/resources/content.tsx` with a resume-backed content layer sourced from `resume.json`, then move the raw source file to `src/resources/resume.json` so it lives alongside the app's other authored content resources.

This should remove manual copy/paste edits to `content.tsx` while keeping the existing resource import surface stable for the rest of the app.

## Decisions

- Source of truth: checked-in local resume JSON
- Preferred final location: `src/resources/resume.json`
- Integration style: normalize resume data behind a mapper instead of importing the raw JSON throughout the app
- Section scope: extend the current home-page model so resume-only sections can be represented cleanly
- Rich text handling: preserve simple paragraphs and lists from RxResume HTML by normalizing them into structured render data during mapping
- Deployment constraint: because the JSON remains in the repo, production updates still require rebuild or redeploy

## Implementation Plan

### 1. Establish the Resume Source Contract

- Add TypeScript types for the subset of the RxResume schema the app will consume.
- Cover `basics`, `picture`, `summary`, `sections`, `customSections`, and the nested item types used by the current resume export.
- Treat the checked-in JSON as authored content, not as a general-purpose app data store.

### 2. Refactor the Portfolio Content Model

- Update `src/types/content.types.ts` so the content contract is serializable and mapper-friendly instead of depending on JSX-heavy fields.
- Replace direct `ReactNode` content fields with normalized data structures such as:
  - paragraph arrays
  - bullet arrays
  - section records
- Keep the external resource exports compatible enough that the rest of the app can continue importing from `@/resources`.

### 3. Build the Resume Loader and Mapper

- Add a dedicated loader and mapper under `src/resources` or `src/utils`.
- Import `resume.json`, transform it into the existing resource exports, and centralize all source-specific logic there.
- Normalize hidden items, missing optional fields, and fallback values in one place.
- Map RxResume profile and skill icons to the local icon set defined in `src/resources/icons.ts`.

### 4. Normalize HTML Content

- Convert RxResume HTML description fields into structured render data during mapping.
- Support the HTML patterns already present in the resume export:
  - paragraphs
  - unordered lists
- Avoid spreading raw HTML rendering through page components.
- Prefer a constrained normalization strategy over flattening everything to plain text.

### 5. Make `content.tsx` a Thin Adapter

- Keep `src/resources/content.tsx` as the stable content entry point.
- Move the authored data source out of that file and into the resume-backed loader.
- Export normalized `person`, `social`, `about`, `blog`, and `projects` objects from the adapter so downstream consumers remain simple.

### 6. Expand Home-Page Rendering

- Refactor `src/app/page.tsx` to render resume-driven sections from data instead of hard-coding only the current four sections.
- Extend the home-page structure to support the sections you want represented from the resume, including:
  - summary
  - experience
  - education
  - skills
  - languages
  - projects
  - publications
  - custom experience sections
- Generalize the structure passed to the table of contents.

### 7. Update Supporting Consumers

- Update `src/components/about/TableOfContents.tsx` to accept the generalized section list.
- Audit all `person.avatar` consumers and normalize absolute versus relative avatar URLs.
- Fix metadata and feed code that currently assumes a local avatar path so remote resume photo URLs do not get incorrectly prefixed with `baseURL`.

## Relevant Files

- `resume.json`
- `src/resources/resume.json`
- `src/resources/content.tsx`
- `src/resources/index.ts`
- `src/resources/icons.ts`
- `src/types/content.types.ts`
- `src/app/page.tsx`
- `src/components/about/TableOfContents.tsx`
- `src/app/blog/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/api/og/generate/route.tsx`
- `src/app/api/rss/route.ts`
- `docs/technical-overview.md`
- `docs/page-component-map.md`

## Documentation Updates

- Update `docs/technical-overview.md` to describe the resume-backed content source, loader location, normalization strategy, and avatar URL handling.
- Update `docs/page-component-map.md` to reflect the expanded home-page composition and generalized section rendering.

## Verification

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Start the app and verify the home page renders the mapped resume content correctly.
4. Change the checked-in JSON and confirm the site updates without manual edits to `src/resources/content.tsx`.
5. Validate avatar handling in page schema, OG generation, RSS, and author avatar UI.

## Notes

- `src/resources` is the right long-term home for the raw resume file because this repo already uses that directory for authored site content and configuration.
- The raw resume should stay behind the mapper so components do not become coupled to the full RxResume schema.
- If true post-deploy live updates are needed later, the source should move from a checked-in file to an external URL or storage layer with explicit caching and revalidation.