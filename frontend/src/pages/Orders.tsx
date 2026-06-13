import { useEffect, useState, useMemo } from 'react';
import { ShoppingCart, Search, Package, CheckCircle, Truck, Clock, XCircle } from 'lucide-react';
import { useDataStore } from '../store/dataStore';
import { formatCurrency } from '../utils/helper';

const Orders = () => {
  const { orders, fetchAllData } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (searchQuery) {
      result = result.filter(
        (order) =>
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter);
    }

    return result;
  }, [orders, searchQuery, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: orders.length,
      delivered: orders.filter((o) => o.status === 'Delivered').length,
      processing: orders.filter((o) => o.status === 'Processing').length,
      pending: orders.filter((o) => o.status === 'Pending').length,
    };
  }, [orders]);

  // Status badge styles
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'Processing':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'Shipped':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400';
      case 'Pending':
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'Cancelled':
        return 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Orders
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Track and manage all customer orders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
            <Package className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Orders</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.total}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-3">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Delivered</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.delivered}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Processing</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.processing}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.pending}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Recent Orders
                </h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 ml-10">
                {filteredOrders.length} orders found
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by order, customer, product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white outline-none transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <XCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
                      <p className="text-slate-600 dark:text-slate-400 font-medium">No orders found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800 dark:text-white text-sm">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 dark:text-slate-300 text-sm">{order.product}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800 dark:text-white text-sm">{formatCurrency(order.amount)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 dark:text-slate-300 text-sm">{order.date}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;