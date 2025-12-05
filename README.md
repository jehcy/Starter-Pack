# SaaS Starter

A modern SaaS starter template built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and InstantDB.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [InstantDB](https://instantdb.com/) (real-time, offline-first)
- **Deployment**: [Render](https://render.com/)

## Features

- Dark/light mode with system preference detection
- Responsive design with mobile-first approach
- Auth-ready pages (sign-in, sign-up) with placeholder logic
- Dashboard layout with sidebar navigation
- Marketing pages with hero and features sections
- Type-safe database access with InstantDB
- ESLint + Prettier for code quality
- Ready for Render deployment

## Getting Started

### Prerequisites

- Node.js 18+ (20 recommended)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
```

### Environment Variables

Edit `.env.local` with your actual values:

```env
# InstantDB Configuration
NEXT_PUBLIC_INSTANTDB_APP_ID=your_instantdb_app_id_here
INSTANTDB_ADMIN_TOKEN=your_instantdb_admin_token_here

# Authentication Secrets
AUTH_SECRET=your_auth_secret_here_min_32_chars
NEXTAUTH_URL=http://localhost:3000
```

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/      # Protected dashboard pages
│   ├── (marketing)/      # Public marketing pages
│   ├── globals.css       # Global styles and Tailwind config
│   └── layout.tsx        # Root layout with providers
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── cards/            # Card components
│   ├── sections/         # Page section components
│   ├── navigation.tsx    # Main navigation
│   ├── mode-toggle.tsx   # Dark mode toggle
│   └── theme-provider.tsx
├── hooks/
│   └── useAuth.ts        # Client-side auth hook (placeholder)
├── lib/
│   ├── auth.ts           # Server-side auth utilities (placeholder)
│   ├── instantdb.ts      # InstantDB client and types
│   └── utils.ts          # Utility functions
└── styles/               # Additional stylesheets
```

## Adding shadcn Components

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add card dialog dropdown-menu
```

## Deployment to Render

### Option 1: Blueprint (Recommended)

1. Fork/clone this repository
2. Connect your repo to Render
3. Use the `render.yaml` blueprint for automatic configuration
4. Set environment variables in the Render dashboard

### Option 2: Manual Setup

1. Create a new Web Service on Render
2. Connect your repository
3. Configure:
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start`
   - **Node Version**: 20
4. Add environment variables:
   - `NEXT_PUBLIC_INSTANTDB_APP_ID`
   - `INSTANTDB_ADMIN_TOKEN`
   - `AUTH_SECRET`
   - `NEXTAUTH_URL` (your Render URL)

## Extending the Starter

### Adding Authentication

Replace the placeholder auth logic in:
- `src/lib/auth.ts` - Server-side auth utilities
- `src/hooks/useAuth.ts` - Client-side auth hook
- `src/app/(auth)/sign-in/page.tsx` - Sign in form logic
- `src/app/(auth)/sign-up/page.tsx` - Sign up form logic

Recommended auth providers:
- [NextAuth.js](https://next-auth.js.org/)
- [Clerk](https://clerk.com/)
- [Auth0](https://auth0.com/)

### Adding InstantDB Data

1. Update the schema in `src/lib/instantdb.ts`
2. Create new components that use `db.useQuery()` and `db.transact()`
3. See `src/components/projects-list.tsx` for an example

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## License

MIT
