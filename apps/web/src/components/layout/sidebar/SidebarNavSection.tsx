'use client';
import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';
import { SidebarNavItem } from './SidebarNavItem';
import type { NavSection } from '../layout.types';

interface SidebarNavSectionProps {
  section: NavSection;
  isItemActive: (item: import('../layout.types').NavItem) => boolean;
}

export function SidebarNavSection({ section, isItemActive }: SidebarNavSectionProps) {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';
  const [open, setOpen] = useState(!section.defaultCollapsed);
  const effectiveOpen = collapsed ? true : open;
  const canToggle = section.collapsible && !collapsed;

  return (
    <div className="px-2 py-1">
      {section.label && !collapsed && (
        <div className="flex items-center px-2.5 mb-1">
          {canToggle ? (
            <button type="button" onClick={() => setOpen((p) => !p)} aria-expanded={effectiveOpen} className={cn('flex items-center gap-1 w-full py-1 -mx-1 px-1 rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-hover)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]')}>
              <span className="type-overline text-[var(--color-text-muted)] flex-1 text-left">{section.label}</span>
              <ChevronDownIcon className={cn('size-3 text-[var(--color-text-muted)] shrink-0 transition-transform duration-[var(--duration-fast)]', !effectiveOpen && '-rotate-90')} aria-hidden="true" />
            </button>
          ) : (
            <span className="type-overline text-[var(--color-text-muted)]">{section.label}</span>
          )}
        </div>
      )}
      {effectiveOpen && (
        <nav aria-label={section.label ?? 'Navigation'} className="flex flex-col gap-0.5">
          {section.items.map((item) => (
            <SidebarNavItem key={item.id} item={item} isActive={isItemActive(item)} />
          ))}
        </nav>
      )}
    </div>
  );
}
