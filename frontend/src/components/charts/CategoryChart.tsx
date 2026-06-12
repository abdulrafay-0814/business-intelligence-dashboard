import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

const CategoryChart = () => {
  const { categoryDistribution } = useDataStore();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-bold text-slate-800 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {payload[0].value}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label
  const renderLabel = (entry: any) => {
    return `${entry.value}%`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
          <PieIcon className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Category Distribution
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sales by category
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={categoryDistribution}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            label={renderLabel}
            animationDuration={1500}
          >
            {categoryDistribution.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {categoryDistribution.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-xs text-slate-600 dark:text-slate-400 flex-1">
              {item.name}
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;