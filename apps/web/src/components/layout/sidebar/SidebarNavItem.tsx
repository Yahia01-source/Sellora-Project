"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import type { NavItem } from "../layout.types";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  depth?: number;
}

const BADGE_CLASSES: Record<string, string> = {
  default: "bg-[var(--color-bg-emphasis)] text-[var(--color-text-secondary)]",
  primary: "bg-[var(--color-primary)] text-white",
  danger:  "bg-[var(--color-danger)] text-white",
  success: "bg-[var(--color-success)] text-white",
  warning: "bg-[var(--color-warning)] text-white",
};

export function SidebarNavItem({ item, isActive, depth = 0 }: SidebarNavItemProps) {
  const { state, isMobile, setMobileOpen } = useSidebar();
  const collapsed = !isMobile && state === "collapsed";

  const badgeLabel = item.badge
    ? `, ${item.badge.content}${typeof item.badge.content === "number" ? " unread" : ""}`
    : "";

  return (
    <Link
      href={item.href ?? "#"}
      aria-current={isActive ? "page" : undefined}
      aria-label={`${item.label}${badgeLabel}`}
      title={collapsed ? item.label : undefined}
      onClick={() => { if (isMobile) setMobileOpen(false); }}
      className={cn(
        "group relative flex items-center gap-2.5",
        "rounded-[var(--radius-md)] px-2.5 py-2",
        "text-[13px] font-normal",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]",
        collapsed && "justify-center px-0 size-9 mx-auto",
        depth > 0 && !collapsed && "pl-9",
        isActive
          ? "bg-[var(--color-selected)] text-[var(--color-primary)] font-medium"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]",
      )}
    >
      {isActive && !collapsed && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-r-full bg-[var(--color-primary)]"
        />
      )}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center [&_svg]:size-[18px]",
          isActive
            ? "text-[var(--color-primary)]"
            : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]",
        )}
      >
        {item.icon}
      </span>
      {!collapsed && (
        <>
          <span className="flex-1 min-w-0 truncate">{item.label}</span>
          {item.badge && (
            <span
              aria-hidden="true"
              className={cn(
                "shrink-0 inline-flex items-center justify-center",
                "min-w-[18px] h-[18px] px-1 rounded-full",
                "text-[10px] font-semibold leading-none tabular-nums",
                BADGE_CLASSES[item.badge.tone ?? "default"],
              )}
            >
              {item.badge.content}
            </span>
          )}
        </>
      )}
      {collapsed && item.badge && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1 right-1 size-2 rounded-full ring-2 ring-[var(--color-surface)]",
            item.badge.tone === "danger" ? "bg-[var(--color-danger)]" : "bg-[var(--color-primary)]",
          )}
        />
      )}
    </Link>
  );
}
