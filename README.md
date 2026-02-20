# Kyrant Wears 2.0

**Kyrant Wears** is a print-on-demand e-commerce platform where **Designers** upload custom artwork and **Merchants** sell those designs on physical products (T-shirts, hoodies, sweatpants, tote bags, caps, iPhone cases, etc.). This repository contains the full frontend client built with React, TypeScript, Tailwind CSS, and Vite.

> **Status:** Frontend UI complete — all pages and components are built and fully responsive across Desktop (1440px+), Tablet (768px–1024px), and Mobile (375px–640px).

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Getting Started — Clone & Install](#getting-started--clone--install)
4. [Running the Dev Server](#running-the-dev-server)
5. [Building for Production](#building-for-production)
6. [Project Structure](#project-structure)
7. [Pages & Routes](#pages--routes)
8. [Components Overview](#components-overview)
9. [Styling & Theming](#styling--theming)
10. [Static Assets](#static-assets)
11. [Responsive Breakpoints](#responsive-breakpoints)
12. [Linting](#linting)
13. [Troubleshooting](#troubleshooting)
14. [Contributing](#contributing)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.0 | UI library (functional components, hooks) |
| **TypeScript** | 5.9.3 | Static type-checking |
| **Vite** | 7.3.1 | Dev server & production bundler |
| **Tailwind CSS** | 4.2.0 | Utility-first CSS framework |
| **@tailwindcss/vite** | 4.2.0 | Tailwind CSS Vite plugin (v4 integration) |
| **React Router DOM** | 7.13.0 | Client-side routing |
| **ESLint** | 9.39.1 | Code linting with TypeScript + React rules |

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

### 1. Node.js (v18 or higher recommended)

Download and install from [https://nodejs.org/](https://nodejs.org/)

Verify installation:
```bash
node --version    # Should output v18.x.x or higher
npm --version     # Should output 9.x.x or higher
```

### 2. Git

Download from [https://git-scm.com/](https://git-scm.com/)

Verify:
```bash
git --version
```

### 3. Code Editor

We recommend **Visual Studio Code** — [https://code.visualstudio.com/](https://code.visualstudio.com/)

**Recommended VS Code Extensions:**
- **Tailwind CSS IntelliSense** — autocompletion for Tailwind classes
- **ESLint** — inline lint error highlighting
- **Prettier** — code formatting (optional)
- **TypeScript Importer** — auto-imports for TS modules

---

## Getting Started — Clone & Install

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd "Kyrant-Wears 2.0"
```

> Replace `<repository-url>` with the actual GitHub URL (e.g., `https://github.com/your-username/kyrant-wears-2.0.git`).

### Step 2: Install dependencies

```bash
npm install
```

This will install all packages listed in `package.json` into the `node_modules/` folder. The install typically takes 30–60 seconds depending on your network speed.

> **Note:** If you encounter permission errors on Windows, try running your terminal as Administrator. On macOS/Linux, prefix with `sudo` if needed.

---

## Running the Dev Server

```bash
npm run dev
```

This starts Vite's development server with Hot Module Replacement (HMR).

The terminal will output something like:

```
  VITE v7.3.1  ready in 500ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open **http://localhost:5173/** in your browser. Any code changes you save will instantly reflect in the browser without a full page reload.

---

## Building for Production

```bash
npm run build
```

This does two things:
1. Runs the TypeScript compiler (`tsc -b`) to type-check all files
2. Builds an optimized production bundle via Vite into the `dist/` folder

To preview the production build locally:

```bash
npm run preview
```

This serves the `dist/` folder on a local server (usually `http://localhost:4173/`).

---

## Project Structure

```
Kyrant-Wears 2.0/
│
├── public/                          # Static assets served as-is
│   ├── assets/                      # All images, icons, and illustrations
│   │   ├── BANNER@3x.png           # Dashboard hero banner background
│   │   ├── Caps@3x.png             # Product category images
│   │   ├── Hoodies@3x.png
│   │   ├── iphone-case@3x.png
│   │   ├── Tote-bags@3x.png
│   │   ├── Tshirts@3x.png
│   │   ├── merged-asset-1@2x.png   # Product/design card images (1–12)
│   │   ├── Mask-group*.png/svg     # Hero + auth page decorative images
│   │   ├── popular-product*.png    # Popular Products section images
│   │   ├── Facebook.svg            # Social media icons
│   │   ├── Instagram.svg
│   │   ├── Twitter.svg
│   │   ├── Youtube.svg
│   │   ├── Tiktok.svg
│   │   └── ...                     # ~75 total image/icon assets
│   └── vite.svg                    # Default Vite favicon
│
├── src/                             # Application source code
│   ├── main.tsx                     # React entry point — mounts <App /> to #root
│   ├── App.tsx                      # Root component — BrowserRouter + all Routes
│   ├── index.css                    # Global CSS — Google Fonts, Tailwind v4 imports, base resets
│   │
│   ├── pages/                       # Page-level components (one per route)
│   │   ├── LandingPage.tsx          # Home page — Hero, How It Works, Popular Products, FAQ
│   │   ├── OnboardingPage.tsx       # Role selection — "I'm a Designer" / "I'm a Merchant"
│   │   ├── DesignerSignupPage.tsx   # Designer registration form
│   │   ├── DesignerLoginPage.tsx    # Designer login form
│   │   ├── MerchantSignupPage.tsx   # Merchant registration form
│   │   ├── MerchantLoginPage.tsx    # Merchant login form
│   │   └── DashboardPage.tsx        # Main storefront dashboard — products, designs, categories
│   │
│   └── components/                  # Reusable UI components
│       ├── Header.tsx               # Top navbar — brand wordmark, pill navigation, auth buttons
│       ├── NavButton.tsx            # Reusable LOGIN / SIGN UP button (used in Header)
│       ├── LogoBadge.tsx            # Circular "K" logo badge — clickable, navigates to /dashboard
│       ├── Footer.tsx               # Full footer — brand info, link columns, social icons, legal
│       ├── HeroSection.tsx          # Landing hero — tagline, description, CTA, decorative images
│       ├── CtaButton.tsx            # Large "Sign up" call-to-action button
│       ├── HowItWorks.tsx           # Process steps section (Shoppers: 4 steps, Designers: 3 steps)
│       ├── StepCard.tsx             # Individual step card inside HowItWorks
│       ├── PopularProducts.tsx      # Product showcase with decorative oval background
│       ├── ProductCard.tsx          # Single product card (T-shirts, Hoodies, etc.)
│       ├── FaqSection.tsx           # FAQ accordion section
│       ├── FaqItem.tsx              # Single collapsible FAQ item
│       ├── RoleCard.tsx             # Clickable role card (Designer / Merchant) on onboarding
│       ├── BestSellingProductCard.tsx # Product card for Dashboard best-sellers section
│       ├── DesignCard.tsx           # Anime design card with wishlist icon (Dashboard)
│       └── ProductCategoryCard.tsx  # Category card (iPhone Case, Tote Bags, etc.) on Dashboard
│
├── Backend/                         # Backend directory (placeholder — not yet implemented)
│
├── tailwind.config.js               # Tailwind theme — custom colors, fonts, spacing, breakpoints
├── vite.config.ts                   # Vite config — React + Tailwind plugins
├── tsconfig.json                    # TypeScript project references
├── tsconfig.app.json                # TS config for app source code
├── tsconfig.node.json               # TS config for Vite/Node config files
├── eslint.config.js                 # ESLint flat config
├── index.html                       # HTML entry point — mounts /src/main.tsx
├── package.json                     # Dependencies, scripts, project metadata
└── package-lock.json                # Lockfile — exact dependency versions
```

---

## Pages & Routes

The app uses **React Router DOM** for client-side navigation. All routes are defined in `src/App.tsx`:

| Route | Page Component | Description |
|---|---|---|
| `/` | `LandingPage` | Home page — Hero section, How it Works, Popular Products, FAQ, Footer |
| `/onboarding` | `OnboardingPage` | Role selection screen — choose "Designer" or "Merchant" |
| `/signup/designer` | `DesignerSignupPage` | Designer registration form (name, email, phone, password) |
| `/login/designer` | `DesignerLoginPage` | Designer login form (email, password) |
| `/signup/merchant` | `MerchantSignupPage` | Merchant registration form |
| `/login/merchant` | `MerchantLoginPage` | Merchant login form |
| `/dashboard` | `DashboardPage` | Main storefront — best-selling products, designs, product categories |

### Navigation Flow

```
Landing Page (/)
  ├── Header "LOGIN" button ──────────► /onboarding
  ├── Header "SIGN UP" button ────────► /onboarding
  ├── Hero "Sign up" CTA ────────────► /onboarding
  └── LogoBadge "K" click ───────────► /dashboard
  
Onboarding (/onboarding)
  ├── "I'm a Designer" card ──────────► /signup/designer
  └── "I'm a Merchant" card ─────────► /signup/merchant

Designer Signup (/signup/designer)
  └── "Already have an account?" ─────► /login/designer

Designer Login (/login/designer)
  └── "Don't have an account?" ───────► /signup/designer

Merchant Signup (/signup/merchant)
  └── "Already have an account?" ─────► /login/merchant

Merchant Login (/login/merchant)
  └── "Don't have an account?" ───────► /signup/merchant

Dashboard (/dashboard)
  └── "Kyrant" wordmark click ────────► / (Landing Page)
```

---

## Components Overview

### Landing Page Components
| Component | File | Used In | Purpose |
|---|---|---|---|
| `Header` | `Header.tsx` | LandingPage | Top navigation with brand name, pill nav links, auth buttons |
| `NavButton` | `NavButton.tsx` | Header | Reusable styled button for LOGIN / SIGN UP |
| `LogoBadge` | `LogoBadge.tsx` | Header, DashboardPage | Circular "K" brand badge — navigates to `/dashboard` |
| `HeroSection` | `HeroSection.tsx` | LandingPage | Hero area with tagline, description text, CTA button, decorative images |
| `CtaButton` | `CtaButton.tsx` | HeroSection | Large call-to-action "Sign up" button |
| `HowItWorks` | `HowItWorks.tsx` | LandingPage | Two-part process section (Shoppers + Designers) |
| `StepCard` | `StepCard.tsx` | HowItWorks | Individual numbered step card |
| `PopularProducts` | `PopularProducts.tsx` | LandingPage | Product showcase section with oval background decoration |
| `ProductCard` | `ProductCard.tsx` | PopularProducts | Individual product card (image + name) |
| `FaqSection` | `FaqSection.tsx` | LandingPage | Accordion FAQ section |
| `FaqItem` | `FaqItem.tsx` | FaqSection | Single expandable/collapsible FAQ entry |
| `Footer` | `Footer.tsx` | LandingPage, DashboardPage | Full-width footer with links, socials, legal text |

### Auth & Onboarding Components
| Component | File | Used In | Purpose |
|---|---|---|---|
| `RoleCard` | `RoleCard.tsx` | OnboardingPage | Clickable card for Designer / Merchant role selection |

### Dashboard Components
| Component | File | Used In | Purpose |
|---|---|---|---|
| `BestSellingProductCard` | `BestSellingProductCard.tsx` | DashboardPage | Product card with image, name, seller, price, variant info |
| `DesignCard` | `DesignCard.tsx` | DashboardPage | Anime/art design card with wishlist heart icon |
| `ProductCategoryCard` | `ProductCategoryCard.tsx` | DashboardPage | Background-image category card (Caps, Hoodies, etc.) |

---

## Styling & Theming

### Tailwind CSS v4

This project uses **Tailwind CSS v4** with the Vite plugin (`@tailwindcss/vite`). The configuration is in `tailwind.config.js`.

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `darkslategray-100` | `#16302b` | Primary background (dark green) |
| `darkslateblue` | `#694873` | Accent purple (nav pills, highlights) |
| `wheat-100` | `#ece4b7` | Primary text color + light backgrounds |
| `sienna` | `#91422a` | Merchant-theme accent (burnt red) |
| `sandybrown` | `#f89153` | Warm accent |
| `chocolate` | `#fe7f2d` | CTA / button accent (orange) |

### Custom Fonts (loaded via Google Fonts in `index.css`)

| Font Family | Tailwind Class | Usage |
|---|---|---|
| Pacifico | `font-pacifico` | Brand wordmark "Kyrant" |
| Bricolage Grotesque | `font-bricolage-grotesque` | Section headings, nav labels |
| Inter | `font-inter` | Body text, general UI |
| Inter 28pt | `font-inter-28pt` | Cards, form labels, secondary text |
| Tanker | `font-tanker` | Decorative / display text |

### Custom Font Sizes

The project defines specific font sizes (not the default Tailwind scale):

| Class | Size |
|---|---|
| `text-num-12` | 12px |
| `text-num-13` | 13px |
| `text-num-14` | 14px |
| `text-num-17` | 17px |
| `text-num-18` | 18px |
| `text-num-20` | 20px |
| `text-num-32` | 32px |
| `text-num-40` | 40px |

---

## Static Assets

All images and icons live in `public/assets/`. They are referenced in components via absolute paths like `/assets/filename.png`.

**Asset naming conventions:**
- `@2x` / `@3x` — Retina-resolution images
- `Mask-group*.png` — Decorative masked images used on auth + hero pages
- `merged-asset-*.png` — Product/design card images (Dashboard)
- `popular-product*.png` — Landing page product showcase images
- `*.svg` — Icons (social media, UI icons)

> **Important:** These assets are NOT in `src/assets/` — they are in `public/assets/` and served statically by Vite. Do not import them as modules; reference them as `/assets/filename.ext`.

---

## Responsive Breakpoints

The app is fully responsive with custom breakpoints defined in `tailwind.config.js`:

| Breakpoint | Min Width | Target |
|---|---|---|
| (default) | 0px | Mobile phones (375px+) |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1200px | Small desktops / laptops |
| `xl:` | 1440px | Full desktop (design reference) |

### Responsive strategy used across all components:
- **Mobile-first** approach — base styles target the smallest screen, then scale up with `sm:`, `md:`, `lg:`, `xl:` prefixes
- Fixed pixel widths replaced with `w-full sm:w-[fixed]` or `max-w-full lg:max-w-[fixed]`
- Typography scales with breakpoints (e.g., `text-[36px] sm:text-[48px] md:text-[64px]`)
- Decorative images hidden on mobile with `hidden md:block` or `hidden lg:block`
- Card grids use CSS Grid with responsive columns (e.g., `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`)

---

## Linting

```bash
npm run lint
```

Runs ESLint with TypeScript and React-specific rules across all `.ts` and `.tsx` files.

---

## Troubleshooting

### `npm install` fails

- Make sure you're running **Node.js v18+** (`node --version`)
- Delete `node_modules/` and `package-lock.json`, then re-run `npm install`:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- On Windows, if you get `EPERM` errors, close VS Code and any terminals using the folder, then retry

### Dev server won't start

- Check if port 5173 is already in use. Kill the process or use a different port:
  ```bash
  npm run dev -- --port 3000
  ```

### Tailwind classes not applying

- Make sure `tailwind.config.js` is present at the project root
- Verify `index.css` contains the Tailwind v4 imports (`@import "tailwindcss/..."`)
- Restart the dev server after making config changes

### Fonts not loading

- The project loads 5 Google Fonts via `@import url(...)` in `src/index.css`
- These require an **internet connection** to load
- If fonts appear as fallbacks, check your network / firewall settings

### Build errors

- Run `npx tsc --noEmit` to see TypeScript errors in isolation
- Check that all image paths referenced in components exist in `public/assets/`

---

## Contributing

### Branch Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes, commit with clear messages:
   ```bash
   git add .
   git commit -m "feat: add shopping cart functionality"
   ```
3. Push and open a Pull Request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Conventions

- **Components:** Functional components with `FunctionComponent` type from React
- **File naming:** PascalCase for components (`HeroSection.tsx`), pages (`DashboardPage.tsx`)
- **Styling:** Tailwind utility classes only — no separate CSS modules or styled-components
- **Routing:** All routes defined centrally in `src/App.tsx`
- **Assets:** All static images go in `public/assets/`, referenced as `/assets/filename`
- **Types:** Use TypeScript interfaces/types for all component props

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across all TS/TSX files |

---

## License

This project is private and not licensed for public distribution.

---

*Built with React 19, TypeScript, Tailwind CSS v4, and Vite 7.*
