const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api/v1';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderProduct {
  id: string;
  name: string;
  sku: string | null;
  price: number | string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number | string;
  total: number | string;
  product: OrderProduct;
}

export interface OrderCustomer {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  storeId: string;
  status: OrderStatus;
  subtotal: number | string;
  shipping: number | string;
  total: number | string;
  createdAt: string;
  updatedAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
}

export interface OrdersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersResponse {
  data: Order[];
  meta: OrdersMeta;
}

export interface GetOrdersParams {
  token: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
}

export async function getOrders({
  token,
  page = 1,
  limit = 20,
  search,
  status,
}: GetOrdersParams): Promise<OrdersResponse> {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('limit', String(limit));

  if (search?.trim()) {
    params.set('search', search.trim());
  }

  if (status) {
    params.set('status', status);
  }

  const response = await fetch(
    `${API_URL}/orders?${params.toString()}`,
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
      `Failed to fetch orders: ${response.status}`,
    );
  }

  return response.json();
}
export async function getOrder(
  token: string,
  orderId: string,
): Promise<Order> {
  const response = await fetch(
    `${API_URL}/orders/${orderId}`,
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
      `Failed to fetch order: ${response.status}`,
    );
  }

  return response.json();
}
export async function confirmOrder(
  token: string,
  orderId: string,
): Promise<Order> {
  const response = await fetch(
    `${API_URL}/orders/${orderId}/confirm`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to confirm order: ${response.status}`,
    );
  }

  return response.json();
}

export async function cancelOrder(
  token: string,
  orderId: string,
): Promise<Order> {
  const response = await fetch(
    `${API_URL}/orders/${orderId}/cancel`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to cancel order: ${response.status}`,
    );
  }

  return response.json();
}
export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  token: string;
  customerId: string;
  shipping?: number;
  items: CreateOrderItemInput[];
}

export async function createOrder({
  token,
  customerId,
  shipping,
  items,
}: CreateOrderInput): Promise<Order> {
  const response = await fetch(
    `${API_URL}/orders`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        shipping,
        items,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create order: ${response.status}`,
    );
  }

  return response.json();
}
export async function updateOrderStatus(
  token: string,
  orderId: string,
  status: OrderStatus,
): Promise<Order> {
  const response = await fetch(
    `${API_URL}/orders/${orderId}/status`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update order status: ${response.status}`,
    );
  }

  return response.json();
}