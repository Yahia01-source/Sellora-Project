'use client';

import { useState } from 'react';

import { SalesChart } from '@/components/dashboard/SalesChart';
import type { DashboardData } from './dashboard.types';

import { getDashboard } from '@/services/dashboard.service';

interface DashboardClientProps {
  initialData: DashboardData;
  token: string;
}

export function DashboardClient({
  initialData,
  token,
}: DashboardClientProps) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [period, setPeriod] = useState<'7D' | '30D' | '90D'>('7D');
  const [loading, setLoading] = useState(false);

  async function handlePeriodChange(
    newPeriod: '7D' | '30D' | '90D',
  ) {
    if (newPeriod === period) return;

    setPeriod(newPeriod);
    setLoading(true);

    try {
      const newData = await getDashboard(
        token,
        newPeriod,
      );

      setData(newData);
    } catch (error) {
      console.error(
        'Failed to load dashboard:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SalesChart
      data={data.sales.chart}
      totalSales={data.sales.total}
      growth={data.sales.growth}
      loading={loading}
      period={period}
      onPeriodChange={handlePeriodChange}
    />
  );
}