
/**
 * @file tokens/typography/contexts.ts
 * @description Sellora Typography System — Context-Specific Rules
 *
 * These tokens define typography rules for specific UI contexts.
 * Instead of making devs memorize which style goes where,
 * each context has explicit, named rules.
 *
 * Usage:
 *   import { typographyContexts } from '@/tokens/typography/contexts';
 *   // Use typographyContexts.table.header for table column headers
 */
 
import { typeScale } from './scale';
 
export const typographyContexts = {
 
  // ══════════════════════════════════════════════════════════════════
  // DASHBOARD TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  /**
   * Dashboard contexts are optimized for SCANNING, not reading.
   * Users don't read dashboards — they scan for numbers, trends, anomalies.
   * Typography must support rapid visual parsing.
   */
  dashboard: {
    /** Page title — "Dashboard", "Overview" */
    pageTitle:       typeScale.h1,
    /** Section grouping — "Performance", "Recent Activity" */
    sectionTitle:    typeScale.h2,
    /** Widget/card title — "Revenue", "Orders Today" */
    widgetTitle:     typeScale.h3,
    /** KPI primary number — the big metric value */
    metricPrimary:   typeScale.displayM,
    /** KPI label — "Total Revenue", "New Customers" */
    metricLabel:     typeScale.overline,
    /** KPI change indicator — "+12.4% vs last month" */
    metricChange:    typeScale.caption,
    /** Widget body text */
    body:            typeScale.body,
    /** Timestamps, "Updated 2m ago" */
    timestamp:       typeScale.caption,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // TABLE TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  /**
   * Tables are the heart of Sellora — order lists, product catalogs,
   * customer lists. Typography must maximize density while maintaining
   * readability. Every pixel counts here.
   *
   * RULE: Never exceed 14px in a table. 13px for secondary cells.
   * RULE: Column headers ALWAYS use overline style (uppercase + wide tracking).
   * RULE: Numeric values ALWAYS use numeric style (tabular figures).
   */
  table: {
    /** Column header — "ORDER ID", "CUSTOMER", "STATUS", "AMOUNT" */
    header:          typeScale.overline,
    /** Primary cell content — customer name, product title */
    cellPrimary:     typeScale.body,
    /** Secondary cell content — email, description snippet */
    cellSecondary:   typeScale.bodySmall,
    /** Price/amount columns */
    cellNumeric:     typeScale.numeric,
    /** Order ID, SKU, tracking number */
    cellCode:        typeScale.code,
    /** Status badge text — "Delivered", "Pending" */
    cellStatus:      typeScale.label,
    /** Row action — "View", "Edit" */
    rowAction:       typeScale.bodySmall,
    /** Pagination — "Showing 1-25 of 1,204" */
    pagination:      typeScale.caption,
    /** Empty state — "No orders found" */
    emptyState:      typeScale.bodyLarge,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // FORM TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  /**
   * Forms need extreme clarity — unclear labels cause errors.
   * RULE: Label always ABOVE the input, never inside as placeholder.
   * RULE: Helper text always below, always in bodySmall.
   * RULE: Error messages always in bodySmall with danger color.
   * RULE: Required indicator (*) same size as label.
   */
  form: {
    /** Form section header — "Shipping Address", "Payment Info" */
    sectionHeader:   typeScale.h4,
    /** Sub-section — "Contact Details" */
    subSection:      typeScale.h5,
    /** Field label — "Email Address", "Phone Number" */
    label:           typeScale.label,
    /** Field value (what the user typed) */
    inputValue:      typeScale.body,
    /** Placeholder text */
    placeholder:     typeScale.body,       // Same size, gray-400 color
    /** Helper text below input */
    helperText:      typeScale.bodySmall,
    /** Error message */
    errorMessage:    typeScale.bodySmall,  // red-600 color
    /** Character count — "120/250" */
    characterCount:  typeScale.caption,
    /** Select option text */
    selectOption:    typeScale.body,
    /** Required asterisk (*) */
    required:        typeScale.label,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // SIDEBAR / NAVIGATION TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  /**
   * Sidebar typography must work at two widths:
   * - Expanded (240px): icon + label visible
   * - Collapsed (64px): icon only
   *
   * Navigation items are read quickly, not carefully.
   * Weight differentiation signals active vs inactive state.
   *
   * RULE: Inactive nav = Normal weight
   * RULE: Active nav = Medium weight + primary color
   * RULE: Section labels = Overline (uppercase, wide tracking)
   */
  sidebar: {
    /** Nav section label — "MAIN", "SETTINGS", "REPORTS" */
    sectionLabel:    typeScale.overline,
    /** Inactive nav item — "Orders", "Products", "Customers" */
    navItem:         typeScale.body,
    /** Active nav item */
    navItemActive:   typeScale.bodyMedium,
    /** Nav sub-item (nested) */
    navSubItem:      typeScale.bodySmall,
    /** Active sub-item */
    navSubItemActive: typeScale.bodyMedium,  // but bodySmall size via override
    /** Notification count badge */
    badge:           typeScale.label,
    /** Keyboard shortcut hint — "⌘O" */
    shortcut:        typeScale.caption,
    /** Sidebar footer — user name */
    footerName:      typeScale.bodyMedium,
    /** Sidebar footer — user email */
    footerEmail:     typeScale.caption,
    /** Store switcher — store name */
    storeName:       typeScale.bodyMedium,
    /** Store switcher — plan badge */
    storePlan:       typeScale.label,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // CARD TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  card: {
    /** Card title */
    title:           typeScale.h3,
    /** Card subtitle / description */
    description:     typeScale.bodyLarge,
    /** Card body content */
    body:            typeScale.body,
    /** Card metadata — dates, tags */
    meta:            typeScale.caption,
    /** Card section header */
    sectionHeader:   typeScale.h5,
    /** Card footer */
    footer:          typeScale.bodySmall,
    /** Card action link */
    action:          typeScale.bodyMedium,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // METRIC / KPI CARDS
  // ══════════════════════════════════════════════════════════════════
  /**
   * Metric cards are the most scanned elements on any dashboard.
   * The number must be impossible to miss.
   * The label must be unmistakably descriptive.
   * The trend must be instantly interpretable.
   */
  metric: {
    /** The big number — "$24,890" or "1,204" */
    value:           typeScale.displayM,
    /** What it measures — "Total Revenue", "Orders" */
    label:           typeScale.overline,
    /** Trend text — "+12.4%" */
    trend:           typeScale.bodySmall,
    /** Trend context — "vs. last 30 days" */
    trendContext:    typeScale.caption,
    /** Sparkline label */
    sparklineLabel:  typeScale.caption,
    /** Currency symbol — "$", "MAD" */
    currency:        typeScale.h4,          // Slightly smaller than the number
  },
 
  // ══════════════════════════════════════════════════════════════════
  // CHART TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  /**
   * Charts need minimal text — let the visual do the work.
   * Text in charts must be SMALL — it's supplementary, not primary.
   * RULE: Chart text is never bold — bold competes with the data visualization.
   * RULE: Axis labels are always caption or overline.
   */
  chart: {
    /** Chart title — "Revenue Over Time" */
    title:           typeScale.h4,
    /** Chart subtitle */
    subtitle:        typeScale.bodySmall,
    /** X-axis label — "Jan", "Feb", date values */
    axisX:           typeScale.caption,
    /** Y-axis label — "$0", "$10k" */
    axisY:           typeScale.caption,
    /** Axis title — "Month", "Revenue (MAD)" */
    axisTitle:       typeScale.overline,
    /** Data point label on chart */
    dataLabel:       typeScale.caption,
    /** Legend item text */
    legend:          typeScale.bodySmall,
    /** Tooltip primary value */
    tooltipValue:    typeScale.bodyMedium,
    /** Tooltip label */
    tooltipLabel:    typeScale.caption,
    /** No data message */
    emptyState:      typeScale.bodyLarge,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // BUTTON TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  /**
   * RULE: Button labels are NEVER all-caps in Sellora.
   * WHY: All-caps labels feel aggressive and scream-y in a professional context.
   * Shopify, Stripe, Linear — all use sentence case for buttons.
   *
   * RULE: Button text is ALWAYS semibold — it signals "this is an action".
   */
  button: {
    /** Large button label */
    large:           typeScale.bodyMedium,  // 14px / 500
    /** Default button label */
    default:         typeScale.bodyMedium,  // 14px / 500
    /** Small button label */
    small:           typeScale.bodySmall,   // 13px / 500 (override weight)
    /** Icon button tooltip */
    tooltip:         typeScale.caption,
    /** Destructive/confirm dialog button */
    destructive:     typeScale.bodyMedium,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // INPUT TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  input: {
    /** Value the user types */
    value:           typeScale.body,
    /** Placeholder */
    placeholder:     typeScale.body,       // Same size, different color
    /** Prefix/suffix — "$", "MAD", ".com" */
    addon:           typeScale.body,
    /** Dropdown selected value */
    selected:        typeScale.bodyMedium,
    /** Search input query */
    search:          typeScale.body,
    /** Tags inside multi-select */
    tag:             typeScale.label,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // MODAL / DRAWER TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  modal: {
    /** Modal title */
    title:           typeScale.h3,
    /** Modal description/lead text */
    description:     typeScale.bodyLarge,
    /** Modal body content */
    body:            typeScale.body,
    /** Section header inside modal */
    sectionHeader:   typeScale.h5,
    /** Confirmation modal warning text */
    warning:         typeScale.body,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // EMPTY STATE TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  emptyState: {
    /** Primary message — "No orders yet" */
    title:           typeScale.h3,
    /** Description — "When customers place orders, they'll appear here." */
    description:     typeScale.bodyLarge,
    /** Action hint — "Create your first product to get started" */
    hint:            typeScale.body,
  },
 
  // ══════════════════════════════════════════════════════════════════
  // NOTIFICATION / TOAST TYPOGRAPHY
  // ══════════════════════════════════════════════════════════════════
  notification: {
    /** Toast title — "Order Updated" */
    title:           typeScale.bodyMedium,
    /** Toast body — "Order #1042 has been marked as delivered." */
    body:            typeScale.bodySmall,
    /** Notification badge count */
    badge:           typeScale.label,
    /** Notification timestamp */
    time:            typeScale.caption,
  },
 
} as const;
 
export type TypographyContext = typeof typographyContexts;
export type TypographyContextKey = keyof TypographyContext;
 