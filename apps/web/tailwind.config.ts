
/**
 * tailwind.config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Sellora — Tailwind CSS v4 Configuration
 *
 * WHY THIS FILE IS MINIMAL:
 * Tailwind CSS v4 moves ALL configuration into CSS via the @theme directive.
 * This file only handles:
 *   1. Content paths for JIT class scanning
 *   2. Plugin registration (tailwindcss-animate for shadcn/ui)
 *
 * Everything else — colors, typography, spacing, radius, shadows, motion —
 * lives in globals.css as @theme { ... } variables.
 *
 * WHY THIS IS BETTER THAN v3:
 * In v3, you had to duplicate values between JS config and CSS variables.
 * In v4, @theme variables ARE the CSS custom properties AND the utility classes.
 * Define --color-primary: #2563EB once → you get bg-primary, text-primary,
 * border-primary utility classes automatically. Zero duplication.
 *
 * SCALABILITY:
 * Adding a new token = one line in globals.css.
 * No need to touch this file again unless adding a new plugin.
 */
 
import type { Config } from 'tailwindcss';
 
const config: Config = {
  // ── CONTENT SCANNING ───────────────────────────────────────────────────────
  // Tell Tailwind JIT which files to scan for utility class usage.
  // Only classes found here will be included in the production bundle.
  content: [
    // App source files
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Shared packages that export components using Tailwind classes
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}',
    // shadcn/ui components (if installed in the app)
    './src/components/ui/**/*.{js,ts,jsx,tsx}',
  ],
 
  // ── DARK MODE ──────────────────────────────────────────────────────────────
  // Architecture is ready. Dark mode is DISABLED now.
  // When enabling: change to 'class' and add dark: variants to globals.css
  // darkMode: 'class',
 
  // ── PLUGINS ────────────────────────────────────────────────────────────────
  plugins: [
    // Required by shadcn/ui for animations (accordion, dialog, etc.)
    // Provides: animate-accordion-down, animate-accordion-up, etc.
    require('tailwindcss-animate'),
  ],
};
 
export default config;
 
