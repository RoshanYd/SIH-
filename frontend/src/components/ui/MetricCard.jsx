import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({ title, value, subtitle, trend, trendValue }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col">
      <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
        {title}
      </h3>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {subtitle && <span className="text-sm text-slate-500">{subtitle}</span>}
      </div>
      
      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          {trend === 'up' && <TrendingUp className="w-4 h-4 text-rose-500" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4 text-emerald-500" />}
          {trend === 'neutral' && <Minus className="w-4 h-4 text-slate-400" />}
          
          <span className={`font-medium ${
            trend === 'up' ? 'text-rose-600' : 
            trend === 'down' ? 'text-emerald-600' : 
            'text-slate-500'
          }`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}
