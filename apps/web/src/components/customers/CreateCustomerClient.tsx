'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createCustomer } from '@/services/customers.service';

interface CreateCustomerClientProps {
  token: string;
}

export function CreateCustomerClient({
  token,
}: CreateCustomerClientProps) {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);

    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }

    if (!phone.trim()) {
      setError('Phone is required.');
      return;
    }

    setLoading(true);

    try {
      const customer = await createCustomer({
        token,
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
      });

      router.push(
        `/customers/${customer.id}`,
      );
    } catch (err) {
      console.error(
        'Failed to create customer:',
        err,
      );

      setError(
        'Unable to create the customer. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Create Customer
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Add a new customer to your store.
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium"
            >
              First name *
            </label>

            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(event) =>
                setFirstName(event.target.value)
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium"
            >
              Last name
            </label>

            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(event) =>
                setLastName(event.target.value)
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium"
            >
              Phone *
            </label>

            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address"
            className="text-sm font-medium"
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="city"
            className="text-sm font-medium"
          >
            City
          </label>

          <input
            id="city"
            type="text"
            value={city}
            onChange={(event) =>
              setCity(event.target.value)
            }
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              router.push('/customers')
            }
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
              : 'Create customer'}
          </button>
        </div>
      </form>
    </div>
  );
}