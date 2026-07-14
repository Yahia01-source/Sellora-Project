/**
 * @file app/(dashboard)/dashboard/page.tsx
 * @description Sellora — Example Page Using Shell Layout Primitives
 */

'use client';

import { PageHeader } from '@/components/layout/primitives/PageHeader';
import { ContentContainer } from '@/components/layout/primitives/ContentContainer';
import { KpiGrid } from '@/components/dashboard/KpiGrid';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
const welcomeData = {
  userName: 'Abdeladim',
  storeName: 'Sellora Demo Store',
  currentDate: new Date().toISOString(),
  todayOrders: 24,
  todayRevenue: 842000, // centimes
  currency: 'MAD',
  pendingActions: 3,
};

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
  {/* Recent Orders */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 min-h-[400px]">
    Recent Orders
  </div>

  <div className="rounded-xl border border-gray-200 bg-white p-6 min-h-[400px]">
    Activity Feed
  </div>

</div>
</div> </ContentContainer>
  );
}