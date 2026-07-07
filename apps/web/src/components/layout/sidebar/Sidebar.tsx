'use client';
 
import React, { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { PanelLeftIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useSidebar } from './SidebarContext';
import { SidebarLogo } from './SidebarLogo';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { SidebarSearch } from './SidebarSearch';
import { SidebarNavSection } from './SidebarNavSection';
import { SidebarFooter } from './SidebarFooter';
import { navSections, bottomNavItems } from './nav-data';
import type { CurrentUser, NavItem, Workspace } from '../layout.types';
 
interface SidebarProps {
  user: CurrentUser;
  workspaces: Workspace[];
  activeWorkspaceId: string;
  onSwitchWorkspace: (workspaceId: string) => void;
  onCreateWorkspace?: () => void;
  onOpenCommandPalette: () => void;
  onHelpClick?: () => void;
}
 
function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.exactMatch) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
 
export function Sidebar({
  user,
  workspaces,
  activeWorkspaceId,
  onSwitchWorkspace,
  onCreateWorkspace,
  onOpenCommandPalette,
  onHelpClick,
}: SidebarProps) {
  const { state, isMobile, mobileOpen, setMobileOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const collapsed = !isMobile && state === 'collapsed';
 
  const checkActive = useCallback(
    (item: NavItem) => isNavItemActive(item, pathname),
    [pathname],
  );
 
  // -- MOBILE: overlay drawer + backdrop -------------------------------------
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {mobileOpen && (
          <div
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'fixed inset-0 z-[var(--z-overlay)]',
              'bg-[var(--color-bg-overlay)]',
              'animate-fade-in',
            )}
          />
        )}
 
        {/* Drawer */}
        <aside
          id="primary-navigation"
          aria-label="Primary navigation"
          className={cn(
            'fixed inset-y-0 left-0 z-[var(--z-modal)]',
            'w-[280px] flex flex-col',
            'bg-[var(--color-surface)] border-r border-[var(--color-border)]',
            'shadow-[var(--shadow-xl)]',
            'transition-transform duration-[var(--duration-normal)] ease-[var(--ease-in-out)]',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <SidebarLogo />
          <WorkspaceSwitcher
            workspaces={workspaces}
            activeWorkspaceId={activeWorkspaceId}
            onSwitch={onSwitchWorkspace}
            onCreateNew={onCreateWorkspace}
          />
          <SidebarSearch onOpenCommandPalette={onOpenCommandPalette} />
 
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-1">
            {navSections.map((section) => (
              <SidebarNavSection
                key={section.id}
                section={section}
                isItemActive={checkActive}
              />
            ))}
          </div>
 
          <SidebarFooter
            bottomItems={bottomNavItems}
            isItemActive={checkActive}
            user={user}
            onHelpClick={onHelpClick}
          />
        </aside>
      </>
    );
  }
 
  // -- DESKTOP/TABLET: in-flow collapsible sidebar ----------------------------
  return (
    <aside
      id="primary-navigation"
      aria-label="Primary navigation"
      className={cn(
        'relative flex flex-col shrink-0 h-full',
        'bg-[var(--color-surface)] border-r border-[var(--color-border)]',
        'transition-[width] duration-[var(--duration-normal)] ease-[var(--ease-in-out)]',
        collapsed ? 'w-[64px]' : 'w-[240px]',
      )}
    >
      <SidebarLogo />
 
      <WorkspaceSwitcher
        workspaces={workspaces}
        activeWorkspaceId={activeWorkspaceId}
        onSwitch={onSwitchWorkspace}
        onCreateNew={onCreateWorkspace}
      />
 
      <SidebarSearch onOpenCommandPalette={onOpenCommandPalette} />
 
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-1">
        {navSections.map((section) => (
          <SidebarNavSection
            key={section.id}
            section={section}
            isItemActive={checkActive}
          />
        ))}
      </div>
 
      <SidebarFooter
        bottomItems={bottomNavItems}
        isItemActive={checkActive}
        user={user}
        onHelpClick={onHelpClick}
      />
 
      {/* Collapse/expand toggle  floats on the sidebar's right edge */}
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'absolute top-[18px] -right-3 z-[var(--z-raised)]',
          'flex items-center justify-center size-6 rounded-full',
          'bg-[var(--color-surface)] border border-[var(--color-border)]',
          'text-[var(--color-text-muted)] shadow-[var(--shadow-xs)]',
          'transition-[colors,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          'hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]',
          'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
        )}
      >
        <PanelLeftIcon
          className={cn('size-3.5 transition-transform duration-[var(--duration-normal)]', collapsed && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
    </aside>
  );
}
