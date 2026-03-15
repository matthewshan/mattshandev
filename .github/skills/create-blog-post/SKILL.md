---
name: create-blog-post
description: 'Create a blog post MDX file for this portfolio from an outline, notes, or rough draft. Use when writing a new article, turning a draft into publishable copy, generating frontmatter, choosing a slug, and saving the post into src/app/blog/posts.'
argument-hint: 'Topic, outline, or rough draft for the blog post'
user-invocable: true
---

# Create Blog Post

Create a new blog post in `src/app/blog/posts` from an outline, bullet list, notes, or a rough draft.

Use this skill when the user wants the agent to turn incomplete writing into a finished MDX post that matches this repository's blog pipeline.

## Inputs

Accept any of these inputs:
- A title and short outline
- A rough draft that needs cleanup and structure
- Notes, bullets, or fragments that need to be expanded
- An explicit slug, publish date, summary, tag, subtitle, or image path

If the user does not provide a title, derive one from the draft.

## Output

Produce a new `*.mdx` file in `src/app/blog/posts` with:
- Valid frontmatter
- A concise summary
- A filename slug chosen by the user when one is not supplied in the prompt
- Clean MDX body content that fits the user input without inventing unsupported facts

## Repository Rules

Follow [blog post rules](./references/blog-post-rules.md).

Start from [the blog post template](./assets/blog-post-template.mdx).

## Procedure

1. Review the user's outline or draft and identify the intended audience, topic, and strongest throughline.
2. Decide whether the input is closer to:
   - An outline: expand it into readable sections with transitions.
   - A rough draft: preserve the author's ideas while tightening structure, clarity, and flow.
   - Fragmented notes: organize them into a coherent article before drafting.
3. Determine the metadata:
   - `title`: use the provided title or derive one from the content.
   - `publishedAt`: use the user-provided date or today's date in `YYYY-MM-DD` format.
   - `summary`: write one sentence that matches the article's real content.
   - `tag`: use the user-provided tag or infer one only when the category is clear from the content.
   - `image`: include it only if the user provides a valid repository path.
   - `subtitle`: include it only if it adds signal.
4. Choose the output filename:
   - If the user provides a slug, use it.
   - Otherwise ask the user for the slug instead of assuming one.
   - Save the file to `src/app/blog/posts/<slug>.mdx`.
5. Draft the article body in MDX:
   - Prefer standard Markdown headings, paragraphs, lists, links, and code fences.
   - Use custom MDX components only when they materially improve the post and the syntax is valid for this repository.
   - Do not add unsupported imports inside the MDX file.
   - Default to a light edit when the user provides a draft.
   - If the draft has thin sections that need substantial expansion, ask before fleshing them out.
6. Validate before saving:
   - Frontmatter keys are spelled correctly.
   - The body content supports the summary and title.
   - The post does not claim facts, outcomes, or metrics the user did not provide.
   - The file path is inside `src/app/blog/posts`.
7. Create the file.
8. Report back with the new file path, chosen title, slug, and any assumptions made.

## Decision Points

### When the input is sparse

If the user gives only a topic or a thin outline, draft a concise post instead of padding it with generic filler. Keep claims modest and grounded in the provided material.

If expansion would require adding detail the user did not provide, stop and ask what to flesh out.

### When the draft has a strong voice

Preserve the voice. Improve structure, repetition, and clarity without rewriting it into a different tone.

### When metadata is missing

Use defaults only when they are low risk:
- Title: derive from the content
- Publish date: today's date
- Summary: generate from the body
- Tag: infer only if it is obvious

Avoid guessing:
- slugs
- image paths
- external links
- technical details not present in the source material
- personal stories or outcomes not stated by the user

### When the user asks for revisions

Edit the existing post in place if they clearly reference a current file. Otherwise create a new file.

## Quality Bar

Before finishing, verify that the post:
- reads like a publishable article, not an outline dump
- has a specific summary rather than a generic teaser
- uses headings only where they help the flow
- stays aligned with the user's actual source material
- does not introduce broken MDX syntax

## Example Invocations

- `/create-blog-post Turn this outline into a blog post about rebuilding my portfolio with Next.js: intro, design goals, content model, deployment lessons, closing reflections`
- `/create-blog-post Use this rough draft to create a polished post and save it in the blog posts folder: ...`
- `/create-blog-post Create a post titled "What I Learned Rewriting My Portfolio" from these notes. Use the tag "Engineering" and publish date 2026-03-15: ...`
- `/create-blog-post Use this draft to create a post, but keep it close to my voice. If any section needs major expansion, ask first: ...`