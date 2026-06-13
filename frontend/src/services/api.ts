import axios from 'axios';
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

// Base URL of JSON Server
const API_BASE_URL = 'http://localhost:3001';

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch KPI Data
export const fetchKpis = async (): Promise<KpiData> => {
  const response = await api.get<KpiData>('/kpis');
  return response.data;
};

// Fetch Revenue Trend
export const fetchRevenueTrend = async (): Promise<RevenueTrend[]> => {
  const response = await api.get<RevenueTrend[]>('/revenueTrend');
  return response.data;
};

// Fetch Sales Comparison
export const fetchSalesComparison = async (): Promise<SalesComparison[]> => {
  const response = await api.get<SalesComparison[]>('/salesComparison');
  return response.data;
};

// Fetch Customer Growth
export const fetchCustomerGrowth = async (): Promise<CustomerGrowth[]> => {
  const response = await api.get<CustomerGrowth[]>('/customerGrowth');
  return response.data;
};

// Fetch Category Distribution
export const fetchCategoryDistribution = async (): Promise<CategoryDistribution[]> => {
  const response = await api.get<CategoryDistribution[]>('/categoryDistribution');
  return response.data;
};

// Fetch Customers
export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await api.get<Customer[]>('/customers');
  return response.data;
};
// Add new customer
export const addCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
  const response = await api.post<Customer>('/customers', customer);
  return response.data;
};

// Update existing customer
export const updateCustomer = async (id: number, customer: Omit<Customer, 'id'>): Promise<Customer> => {
  const response = await api.put<Customer>(`/customers/${id}`, customer);
  return response.data;
};

// Delete customer
export const deleteCustomer = async (id: number): Promise<void> => {
  await api.delete(`/customers/${id}`);
};

// Fetch Orders
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders');
  return response.data;
};

// Fetch Notifications
export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<Notification[]>('/notifications');
  return response.data;
};

export default api;