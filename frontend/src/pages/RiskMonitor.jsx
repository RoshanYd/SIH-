import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRiskMonitorData, getDashboardData } from '../data/mockData';
import DataTable from '../components/tables/DataTable';
import RiskBadge from '../components/ui/RiskBadge';
import RiskTrend from '../components/charts/RiskTrend';
import SectionCard from '../components/ui/SectionCard';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';

export default function RiskMonitor() {
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState('');
  
  const projects = getRiskMonitorData();
  const dashboardData = getDashboardData();
  
  const deterioratedCount = projects.filter(p => p.direction === 'up').length;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Project',
        size: 300,
        cell: (info) => (
          <div>
            <div className="font-semibold text-slate-900">{info.row.original.shortName}</div>
            <div className="text-xs text-slate-500 mt-0.5">{info.row.original.id}</div>
          </div>
        )
      },
      {
        accessorKey: 'previousRisk',
        header: 'Previous Risk',
        size: 150,
        cell: (info) => <RiskBadge level={info.getValue()} showIcon={false} />
      },
      {
        accessorKey: 'direction',
        header: 'Trend',
        size: 80,
        cell: (info) => {
          const dir = info.getValue();
          if (dir === 'up') return <ArrowUpRight className="w-5 h-5 text-rose-500" title="Deteriorating" />;
          if (dir === 'down') return <ArrowDownRight className="w-5 h-5 text-emerald-500" title="Improving" />;
          return <ArrowRight className="w-5 h-5 text-slate-400" title="Stable" />;
        }
      },
      {
        accessorKey: 'currentRisk',
        header: 'Current Risk',
        size: 150,
        cell: (info) => <RiskBadge level={info.getValue()} showIcon={false} />
      },
      {
        accessorKey: 'risk.primaryBottleneck',
        header: 'Primary Driver',
        size: 200,
        cell: (info) => <span className="font-medium text-slate-700">{info.getValue()}</span>
      }
    ],
    []
  );

  return (
    <div className="flex flex-col gap-6 min-h-[calc(100vh-6rem)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-page-title font-bold text-slate-900 tracking-tight">Risk Monitor</h1>
          <p className="text-slate-500 mt-1">Track projects where acquisition risk is deteriorating or improving.</p>
        </div>
        
        <div className="bg-rose-50 border border-rose-200 px-4 py-2 rounded-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-rose-100 shrink-0">
            <ArrowUpRight className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <div className="text-xs font-semibold text-rose-700 uppercase tracking-wider">Deteriorating</div>
            <div className="text-xl font-bold text-rose-900">{deterioratedCount} projects</div>
          </div>
        </div>
      </div>

      <SectionCard title="Portfolio Risk Trend" className="h-72">
        <RiskTrend data={dashboardData.riskTrend} />
      </SectionCard>

      <div className="flex-1 mt-2">
        <DataTable 
          data={projects} 
          columns={columns} 
          onRowClick={(row) => navigate(`/project/${row.id}`)}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </div>
  );
}
