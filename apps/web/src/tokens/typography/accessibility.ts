
/**
 * @file tokens/typography/accessibility.ts
 * @description Sellora Typography System — Accessibility, Contrast & Readability Rules
 *
 * WCAG COMPLIANCE TARGET: AA (minimum) with AAA where practical
 * WCAG 2.1 / 2.2 relevant criteria:
 *   1.4.3  Contrast (Minimum) — AA: 4.5:1 normal, 3:1 large text
 *   1.4.4  Resize Text — up to 200% without assistive tech
 *   1.4.8  Visual Presentation — line spacing 1.5x, paragraph spacing 2x
 *   1.4.10 Reflow — no horizontal scroll at 320px
 *   1.4.11 Non-text Contrast — 3:1 for UI components
 *   1.4.12 Text Spacing — no loss with custom spacing
 *   2.4.11 Focus Appearance (Enhanced) — AA 2022
 */
 
// ─── CONTRAST RATIOS (on white #FFFFFF background) ───────────────────────────
/**
 * These are actual calculated contrast ratios for Sellora's color palette.
 * Use this table when choosing text color for any given context.
 *
 * FORMULA: (L1 + 0.05) / (L2 + 0.05) where L = relative luminance
 */
 
export const contrastRatios = {
  // On white background (#FFFFFF)
  onWhite: {
    'gray-950 (#030712)': { ratio: 19.5, passesAA: true, passesAAA: true,  notes: 'Primary text — maximum contrast' },
    'gray-900 (#111827)': { ratio: 16.8, passesAA: true, passesAAA: true,  notes: 'Heading text — excellent' },
    'gray-800 (#1F2937)': { ratio: 12.6, passesAA: true, passesAAA: true,  notes: 'Dark body text' },
    'gray-700 (#374151)': { ratio: 9.0,  passesAA: true, passesAAA: true,  notes: 'Secondary text' },
    'gray-600 (#4B5563)': { ratio: 6.5,  passesAA: true, passesAAA: false, notes: 'Muted text — safe for normal text' },
    'gray-500 (#6B7280)': { ratio: 4.6,  passesAA: true, passesAAA: false, notes: 'BORDERLINE — use at 14px+ ONLY' },
    'gray-400 (#9CA3AF)': { ratio: 2.9,  passesAA: false,passesAAA: false, notes: 'FAILS AA — disabled state only' },
    'blue-600 (#2563EB)': { ratio: 5.9,  passesAA: true, passesAAA: false, notes: 'Links — passes AA at all sizes' },
    'blue-700 (#1D4ED8)': { ratio: 7.6,  passesAA: true, passesAAA: true,  notes: 'Link hover — passes AAA' },
    'red-600 (#E11D48)':  { ratio: 4.6,  passesAA: true, passesAAA: false, notes: 'Error text — BORDERLINE at small sizes' },
    'red-700 (#BE123C)':  { ratio: 6.2,  passesAA: true, passesAAA: false, notes: 'Error text — preferred for safety' },
    'green-700 (#15803D)':{ ratio: 5.3,  passesAA: true, passesAAA: false, notes: 'Success text' },
    'amber-700 (#B45309)':{ ratio: 4.7,  passesAA: true, passesAAA: false, notes: 'Warning text — BORDERLINE' },
    'amber-800 (#92400E)':{ ratio: 6.4,  passesAA: true, passesAAA: false, notes: 'Warning text — use this instead of 700' },
  },
} as const;
 
// ─── MINIMUM FONT SIZE RULES ──────────────────────────────────────────────────
 
export const minimumFontSizeRules = {
  /**
   * NEVER use below 10px in any browser context.
   * Chrome's minimum font size enforcement is typically 6px but renders
   * sub-12px as nearly unreadable for users with standard vision.
   */
  absoluteMinimum: '10px',   // 0.625rem — only for decorative numbering
 
  /**
   * Minimum for readable content text.
   * Caption (12px) is the smallest content text in Sellora.
   * Below this, you need to reconsider the design, not shrink the font.
   */
  contentMinimum: '12px',    // 0.75rem — captions, timestamps
 
  /**
   * Minimum for interactive elements (WCAG 2.4.11).
   * Buttons, links, and clickable text must be at least this size.
   */
  interactiveMinimum: '14px', // 0.875rem — body
 
  /**
   * WCAG large text threshold.
   * Text at or above this size has RELAXED contrast requirements (3:1 vs 4.5:1).
   */
  largeTextThreshold: {
    normal:    '18px',        // 1.125rem — 18px normal weight = large text
    bold:      '14px',        // 0.875rem — 14px bold = large text (WCAG exception)
  },
} as const;
 
// ─── LINE LENGTH (MEASURE) RULES ──────────────────────────────────────────────
 
export const measureRules = {
  /**
   * Optimal reading line length: 45-75 characters.
   * At 14px Inter, ~65ch = ~560px content width.
   *
   * For dashboard prose (descriptions, empty states, modal body):
   * max-width: 65ch — enforced via max-w-prose or max-w-[65ch]
   *
   * For table cells: no max-width — truncate with text-ellipsis instead.
   * For headings: no max-width — let them fill naturally.
   */
  prose:    '65ch',       // Ideal for paragraph text
  compact:  '45ch',       // Tight descriptions, notification text
  wide:     '80ch',       // Settings page descriptions, long form content
  unbounded: 'none',      // Tables, headings, data cells
} as const;
 
