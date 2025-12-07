# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

Add shadcn components: `npx shadcn@latest add <component-name>`

## Architecture

This is a Next.js 16 SaaS starter with App Router, using InstantDB for real-time database and shadcn/ui for components.

### Route Groups
- `src/app/(auth)/` - Authentication pages (sign-in, sign-up, forgot-password)
- `src/app/(dashboard)/` - Protected dashboard with sidebar layout
- `src/app/(marketing)/` - Public marketing pages (landing, pricing, blog, etc.)
- `src/app/theme/` - Visual theme editor for customizing design tokens

### Key Files
- `src/lib/instantdb.ts` - InstantDB client, entity types (Project, Workspace, WorkspaceMember), and transaction helpers
- `src/lib/auth.ts` - Server-side auth utilities (placeholder)
- `src/hooks/useAuth.ts` - Client-side auth hook (placeholder)
- `src/app/globals.css` - All design tokens (colors, spacing, radius, typography) as CSS variables

### UI Components
- shadcn/ui components in `src/components/ui/` (style: "new-york")
- **Card components** in `src/components/cards/` - all new card components should be placed here
- Path alias: `@/*` maps to `./src/*`

## Design System Rules

The project has a visual theme editor at `/theme` that controls typography, colors, spacing, and more via CSS variables in `globals.css`.

**Critical:** Do not override theme-controlled properties with Tailwind classes:
- Never use `text-4xl`, `text-5xl`, etc. on headings - sizes come from `--text-h1`, `--text-h2`, `--text-h3`
- Never use `leading-tight`, `leading-[value]` on headings - line-heights come from `--line-height-h1`, etc.
- Never use `max-w-*` on `<p>` tags - control width at container level
- Use `font-bold`, color classes (`text-foreground`, `text-muted-foreground`), and spacing on headings

**Allowed on headings:** `font-bold`, `font-semibold`, color classes, margin/padding classes

**Container utility:** Use `container-wide` class for consistent page-width containers.

## ESLint Rules
- `@typescript-eslint/no-explicit-any`: error
- `@typescript-eslint/no-unused-vars`: error (prefix with `_` to ignore)
- `no-console`: warn (allow `console.warn`, `console.error`)

## Page Structures

### Auth Pages (`src/app/(auth)/`)
| Route | File | Description |
|-------|------|-------------|
| `/sign-in` | `sign-in/page.tsx` | User login page |
| `/sign-up` | `sign-up/page.tsx` | User registration page |
| `/forgot-password` | `forgot-password/page.tsx` | Password reset request page |

### Dashboard Pages (`src/app/(dashboard)/`)
| Route | File | Description |
|-------|------|-------------|
| `/dashboard` | `dashboard/page.tsx` | Main dashboard home |
| `/dashboard/projects` | `dashboard/projects/page.tsx` | Projects list/management |
| `/dashboard/settings` | `dashboard/settings/page.tsx` | User/workspace settings |

### Marketing Pages (`src/app/(marketing)/`)
| Route | File | Description |
|-------|------|-------------|
| `/` | `page.tsx` | Landing page |
| `/lpv2` | `lpv2/page.tsx` | Landing page variant 2 |
| `/features` | `features/page.tsx` | Product features showcase |
| `/pricing` | `pricing/page.tsx` | Pricing plans |
| `/blog` | `blog/page.tsx` | Blog/articles |
| `/docs` | `docs/page.tsx` | Documentation |
| `/privacy` | `privacy/page.tsx` | Privacy policy |
| `/terms` | `terms/page.tsx` | Terms of service |

### Utility Pages
| Route | File | Description |
|-------|------|-------------|
| `/theme` | `theme/page.tsx` | Visual theme editor (dev tool) |

## Tech Stack

### Core
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **React:** React 19.2

### Database & Backend
- **Database:** InstantDB (real-time, client-side)
- **Auth:** InstantDB built-in auth (placeholder implementation)

### UI & Styling
- **Component Library:** shadcn/ui (new-york style)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Theming:** next-themes (dark/light mode)
- **Animations:** tw-animate-css
- **Toasts:** Sonner

### Radix UI Primitives
Dialog, Label, Scroll Area, Select, Separator, Slider, Slot, Tabs, Tooltip

### Security & Data
- **Sanitization:** DOMPurify (HTML/XSS sanitization)
- **Query Language:** GraphQL

### Developer Tools
- **Linting:** ESLint 9 with Next.js config
- **Formatting:** Prettier with Tailwind plugin
- **Build:** Turbopack (Next.js default)

## Data Architecture

### InstantDB Schema (`src/lib/instantdb.ts`)

InstantDB is a real-time, client-side database. All data syncs automatically.

#### Entities

```typescript
interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: number;      // Unix timestamp
  updatedAt: number;      // Unix timestamp
  ownerId: string;        // User ID
  status: 'active' | 'archived' | 'draft';
}

interface Workspace {
  id: string;
  name: string;
  slug: string;           // URL-friendly identifier
  createdAt: number;
  updatedAt: number;
}

interface WorkspaceMember {
  id: string;
  workspaceId: string;    // FK to Workspace
  userId: string;         // FK to User
  role: 'owner' | 'admin' | 'member';
  joinedAt: number;
}
```

#### Usage Pattern
```tsx
import { db, tx, id } from '@/lib/instantdb';

// Query data (reactive)
const { data, isLoading } = db.useQuery({ projects: {} });

// Create/update
db.transact(tx.projects[id()].update({ name: 'New Project', ... }));
```

#### Environment Setup
Set `NEXT_PUBLIC_INSTANTDB_APP_ID` in `.env.local` to connect to your InstantDB app.

## Testing Setup

**Status:** Not yet configured

### Recommended Setup
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': './src' },
  },
});
```

## Development Notes

### Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_INSTANTDB_APP_ID` | Yes | InstantDB application ID |

### Path Aliases
- `@/*` → `./src/*` (configured in `tsconfig.json`)

### Layouts
- `src/app/layout.tsx` - Root layout (fonts, providers)
- `src/app/(auth)/layout.tsx` - Auth pages layout (centered card)
- `src/app/(dashboard)/layout.tsx` - Dashboard layout (sidebar navigation)
- `src/app/(marketing)/layout.tsx` - Marketing layout (header/footer)

### Adding New Pages
1. Create `page.tsx` in the appropriate route group
2. For protected pages, add to `(dashboard)/`
3. For public pages, add to `(marketing)/`
4. Use `container-wide` class for consistent width
- when making new pages, always add a link to the page in header