/**
 * @file components/layout/SidebarSearch.tsx
 * @description Sellora Application Shell  Sidebar Search Trigger
 */
 
'use client';
 
import React from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';
 
interface SidebarSearchProps {
  onOpenCommandPalette: () => void;
}
 
export function SidebarSearch({ onOpenCommandPalette }: SidebarSearchProps) {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';
 
  return (
    <div className="px-2 mb-1">
      <button
        type="button"
        onClick={onOpenCommandPalette}
        aria-label="Search Sellora (Command K)"
        className={cn(
          'w-full flex items-center gap-2',
          'rounded-[var(--radius-md)] px-2.5 py-1.5',
          'border border-[var(--color-border)]',
          'bg-[var(--color-bg-subtle)]',
          'text-[var(--color-text-muted)]',
          'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          'hover:bg-[var(--color-bg-muted)] hover:border-[var(--color-border-strong)]',
          'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
          collapsed && 'justify-center px-0 py-2',
        )}
      >
        <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left text-[13px]">Search...</span>
            <kbd
              className={cn(
                'shrink-0 inline-flex items-center gap-0.5',
                'rounded-[var(--radius-xs)] border border-[var(--color-border-strong)]',
                'bg-[var(--color-surface)] px-1.5 py-0.5',
                'text-[11px] font-medium text-[var(--color-text-muted)]',
                'font-mono',
              )}
            >
              ?K
            </kbd>
          </>
        )}
      </button>
    </div>
  );
}
