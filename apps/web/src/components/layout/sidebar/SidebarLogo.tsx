'use client';
import React from 'react';
import Link from 'next/link';
import { SidebarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';

export function SidebarLogo() {
  const { state, isMobile, toggle } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';

  return (
    <div className={cn('flex items-center h-14 border-b border-[var(--color-border)] px-4', collapsed ? 'justify-center' : 'justify-between')}>
      {!collapsed && (
        <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--color-text)]">
          <span className="size-6 rounded bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">S</span>
          <span>Sellora</span>
        </Link>
      )}
      <button type="button" onClick={toggle} className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]">
        <SidebarIcon className="size-4" />
      </button>
    </div>
  );
}
