import type { DashboardData } from '@/components/dashboard/dashboard.types';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api/v1';

export async function getDashboard(
  token: string,
  period: '7D' | '30D' | '90D' = '7D',
): Promise<DashboardData> {
  const response = await fetch(
    `${API_URL}/dashboard?period=${period}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dashboard: ${response.status}`,
    );
  }

  return response.json();
}
