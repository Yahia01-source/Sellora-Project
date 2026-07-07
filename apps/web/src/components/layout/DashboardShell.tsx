'use client';
 
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { SidebarProvider, useSidebar } from './sidebar/SidebarContext';
import { Sidebar } from './sidebar/Sidebar';
import { TopBar } from './topbar/TopBar';
import { CommandPalette } from './command-palette/CommandPalette';
import { useCommandPalette } from './command-palette/useCommandPalette';
import type {
  BreadcrumbItem,
  CurrentUser,
  LanguageOption,
  NotificationItem,
  Workspace,
} from './layout.types';
 
export interface DashboardShellProps {
  children: React.ReactNode;
  user: CurrentUser;
  workspaces: Workspace[];
  activeWorkspaceId: string;
  breadcrumbs: BreadcrumbItem[];
  notifications: NotificationItem[];
  languages: LanguageOption[];
  activeLanguageCode: string;
  onSwitchWorkspace: (workspaceId: string) => void;
  onCreateWorkspace?: () => void;
  onMarkAllNotificationsRead?: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onLanguageChange: (language: LanguageOption) => void;
  onSignOut: () => void;
  onHelpClick?: () => void;
  /** Page-specific actions rendered in the TopBar (desktop only). */
  topBarActions?: React.ReactNode;
}
 
function DashboardShellInner(props: DashboardShellProps) {
  const {
    children,
    user,
    workspaces,
    activeWorkspaceId,
    breadcrumbs,
    notifications,
    languages,
    activeLanguageCode,
    onSwitchWorkspace,
    onCreateWorkspace,
    onMarkAllNotificationsRead,
    onNotificationClick,
    onLanguageChange,
    onSignOut,
    onHelpClick,
    topBarActions,
  } = props;
 
  const pathname = usePathname();
  const { setMobileOpen } = useSidebar();
  const commandPalette = useCommandPalette();
  const mainRef = useRef<HTMLElement>(null);
 
  // Close mobile drawer + move focus to main content on every route change
  useEffect(() => {
    setMobileOpen(false);
    mainRef.current?.focus();
  }, [pathname, setMobileOpen]);
 
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[var(--color-bg)]">
      {/* Skip link � first focusable element, per WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
 
      <Sidebar
        user={user}
        workspaces={workspaces}
        activeWorkspaceId={activeWorkspaceId}
        onSwitchWorkspace={onSwitchWorkspace}
        onCreateWorkspace={onCreateWorkspace}
        onOpenCommandPalette={commandPalette.toggle}
        onHelpClick={onHelpClick}
      />
 
      <div className="flex flex-col flex-1 min-w-0 h-dvh">
        <TopBar
          breadcrumbs={breadcrumbs}
          user={user}
          notifications={notifications}
          languages={languages}
          activeLanguageCode={activeLanguageCode}
          onOpenCommandPalette={commandPalette.toggle}
          onMarkAllNotificationsRead={onMarkAllNotificationsRead}
          onNotificationClick={onNotificationClick}
          onLanguageChange={onLanguageChange}
          onSignOut={onSignOut}
          actions={topBarActions}
        />
 
        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className={cn(
            'flex-1 min-h-0 overflow-y-auto',
            'outline-none',
          )}
        >
          {children}
        </main>
      </div>
 
      <CommandPalette open={commandPalette.open} onClose={commandPalette.close} />
    </div>
  );
}
 
export function DashboardShell(props: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardShellInner {...props} />
    </SidebarProvider>
  );
}
