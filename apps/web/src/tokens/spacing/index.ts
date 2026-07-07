
/**
 * @file tokens/spacing/index.ts
 * @description Sellora Spacing System — Master Barrel Export
 */
 
export * from './primitives';
export * from './contexts';
export * from './responsive';
 
import { space, spaceAliases } from './primitives';
import { spacingContexts } from './contexts';
import { responsiveSpacing, gridRules, flexGapRules, whiteSpaceGuidelines, spacingBestPractices, marginRules } from './responsive';
 
/**
 * Master spacing object — single import for everything spacing-related.
 *
 * Usage:
 *   import { spacing } from '@/tokens/spacing';
 *   spacing.space[16]               // 1rem
 *   spacing.contexts.card.paddingDefault  // 1.5rem
 *   spacing.grid.gutter.desktop     // 1rem
 */
export const spacing = {
  /** Raw primitive scale values */
  space,
  /** Semantic aliases (xs, sm, md, lg, xl...) */
  aliases: spaceAliases,
  /** Context-specific semantic tokens */
  contexts: spacingContexts,
  /** Responsive breakpoint spacing values */
  responsive: responsiveSpacing,
  /** Grid system rules */
  grid: gridRules,
  /** Flex gap named patterns */
  flexGap: flexGapRules,
  /** White space principles and density guidelines */
  whiteSpace: whiteSpaceGuidelines,
  /** Margin-specific rules */
  margin: marginRules,
  /** Best practices reference */
  bestPractices: spacingBestPractices,
} as const;
 
export type Spacing = typeof spacing;
 