// ─── LINE HEIGHT REQUIREMENTS (WCAG 1.4.8) ───────────────────────────────────
 
export const lineHeightRules = {
  /**
   * WCAG 1.4.8 requires:
   * - Line height at least 1.5 times the font size
   * - Paragraph spacing at least 2 times the font size
   * - No horizontal scrolling at 320px viewport
   *
   * Sellora EXCEEDS this requirement for body text (uses 1.5).
   * Headings use tighter line height (1.25) which is exempt for large text.
   */
  body:      1.5,    // WCAG minimum = 1.5 — we match exactly
  heading:   1.25,   // Allowed for large text (H1-H4)
  display:   1.1,    // Display numbers — very tight, no text wrapping expected
  caption:   1.5,    // Small text needs full line height
} as const;
 
// ─── TEXT SPACING OVERRIDES (WCAG 1.4.12) ───────────────────────────────────
/**
 * WCAG 1.4.12: No loss of content when user overrides these values:
 * - line-height to 1.5x font-size
 * - letter-spacing to 0.12x font-size
 * - word-spacing to 0.16x font-size
 * - spacing following paragraphs to 2x font-size
 *
 * Sellora tests with these overrides applied. No content should clip or truncate.
 */
 
// ─── READABILITY RULES ───────────────────────────────────────────────────────
 
export const readabilityRules = {
  /**
   * ANTI-PATTERNS to never use in Sellora:
   */
  neverDo: [
    'Never use font-weight: 300 (light) for body text on screen — too thin for readability',
    'Never use all-caps for body text longer than 3 words',
    'Never use italic for body text (use for quotes and code comments only)',
    'Never use letter-spacing negative on body text (only on headings/display)',
    'Never center-align body text longer than 1 line in a dashboard context',
    'Never use gray-400 or lighter for text that conveys meaning (only decorative)',
    'Never set text smaller than 12px for content that conveys information',
    'Never rely on color alone to convey meaning (add icon or shape)',
    'Never use text contrast below 4.5:1 for normal text',
    'Never underline text that is not a link',
    'Never use more than 3 font weights in a single component',
    'Never mix fontFamily.sans and fontFamily.mono in a single paragraph',
  ],
 
  /**
   * BEST PRACTICES:
   */
  alwaysDo: [
    'Use max-w-prose (65ch) for all paragraph text blocks',
    'Use tabular-nums (tnum) for all financial data and numeric columns',
    'Use text-ellipsis + max-width for truncation in tables, never text wrapping',
    'Test at 400% zoom — all content must remain accessible',
    'Ensure focus state is visible with focus-visible pseudo-class',
    'Use aria-label when icon-only buttons have no visible text',
    'Test with macOS "Increase Contrast" mode enabled',
    'Left-align all text in LTR contexts (avoid justify — creates uneven word spacing)',
    'Use meaningful heading hierarchy (H1 → H2 → H3, never skip levels)',
    'Ensure all form labels are visually AND programmatically associated with inputs',
    'Test with Windows High Contrast mode — do not rely on box-shadow for borders',
  ],
} as const;
 
// ─── HEADING HIERARCHY RULES ─────────────────────────────────────────────────
 
export const headingRules = {
  /**
   * MANDATORY RULES for heading usage in Sellora:
   */
  rules: [
    'ONE H1 per page — the page title in the top content area',
    'H2 only for major page sections (not inside cards)',
    'H3 is the default card/panel/modal heading',
    'H4 for sub-sections within cards and form sections',
    'H5 for compact contexts: sidebar, dense widgets',
    'H6 for structural labels: table headers when styled as headings, filter groups',
    'Never skip heading levels (H1 → H3 without H2 is invalid)',
    'Headings must describe the content that follows them — not be decorative',
    'Never use bold body text as a heading substitute — use semantic heading elements',
    'Headings must be visible without CSS (test in reader mode)',
  ],
} as const;
 
// ─── PARAGRAPH RULES ─────────────────────────────────────────────────────────
 
export const paragraphRules = {
  rules: [
    'Maximum line length: 65ch (max-w-prose) for reading comfort',
    'Paragraph spacing: margin-bottom of 1em (same as font-size) between paragraphs',
    'No indent on first paragraph — only on continuation paragraphs in long form',
    'Line height: 1.5 minimum for body, 1.625 for descriptions and modal text',
    'Do not justify text — use text-left for all dashboard content',
    'Orphans: avoid single words on the last line (use text-balance for short text)',
    'Maximum 3 consecutive paragraphs before a visual break (heading, list, divider)',
  ],
} as const;
 
// ─── LIST RULES ──────────────────────────────────────────────────────────────
 
export const listRules = {
  rules: [
    'Unordered lists: 14px Inter Normal — disc or custom bullet (never • Unicode directly)',
    'Ordered lists: 14px Inter Normal — numerals with right-align on number',
    'List item line height: 1.5 (same as body)',
    'Nested list: indent 24px, reduce to bodySmall (13px) for sub-items',
    'List items in feature descriptions: use checkmarks, not bullets',
    'Never more than 2 levels of nesting in UI lists (use flat architecture)',
    'Empty list: show empty state message, not empty <ul>',
    'Definition lists (dl/dt/dd): dt = label style, dd = body style, 8px gap',
  ],
} as const;
 
export type ContrastRatios = typeof contrastRatios;
export type ReadabilityRules = typeof readabilityRules;
 