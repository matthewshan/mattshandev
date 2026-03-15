# Blog Post Rules

Use these repository-specific rules when creating or editing blog posts.

## Location

- Store blog posts in `src/app/blog/posts`.
- Use one `*.mdx` file per post.

## Required Frontmatter

These fields are expected by the current loader:

```md
---
title: "Post title"
publishedAt: "2026-03-15"
summary: "One-sentence summary of the post."
---
```

## Optional Frontmatter

Only include these when the user provides them or the content clearly supports them:

```md
subtitle: "Optional subtitle"
image: "/images/example.jpg"
tag: "Engineering"
link: "https://example.com"
images:
  - "/images/example-1.jpg"
team:
  - name: "Example Person"
    role: "Designer"
    avatar: "/images/avatar.jpg"
    linkedIn: "https://linkedin.com/in/example"
```

## Filename and Slug

- The slug comes from the filename.
- Save posts as `src/app/blog/posts/<slug>.mdx`.
- Prefer lowercase, hyphenated filenames.

## Content Rules

- Write valid MDX.
- Prefer standard Markdown syntax unless a custom MDX component is clearly useful.
- Do not add imports to the MDX file.
- Use headings, lists, links, images, and fenced code blocks when helpful.
- Keep the summary consistent with the actual article content.

## Known Rendering Context

- Posts are read with `gray-matter` and rendered through `src/components/mdx.tsx`.
- Standard Markdown elements are mapped to Once UI components.
- The blog page and RSS feed use `title`, `publishedAt`, `summary`, `image`, and `tag` metadata.

## Safe Defaults

- If no publish date is provided, use today's date.
- If no slug is provided, ask the user for one.
- If no tag is provided, infer one only when the category is obvious.
- If no image path is provided, omit `image`.