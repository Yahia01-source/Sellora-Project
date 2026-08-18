const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api/v1';

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sku: string | null;
  barcode: string | null;
  price: number | string;
  cost: number | string | null;
  stock: number;
  isActive: boolean;
  storeId: string;
  categoryId: string;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsParams {
  token: string;
  page?: number;
  limit?: number;
}

export async function getProducts({
  token,
  page = 1,
  limit = 10,
}: GetProductsParams): Promise<Product[]> {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('limit', String(limit));

  const response = await fetch(
    `${API_URL}/products?${params.toString()}`,
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
      `Failed to fetch products: ${response.status}`,
    );
  }

  return response.json();
}