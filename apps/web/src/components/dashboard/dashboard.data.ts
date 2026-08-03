import type {
    WelcomeData,
    KpiCardData,
    TopProduct,
    RecentOrder,
    ActivityItem,
    AlertItem,
    SalesPoint,
    RevenueSummaryItem,
} from './dashboard.types';



export const welcomeData: WelcomeData = {
    userName: 'Abdeladim',
    storeName: 'Sellora Demo Store',
    currentDate: new Date().toISOString(),
    todayOrders: 24,
  todayRevenue: 842000, // centimes
    currency: 'MAD',
    pendingActions: 3,
};
export const kpiData: KpiCardData[] = [
    {
    id: 'orders',
    label: 'Orders',
    value: 124,
    displayValue: '124',
    trend: 'up',
    change: 12.5,
    },
    {
    id: 'revenue',
    label: 'Revenue',
    value: 245000,
    displayValue: '245,000 MAD',
    trend: 'up',
    change: 18.4,
    isCurrency: true,
    currency: 'MAD',
    },
    {
    id: 'customers',
    label: 'Customers',
    value: 82,
    displayValue: '82',
    trend: 'up',
    change: 6.2,
    },
    {
    id: 'conversion',
    label: 'Conversion',
    value: 4.2,
    displayValue: '4.2%',
    trend: 'down',
    change: 1.1,
    },
];
export const topProductsData: TopProduct[] = [
    {
    id: '1',
    name: 'Rolex Submariner',
    imageUrl: '',
    unitsSold: 124,
    revenue: 245000,
    currency: 'MAD',
    trend: 'up',
    trendPercent: 12,
    rank: 1,
    },
    {
    id: '2',
    name: 'Casio Vintage',
    imageUrl: '',
    unitsSold: 93,
    revenue: 182000,
    currency: 'MAD',
    trend: 'up',
    trendPercent: 8,
    rank: 2,
    },
    {
    id: '3',
    name: 'Tissot PRX',
    imageUrl: '',
    unitsSold: 71,
    revenue: 154000,
    currency: 'MAD',
    trend: 'down',
    trendPercent: 3,
    rank: 3,
    },
];
export const recentOrdersData: RecentOrder[] = [
    {
    id: '1',
    orderNumber: '#SLR-1001',
    customerName: 'Ahmed Benali',
    status: 'confirmed',
    totalAmount: 450,
    currency: 'MAD',
    itemCount: 2,
    createdAt: '2026-07-15',
    city: 'Casablanca',
    },
    {
    id: '2',
    orderNumber: '#SLR-1002',
    customerName: 'Sara Amrani',
    status: 'confirmed',
    totalAmount: 280,
    currency: 'MAD',
    itemCount: 1,
    createdAt: '2026-07-15',
    city: 'Rabat',
    },
    {
    id: '3',
    orderNumber: '#SLR-1003',
    customerName: 'Youssef Alaoui',
    status: 'delivered',
    totalAmount: 920,
    currency: 'MAD',
    itemCount: 4,
    createdAt: '2026-07-14',
    city: 'Fes',
    },
];
export const activityData: ActivityItem[] = [
    {
    id: '1',
    type: 'order_placed',
    title: 'Order #1258 created',
    description: 'by Ahmed Benali',
    timestamp: '2 min ago',
    },
    {
    id: '2',
    type: 'payment_received',
    title: 'Payment received',
    description: 'Order #1257',
    timestamp: '15 min ago',
    },
    {
    id: '3',
    type: 'customer_added',
    title: 'New customer registered',
    description: 'Sara Amrani',
    timestamp: '28 min ago',
    },
    {
    id: '4',
    type: 'product_updated',
    title: 'Product updated',
    description: 'Rolex Submariner',
    timestamp: '1 hour ago',
    },
];
export const alertsData: AlertItem[] = [
    {
    id: '1',
    title: 'Low stock detected',
    description: 'Rolex Submariner has only 3 items left.',
    variant: 'warning',
    },
    {
    id: '2',
    title: 'Today revenue increased',
    description: 'Revenue is up by 18% compared to yesterday.',
    variant: 'success',
    },
    {
    id: '3',
    title: 'Payment verification required',
    description: 'One payment needs manual review.',
    variant: 'info',
    },
];
export const salesData: SalesPoint[] = [
    { label: 'Mon', sales: 12 },
    { label: 'Tue', sales: 18 },
    { label: 'Wed', sales: 9 },
    { label: 'Thu', sales: 22 },
    { label: 'Fri', sales: 31 },
    { label: 'Sat', sales: 40 },
    { label: 'Sun', sales: 28 },
];
export const revenueSummaryData: RevenueSummaryItem[] = [
  {
    id: 'today',
    label: 'Today',
    value: 8420,
    progress: 68,
    currency: 'MAD',
  },
  {
    id: 'week',
    label: 'This Week',
    value: 52300,
    progress: 82,
    currency: 'MAD',
  },
  {
    id: 'month',
    label: 'This Month',
    value: 245000,
    progress: 95,
    currency: 'MAD',
  },
  {
    id: 'average',
    label: 'Average Order',
    value: 680,
    progress: 54,
    currency: 'MAD',
  },
];
export const dashboardData = {
  welcome: welcomeData,
  kpis: kpiData,
  sales: {
    chart: salesData,
    total: 245000,
    growth: 18.4,
  },
  topProducts: topProductsData,
  recentOrders: recentOrdersData,
  activity: activityData,
  alerts: alertsData,
  revenueSummary: revenueSummaryData,
};
