/**
 * @file tokens/typography/responsive.ts
 * @description Sellora Typography System — Responsive Rules
 *
 * PHILOSOPHY:
 * Sellora is a dashboard-first product. The PRIMARY design target is desktop
 * (1024px-1440px). Mobile is a graceful degradation for on-the-go order review.
 *
 * We use a FLUID approach for display/heading text and FIXED sizes for
 * body text. Body text NEVER scales down below 14px — that would hurt readability.
 *
 * BREAKPOINTS:
 *   mobile:  < 768px
 *   tablet:  768px - 1023px
 *   desktop: ≥ 1024px (PRIMARY)
 *   wide:    ≥ 1440px
 */
 
export const responsiveTypography = {
 
  // Scale down factor per breakpoint
  // desktop = 1x (base), tablet = 0.875x, mobile = 0.75x
  // Applied only to DISPLAY and HEADING styles, never to body
 
  displayXl: {
    desktop: { fontSize: '4rem' },      // 64px
    tablet:  { fontSize: '3rem' },      // 48px
    mobile:  { fontSize: '2.25rem' },   // 36px
  },
 
  displayL: {
    desktop: { fontSize: '3.5rem' },    // 56px
    tablet:  { fontSize: '2.5rem' },    // 40px
    mobile:  { fontSize: '2rem' },      // 32px
  },
 
  displayM: {
    desktop: { fontSize: '3rem' },      // 48px
    tablet:  { fontSize: '2.25rem' },   // 36px
    mobile:  { fontSize: '1.75rem' },   // 28px
  },
 
  h1: {
    desktop: { fontSize: '2.25rem' },   // 36px
    tablet:  { fontSize: '1.875rem' },  // 30px
    mobile:  { fontSize: '1.5rem' },    // 24px
  },
 
  h2: {
    desktop: { fontSize: '1.75rem' },   // 28px
    tablet:  { fontSize: '1.5rem' },    // 24px
    mobile:  { fontSize: '1.25rem' },   // 20px
  },
 
  h3: {
    desktop: { fontSize: '1.5rem' },    // 24px
    tablet:  { fontSize: '1.25rem' },   // 20px
    mobile:  { fontSize: '1.125rem' },  // 18px
  },
 
  h4: {
    desktop: { fontSize: '1.25rem' },   // 20px
    tablet:  { fontSize: '1.125rem' },  // 18px
    mobile:  { fontSize: '1rem' },      // 16px
  },
 
  h5: {
    desktop: { fontSize: '1rem' },      // 16px
    tablet:  { fontSize: '1rem' },      // 16px — no scaling
    mobile:  { fontSize: '0.9375rem' }, // 15px
  },
 
  h6: {
    desktop: { fontSize: '0.8125rem' }, // 13px
    tablet:  { fontSize: '0.8125rem' }, // 13px — no scaling
    mobile:  { fontSize: '0.75rem' },   // 12px
  },
 
  bodyXl: {
    desktop: { fontSize: '1.125rem' },  // 18px
    tablet:  { fontSize: '1rem' },      // 16px
    mobile:  { fontSize: '1rem' },      // 16px — do not scale down
  },
 
  bodyLarge: {
    desktop: { fontSize: '1rem' },      // 16px
    tablet:  { fontSize: '1rem' },      // 16px — fixed
    mobile:  { fontSize: '0.9375rem' }, // 15px
  },
 
  // BODY IS FIXED AT 14px — NEVER SCALES DOWN
  body: {
    desktop: { fontSize: '0.875rem' },  // 14px
    tablet:  { fontSize: '0.875rem' },  // 14px — FIXED
    mobile:  { fontSize: '0.875rem' },  // 14px — NEVER change this
  },
 
  caption: {
    desktop: { fontSize: '0.75rem' },   // 12px
    tablet:  { fontSize: '0.75rem' },   // 12px — fixed
    mobile:  { fontSize: '0.75rem' },   // 12px — MINIMUM size ever used
  },
 
  overline: {
    desktop: { fontSize: '0.6875rem' }, // 11px
    tablet:  { fontSize: '0.6875rem' }, // 11px — fixed
    mobile:  { fontSize: '0.625rem' },  // 10px — only for overline
  },
} as const;
 
// ─── RESPONSIVE TAILWIND CLASSES REFERENCE ───────────────────────────────────
// Use these patterns in components:
//
// H1: className="text-[24px] md:text-[30px] lg:text-[36px]"
// H2: className="text-[20px] md:text-[24px] lg:text-[28px]"
// H3: className="text-[18px] md:text-[20px] lg:text-[24px]"
// DisplayM: className="text-[28px] md:text-[36px] lg:text-[48px]"
// Body: className="text-[14px]"  ← NEVER add responsive modifier to body
//
// WHY inline sizes not utility classes:
// Tailwind v4 allows arbitrary values. Using explicit px values prevents
// confusion about which "text-xl" means what in context.
 
export type ResponsiveTypography = typeof responsiveTypography;
 