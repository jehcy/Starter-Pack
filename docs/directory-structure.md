# Directory Structure

This document describes the high-level folder layout for components and documentation in this project.

---

## Components

All reusable React components live under the `components/` directory at the project root. Components are organized into the following subfolders:

### `components/sections/`

Layout-level or page-level section components that compose larger areas of a page.

| Purpose | Examples |
|---------|----------|
| Hero banners, feature blocks, page headers | `HeroSection`, `FeatureSection`, `FooterSection` |

### `components/cards/`

Reusable card-style display components for presenting discrete pieces of content.

| Purpose | Examples |
|---------|----------|
| Profile previews, product tiles, stat displays | `ProfileCard`, `CampaignCard`, `StatCard` |

### `components/ui/`

Shared UI primitives and Shadcn/Radix wrappers. These are the foundational building blocks used across all other components.

| Purpose | Examples |
|---------|----------|
| Buttons, inputs, dialogs, tooltips | `Button`, `Input`, `Dialog`, `Tooltip` |

---

## Docs

All markdown documentation files live under the `docs/` directory at the project root.

### Naming Conventions

- Use **kebab-case** for filenames (e.g., `getting-started.md`, `api-reference.md`).
- One main topic per file.
- Keep filenames descriptive but concise.

### Recommended Subcategories

Organize documentation into subfolders as the project grows:

| Subfolder | Purpose |
|-----------|---------|
| `docs/components/` | Component-specific documentation (props, usage, examples) |
| `docs/guides/` | How-to guides and tutorials |
| `docs/architecture/` | System design, data flow, and architectural decisions |

---

## Future Documentation Files

The following files are suggested stubs for future expansion. They are optional and can be created as needed:

| File Path | Description |
|-----------|-------------|
| `docs/components/sections.md` | Explains how to build and use section components |
| `docs/components/cards.md` | Documents card patterns and props |
| `docs/components/ui.md` | Documents base UI primitives and design tokens |
| `docs/guides/getting-started.md` | Quick start guide for new developers |
| `docs/architecture/overview.md` | High-level system architecture overview |

---

## Keeping This Document Up to Date

When adding a new top-level directory or major subfolder to the project, update this document to reflect the change. This ensures the team always has a clear reference for where files belong.
