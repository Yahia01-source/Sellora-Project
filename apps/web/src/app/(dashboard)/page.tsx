/**
 * @file app/(dashboard)/dashboard/page.tsx
 * @description Sellora — Example Page Using Shell Layout Primitives
 */

'use client';

import { PageHeader } from '@/components/layout/primitives/PageHeader';
import { ContentContainer } from '@/components/layout/primitives/ContentContainer';
import { KpiGrid } from '@/components/dashboard/KpiGrid';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { TopProducts } from '@/components/dashboard/TopProducts';
import type { TopProduct } from '@/components/dashboard/dashboard.types';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import type { RecentOrder } from '@/components/dashboard/dashboard.types';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import type { ActivityItem } from '@/components/dashboard/dashboard.types';
const welcomeData = {
  userName: 'Abdeladim',
  storeName: 'Sellora Demo Store',
  currentDate: new Date().toISOString(),
  todayOrders: 24,
  todayRevenue: 842000, // centimes
  currency: 'MAD',
  pendingActions: 3,
};
const topProductsData: TopProduct[] = [
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
const recentOrdersData: RecentOrder[] = [
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
const activityData: ActivityItem[] = [
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
export default function DashboardPage() {
  return (
    <ContentContainer>
      {/* <PageHeader
        title="Dashboard"
        description="Overview of your store's performance and recent activity."
      /> */}

      {/* Mount point for future dashboard widgets */}
<div className="space-y-6">

  <WelcomeSection data={welcomeData} />

  <KpiGrid
    kpis={[]}
    loading={true}
  />

  {/* Charts */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 min-h-[320px]">
    Sales Chart
  </div>

  <div className="rounded-xl border border-gray-200 bg-white p-6 min-h-[320px]">
    Revenue Summary
  </div>

</div>
{/* Top Products */}

<TopProducts
  products={topProductsData}
/>  {/* Recent Orders */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2">
  <RecentOrders
    orders={recentOrdersData}
  />
</div>
<ActivityFeed
  activities={activityData}
/>
</div>
</div> </ContentContainer>
  );
}