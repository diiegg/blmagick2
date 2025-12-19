# BlackMagickOps Web - AI Coding Agent Instructions

## 🚨 GLOBAL CHAT RULES - READ FIRST

### Git Workflow (MANDATORY)
**Never merge directly to `dev` or `main`. Always use this workflow:**

1. **Feature/Fix Development**:
   ```bash
   git checkout -b feature/your-feature-name  # or fix/issue-name
   # Make changes, commit work
   git push origin feature/your-feature-name
   ```

2. **Create PR to Dev**:
   ```bash
   gh pr create --title "feat: Your feature" --body "Description" --base dev
   ```

3. **After PR merge to Dev, create Production Release**:
   ```bash
   git checkout dev && git pull origin dev
   gh pr create --title "Release: Description" --base main --head dev
   ```

**Branch Strategy:**
- `feature/*` or `fix/*` → `dev` → `main`
- `main` = production (blackmagickops.com)
- `dev` = staging integration branch
- Never push directly to `dev` or `main`

### Critical Deployment Notes
- **Netlify Deploy**: Automatic on merge to `main`
- **Static Export**: Uses Next.js `output: 'export'` to `out/` directory
- **CSP Headers**: Defined in `netlify.toml` - update CSP when adding external scripts
- **Sentry**: Avoid duplicate initialization (check `src/instrumentation-client.ts`)

### Package Management Rules
- **Use pnpm ONLY**: `pnpm install`, `pnpm dev`, `pnpm build`
- **Node >= 20**: Required by `engines` in package.json
- **Frozen Lockfile**: Always use `pnpm install --frozen-lockfile` in CI

### Testing & Quality Gates
```bash
pnpm test:run          # Unit tests (required before PRs)
pnpm test:coverage     # Coverage reports to Codecov
pnpm build            # Must pass before deployment
pnpm validate:deployment  # Custom pre-deploy validation
```

## Project Overview

This is a **DevOps consultancy marketing website** built with Next.js 15 App Router, featuring a mystical/magical theme with precision engineering aesthetics. The site showcases platform engineering, automation, and DevOps capabilities.

## Architecture & Key Patterns

### Tech Stack
- **Framework**: Next.js 15 with App Router (`src/app/`)
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for sophisticated UI animations
- **Icons**: Lucide React
- **Package Manager**: pnpm (lock file present)
- **Runtime**: Bun for build tasks (`bunx` commands in package.json)

### Design System (`src/app/globals.css`)
- **CSS Variables**: All colors defined as CSS custom properties with `--color-*` namespace
- **OKLCH Support**: Progressive enhancement with modern color spaces when supported
- **Component Classes**: `.glass`, `.chip`, `.btn-primary`, `.btn-ghost`, `.section`
- **Dark Mode**: Always active (`<html className="dark">` in layout)
- **Theme**: "Minimal • Luxurious • Dark-Tech • Confident" aesthetic

### File Organization
```
src/app/
├── globals.css      # Complete design system & component styles
├── layout.tsx       # Root layout with metadata
└── page.tsx         # Single-page application with all components
```

## Development Workflow

### Commands (package.json)
```bash
pnpm dev             # Development with Turbopack on 0.0.0.0
pnpm build           # Production build
pnpm lint            # TypeScript check + ESLint
pnpm format          # Biome formatter
```

### Code Quality
- **TypeScript**: Strict mode enabled, path aliases with `@/*`
- **ESLint**: Next.js config with custom ignores
- **Biome**: Used for formatting (replaces Prettier)
- **VS Code**: Custom syntax highlighting (blue theme in settings)

## Component Architecture Patterns

### Single-File Components
All UI is in `src/app/page.tsx` with **embedded component functions** at the bottom:
- `SigilDivider`: Animated section separators with mystical lines
- `RitualFramework`: Process visualization with floating elements
- `AnimatedMetrics`: Count-up animations for statistics
- `MysticalPattern`: Background geometric animations

### Animation Conventions
- **Framer Motion**: Extensive use of `motion.*` components
- **Viewport Triggers**: `whileInView` with `{ once: true, amount: 0.3-0.5 }`
- **Stagger Delays**: Sequential animations with `delay: i * 0.1` patterns
- **Scroll Effects**: `useScroll` and `useTransform` for parallax halos

