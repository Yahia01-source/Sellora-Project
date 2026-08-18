'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useSidebar } from './SidebarContext';
import type { Workspace } from '../layout.types';

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  onSwitch: (workspaceId: string) => void;
  onCreateNew?: () => void;
}

function WorkspaceAvatar({ workspace, size = 'md' }: { workspace: Workspace; size?: 'sm' | 'md' }) {
  const dims = size === 'sm' ? 'size-5 text-[11px]' : 'size-6 text-[13px]';
  return (
    <div className={cn('flex items-center justify-center shrink-0 rounded-[var(--radius-sm)] font-semibold uppercase select-none tracking-wider text-white bg-[var(--color-primary)]', dims)}>
      {workspace.name.substring(0, 2)}
    </div>
  );
}

export function WorkspaceSwitcher({ workspaces, activeWorkspaceId, onSwitch:_onSwitch, onCreateNew:_onCreateNew }: WorkspaceSwitcherProps) {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  if (!activeWorkspace) return null;

  return (
    <div ref={containerRef} className="relative px-2 py-2 shrink-0">
      <button type="button" onClick={() => setIsOpen((prev: boolean) => !prev)} aria-haspopup="listbox" aria-expanded={isOpen} className={cn('w-full flex items-center gap-2 rounded-[var(--radius-md)] p-1.5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-hover)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]', collapsed && 'justify-center p-0 size-9 mx-auto')}>
        <WorkspaceAvatar workspace={activeWorkspace} />
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <span className="block text-[13px] font-medium text-[var(--color-text)] truncate">{activeWorkspace.name}</span>
              <span className="block text-[11px] text-[var(--color-text-muted)] truncate">{activeWorkspace.plan} plan</span>
            </div>
            <ChevronsUpDownIcon className="size-4 text-[var(--color-text-muted)] shrink-0" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}
