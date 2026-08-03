import { dashboardData } from '@/components/dashboard/dashboard.data';
import type { DashboardData } from '@/components/dashboard/dashboard.types';

/**
 * Temporary mock implementation.
 * Later this service will fetch data from the Dashboard API.
 */
export async function getDashboard(): Promise<DashboardData> {
    return dashboardData;
}