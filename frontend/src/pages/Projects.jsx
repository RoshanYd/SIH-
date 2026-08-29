import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { projects } from '../data/mockData';
import DataTable from '../components/tables/DataTable';
import RiskBadge from '../components/ui/RiskBadge';

export default function Projects() {
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Project',
        size: 300,
        cell: (info) => (
          <div>
            <div className="font-semibold text-slate-900">{info.row.original.shortName}</div>
            <div className="text-xs text-slate-500 mt-0.5 font-mono">{info.row.original.id}</div>
          </div>
        )
      },
      {
        accessorKey: 'agency',
        header: 'Agency',
        size: 100
      },
      {
        accessorKey: 'sector',
        header: 'Sector',
        size: 120
      },
      {
        accessorKey: 'location.district',
        header: 'District',
        size: 120,
        cell: (info) => (
          <div>
            <div className="font-medium text-slate-800">{info.getValue()}</div>
            <div className="text-xs text-slate-500">{info.row.original.location.state}</div>
          </div>
        )
      },
      {
        accessorKey: 'acquisition.currentStage',
        header: 'Stage',
        size: 120,
        cell: (info) => <span className="font-medium">{info.getValue()}</span>
      },
      {
        accessorKey: 'acquisition.acquiredPct',
        header: 'Land',
        size: 100,
        cell: (info) => (
          <div className="flex items-center gap-2">
            <span className="w-8 font-medium">{info.getValue()}%</span>
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 rounded-full" 
                style={{ width: `${info.getValue()}%` }}
              ></div>
            </div>
          </div>
        )
      },
      {
        accessorKey: 'risk.level',
        header: 'Risk',
        size: 120,
        cell: (info) => <RiskBadge level={info.getValue()} />
      },
      {
        accessorKey: 'targetDate',
        header: 'Target',
        size: 120,
        cell: (info) => (
          <div>
            <div className="font-medium">{format(parseISO(info.getValue()), 'dd MMM yyyy')}</div>
            {info.row.original.daysOverdue > 0 && (
              <div className="text-xs text-rose-600 font-semibold">{info.row.original.daysOverdue} days late</div>
            )}
          </div>
        )
      }
    ],
    []
  );

  return (
    <div className="h-full flex flex-col min-h-[calc(100vh-6rem)]">
      <div className="mb-6">
        <h1 className="text-page-title font-bold text-slate-900 tracking-tight">Projects</h1>
        <p className="text-slate-500 mt-1">{projects.length} active projects in registry.</p>
      </div>

      <div className="flex-1 min-h-[500px]">
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
