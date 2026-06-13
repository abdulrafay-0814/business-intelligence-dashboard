import RevenueChart from '../components/charts/RevenueChart';
import SalesChart from '../components/charts/SalesChart';
import CustomerChart from '../components/charts/CustomerChart';
import CategoryChart from '../components/charts/CategoryChart';
import { useEffect } from 'react';
import { useDataStore } from '../store/dataStore';

const Analytics = () => {
  const { fetchAllData } = useDataStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Deep insights and detailed analytics for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RevenueChart />
        <CategoryChart />
        <SalesChart />
        <CustomerChart />
      </div>
    </div>
  );
};

export default Analytics;