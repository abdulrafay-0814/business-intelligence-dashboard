import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  KpiData,
  RevenueTrend,
  SalesComparison,
  CustomerGrowth,
  CategoryDistribution,
  Customer,
  Order,
  Notification,
} from '../types';
import {
  fetchKpis,
  fetchRevenueTrend,
  fetchSalesComparison,
  fetchCustomerGrowth,
  fetchCategoryDistribution,
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  fetchOrders,
  fetchNotifications,
} from '../services/api';

interface DataStore {
  // State
  kpis: KpiData | null;
  revenueTrend: RevenueTrend[];
  salesComparison: SalesComparison[];
  customerGrowth: CustomerGrowth[];
  categoryDistribution: CategoryDistribution[];
  customers: Customer[];
  orders: Order[];
  notifications: Notification[];
  notificationsInitialized: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAllData: () => Promise<void>;
  addNewCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  editCustomer: (id: number, customer: Omit<Customer, 'id'>) => Promise<void>;
  removeCustomer: (id: number) => Promise<void>;
  markNotificationRead: (id: number | string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      // Initial state
      kpis: null,
      revenueTrend: [],
      salesComparison: [],
      customerGrowth: [],
      categoryDistribution: [],
      customers: [],
      orders: [],
      notifications: [],
      notificationsInitialized: false,
      loading: false,
      error: null,

      // Fetch all data
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
            orders,
            notifications,
          ] = await Promise.all([
            fetchKpis(),
            fetchRevenueTrend(),
            fetchSalesComparison(),
            fetchCustomerGrowth(),
            fetchCategoryDistribution(),
            fetchCustomers(),
            fetchOrders(),
            fetchNotifications(),
          ]);

          // Only set notifications first time
          const currentState = get();
          const finalNotifications = currentState.notificationsInitialized
            ? currentState.notifications
            : notifications;

          set({
            kpis,
            revenueTrend,
            salesComparison,
            customerGrowth,
            categoryDistribution,
            customers,
            orders,
            notifications: finalNotifications,
            notificationsInitialized: true,
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

      // Add new customer
      addNewCustomer: async (customer) => {
        try {
          const newCustomer = await addCustomer(customer);
          set({ customers: [...get().customers, newCustomer] });
        } catch (error) {
          console.error('Add customer error:', error);
          throw error;
        }
      },

      // Edit customer
      editCustomer: async (id, customer) => {
        try {
          const updatedCustomer = await updateCustomer(id, customer);
          set({
            customers: get().customers.map((c) =>
              c.id === id ? updatedCustomer : c
            ),
          });
        } catch (error) {
          console.error('Update customer error:', error);
          throw error;
        }
      },

      // Delete customer
      removeCustomer: async (id) => {
        try {
          await deleteCustomer(id);
          set({
            customers: get().customers.filter((c) => c.id !== id),
          });
        } catch (error) {
          console.error('Delete customer error:', error);
          throw error;
        }
      },

      // Mark notification as read
      markNotificationRead: (id) => {
        set({
          notifications: get().notifications.map((n) =>
            String(n.id) === String(id) ? { ...n, read: true } : n
          ),
        });
      },

      // Mark all notifications as read
      markAllNotificationsRead: () => {
        set({
          notifications: get().notifications.map((n) => ({ ...n, read: true })),
        });
      },

      // Add new notification (real-time)
      addNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: Date.now(),
          time: 'Just now',
          read: false,
        };
        set({
          notifications: [newNotification, ...get().notifications],
        });
      },
    }),
    {
      name: 'dashboard-storage', // localStorage key
      partialize: (state) => ({
        notifications: state.notifications,
        notificationsInitialized: state.notificationsInitialized,
      }),
    }
  )
);