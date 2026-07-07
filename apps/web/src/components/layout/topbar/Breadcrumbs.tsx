
/**
 * @file components/layout/topbar/Breadcrumbs.tsx
 * @description Sellora Application Shell — Breadcrumb Trail
 *
 * Renders a chevron-separated trail. The final item is always the current
 * page and is rendered as non-interactive text (not a link) with
 * aria-current="page" — this matches WAI-ARIA breadcrumb pattern guidance:
 * the last item represents "where you are," not somewhere to navigate to.
 *
 * On narrow viewports, only the last TWO items are shown with a leading
 * ellipsis trigger that (when clicked) reveals the full trail — prevents
 * breadcrumbs from wrapping or overflowing on tablet widths.
 */
 
'use client';
 
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '../layout.types';
 
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Collapse to "... > Parent > Current" below this item count. @default 3 */
  collapseThreshold?: number;
}
 
export function Breadcrumbs({ items, collapseThreshold = 3 }: BreadcrumbsProps) {
  const [expanded, setExpanded] = useState(false);
 
  if (items.length === 0) return null;
 
  const shouldCollapse = items.length > collapseThreshold && !expanded;
  const visibleItems = shouldCollapse
    ? [items[0], ...items.slice(-2)]
    : items;
 
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1 min-w-0">
        {shouldCollapse && (
          <>
            <BreadcrumbLink item={visibleItems[0]} />
            <Separator />
            <li>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-label="Show full breadcrumb path"
                className={cn(
                  'flex items-center justify-center size-5 rounded-[var(--radius-xs)]',
                  'text-[var(--color-text-muted)]',
                  'transition-colors duration-[var(--duration-fast)]',
                  'hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]',
                  'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
                )}
              >
                <MoreHorizontalIcon className="size-3.5" aria-hidden="true" />
              </button>
            </li>
            <Separator />
            {visibleItems.slice(1).map((item, i) => (
              <React.Fragment key={`${item.label}-${i}`}>
                <BreadcrumbLink item={item} isLast={i === visibleItems.length - 2} />
                {i < visibleItems.length - 2 && <Separator />}
              </React.Fragment>
            ))}
          </>
        )}
 
        {!shouldCollapse &&
          visibleItems.map((item, i) => (
            <React.Fragment key={`${item.label}-${i}`}>
              <BreadcrumbLink item={item} isLast={i === visibleItems.length - 1} />
              {i < visibleItems.length - 1 && <Separator />}
            </React.Fragment>
          ))}
      </ol>
    </nav>
  );
}
 
function Separator() {
  return (
    <li aria-hidden="true" className="shrink-0">
      <ChevronRightIcon className="size-3.5 text-[var(--color-text-disabled)]" />
    </li>
  );
}
 
function BreadcrumbLink({ item, isLast }: { item: BreadcrumbItem; isLast?: boolean }) {
  const isCurrent = isLast || !item.href;
 
  if (isCurrent) {
    return (
      <li className="min-w-0">
        <span
          aria-current="page"
          className="block truncate text-[13px] font-medium text-[var(--color-text)]"
        >
          {item.label}
        </span>
      </li>
    );
  }
 
  return (
    <li className="min-w-0">
      <Link
        href={item.href!}
        className={cn(
          'block truncate text-[13px] text-[var(--color-text-muted)]',
          'transition-colors duration-[var(--duration-fast)]',
          'hover:text-[var(--color-text)]',
          'rounded-[var(--radius-xs)] outline-none',
          'focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}
 