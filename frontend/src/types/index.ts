export interface KpiData {
  totalRevenue: number;
  totalCustomers: number;
  totalOrders: number;
  monthlyGrowth: number;
  conversionRate: number;
}

export interface RevenueTrend {
  month: string;
  revenue: number;
}

export interface SalesComparison {
  month: string;
  thisYear: number;
  lastYear: number;
}

export interface CustomerGrowth {
  month: string;
  customers: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
}

export interface Customer {
  id: number;
  name: string;
  revenue: number;
  orders: number;
  status: "Active" | "Inactive";
  region: string;
}


// Order Type
export interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

// Notification Type
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'payment' | 'customer' | 'report' | 'system';
  read: boolean;
}

export type Theme = "light" | "dark";