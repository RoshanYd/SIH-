import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import RiskBadge from '../ui/RiskBadge';

export default function RiskDrivers({ drivers }) {
  const [expanded, setExpanded] = useState(false);

  // Take top 3 for initial view
  const displayDrivers = expanded ? drivers : drivers.slice(0, 3);

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 uppercase tracking-wider text-sm">Key Risk Drivers</h3>
        {drivers.length > 3 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-medium text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            {expanded ? 'Show less' : `Show all (${drivers.length})`}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
      <div className="divide-y divide-slate-100">
        {displayDrivers.map((driver, idx) => (
          <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
            <div>
              <div className="font-medium text-slate-900">{driver.factor}</div>
              <div className="text-sm text-slate-500 mt-0.5">{driver.detail}</div>
            </div>
            <div className="shrink-0">
              <RiskBadge level={driver.severity} size="sm" showIcon={false} />
            </div>
          </div>
        ))}
        {drivers.length === 0 && (
          <div className="p-4 text-center text-sm text-slate-500 italic">
            No significant risk drivers identified.
          </div>
        )}
      </div>
    </div>
  );
}
