import { create } from 'zustand';
import type {
  KpiData,
  RevenueTrend,
  SalesComparison,
  CustomerGrowth,
  CategoryDistribution,
  Customer,
} from '../types';
import {
  fetchKpis,
  fetchRevenueTrend,
  fetchSalesComparison,
  fetchCustomerGrowth,
  fetchCategoryDistribution,
  fetchCustomers,
} from '../services/api';

interface DataStore {
  // State
  kpis: KpiData | null;
  revenueTrend: RevenueTrend[];
  salesComparison: SalesComparison[];
  customerGrowth: CustomerGrowth[];
  categoryDistribution: CategoryDistribution[];
  customers: Customer[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchAllData: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
  // Initial state
  kpis: null,
  revenueTrend: [],
  salesComparison: [],
  customerGrowth: [],
  categoryDistribution: [],
  customers: [],
  loading: false,
  error: null,

  // Fetch all data at once
  fetchAllData: async () => {
    set({ loading: true, error: null });
    try {
      const [
        kpis,
        revenueTrend,
        salesComparison,
        customerGrowth,
        categoryDistribution,
        customers,
      ] = await Promise.all([
        fetchKpis(),
        fetchRevenueTrend(),
        fetchSalesComparison(),
        fetchCustomerGrowth(),
        fetchCategoryDistribution(),
        fetchCustomers(),
      ]);

      set({
        kpis,
        revenueTrend,
        salesComparison,
        customerGrowth,
        categoryDistribution,
        customers,
        loading: false,
      });
    } catch (error) {
      set({
        error: 'Failed to fetch data. Please check if backend is running.',
        loading: false,
      });
      console.error('API Error:', error);
    }
  },
}));