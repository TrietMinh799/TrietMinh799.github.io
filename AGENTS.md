# AI Agent Instructions

## Project overview
- This is a personal Astro website built with Astro 5, TypeScript, and `astro:content`.
- The site includes a blog, about page, tools page, RSS feed, and GitHub Pages deployment.
- Blog posts are stored as Markdown in `src/content/blog/`.

## Important files and conventions
- `package.json`: provides scripts:
  - `npm run dev` — local development server
  - `npm run build` — type checking and production build
  - `npm run preview` — preview built output
- `src/content.config.ts`: defines the `blog` content collection schema.
- `src/lib/posts.ts`: derives blog slugs from content IDs.
- `src/pages/blog/index.astro`: renders the blog list.
- `src/pages/blog/[...slug].astro`: renders individual blog posts with `getStaticPaths()`.
- `src/layouts/BaseLayout.astro`: shared site shell, navigation, and global styling.
- `src/components/PostPreview.astro`: blog post preview cards on the blog index.

## Content schema
- Blog frontmatter includes:
  - `title`
  - `description`
  - `pubDate`
  - optional `updatedDate`
  - `tags`
  - `draft`
- Draft posts are excluded from the site by filtering `!data.draft`.
- `pubDate` and `updatedDate` are coerced to dates by Zod schema.

## Useful guardrails for tasks
- Add new blog posts only under `src/content/blog/`.
- Maintain the schema in `src/content.config.ts` when adding new frontmatter fields.
- Preserve the `getStaticPaths()` slug generation pattern in `src/pages/blog/[...slug].astro`.
- Use `npm run build` to verify changes, especially after modifying Astro page logic or content schema.

## Notes for AI agents
- Avoid inventing pages or routes outside the existing Astro file-based routing structure.
- The site does not use a separate CSS framework; styling is defined inside `src/layouts/BaseLayout.astro`.
- The RSS route is handled by `src/pages/rss.xml.js` and the related Astro RSS plugin.
- Public verification files like `public/google16065816b90f445e.html` and `public/robots.txt` are part of deployment assets.
