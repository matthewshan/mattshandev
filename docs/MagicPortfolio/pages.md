## Enable or disable pages

Magic Portfolio's `RouteGuard` component takes care of conditionally rendering pages based on the `routes` object in `src/resources/once-ui.config.ts`.

The code above enables the root page, the `/projects` route tree, and the blog. If you flip `'/projects'` to `false`, `RouteGuard` will also block `/projects/[slug]` pages.

## Add new pages

When creating a new page, add it to the `routes` object in `src/resources/once-ui.config.ts`.

```ts
<CodeBlock
    marginBottom="16"
    highlight="5"
    codes={[
  {
    code:
`const routes = {
    '/':        true,
    '/projects': true,
    '/blog':    true,
    '/music': true,
};`,
    language: "tsx",
    label: "src/resources/once-ui.config.ts"
  }
]} />
```

The code above will ensure that the `/music` page is accessible. Users will be able to navigate to it after adding it to the navigation menu in the `components/Header.tsx` file.