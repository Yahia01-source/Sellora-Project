'use client';
import React from 'react';
import Link from 'next/link';
import { HelpCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';
import { SidebarNavItem } from './SidebarNavItem';
import type { CurrentUser, NavItem } from '../layout.types';

interface SidebarFooterProps {
  bottomItems: NavItem[];
  isItemActive: (item: NavItem) => boolean;
  user: CurrentUser;
  onHelpClick?: () => void;
}

export function SidebarFooter({ bottomItems, isItemActive, user, onHelpClick }: SidebarFooterProps) {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';

  return (
    <div className="shrink-0 border-t border-[var(--color-border)] px-2 py-2">
      <nav aria-label="Settings and help" className="flex flex-col gap-0.5 mb-1">
        {bottomItems.map((item) => (
          <SidebarNavItem key={item.id} item={item} isActive={isItemActive(item)} />
        ))}
        <button type="button" onClick={onHelpClick} title={collapsed ? 'Help & Support' : undefined} aria-label="Help and support" className={cn('flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-[13px] text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)] outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]', collapsed && 'justify-center px-0 size-9 mx-auto')}>
          <HelpCircleIcon className="size-[18px] shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
          {!collapsed && <span>Help & Support</span>}
        </button>
      </nav>
      <Link href="/settings/account" aria-label={`Signed in as ${user.name}. Go to account settings.`} className={cn('flex items-center gap-2.5 rounded-[var(--radius-md)] px-2 py-1.5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-hover)] outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]', collapsed && 'justify-center px-0')}>
        <div className={cn('flex items-center justify-center shrink-0 size-7 rounded-full bg-[var(--color-bg-emphasis)] text-[var(--color-text-secondary)] text-[11px] font-semibold overflow-hidden')} aria-hidden="true">
          {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="size-full object-cover" /> : user.name.charAt(0).toUpperCase()}
        </div>
        {!collapsed && (
          <span className="flex-1 min-w-0">
            <span className="block text-[13px] font-medium text-[var(--color-text)] truncate">{user.name}</span>
            <span className="block text-[11px] text-[var(--color-text-muted)] truncate">{user.email}</span>
          </span>
        )}
      </Link>
    </div>
  );
}
