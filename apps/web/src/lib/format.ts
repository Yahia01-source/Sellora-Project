export function formatCurrency(
  amount: number,
  currency = 'MAD',
  locale = 'fr-MA'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
export function formatOrderDate(date: string) {
  const today = new Date();
  const orderDate = new Date(date);

  const diff =
    Math.floor(
      (today.getTime() - orderDate.getTime()) /
      (1000 * 60 * 60 * 24),
    );

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';

  return orderDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
export function formatPercentage(value: number): string {
  return `${value}%`;
}