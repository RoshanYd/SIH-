import { useState } from 'react';
import { format, parseISO } from 'date-fns';

const colors = {
  critical: 'bg-risk-critical',
  high: 'bg-risk-high',
  medium: 'bg-risk-medium',
  low: 'bg-risk-low'
};

const labels = {
  critical: '🔴 Critical',
  high: '🟠 High',
  medium: '🟡 Medium',
  low: '🟢 Low'
};

export default function RiskTrajectory({ snapshots }) {
  const [activeSnapshot, setActiveSnapshot] = useState(snapshots[snapshots.length - 1]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative px-2 py-4">
        <div className="absolute left-6 right-6 h-0.5 bg-slate-200 top-6 -z-10"></div>
        
        {snapshots.map((snap, i) => {
          const isActive = activeSnapshot === snap;
          return (
            <div key={i} className="flex flex-col items-center gap-2 relative z-10" style={{ width: `${100 / snapshots.length}%` }}>
              <button 
                onClick={() => setActiveSnapshot(snap)}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  isActive ? 'border-brand-600 scale-125 ring-4 ring-brand-100' : 'border-white hover:scale-110'
                } ${colors[snap.riskLevel]}`}
                title={snap.date}
              />
              <span className={`text-[11px] font-medium ${isActive ? 'text-brand-700' : 'text-slate-500'}`}>
                {format(parseISO(snap.date), 'MMM yyyy')}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">
          Snapshot — {format(parseISO(activeSnapshot.date), 'MMMM yyyy')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-500 mb-1">Risk Level</div>
            <div className="text-sm font-semibold">{labels[activeSnapshot.riskLevel]}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Land Acquired</div>
            <div className="text-sm font-semibold">{activeSnapshot.landAcquiredPct}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Active Litigation</div>
            <div className="text-sm font-semibold">{activeSnapshot.activeLitigation} cases</div>
          </div>
        </div>
      </div>
    </div>
  );
}
