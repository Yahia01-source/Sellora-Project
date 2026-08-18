import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getDashboard(
  userId: string,
  period: '7D' | '30D' | '90D' = '7D',
) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        store: true,
      },
    });

    if (!user?.storeId || !user.store) {
      throw new BadRequestException(
        'User has no store',
      );
    }

    const storeId = user.storeId;
    const periodDays = this.getPeriodDays(period);
    const periodStart = this.startOfDaysAgo(periodDays - 1);
const [
  ordersCount,
  customersCount,
  productsCount,
  revenueResult,
  pendingOrders,
  todayOrders,
  todayRevenueResult,
  periodRevenueResult,
  periodRevenueByStatus,
  recentOrders,
  topProducts,
  last7DaysOrders,
  last30DaysOrders,
  last90DaysOrders,
] = await Promise.all([
    this.prisma.order.count({
    where: {
      storeId,
    },
  }),

  this.prisma.customer.count({
    where: {
      storeId,
    },
  }),

  this.prisma.product.count({
    where: {
      storeId,
      isActive: true,
    },
  }),

  this.prisma.order.aggregate({
    where: {
      storeId,
      status: {
        not: 'CANCELLED',
      },
    },
    _sum: {
      total: true,
    },
  }),

  this.prisma.order.count({
    where: {
      storeId,
      status: 'PENDING',
    },
  }),

  this.prisma.order.count({
    where: {
      storeId,
      createdAt: {
        gte: this.startOfToday(),
      },
    },
  }),

  this.prisma.order.aggregate({
    where: {
      storeId,
      status: {
        not: 'CANCELLED',
      },
      createdAt: {
        gte: this.startOfToday(),
      },
    },
    _sum: {
      total: true,
    },
  }),

  this.prisma.order.aggregate({
  where: {
    storeId,
    status: {
      not: 'CANCELLED',
    },
    createdAt: {
      gte: periodStart,
    },
  },
  _sum: {
    total: true,
  },
}),

this.prisma.order.groupBy({
  by: ['status'],
  where: {
    storeId,
    status: {
      not: 'CANCELLED',
    },
    createdAt: {
      gte: periodStart,
    },
  },
  _sum: {
    total: true,
  },
}),


  
  this.prisma.order.findMany({
    where: {
      storeId,
    },
    include: {
      customer: true,
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  }),

  this.prisma.orderItem.findMany({
    where: {
      order: {
        storeId,
        status: {
          not: 'CANCELLED',
        },
      },
    },
    include: {
      product: true,
    },
  }),

  this.prisma.order.findMany({
    where: {
      storeId,
      status: {
        not: 'CANCELLED',
      },
      createdAt: {
        gte: this.startOfDaysAgo(6),
      },
    },
    select: {
      total: true,
      createdAt: true,
    },
  }),

  this.prisma.order.findMany({
  where: {
    storeId,
    status: {
      not: 'CANCELLED',
    },
    createdAt: {
      gte: this.startOfDaysAgo(29),
    },
  },
  select: {
    total: true,
    createdAt: true,
  },
}),

this.prisma.order.findMany({
  where: {
    storeId,
    status: {
      not: 'CANCELLED',
    },
    createdAt: {
      gte: this.startOfDaysAgo(89),
    },
  },
  select: {
    total: true,
    createdAt: true,
  },
}),
]);    const revenue = Number(
      revenueResult._sum.total ?? 0,
    );

    const todayRevenue = Number(
      todayRevenueResult._sum.total ?? 0,
    );



const periodRevenue = Number(
  periodRevenueResult._sum.total ?? 0,
);
let selectedOrders = last7DaysOrders;

if (period === '30D') {
  selectedOrders = last30DaysOrders;
}

if (period === '90D') {
  selectedOrders = last90DaysOrders;
}

const salesChartMap = new Map<string, number>();

for (let i = periodDays - 1; i >= 0; i--) {
  const date = this.startOfDaysAgo(i);

  const label = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  salesChartMap.set(label, 0);
}

for (const order of selectedOrders) {
  const label = order.createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  salesChartMap.set(
    label,
    (salesChartMap.get(label) ?? 0) + Number(order.total),
  );
}

const formattedSalesData = Array.from(
  salesChartMap.entries(),
).map(([label, sales]) => ({
  label,
  sales,
}));    
const formattedRecentOrders = recentOrders.map((order) => ({
  id: order.id,
  orderNumber: order.orderNumber,

  customerName: `${order.customer.firstName} ${
    order.customer.lastName ?? ''
  }`.trim(),

  status: this.mapOrderStatus(order.status),

  totalAmount: Number(order.total),
  currency: 'MAD',

  itemCount: order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  ),

  createdAt: order.createdAt.toISOString(),

  city: order.customer.city ?? undefined,
}));

  const formattedActivity = recentOrders.map((order) => {
  let type:
    | 'order_placed'
    | 'order_confirmed'
    | 'order_delivered'
    | 'order_cancelled';

  switch (order.status) {
    case 'CONFIRMED':
      type = 'order_confirmed';
      break;

    case 'DELIVERED':
      type = 'order_delivered';
      break;

    case 'CANCELLED':
      type = 'order_cancelled';
      break;

    default:
      type = 'order_placed';
  }

  return {
    id: `order-activity-${order.id}`,
    type,
    title: `Order ${order.orderNumber}`,
    description: `${order.customer.firstName} · ${Number(
      order.total,
    ).toLocaleString('en-US')} MAD`,
    timestamp: this.formatRelativeTime(order.createdAt),
  };
});

