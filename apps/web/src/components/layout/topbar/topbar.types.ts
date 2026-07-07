import type { ReactNode } from "react";

export type NotificationCategory =
  | "order"
  | "product"
  | "customer"
  | "system"
  | "payment"
  | "delivery"
  | "all";

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
  href?: string;
  icon?: ReactNode;
  category: NotificationCategory;
}

export interface NotificationCenterProps {
  notifications: NotificationItem[];
  loading?: boolean;
  onMarkAllRead?: () => void;
  onMarkRead?: (id: string) => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onViewAll?: () => void;
}

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

export interface SearchTriggerProps {
  onOpen: () => void;
  compact?: boolean;
  recentSearches?: RecentSearch[];
  onClearRecentSearches?: () => void;
}

export interface LanguageOption {
  code: string;
  nativeLabel: string;
  englishLabel: string;
  dir: "ltr" | "rtl";
  flag?: string;
}

export interface ProfileMenuSection {
  id: string;
  items: ProfileMenuItem[];
}

export interface ProfileMenuItem {
  id: string;
  label: string;
  href?: string;
  icon: ReactNode;
  shortcut?: string;
  onClick?: () => void;
  danger?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  shortcut?: string;
}

export interface KeyboardShortcutGroup {
  id: string;
  label: string;
  shortcuts: KeyboardShortcut[];
}

export interface KeyboardShortcut {
  keys: string[];
  description: string;
}

export type ColorScheme = "light" | "dark" | "system";

export interface ThemeConfig {
  colorScheme: ColorScheme;
  darkModeEnabled: boolean;
}
