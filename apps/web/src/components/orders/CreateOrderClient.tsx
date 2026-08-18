'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  createOrder,
  type Order,
} from '@/services/orders.service';

import type { Customer } from '@/services/customers.service';
import type { Product } from '@/services/products.service';

interface CreateOrderClientProps {
  customers: Customer[];
  products: Product[];
  token: string;
}

export function CreateOrderClient({
  customers,
  products,
  token,
}: CreateOrderClientProps) {
  const router = useRouter();

  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedProduct = products.find(
    (product) => product.id === productId,
  );

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);

    if (!customerId) {
      setError('Please select a customer.');
      return;
    }

    if (!productId) {
      setError('Please select a product.');
      return;
    }

    if (quantity < 1) {
      setError('Quantity must be at least 1.');
      return;
    }

    if (
      selectedProduct &&
      quantity > selectedProduct.stock
    ) {
      setError(
        `Only ${selectedProduct.stock} units are available.`,
      );
      return;
    }

    setLoading(true);

    try {
      const order: Order = await createOrder({
        token,
        customerId,
        shipping: shipping
          ? Number(shipping)
          : undefined,
        items: [
          {
            productId,
            quantity,
          },
        ],
      });

      router.push(`/orders/${order.id}`);
    } catch (err) {
      console.error(
        'Failed to create order:',
        err,
      );

      setError(
        'Unable to create the order. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Create Order
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Create a new order for your store.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-[var(--color-border)] bg-white p-6"
      >
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="customer"
            className="text-sm font-medium"
          >
            Customer
          </label>

          <select
            id="customer"
            value={customerId}
            onChange={(event) =>
              setCustomerId(event.target.value)
            }
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
          >
            <option value="">
              Select customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.firstName}{' '}
                {customer.lastName ?? ''} —{' '}
                {customer.phone}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product"
            className="text-sm font-medium"
          >
            Product
          </label>

          <select
            id="product"
            value={productId}
            onChange={(event) =>
              setProductId(event.target.value)
            }
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
          >
            <option value="">
              Select product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
                disabled={
                  !product.isActive ||
                  product.stock === 0
                }
              >
                {product.name} —{' '}
                {Number(product.price).toLocaleString(
                  'en-US',
                )}{' '}
                MAD — Stock: {product.stock}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="text-sm font-medium"
            >
              Quantity
            </label>

            <input
              id="quantity"
              type="number"
              min={1}
              max={selectedProduct?.stock ?? undefined}
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  Number(event.target.value),
                )
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="shipping"
              className="text-sm font-medium"
            >
              Shipping
            </label>

            <input
              id="shipping"
              type="number"
              min={0}
              step="0.01"
              value={shipping}
              onChange={(event) =>
                setShipping(event.target.value)
              }
              placeholder="0"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
            />
          </div>
        </div>

        {selectedProduct && (
          <div className="rounded-lg bg-[var(--color-bg-subtle)] p-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[var(--color-text-secondary)]">
                Unit price
              </span>

              <span className="font-medium">
                {Number(
                  selectedProduct.price,
                ).toLocaleString('en-US')}{' '}
                MAD
              </span>
            </div>

            <div className="mt-2 flex justify-between gap-4">
              <span className="text-[var(--color-text-secondary)]">
                Estimated subtotal
              </span>

              <span className="font-semibold">
                {(
                  Number(selectedProduct.price) *
                  quantity
                ).toLocaleString('en-US')}{' '}
                MAD
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => router.push('/orders')}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? 'Creating...'
              : 'Create order'}
          </button>
        </div>
      </form>
    </div>
  );
}