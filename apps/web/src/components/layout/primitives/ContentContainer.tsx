
/**
 * @file components/layout/shell/ContentContainer.tsx
 * @description Sellora Application Shell — Content Layout Primitives
 *
 * Three small, composable primitives used on every dashboard page:
 *
 * ContentContainer — applies the dashboard max-width (1440px) and
 *   responsive horizontal padding. This is what keeps text/content from
 *   stretching edge-to-edge on ultra-wide monitors.
 *
 * ContentGrid — a thin wrapper around CSS grid using the 12-column system
 *   defined in the design foundation (--grid-gutter). Pages compose their
 *   own column spans on top of this.
 *
 * PageWrapper — the outermost per-page wrapper combining ContentContainer
 *   with consistent vertical rhythm (padding-block). Almost every page's
 *   root element should be a PageWrapper.
 */
 
import React from 'react';
import { cn } from '@/lib/utils';
 
// ─── CONTENT CONTAINER ────────────────────────────────────────────────────────
 
interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Disable the max-width constraint for full-bleed content (e.g., tables). */
  fullBleed?: boolean;
}
 
export function ContentContainer({
  children,
  className,
  fullBleed = false,
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        !fullBleed && 'max-w-[var(--content-max-w)]',
        'px-4 md:px-6 lg:px-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
 
// ─── CONTENT GRID ─────────────────────────────────────────────────────────────
 
interface ContentGridProps {
  children: React.ReactNode;
  className?: string;
  /** Total columns at the lg breakpoint and above. @default 12 */
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
}
 
const COLUMN_CLASS: Record<NonNullable<ContentGridProps['columns']>, string> = {
  1:  'lg:grid-cols-1',
  2:  'lg:grid-cols-2',
  3:  'lg:grid-cols-3',
  4:  'lg:grid-cols-4',
  6:  'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
};
 
export function ContentGrid({ children, className, columns = 12 }: ContentGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4',
        COLUMN_CLASS[columns],
        className,
      )}
    >
      {children}
    </div>
  );
}
 
// ─── PAGE WRAPPER ─────────────────────────────────────────────────────────────
 
interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
}
 
export function PageWrapper({ children, className, fullBleed = false }: PageWrapperProps) {
  return (
    <ContentContainer fullBleed={fullBleed} className={cn('py-6 lg:py-8', className)}>
      {children}
    </ContentContainer>
  );
}
 