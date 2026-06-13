import { useEffect } from 'react';
import DataTable from '../components/table/DataTable';
import { useDataStore } from '../store/dataStore';

const Customers = () => {
  const { fetchAllData } = useDataStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Customers
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage all your customers in one place.
        </p>
      </div>

      <DataTable />
    </div>
  );
};

export default Customers;