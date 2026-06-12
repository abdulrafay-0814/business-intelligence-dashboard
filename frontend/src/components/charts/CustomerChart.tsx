import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Users } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { useThemeStore } from '../../store/themeStore';

const CustomerChart = () => {
  const { customerGrowth } = useDataStore();
  const { theme } = useThemeStore();

  const isDark = theme === 'dark';

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            {payload[0].payload.month}
          </p>
          <p className="text-lg font-bold text-pink-500">
            {payload[0].value.toLocaleString()} customers
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Customer Growth
            </h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-10">
            New customers per month
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            1.25K
          </p>
          <p className="text-xs text-emerald-500 font-semibold">+18.2%</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={customerGrowth}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#334155' : '#e2e8f0'}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke={isDark ? '#94a3b8' : '#64748b'}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={isDark ? '#94a3b8' : '#64748b'}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ fill: '#ec4899', r: 5 }}
            activeDot={{ r: 7, fill: '#ec4899' }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerChart;