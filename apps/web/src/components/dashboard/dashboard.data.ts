
/**
 * @file components/dashboard/dashboard.types.ts
 * @description Sellora Dashboard — Complete Type Definitions
 *
 * Single source of truth for every data shape used across the dashboard.
 * Widgets import from here; they never define their own inline interfaces.
 * This enables future API integration to change data shapes in one place.
 */
 
// ─── KPI ────────────────────────────────────────────────────────────────────
 
export type KpiTrend = 'up' | 'down' | 'neutral';
export type KpiTone = 'default' | 'success' | 'danger' | 'warning' | 'info';
 
export interface KpiCardData {
  id: string;
  label: string;
  value: string | number;
  /** Formatted display value (e.g. "1,204" or "94.2%") */
  displayValue: string;
  /** Percentage change vs prior period (e.g. 12.4) */
  change?: number;
  /** Direction of the change */
  trend?: KpiTrend;
  /** Context label for the trend (e.g. "vs last 30 days") */
  trendLabel?: string;
  tone?: KpiTone;
  /** Icon component */
  icon?: React.ReactNode;
  /** Whether this KPI is currency-based */
  isCurrency?: boolean;
  /** Currency code */
  currency?: string;
  /** Sparkline data points (last N periods) */
  sparkline?: number[];
}
 
// ─── ORDERS ──────────────────────────────────────────────────────────────────
 
export type OrderStatus =
  | 'new'
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'returned'
  | 'cancelled';
 
export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAvatar?: string;
  status: OrderStatus;
  /** Total in smallest currency unit */
  totalAmount: number;
  currency: string;
  itemCount: number;
  createdAt: string; // ISO
  city?: string;
}
 
// ─── CUSTOMERS ───────────────────────────────────────────────────────────────
 
export interface RecentCustomer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  avatarUrl?: string;
  totalOrders: number;
  totalSpent: number;
  currency: string;
  lastOrderAt: string; // ISO
  isNew?: boolean;
}
 
// ─── PRODUCTS ────────────────────────────────────────────────────────────────
 
export interface TopProduct {
  id: string;
  name: string;
  sku?: string;
  imageUrl?: string;
  unitsSold: number;
  revenue: number;
  currency: string;
  trend: KpiTrend;
  trendPercent: number;
  rank: number;
}
 
// ─── CITIES ──────────────────────────────────────────────────────────────────
 
export interface TopCity {
  id: string;
  name: string;
  country?: string;
  orderCount: number;
  revenue: number;
  currency: string;
  /** 0-100 share of total orders */
  sharePercent: number;
}
 
// ─── ACTIVITY ────────────────────────────────────────────────────────────────
 
export type ActivityType =
  | 'order_placed'
  | 'order_delivered'
  | 'order_returned'
  | 'customer_added'
  | 'product_added'
  | 'payment_received'
  | 'employee_added'
  | 'store_update'
  | 'system';
 
export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: string; // ISO
  /** User or entity that triggered the activity */
  actor?: string;
  actorAvatar?: string;
  href?: string;
  metadata?: Record<string, string | number>;
}
 
// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
 
export type NotificationSeverity = 'info' | 'success' | 'warning' | 'danger';
 
export interface SmartNotification {
  id: string;
  severity: NotificationSeverity;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  timestamp: string;
  read: boolean;
  /** Whether this notification can be dismissed */
  dismissible?: boolean;
}
 
// ─── GOALS ───────────────────────────────────────────────────────────────────
 
export type GoalStatus = 'on_track' | 'at_risk' | 'behind' | 'completed';
 
export interface BusinessGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string; // 'orders', 'MAD', '%', etc.
  status: GoalStatus;
  deadline?: string; // ISO
  icon?: React.ReactNode;
}
 
// ─── EMPLOYEES ───────────────────────────────────────────────────────────────
 
export interface EmployeePerformance {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  ordersHandled: number;
  deliveryRate: number; // 0-100
  avgResponseTime?: string;
  rating?: number; // 0-5
}
 
// ─── CHART ───────────────────────────────────────────────────────────────────
 
export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}
 
export type ChartPeriod = '7d' | '30d' | '90d' | '12m';
 
export interface ChartConfig {
  id: string;
  title: string;
  description?: string;
  period: ChartPeriod;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area';
  color?: string;
  secondaryColor?: string;
}
 
// ─── WELCOME ─────────────────────────────────────────────────────────────────
 
export interface WelcomeData {
  userName: string;
  storeName: string;
  /** ISO string */
  currentDate: string;
  /** Quick metrics for the welcome section */
  todayOrders: number;
  todayRevenue: number;
  currency: string;
  pendingActions: number;
}
 
// ─── AI INSIGHTS ─────────────────────────────────────────────────────────────
 
export interface AiInsight {
  id: string;
  headline: string;
  body: string;
  confidence?: number; // 0-100
  action?: { label: string; href: string };
  generatedAt: string;
}
 
// ─── DASHBOARD DATA AGGREGATE ────────────────────────────────────────────────
 
export interface DashboardData {
  welcome: WelcomeData;
  kpis: KpiCardData[];
  recentOrders: RecentOrder[];
  recentCustomers: RecentCustomer[];
  topProducts: TopProduct[];
  topCities: TopCity[];
  activity: ActivityItem[];
  notifications: SmartNotification[];
  goals: BusinessGoal[];
  employees: EmployeePerformance[];
  charts: ChartConfig[];
  aiInsights: AiInsight[];
}
 
export type DashboardLoadState = 'loading' | 'success' | 'error';
 