import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
}

const KpiCard = ({ title, value, change, icon: Icon, gradient, iconBg }: KpiCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden">
      
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

      {/* Top section: Icon + Title */}
      <div className="relative flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Change Badge */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
          isPositive
            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>

      {/* Title */}
      <p className="relative text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
        {title}
      </p>

      {/* Value */}
      <h3 className="relative text-3xl font-bold text-slate-800 dark:text-white">
        {value}
      </h3>

      {/* Footer */}
      <p className="relative text-xs text-slate-400 dark:text-slate-500 mt-3">
        vs last month
      </p>
    </div>
  );
};

export default KpiCard;