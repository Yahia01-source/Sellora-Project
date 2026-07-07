// ─────────────────────────────────────────────
// Project No. 001 — Core Enterprise Enums
// ─────────────────────────────────────────────

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STORE_OWNER = 'STORE_OWNER',
  STORE_STAFF = 'STORE_STAFF',
  CUSTOMER = 'CUSTOMER',
  DRIVER = 'DRIVER'
}

export enum StoreStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export enum StorePlan {
  FREE = 'FREE',
  STARTER = 'STARTER',
  GROWTH = 'GROWTH',
  ENTERPRISE = 'ENTERPRISE'
}

// ─────────────────────────────────────────────
// Tenant Core Configuration Interfaces (Multi-Tenancy)
// ─────────────────────────────────────────────

export interface ITenantConfig {
  currency: string;
  language: 'ar' | 'fr' | 'en';
  timezone: string;
  taxSettings: {
    enabled: boolean;
    percentage: number;
    isIncludedInPrice: boolean;
  };
  checkoutSettings: {
    requireEmail: boolean;
    requirePhoneNumber: boolean;
    allowGuestCheckout: boolean;
    codFormCustomFields: Array<{
      fieldId: string;
      label: string;
      required: boolean;
      visible: boolean;
    }>;
  };
  shippingSettings: {
    defaultCost: number;
    freeShippingThreshold: number | null;
    supportedCities: string[];
  };
}

// ─────────────────────────────────────────────
// Standard Global API Response Structure
// ─────────────────────────────────────────────

export interface IApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    totalCount?: number;
    totalPages?: number;
  };
}
