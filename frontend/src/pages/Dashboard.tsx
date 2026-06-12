import { useEffect } from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp, Target } from 'lucide-react';
import KpiCard from '../components/kpi/KpiCard';
import { useDataStore } from '../store/dataStore';
import { formatCurrency, formatNumber, formatPercent } from '../utils/helper';

const Dashboard = () => {
  const { kpis, loading, error, fetchAllData } = useDataStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-8 text-center">
        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        <button
          onClick={fetchAllData}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // KPI Cards Data
  const kpiCards = [
    {
      title: 'Total Revenue',
      value: kpis ? formatCurrency(kpis.totalRevenue) : '$0',
      change: 12.5,
      icon: DollarSign,
      gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    },
    {
      title: 'Total Customers',
      value: kpis ? formatNumber(kpis.totalCustomers) : '0',
      change: 8.2,
      icon: Users,
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
      iconBg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
      title: 'Total Orders',
      value: kpis ? formatNumber(kpis.totalOrders) : '0',
      change: 15.3,
      icon: ShoppingCart,
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
    {
      title: 'Monthly Growth',
      value: kpis ? formatPercent(kpis.monthlyGrowth) : '0%',
      change: 4.1,
      icon: TrendingUp,
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    {
      title: 'Conversion Rate',
      value: kpis ? formatPercent(kpis.conversionRate) : '0%',
      change: -2.4,
      icon: Target,
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {kpiCards.map((card, index) => (
          <KpiCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            icon={card.icon}
            gradient={card.gradient}
            iconBg={card.iconBg}
          />
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Charts Coming Soon...
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Beautiful charts will be added in the next step.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;