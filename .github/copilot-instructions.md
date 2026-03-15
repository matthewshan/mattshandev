# Project Guidelines

## Architecture References

- Before making implementation changes, review `docs/technical-overview.md` for the current setup, configuration model, content pipeline, and architectural assumptions.
- Review `docs/page-component-map.md` for the current route tree, shared component composition, API surface, and client/server rendering boundaries.
- Treat those two files as the primary architectural reference for this repository. Prefer them over assumptions inherited from the original Magic Portfolio template.

## Documentation Maintenance

- When a prompt results in implementation changes that affect architecture, setup, routing, rendering boundaries, shared component composition, configuration, API surface, or content loading, update the relevant documentation in the same task.
- Update `docs/technical-overview.md` when changes affect project setup, config files, providers, theming, content sources, SEO, auth flow, or other cross-cutting technical behavior.
- Update `docs/page-component-map.md` when changes affect page structure, route composition, API route inventory, client/server component boundaries, or the relationship between pages and shared components.
- If a change affects both the technical setup and the route/component structure, update both files.
- Do not rewrite these docs for simple copy/content edits. Keep them focused on implementation details and repo structure.

## Implementation Expectations

- Assume this repo will continue evolving away from the upstream template. Optimize for the current codebase, not for preserving template defaults.
- When making structural changes, verify that the documentation still matches the code before finishing the task.
- If a requested change introduces a new architectural concept or replaces an old one, reflect that change in the docs rather than leaving stale references behind.

## Repo Conventions

- Use the App Router structure in `src/app` as the source of truth for routes.
- Use `src/resources/once-ui.config.ts` and `src/resources/content.tsx` as the current configuration and structured content sources unless the task explicitly changes that architecture.
- Treat `src/utils/utils.ts` and `src/components/mdx.tsx` as the current MDX/content pipeline entry points.
- Place project plan documents under `docs/plans/`. Do not create new plan files under `docs/plan/`.
- Keep documentation concise, implementation-focused, and independent from the current portfolio copy.