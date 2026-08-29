export default function ProgressBar({ value, max = 100, label, subtitle, colorClass = 'bg-brand-500' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="w-full">
      {(label || subtitle) && (
        <div className="flex justify-between items-end mb-1.5">
          {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
          {subtitle && <span className="text-sm text-slate-500">{subtitle}</span>}
        </div>
      )}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
