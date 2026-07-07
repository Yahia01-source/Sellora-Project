import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  TruckIcon,
  BarChart3Icon,
  WalletIcon,
  StoreIcon,
  SettingsIcon,
  PlugIcon,
} from "lucide-react";
import type { NavSection, NavItem } from "../layout.types";

export const navSections: NavSection[] = [
  {
    id: "main",
    label: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: <LayoutDashboardIcon />, exactMatch: true },
      { id: "orders", label: "Orders", href: "/orders", icon: <ShoppingCartIcon />, badge: { content: 12, tone: "primary" } },
      { id: "products", label: "Products", href: "/products", icon: <PackageIcon /> },
      { id: "customers", label: "Customers", href: "/customers", icon: <UsersIcon /> },
    ],
  },
  {
    id: "fulfillment",
    label: "Fulfillment",
    collapsible: true,
    items: [
      { id: "deliveries", label: "Deliveries", href: "/deliveries", icon: <TruckIcon />, badge: { content: "New", tone: "success" } },
      { id: "cod", label: "COD Reconciliation", href: "/cod-reconciliation", icon: <WalletIcon /> },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    collapsible: true,
    items: [
      { id: "analytics", label: "Analytics", href: "/analytics", icon: <BarChart3Icon /> },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    collapsible: true,
    defaultCollapsed: true,
    items: [
      { id: "storefront", label: "Storefront", href: "/storefront", icon: <StoreIcon /> },
      { id: "integrations", label: "Integrations", href: "/integrations", icon: <PlugIcon /> },
    ],
  },
];

export const bottomNavItems: NavItem[] = [
  { id: "settings", label: "Settings", href: "/settings", icon: <SettingsIcon /> },
];
