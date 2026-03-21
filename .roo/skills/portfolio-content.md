# Skill: Portfolio Content Management

## Description

This skill provides guidance for adding and managing content in the Sem Postma portfolio website.

## Adding New Content Sections

### 1. Create MDX File

Create a new `.mdx` file in `src/content/` with appropriate numbering:

```mdx
---
title: Section Title
id: section-id
---

# Your Content Here

Write your content using Markdown with optional React components.
```

### 2. File Naming Convention

- Use numbered prefixes for ordering: `06_new-section.mdx`
- Use lowercase with hyphens for the name part
- Letters after numbers (e.g., `04b_`) indicate subsections

### 3. Available Components

Import and use these components in MDX:

```mdx
import { CasePage, ContentPage, ImageModal } from '../components'

<CasePage
  title="Project Title"
  image="/images/project.jpg"
  tags={['React', 'TypeScript']}
>
  Project description here...
</CasePage>
```

## Adding Project Case Studies

1. Add project image to `public/images/`
2. Create MDX file with CasePage component:

```mdx
---
title: Project Name
id: project-name
---

import { CasePage } from '../components'

<CasePage
  title="Project Name"
  image="/images/project-name.jpg"
  tags={['Tech1', 'Tech2', 'Tech3']}
  link="https://project-url.com"
>

## Overview
Brief project description...

## Challenge
What problem did this solve?

## Solution
How was it implemented?

## Results
What was achieved?

</CasePage>
```

## Adding Technology Icons

1. Add SVG/PNG to `public/images/techs/`
2. Update `public/technologies.json` if used in skill chart
3. Reference in content: `/images/techs/tech-name.svg`

## Best Practices

- Keep images optimized (use SVG for icons, WebP/JPEG for photos)
- Use semantic heading hierarchy (h2, h3, etc.)
- Include alt text for accessibility
- Test on mobile viewports
- Run `pnpm build` to verify no build errors
