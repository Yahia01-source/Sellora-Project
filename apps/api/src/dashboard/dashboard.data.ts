export const dashboardData = {
  welcome: {
    userName: 'Abdeladim',
    storeName: 'Sellora Demo Store',
    currentDate: new Date().toISOString(),
    todayOrders: 24,
    todayRevenue: 842000,
    currency: 'MAD',
    pendingActions: 3,
  },

  kpis: [
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
  ],
};