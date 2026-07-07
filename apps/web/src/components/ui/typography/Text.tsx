/**
 * @file components/typography/Text.tsx
 * @description Sellora Typography System — Text Component
 *
 * A SINGLE, unified text component that enforces the type scale.
 *
 * WHY a Text component (not just CSS classes):
 * 1. Type safety — TypeScript errors when using wrong variant
 * 2. Automatic semantic HTML — variant="h1" renders <h1>, "caption" renders <span>
 * 3. Enforces color choices — only valid token colors are accepted
 * 4. Single import for all text in the codebase
 * 5. Readable props: <Text variant="h3"> vs <p className="type-h3">
 *
 * Usage:
 *   <Text variant="h1">Orders</Text>
 *   <Text variant="body" color="muted">No orders found</Text>
 *   <Text variant="overline">Table Header</Text>
 *   <Text variant="numeric">$24,890.00</Text>
 *   <Text variant="code">#ORD-10421</Text>
 *   <Text variant="caption" as="time">2 hours ago</Text>
 */

import React from 'react';
import { cn } from '@/lib/tokens/use-tokens';

// ─── TYPES ─────────────────────────────────────────────────────────────────

export type TextVariant =
  | 'display-xl'
  | 'display-l'
  | 'display-m'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-xl'
  | 'body-lg'
  | 'body'
  | 'body-md'
  | 'body-sm'
  | 'caption'
  | 'label'
  | 'overline'
  | 'code'
  | 'numeric';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'link'
  | 'danger'
  | 'success'
  | 'warning'
  | 'inverse'
  | 'inherit';

export type TextAlign = 'left' | 'center' | 'right';

export type TextAs =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'div' | 'label' | 'time'
  | 'dt' | 'dd' | 'li' | 'caption' | 'th' | 'td'
  | 'figcaption' | 'blockquote' | 'legend';

// ─── VARIANT → CSS CLASS MAP ────────────────────────────────────────────────

const variantClassMap: Record<TextVariant, string> = {
  'display-xl': 'type-display-xl',
  'display-l':  'type-display-l',
  'display-m':  'type-display-m',
  'h1':         'type-h1',
  'h2':         'type-h2',
  'h3':         'type-h3',
  'h4':         'type-h4',
  'h5':         'type-h5',
  'h6':         'type-h6',
  'body-xl':    'type-body-xl',
  'body-lg':    'type-body-lg',
  'body':       'type-body',
  'body-md':    'type-body-md',
  'body-sm':    'type-body-sm',
  'caption':    'type-caption',
  'label':      'type-label',
  'overline':   'type-overline',
  'code':       'type-code',
  'numeric':    'type-numeric',
};

// ─── VARIANT → DEFAULT HTML ELEMENT MAP ─────────────────────────────────────
// If no `as` prop is provided, the component picks the semantic element.

const variantElementMap: Record<TextVariant, TextAs> = {
  'display-xl': 'p',
  'display-l':  'p',
  'display-m':  'p',
  'h1':         'h1',
  'h2':         'h2',
  'h3':         'h3',
  'h4':         'h4',
  'h5':         'h5',
  'h6':         'h6',
  'body-xl':    'p',
  'body-lg':    'p',
  'body':       'p',
  'body-md':    'p',
  'body-sm':    'p',
  'caption':    'span',
  'label':      'span',
  'overline':   'span',
  'code':       'span',
  'numeric':    'span',
};

// ─── COLOR → CSS CLASS MAP ──────────────────────────────────────────────────

const colorClassMap: Record<TextColor, string> = {
  primary:   'text-primary',
  secondary: 'text-secondary',
  muted:     'text-muted',
  disabled:  'text-disabled',
  link:      'text-link',
  danger:    'text-danger',
  success:   'text-success',
  warning:   'text-warning',
  inverse:   'text-inverse',
  inherit:   '',    // No class — inherits from parent
};

// ─── ALIGNMENT MAP ──────────────────────────────────────────────────────────

const alignClassMap: Record<TextAlign, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};

// ─── PROPS ──────────────────────────────────────────────────────────────────

