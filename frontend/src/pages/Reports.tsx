import { useEffect } from 'react';
import { FileText, Download, FileSpreadsheet, FileBarChart, Users, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDataStore } from '../store/dataStore';
import { exportToCSV } from '../utils/helper';

const Reports = () => {
  const { customers, orders, fetchAllData } = useDataStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Export functions
  const handleExportCustomers = () => {
    const data = customers.map((c) => ({
      'Customer Name': c.name,
      Revenue: c.revenue,
      Orders: c.orders,
      Status: c.status,
      Region: c.region,
    }));
    exportToCSV(data, `customers-report-${new Date().toISOString().split('T')[0]}`);
    toast.success('Customers report downloaded!');
  };

  const handleExportOrders = () => {
    const data = orders.map((o) => ({
      'Order Number': o.orderNumber,
      Customer: o.customer,
      Product: o.product,
      Amount: o.amount,
      Status: o.status,
      Date: o.date,
    }));
    exportToCSV(data, `orders-report-${new Date().toISOString().split('T')[0]}`);
    toast.success('Orders report downloaded!');
  };

  const reportCards = [
    {
      title: 'Customer Report',
      description: 'Download complete list of all customers with revenue, orders, and status information.',
      icon: Users,
      count: customers.length,
      label: 'Customers',
      gradient: 'from-indigo-500 to-purple-600',
      onClick: handleExportCustomers,
    },
    {
      title: 'Orders Report',
      description: 'Export all orders with customer details, products, amounts, and current status.',
      icon: ShoppingCart,
      count: orders.length,
      label: 'Orders',
      gradient: 'from-emerald-500 to-teal-600',
      onClick: handleExportOrders,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Reports
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Generate and download detailed business reports.
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {reportCards.map((report, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${report.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                <report.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {report.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {report.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total {report.label}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{report.count}</p>
              </div>
              <button
                onClick={report.onClick}
                className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br ${report.gradient} text-white rounded-lg font-medium text-sm shadow-lg transition-all hover:scale-105`}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <FileBarChart className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Report Summary</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <FileSpreadsheet className="w-6 h-6 text-indigo-500 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Export Format</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">CSV</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <FileText className="w-6 h-6 text-emerald-500 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Available Reports</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">2 Reports</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <Users className="w-6 h-6 text-pink-500 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Customers</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">{customers.length}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <ShoppingCart className="w-6 h-6 text-amber-500 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Orders</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">{orders.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;