### State Management
- **Client Components**: `"use client"` for interactivity
- **Minimal State**: useState for mobile menu, scroll effects only
- **No External State**: No Redux/Zustand - pure React patterns

## Styling Guidelines

### Tailwind Customization
- **Container**: Responsive padding from 1rem to 6rem
- **Colors**: Extend shadcn/ui variables + custom `--color-*` system
- **Radius**: Consistent `--radius` variables for border-radius
- **Animations**: `tailwindcss-animate` plugin enabled

### Component Class Naming
- `.section`: Standard layout wrapper with responsive padding
- `.glass`: Frosted glass effect with backdrop-blur
- `.chip`: Pill-shaped elements for tags/categories
- `.btn-*`: Button variants with hover animations

### Color System
```
--color-bg: #0A0A0B          /* Primary background */
--color-surface: #121214     /* Card/glass surfaces */
--color-text: #ECEDEE        /* Primary text */
--color-muted: #8C8C94       /* Secondary text */
--color-brand: #6E8EF8       /* Primary brand (blue) */
--color-accent: #5BE3C1      /* Accent color (teal) */
```

## Content & Business Logic

### Brand Voice
- **Mystical DevOps**: Magic + precision engineering metaphors
- **Technical Authority**: Kubernetes, Backstage, SLSA, FinOps terminology
- **Confident Tone**: "Ritual", "Sigils", "Invocation" language

### Key Sections
1. **Hero**: Animated mystical patterns + value proposition
2. **Disciplines**: Platform Engineering, DevOps, Automation cards
3. **Framework**: 4-step process (Discover → Design → Automate → Optimize)
4. **Case Studies**: Portfolio examples with tech stacks
5. **Contact**: Lead generation form

### SEO/Metadata
- Title: "BlackMagickOps"
- Description: "Precision. Discipline. Magic."
- Favicon: Custom magic wand emoji

## Performance & Build

### Next.js Configuration
- **Turbopack**: Enabled for development builds
- **Host Binding**: `0.0.0.0` for network access
- **App Router**: No pages directory - pure app router structure

### Dependencies
- **Core**: React 18, Next.js 15
- **Styling**: `clsx`, `tailwind-merge`, `class-variance-authority`
- **Animation**: `framer-motion` v12
- **Utils**: `same-runtime` for consistency

## Deployment & CI Integration

### Netlify Configuration (`netlify.toml`)
- **Build Command**: `pnpm install && pnpm build`
- **Publish Directory**: `out/` (Next.js static export)
- **Functions**: `netlify/functions/` for serverless functions
- **Headers**: CSP, caching, security headers pre-configured

### MCP Server Integration (`.vscode/mcp.json`)
- **Netlify MCP**: `npx -y @netlify/mcp` for deployment management
- **Sentry MCP**: HTTP-based for error monitoring
- Use Netlify MCP tools for deploy management and site operations

### Quality Assurance Workflow
1. **Pre-commit**: Husky runs lint + type check
2. **PR Checks**: CI runs lint, test, build, e2e, performance audits
3. **Deploy Validation**: `scripts/validate-deployment.js` checks build output
4. **Coverage**: Automatic Codecov reports on PRs

## Common Tasks

### Adding New Sections
1. Create component function in `page.tsx`
2. Use `motion.div` with `whileInView` animations
3. Apply `.section` wrapper for consistent layout
4. Add to main JSX and navigation if needed

### Styling New Components
1. Use existing `.glass`, `.chip`, `.btn-*` classes first
2. Leverage CSS variables `var(--color-*)` for theming
3. Follow animation patterns with stagger delays
4. Test both hover and mobile responsive states

### Content Updates
1. Marketing copy lives in component objects/arrays
2. Tech stack mentions should align with real DevOps tools
3. Maintain mystical metaphor consistency in messaging

### Debug Production Issues
1. **Check Netlify Deploy Logs**: Use MCP tools or `netlify api listSiteDeploys`
2. **Console Errors**: Often CSP violations or duplicate script initialization
3. **Build Failures**: Check Node version, pnpm lockfile, and validate script
4. **Sentry**: Monitor error reports but avoid duplicate Session Replay instances