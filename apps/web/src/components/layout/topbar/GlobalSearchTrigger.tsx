
/**
 * @file components/layout/topbar/GlobalSearchTrigger.tsx
 * @description Sellora Application Shell — TopBar Global Search Trigger
 *
 * A second entry point into the same Command Palette the sidebar search
 * opens (see SidebarSearch.tsx). Having two triggers is intentional:
 * the sidebar one is always visible at any sidebar width, while this
 * topbar one is what's reachable when the sidebar is fully hidden on
 * very small viewports. Both call the exact same onOpen callback —
 * single source of truth for "what opens the command palette."
 */
 
'use client';
 
import React from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
 
interface GlobalSearchTriggerProps {
  onOpen: () => void;
  /** Compact icon-only mode for narrow viewports. */
  compact?: boolean;
}
 
export function GlobalSearchTrigger({ onOpen, compact = false }: GlobalSearchTriggerProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label="Search Sellora (Command K)"
        className={cn(
          'flex items-center justify-center size-9 rounded-[var(--radius-md)]',
          'text-[var(--color-text-secondary)]',
          'transition-colors duration-[var(--duration-fast)]',
          'hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]',
          'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
        )}
      >
        <SearchIcon className="size-[18px]" aria-hidden="true" />
      </button>
    );
  }
 
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Search Sellora (Command K)"
      className={cn(
        'flex items-center gap-2 w-full max-w-[360px]',
        'rounded-[var(--radius-md)] px-3 py-1.5',
        'border border-[var(--color-border)] bg-[var(--color-bg-subtle)]',
        'text-[var(--color-text-muted)]',
        'transition-colors duration-[var(--duration-fast)]',
        'hover:bg-[var(--color-bg-muted)] hover:border-[var(--color-border-strong)]',
        'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
      )}
    >
      <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
      <span className="flex-1 text-left text-[13px]">
        Search orders, products, customers...
      </span>
      <kbd
        className={cn(
          'shrink-0 inline-flex items-center gap-0.5 font-mono',
          'rounded-[var(--radius-xs)] border border-[var(--color-border-strong)]',
          'bg-[var(--color-surface)] px-1.5 py-0.5',
          'text-[11px] font-medium text-[var(--color-text-muted)]',
        )}
      >
        ⌘K
      </kbd>
    </button>
  );
}
 