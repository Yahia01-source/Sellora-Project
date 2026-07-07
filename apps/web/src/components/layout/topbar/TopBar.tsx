/**
 * @file components/layout/topbar/TopBar.tsx
 * @description Sellora Application Shell — Main Top Navigation Bar
 *
 * Fixed-height (56px, --topnav-height) sticky header. Three zones:
 *   LEFT:   mobile menu trigger (mobile only) + breadcrumbs
 *   CENTER: global search trigger (hidden on mobile — sidebar search +
 *           the compact icon variant cover that case instead)
 *   RIGHT:  notifications, language, profile
 *
 * The TopBar does NOT know about sidebar width/state — it lives inside
 * the ContentArea's flow (see Shell.tsx), so it's automatically offset
 * correctly without any coordinate math here.
 */
 
'use client';
 
import React from 'react';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '../sidebar/SidebarContext';
import { Breadcrumbs } from './Breadcrumbs';
import { GlobalSearchTrigger } from './GlobalSearchTrigger';
import { NotificationCenter } from './NotificationCenter';
import { LanguageSwitcher } from './LanguageSwitcher';
import { UserProfileMenu } from './UserProfileMenu';
import type {
  BreadcrumbItem,
  CurrentUser,
  LanguageOption,
  NotificationItem,
} from '../layout.types';
 
interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
  user: CurrentUser;
  notifications: NotificationItem[];
  languages: LanguageOption[];
  activeLanguageCode: string;
  onOpenCommandPalette: () => void;
  onMarkAllNotificationsRead?: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onLanguageChange: (language: LanguageOption) => void;
  onSignOut: () => void;
  /** Optional right-aligned slot for page-specific actions (e.g., a primary CTA). */
  actions?: React.ReactNode;
}
 
export function TopBar({
  breadcrumbs,
  user,
  notifications,
  languages,
  activeLanguageCode,
  onOpenCommandPalette,
  onMarkAllNotificationsRead,
  onNotificationClick,
  onLanguageChange,
  onSignOut,
  actions,
}: TopBarProps) {
  const { isMobile, setMobileOpen } = useSidebar();
 
  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-sticky)] shrink-0',
        'flex items-center gap-3',
        'h-[var(--topnav-height)] px-4 lg:px-6',
        'bg-[var(--color-surface)]/95 backdrop-blur-sm',
        'border-b border-[var(--color-border)]',
      )}
    >
      {/* LEFT ZONE */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {isMobile && (
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className={cn(
              'flex items-center justify-center shrink-0 size-9 rounded-[var(--radius-md)]',
              'text-[var(--color-text-secondary)]',
              'transition-colors duration-[var(--duration-fast)]',
              'hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]',
              'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
            )}
          >
            <MenuIcon className="size-5" aria-hidden="true" />
          </button>
        )}
        <Breadcrumbs items={breadcrumbs} />
      </div>
 
      {/* CENTER ZONE — search (hidden on mobile, sidebar handles it there) */}
      <div className="hidden md:flex flex-1 max-w-[420px] justify-center">
        <GlobalSearchTrigger onOpen={onOpenCommandPalette} />
      </div>
      {/* Mobile-only compact search icon */}
      <div className="md:hidden">
        <GlobalSearchTrigger onOpen={onOpenCommandPalette} compact />
      </div>
 
      {/* RIGHT ZONE */}
      <div className="flex items-center gap-1 shrink-0 flex-1 justify-end">
        {actions && <div className="mr-2 hidden lg:flex items-center gap-2">{actions}</div>}
        <NotificationCenter
          notifications={notifications}
          onMarkAllRead={onMarkAllNotificationsRead}
          onNotificationClick={onNotificationClick}
        />
        <LanguageSwitcher
          languages={languages}
          activeCode={activeLanguageCode}
          onChange={onLanguageChange}
        />
        <div className="ml-1.5 pl-1.5 border-l border-[var(--color-border)]">
          <UserProfileMenu user={user} onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
}
 