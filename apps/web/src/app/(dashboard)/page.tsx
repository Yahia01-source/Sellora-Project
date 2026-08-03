/**
 * @file app/(dashboard)/dashboard/page.tsx
 * @description Sellora — Example Page Using Shell Layout Primitives
 */


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
import { Alerts } from '@/components/dashboard/Alerts';
import type { AlertItem } from '@/components/dashboard/dashboard.types';
import { SalesChart } from '@/components/dashboard/SalesChart';
;
import { RevenueSummary } from '@/components/dashboard/RevenueSummary';
import { getDashboard } from '@/services/dashboard.service';
export default async function DashboardPage() {
  const data = await getDashboard();
  
  return (
    <ContentContainer>
      {/* <PageHeader
        title="Dashboard"
        description="Overview of your store's performance and recent activity."
      /> */}

      {/* Mount point for future dashboard widgets */}
<div className="space-y-6">

  <WelcomeSection data={data.welcome} />

<KpiGrid
  kpis={data.kpis}
  loading={false}
/>
  {/* Charts */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

<div className="lg:col-span-2">
  <SalesChart
    data={data.sales.chart}
    totalSales={data.sales.total}
    growth={data.sales.growth}
    loading={false}
  />
</div>
  <div className="rounded-xl border border-gray-200 bg-white p-6 min-h-[320px]">
<RevenueSummary
  data={data.revenueSummary}
  loading={false}
/>  </div>

</div>
{/* Top Products */}

<TopProducts
  products={data.topProducts}
/>  {/* Recent Orders */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2">
    <RecentOrders
      orders={data.recentOrders}
    />
  </div>

  <div className="space-y-6">
    <ActivityFeed
      activities={data.activity}
    />

    <Alerts
      alerts={data.alerts}
    />
  </div>

</div></div> </ContentContainer>
  );
}