export interface TextProps {
  /** The typography style variant */
  variant?: TextVariant;
  /** Text color from design tokens */
  color?: TextColor;
  /** Override the default HTML element */
  as?: TextAs;
  /** Text alignment */
  align?: TextAlign;
  /** Truncate to single line with ellipsis */
  truncate?: boolean;
  /** Max lines before truncation (1-3) */
  clamp?: 1 | 2 | 3;
  /** Additional CSS classes */
  className?: string;
  /** Content */
  children?: React.ReactNode;
  /** HTML id attribute */
  id?: string;
  /** HTML for attribute (label elements) */
  htmlFor?: string;
  /** HTML dateTime attribute (time elements) */
  dateTime?: string;
  /** ARIA role attribute (e.g. "alert" for error messages) */
  role?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** Data attributes */
  [key: `data-${string}`]: string | undefined;
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      color = 'primary',
      as,
      align,
      truncate,
      clamp,
      className,
      children,
      id,
      htmlFor,
      dateTime,
      role,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...dataProps
    },
    ref,
  ) => {
    const Element = (as ?? variantElementMap[variant]) as React.ElementType;

    const classes = cn(
      variantClassMap[variant],
      color !== 'inherit' && colorClassMap[color],
      align && alignClassMap[align],
      truncate && 'truncate-1',
      clamp === 2 && 'truncate-2',
      clamp === 3 && 'truncate-3',
      // Apply prose container to paragraph variants
      (variant === 'body' || variant === 'body-lg' || variant === 'body-xl') &&
        'prose-container',
      className,
    );

    return (
      <Element
        ref={ref}
        id={id}
        htmlFor={htmlFor}
        dateTime={dateTime}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={classes}
        {...dataProps}
      >
        {children}
      </Element>
    );
  },
);

Text.displayName = 'Text';

// ─── CONVENIENCE COMPONENTS ─────────────────────────────────────────────────
// These are pre-bound Text components for common use cases.
// They save keystrokes and make intent clearer in JSX.

/**
 * <Heading level={1}>Page Title</Heading>
 * Renders the correct H1-H6 element with correct typography.
 */
export function Heading({
  level = 1,
  ...props
}: Omit<TextProps, 'variant' | 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const variantMap = {
    1: 'h1', 2: 'h2', 3: 'h3',
    4: 'h4', 5: 'h5', 6: 'h6',
  } as const;
  return <Text variant={variantMap[level]} {...props} />;
}

/**
 * <MetricValue>$24,890</MetricValue>
 * Large KPI number with tabular figures.
 */
export function MetricValue({ className, ...props }: Omit<TextProps, 'variant'>) {
  return (
    <Text
      variant="display-m"
      color="primary"
      as="p"
      className={cn('font-feature-tnum', className)}
      {...props}
    />
  );
}

/**
 * <MetricLabel>Total Revenue</MetricLabel>
 */
export function MetricLabel(props: Omit<TextProps, 'variant' | 'color'>) {
  return <Text variant="overline" color="muted" as="span" {...props} />;
}

/**
 * <OrderId>#ORD-10421</OrderId>
 * Monospace order/tracking IDs.
 */
export function OrderId({ className, ...props }: Omit<TextProps, 'variant'>) {
  return (
    <Text
      variant="code"
      color="secondary"
      as="span"
      className={className}
      {...props}
    />
  );
}

/**
 * <TableHeader>Order Status</TableHeader>
 * Uppercase column headers with wide tracking.
 */
export function TableHeader(props: Omit<TextProps, 'variant' | 'color'>) {
  return <Text variant="overline" color="muted" as="span" {...props} />;
}

/**
 * <FieldLabel htmlFor="email">Email Address</FieldLabel>
 */
export function FieldLabel(props: Omit<TextProps, 'variant'>) {
  return <Text variant="label" color="secondary" as="label" {...props} />;
}

/**
 * <HelperText>Must be a valid email address.</HelperText>
 */
export function HelperText(props: Omit<TextProps, 'variant'>) {
  return <Text variant="body-sm" color="muted" as="p" {...props} />;
}

/**
 * <ErrorMessage>This field is required.</ErrorMessage>
 */
export function ErrorMessage(props: Omit<TextProps, 'variant' | 'color'>) {
  return <Text variant="body-sm" color="danger" as="p" role="alert" {...props} />;
}

/**
 * <Timestamp dateTime="2024-01-15">2 hours ago</Timestamp>
 */
export function Timestamp({
  dateTime,
  ...props
}: Omit<TextProps, 'variant' | 'color' | 'as'> & { dateTime?: string }) {
  return (
    <Text variant="caption" color="muted" as="time" dateTime={dateTime} {...props} />
  );
}

/**
 * <Caption>Image showing the product from front view.</Caption>
 */
export function Caption(props: Omit<TextProps, 'variant' | 'color'>) {
  return <Text variant="caption" color="muted" as="figcaption" {...props} />;
}