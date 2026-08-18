const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api/v1';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CustomersResponse {
  data: Customer[];
  meta: CustomersMeta;
}

export interface GetCustomersParams {
  token: string;
  page?: number;
  limit?: number;
  search?: string;
}

export async function getCustomers({
  token,
  page = 1,
  limit = 20,
  search,
}: GetCustomersParams): Promise<CustomersResponse> {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('limit', String(limit));

  if (search?.trim()) {
    params.set('search', search.trim());
  }

  const response = await fetch(
    `${API_URL}/customers?${params.toString()}`,
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
      `Failed to fetch customers: ${response.status}`,
    );
  }

  return response.json();
}
export async function getCustomer(
  token: string,
  customerId: string,
): Promise<Customer> {
  const response = await fetch(
    `${API_URL}/customers/${customerId}`,
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
      `Failed to fetch customer: ${response.status}`,
    );
  }

  return response.json();
}
export interface CreateCustomerInput {
  token: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
}

export async function createCustomer({
  token,
  firstName,
  lastName,
  phone,
  email,
  address,
  city,
}: CreateCustomerInput): Promise<Customer> {
  const response = await fetch(
    `${API_URL}/customers`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName: lastName || undefined,
        phone,
        email: email || undefined,
        address: address || undefined,
        city: city || undefined,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create customer: ${response.status}`,
    );
  }

  return response.json();
}
export interface UpdateCustomerInput {
  token: string;
  customerId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
}

export async function updateCustomer({
  token,
  customerId,
  firstName,
  lastName,
  phone,
  email,
  address,
  city,
}: UpdateCustomerInput): Promise<Customer> {
  const response = await fetch(
    `${API_URL}/customers/${customerId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName: lastName || undefined,
        phone,
        email: email || undefined,
        address: address || undefined,
        city: city || undefined,
      }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update customer: ${response.status}`,
    );
  }

  return response.json();
}
export async function deleteCustomer(
  token: string,
  customerId: string,
): Promise<Customer> {
  const response = await fetch(
    `${API_URL}/customers/${customerId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    let message =
      `Failed to delete customer: ${response.status}`;

    try {
      const body = await response.json();

      if (typeof body?.message === 'string') {
        message = body.message;
      }
    } catch {
      // Keep the default message.
    }

    throw new Error(message);
  }

  return response.json();
}
export async function archiveCustomer(
  token: string,
  customerId: string,
): Promise<Customer> {
  const response = await fetch(
    `${API_URL}/customers/${customerId}/archive`,
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
    let message =
      `Failed to archive customer: ${response.status}`;

    try {
      const body = await response.json();

      if (typeof body?.message === 'string') {
        message = body.message;
      }
    } catch {
      // Keep default message.
    }

    throw new Error(message);
  }

  return response.json();
}