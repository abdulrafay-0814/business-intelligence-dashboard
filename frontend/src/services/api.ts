import axios from 'axios';
import type {
  KpiData,
  RevenueTrend,
  SalesComparison,
  CustomerGrowth,
  CategoryDistribution,
  Customer,
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

export default api;