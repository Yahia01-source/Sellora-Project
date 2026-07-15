import React from 'react';
/**
 * @file components/dashboard/dashboard.types.ts
 * @description Sellora Dashboard â€” Complete Type Definitions
 */

// â”€â”€â”€ WELCOME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface WelcomeData {
  userName: string;
  storeName: string;
  currentDate: string;
  todayOrders: number;
  todayRevenue: number;
  currency: string;
  pendingActions: number;
}

// â”€â”€â”€ KPI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type KpiTone = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type TrendDirection = 'up' | 'down' | 'neutral';

export interface KpiCardData {
  id: string;
  label: string;
  value: number;
  displayValue: string;
  change: number;
  trend: TrendDirection;
  trendLabel?: string;
  tone?: KpiTone;
  isCurrency?: boolean;
  currency?: string;
  sparkline?: number[];
  icon?: React.ReactNode;
}

// â”€â”€â”€ ORDERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'returned'
  | 'cancelled'
  | 'failed';

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  itemCount: number;
  createdAt: string;
  city?: string;
}

// â”€â”€â”€ CUSTOMERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface RecentCustomer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  currency: string;
  lastOrderAt: string;
  isNew?: boolean;
  avatarUrl?: string;
}

// â”€â”€â”€ PRODUCTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface TopProduct {
  id: string;
  name: string;
  sku?: string;
  imageUrl?: string;
  unitsSold: number;
  revenue: number;
  currency: string;
  trend: TrendDirection;
  trendPercent: number;
  rank: number;
}
// â”€â”€â”€ CITIES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface TopCity {
  id: string;
  name: string;
  orderCount: number;
  revenue: number;
  currency: string;
  sharePercent: number;
}

// â”€â”€â”€ ACTIVITY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type ActivityType =
  | 'order_placed'
  | 'order_confirmed'
  | 'order_delivered'
  | 'order_returned'
  | 'order_cancelled'
  | 'customer_added'
  | 'payment_received'
  | 'product_added'
  | 'product_updated';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: string;
  actor?: string;
  avatarUrl?: string;
  href?: string;
}

// â”€â”€â”€ NOTIFICATIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'danger';

export interface SmartNotification {
  id: string;
  severity: NotificationSeverity;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  timestamp: string;
  read: boolean;
  dismissible?: boolean;
}

// â”€â”€â”€ GOALS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type GoalStatus = 'on_track' | 'at_risk' | 'behind' | 'achieved';

export interface BusinessGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  status: GoalStatus;
  deadline?: string;
}

// â”€â”€â”€ EMPLOYEES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface EmployeePerformance {
  id: string;
  name: string;
  role: string;
  ordersHandled: number;
  deliveryRate: number;
  avgResponseTime: string;
  rating: number;
  avatarUrl?: string;
}

// â”€â”€â”€ CHARTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut';

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface ChartConfig {
  id: string;
  title: string;
  description?: string;
  period?: string;
  type: ChartType;
  color?: string;
  secondaryColor?: string;
  data: ChartDataPoint[];
}

// â”€â”€â”€ AI INSIGHTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface AiInsight {
  id: string;
  headline: string;
  body: string;
  confidence: number;
  action?: {
    label: string;
    href: string;
  };
  generatedAt: string;
}

// â”€â”€â”€ DASHBOARD DATA (root) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

export type KpiTrend = TrendDirection;
