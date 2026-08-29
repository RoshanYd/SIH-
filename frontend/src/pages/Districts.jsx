import { useState } from 'react';
import { getDistrictsData } from '../data/mockData';
import RiskMap from '../components/maps/RiskMap';
import SectionCard from '../components/ui/SectionCard';
import RiskBadge from '../components/ui/RiskBadge';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

function DistrictRow({ district }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm mb-4">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 grid grid-cols-4 gap-4 items-center">
          <div>
            <div className="font-bold text-slate-900 text-lg">{district.district}</div>
            <div className="text-sm text-slate-500">{district.state}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Total Projects</div>
            <div className="font-semibold">{district.projectCount}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">High/Critical</div>
            <div className="font-semibold text-rose-600">{district.highCritical}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Avg Delay</div>
            <div className="font-semibold">{district.avgDelay} days</div>
          </div>
        </div>
        <div className="shrink-0 ml-4 p-2 text-slate-400">
          {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </div>
      
      {expanded && (
        <div className="p-5 border-t border-slate-100 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Acquisition Status</h4>
                <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-100">
                  <span className="text-sm text-slate-600">Total Land Req.</span>
                  <span className="font-semibold">{district.totalLand.toLocaleString()} Ha</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-100 mt-2">
                  <span className="text-sm text-slate-600">Pending Acq.</span>
                  <span className="font-semibold text-rose-600">{district.pendingLand.toLocaleString()} Ha</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Systemic Risk</h4>
                <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-100 mb-2">
                  <span className="text-sm text-slate-600">Litigation Exposure</span>
                  <RiskBadge level={district.litigationExposure} showIcon={false} size="sm" />
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-100">
                  <span className="text-sm text-slate-600">Clearance Exposure</span>
                  <RiskBadge level={district.clearanceExposure} showIcon={false} size="sm" />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Top Bottlenecks in District</h4>
              <div className="bg-white p-4 rounded border border-slate-200">
                {district.bottlenecks.map((b, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{b.name}</span>
                      <span className="text-slate-500">{b.pct}% ({b.count} projects)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${b.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {district.litigationExposure === 'high' && (
                <div className="mt-4 flex items-start gap-2 bg-amber-50 p-3 rounded border border-amber-200 text-sm text-amber-800">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  <p><strong>High systemic litigation risk:</strong> District-level dispute pendency is affecting multiple projects in this area.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Districts() {
  const districts = getDistrictsData();
  
  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="mb-2">
        <h1 className="text-page-title font-bold text-slate-900 tracking-tight">District Intelligence</h1>
        <p className="text-slate-500 mt-1">Identify systemic problems and risk concentration across {districts.length} districts.</p>
      </div>

      <SectionCard title="Geographic Risk Map">
        <RiskMap districts={districts} />
      </SectionCard>

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">District Analysis</h2>
        {districts.map(d => (
          <DistrictRow key={d.id} district={d} />
        ))}
      </div>
    </div>
  );
}
