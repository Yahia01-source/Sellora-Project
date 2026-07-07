"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { BellIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "../layout.types";

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkAllRead?: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
}

function formatRelativeTime(iso: string | undefined): string {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function NotificationCenter({
  notifications,
  onMarkAllRead,
  onNotificationClick,
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        className={cn(
          "relative flex items-center justify-center size-9 rounded-[var(--radius-md)]",
          "text-[var(--color-text-secondary)]",
          "transition-colors duration-[var(--duration-fast)]",
          "hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]",
          "outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]",
        )}
      >
        <BellIcon className="size-[18px]" aria-hidden="true" />
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[var(--color-danger)] ring-2 ring-[var(--color-surface)]"
          />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className={cn(
            "absolute right-0 top-full z-[var(--z-dropdown)] mt-2",
            "w-[360px] max-h-[480px] flex flex-col",
            "bg-[var(--color-surface)] border border-[var(--color-border)]",
            "rounded-[var(--radius-lg)] shadow-[var(--shadow-dropdown)]",
            "animate-scale-in origin-top-right",
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] shrink-0">
            <h2 className="text-[14px] font-semibold text-[var(--color-text)]">
              Notifications
            </h2>
            {unreadCount > 0 && onMarkAllRead && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-[12px] font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] outline-none focus-visible:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <BellIcon className="size-8 text-[var(--color-text-disabled)] mb-3" aria-hidden="true" />
                <p className="text-[13px] text-[var(--color-text-muted)]">
                  You are all caught up. New notifications will appear here.
                </p>
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => {
                  const itemClasses = cn(
                    "relative flex items-start gap-3 px-4 py-3 pl-6",
                    "transition-colors duration-[var(--duration-fast)]",
                    "hover:bg-[var(--color-bg-subtle)]",
                    "outline-none focus-visible:bg-[var(--color-bg-subtle)]",
                    !notification.read && "bg-[var(--color-primary-subtle)]/30",
                  );
                  const content = (
                    <>
                      {!notification.read && (
                        <span
                          aria-hidden="true"
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[var(--color-primary)]"
                        />
                      )}
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] font-medium text-[var(--color-text)] truncate">
                          {notification.title}
                        </span>
                        {notification.description && (
                          <span className="block text-[12px] text-[var(--color-text-muted)] line-clamp-2 mt-0.5">
                            {notification.description}
                          </span>
                        )}
                        <span className="block text-[11px] text-[var(--color-text-disabled)] mt-1">
                          {formatRelativeTime(notification.timestamp)}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={notification.id} className="border-b border-[var(--color-border-subtle)] last:border-0">
                      {notification.href ? (
                        <Link href={notification.href} onClick={() => { onNotificationClick?.(notification); close(); }} className={itemClasses}>
                          {content}
                        </Link>
                      ) : (
                        <button type="button" onClick={() => { onNotificationClick?.(notification); close(); }} className={cn("w-full text-left", itemClasses)}>
                          {content}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
