
/**
 * @file tokens/typography/index.ts
 * @description Sellora Typography System — Barrel Export
 */
 
export * from './scale';
export * from './contexts';
export * from './responsive';
export * from './accessibility';
 
// Master typography object
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, typeScale } from './scale';
import { typographyContexts } from './contexts';
import { responsiveTypography } from './responsive';
import {
  contrastRatios,
  minimumFontSizeRules,
  measureRules,
  lineHeightRules,
  readabilityRules,
  headingRules,
  paragraphRules,
  listRules,
} from './accessibility';
 
export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  scale:      typeScale,
  contexts:   typographyContexts,
  responsive: responsiveTypography,
  a11y: {
    contrast:    contrastRatios,
    minSizes:    minimumFontSizeRules,
    measure:     measureRules,
    lineHeight:  lineHeightRules,
    readability: readabilityRules,
    headings:    headingRules,
    paragraphs:  paragraphRules,
    lists:       listRules,
  },
} as const;
 
export type Typography = typeof typography;
 