const topProductsMap = new Map<
  string,
  {
    id: string;
    name: string;
    unitsSold: number;
    revenue: number;
  }
>();

for (const item of topProducts) {
  const existing = topProductsMap.get(item.productId);

  if (existing) {
    existing.unitsSold += item.quantity;
    existing.revenue += Number(item.total);
  } else {
    topProductsMap.set(item.productId, {
      id: item.productId,
      name: item.product.name,
      unitsSold: item.quantity,
      revenue: Number(item.total),
    });
  }
}

  const formattedAlerts = [];

if (pendingOrders > 0) {
  formattedAlerts.push({
    id: 'pending-orders',
    title: 'Pending orders',
    description: `${pendingOrders} order${
      pendingOrders > 1 ? 's' : ''
    } require processing.`,
    variant: 'warning' as const,
    href: '/orders',
  });
} else {
  formattedAlerts.push({
    id: 'orders-up-to-date',
    title: 'All orders are up to date',
    description: 'There are no pending orders requiring attention.',
    variant: 'success' as const,
    href: '/orders',
  });
}

const formattedTopProducts = Array.from(
  topProductsMap.values(),
)
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5)
  .map((product, index) => ({
    id: product.id,
    name: product.name,
    imageUrl: '',
    unitsSold: product.unitsSold,
    revenue: product.revenue,
    currency: 'MAD',
    trend: 'up' as const,
    trendPercent: 0,
    rank: index + 1,
  }));

const revenueStatusLabels: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
};

const formattedRevenueSummary = periodRevenueByStatus
  .filter((item) => item.status !== 'CANCELLED')
  .map((item) => ({
    id: item.status,
    label: revenueStatusLabels[item.status] ?? item.status,
    value: Number(item._sum.total ?? 0),
  }))
  .sort((a, b) => b.value - a.value);
return {
  welcome: {
    userName: user.firstName,
    storeName: user.store.name,
    currentDate: new Date().toISOString(),
    todayOrders,
    todayRevenue,
    currency: 'MAD',
    pendingActions: pendingOrders,
  },

  kpis: [
    {
      id: 'orders',
      label: 'Orders',
      value: ordersCount,
      displayValue: ordersCount.toString(),
      trend: 'up',
      change: 0,
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: revenue,
      displayValue: `${revenue.toLocaleString('en-US')} MAD`,
      trend: 'up',
      change: 0,
      isCurrency: true,
      currency: 'MAD',
    },
    {
      id: 'customers',
      label: 'Customers',
      value: customersCount,
      displayValue: customersCount.toString(),
      trend: 'up',
      change: 0,
    },
    {
      id: 'products',
      label: 'Products',
      value: productsCount,
      displayValue: productsCount.toString(),
      trend: 'up',
      change: 0,
    },
  ],

  sales: {
    chart: formattedSalesData,
    total: periodRevenue,
    growth: 0,
  },

 revenueSummary: formattedRevenueSummary,

topProducts: formattedTopProducts,

  recentOrders: formattedRecentOrders,

  activity: formattedActivity,

  alerts: formattedAlerts,
};  }

private startOfDaysAgo(days: number): Date {
  const date = new Date();

  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);

  return date;
}

  private startOfToday(): Date {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
  }
  private mapOrderStatus(
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED',
) {
  const statusMap = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  } as const;

  return statusMap[status];
}

  private formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays === 1) {
    return 'Yesterday';
  }

  return `${diffDays}d ago`;
}
private getPeriodDays(
  period: '7D' | '30D' | '90D',
): number {
  if (period === '30D') {
    return 30;
  }

  if (period === '90D') {
    return 90;
  }

  return 7;
}
}