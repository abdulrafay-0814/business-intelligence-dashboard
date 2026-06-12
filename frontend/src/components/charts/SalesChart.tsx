import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { useThemeStore } from '../../store/themeStore';

const SalesChart = () => {
  const { salesComparison } = useDataStore();
  const { theme } = useThemeStore();

  const isDark = theme === 'dark';

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-semibold">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                {entry.name === 'thisYear' ? 'This Year' : 'Last Year'}:
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
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
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Sales Comparison
            </h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-10">
            This year vs last year
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-600 dark:text-slate-400">This Year</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Last Year</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={salesComparison} barGap={8}>
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
            tickFormatter={(value) => `${value / 1000}K`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#1e293b' : '#f1f5f9' }} />
          <Bar
            dataKey="thisYear"
            fill="#10b981"
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="lastYear"
            fill={isDark ? '#475569' : '#cbd5e1'}
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;