import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { interventions, BOTTLENECK_CATEGORIES } from '../data/mockData';
import DataTable from '../components/tables/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import RiskBadge from '../components/ui/RiskBadge';
import { Plus } from 'lucide-react';

export default function Interventions() {
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const openInterventions = interventions.filter(i => !['Resolved', 'Closed'].includes(i.status)).length;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'projectName',
        header: 'Project',
        size: 250,
        cell: (info) => <span className="font-semibold text-slate-900 hover:text-brand-600 cursor-pointer">{info.getValue()}</span>
      },
      {
        accessorKey: 'issueCategory',
        header: 'Category',
        size: 150,
        cell: (info) => <span className="text-sm text-slate-600 font-medium">{info.getValue()}</span>
      },
      {
        accessorKey: 'issue',
        header: 'Issue Details',
        size: 300,
        cell: (info) => <span className="text-sm">{info.getValue()}</span>
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        size: 100,
        cell: (info) => <RiskBadge level={info.getValue()} showIcon={false} />
      },
      {
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        size: 150,
        cell: (info) => <span className="text-sm font-medium">{info.getValue()}</span>
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        size: 120,
        cell: (info) => {
          const date = info.getValue();
          const isOverdue = new Date(date) < new Date() && !['Resolved', 'Closed'].includes(info.row.original.status);
          return (
            <span className={`text-sm ${isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-600'}`}>
              {format(parseISO(date), 'dd MMM yyyy')}
            </span>
          );
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: (info) => <StatusBadge status={info.getValue()} />
      }
    ],
    []
  );

  return (
    <div className="h-full flex flex-col min-h-[calc(100vh-6rem)] relative">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-page-title font-bold text-slate-900 tracking-tight">Interventions</h1>
          <p className="text-slate-500 mt-1">{openInterventions} active follow-ups required.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Create Follow-up
        </button>
      </div>

      <div className="flex-1 min-h-[500px]">
        <DataTable 
          data={interventions} 
          columns={columns} 
          onRowClick={(row) => navigate(`/project/${row.projectId}`)}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-full">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Create Follow-up</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Project</label>
                  <select className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-500">
                    <option>NH-83 Patna–Gaya</option>
                    <option>Delhi–Agra Expressway</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Issue Category</label>
                  <select className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-500">
                    {BOTTLENECK_CATEGORIES?.map(c => <option key={c}>{c}</option>) || <option>Litigation</option>}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Issue</label>
                  <input type="text" placeholder="Describe the specific problem..." className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Priority</label>
                    <select className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-500">
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Due Date</label>
                    <input type="date" className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Responsible Function / Officer</label>
                  <input type="text" placeholder="e.g. CALA, Legal Dept" className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes (Optional)</label>
                  <textarea rows="3" className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-500"></textarea>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800 transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 font-medium bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors shadow-sm">Create Intervention</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
