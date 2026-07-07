
/**
 * @file components/layout/shell/PageHeader.tsx
 * @description Sellora Application Shell — Page Header
 *
 * The standard header every dashboard page renders directly below the
 * TopBar: an H1 page title, optional description, and a right-aligned
 * actions slot (for page-level primary buttons — e.g., "Create Order").
 * This is intentionally separate from Breadcrumbs (which live IN the
 * TopBar) — PageHeader is page-body content, Breadcrumbs are chrome.
 */
 
import React from 'react';
import { cn } from '@/lib/utils';
 
interface PageHeaderProps {
  title: string;
  description?: string;
  /** Right-aligned slot — typically a Button or ButtonGroup from the Button System. */
  actions?: React.ReactNode;
  /** Optional element rendered before the title (e.g., a status badge). */
  eyebrow?: React.ReactNode;
  className?: string;
}
 
export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
        'pb-6 mb-6 border-b border-[var(--color-border)]',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && <div className="mb-1.5">{eyebrow}</div>}
        <h1 className="type-h1 text-[var(--color-text)] truncate">{title}</h1>
        {description && (
          <p className="type-body-lg text-[var(--color-text-muted)] mt-1.5 max-w-[65ch]">
            {description}
          </p>
        )}
      </div>
 
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}
 