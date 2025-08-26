# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Installation and Setup
```bash
# Install dependencies
npm install

# Install with clean install (recommended after pulling changes)
npm ci
```

### Development Server
```bash
# Start development server on port 3000
npm run dev

# Development server runs at http://localhost:3000
```

### Building and Production
```bash
# Build for production
npm run build

# Start production server on port 3000
npm start
```

### Asset Management
```powershell
# Flatten assets from raw_site directory (PowerShell on Windows)
.\scripts\flatten_assets.ps1

# This copies and renames media files from ../raw_site/assets/media to ./public/assets/flat
```

### Environment Variables
Create a `.env.local` file for local development:
```env
RESEND_API_KEY=your_resend_api_key_here
TO_EMAIL=contact_email@example.com
```

## Architecture Overview

### Multi-Language Next.js Application
This is an internationalized Next.js 14 application for Turnes Makina, a precision machining company. The app supports three languages: Turkish (default), English, and German.

### Key Architectural Components

#### 1. Internationalization (i18n)
- **Routing Strategy**: URL-based locale prefixes (`/tr`, `/en`, `/de`)
- **Middleware**: Automatically redirects root paths to default locale (Turkish)
- **Dictionary System**: JSON-based content management in `/content` directory
- **Dynamic Metadata**: SEO metadata changes based on active locale

#### 2. Directory Structure
```
app/
├── [locale]/          # Dynamic locale routing
│   ├── layout.tsx     # Locale-specific layout with NavBar and Footer
│   ├── page.tsx       # Home page
│   ├── hakkimizda/    # About page
│   ├── urunler/       # Products page
│   ├── kalite/        # Quality page
│   ├── makine-parkuru/# Machine park page
│   └── iletisim/      # Contact page
├── api/
│   └── send/          # Email API endpoint using Resend
├── layout.tsx         # Root layout (fallback)
└── globals.css        # Global styles with Tailwind
```

#### 3. Component Architecture
- **Client Components**: Interactive elements using `"use client"` directive
  - NavBar with scroll effects and language switcher
  - 3D animations using React Three Fiber
  - Contact forms with client-side validation
  
- **Server Components**: Static content and data fetching
  - Page layouts with dictionary fetching
  - SEO metadata generation
  - Static content rendering

#### 4. Styling System
- **Tailwind CSS**: Primary styling framework with custom configuration
- **Custom Theme Colors**: Brand colors defined in `tailwind.config.ts`
  ```js
  brand: {
    DEFAULT: "#0f5d7f",
    light: "#4a90a0",
    dark: "#0b455e"
  }
  ```
- **Glass Morphism**: Backdrop blur effects for modern UI
- **Framer Motion**: Advanced animations and transitions

#### 5. Data Flow
```
1. User visits /{locale}/page
2. Middleware validates locale, redirects if needed
3. Layout fetches dictionary for locale
4. Dictionary passed to components as props
5. Components render localized content
```

#### 6. Email Integration
- Uses Resend API for contact form submissions
- Includes mock mode when API keys are not configured
- Custom email template with React Email components

## Key Files and Their Purposes

- `middleware.ts`: Handles locale routing and redirects
- `lib/i18n.ts`: Defines available locales and default locale
- `lib/get-dictionary.ts`: Async function to load locale-specific content
- `content/*.json`: Translation files for each locale
- `components/NavBar.tsx`: Main navigation with language switcher
- `components/LangSwitcher.tsx`: Language selection component
- `app/api/send/route.ts`: Email sending API endpoint

## Development Notes

### Adding a New Page
1. Create directory under `app/[locale]/your-page/`
2. Add `page.tsx` with dictionary fetching
3. Update navigation in `components/NavBar.tsx`
4. Add translations to all `content/*.json` files

### Adding a New Language
1. Add locale to `lib/i18n.ts` locales array
2. Create `content/{locale}.json` with all translations
3. Update middleware locale check
4. Add flag icon to `public/icons/{locale}.svg`
5. Update `lib/get-dictionary.ts` switch statement

### Working with 3D Components
- Uses React Three Fiber (`@react-three/fiber`) and Drei (`@react-three/drei`)
- 3D components should be wrapped with lazy loading for performance
- Keep 3D scenes simple for mobile performance

### Image Optimization
- Use Next.js Image component for automatic optimization
- Store images in `public/assets/` directory
- Configure remote patterns in `next.config.mjs` for external images

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` maps to project root
- JSON module imports enabled
