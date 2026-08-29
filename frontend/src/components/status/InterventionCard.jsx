import { Calendar, User, FileText, ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import RiskBadge from '../ui/RiskBadge';
import StatusBadge from '../ui/StatusBadge';

export default function InterventionCard({ intervention }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-1 h-full ${
        intervention.priority === 'critical' ? 'bg-risk-critical' : 
        intervention.priority === 'high' ? 'bg-risk-high' : 'bg-risk-medium'
      }`}></div>
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <RiskBadge level={intervention.priority} size="sm" showIcon={false} />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {intervention.issueCategory}
          </span>
        </div>
        <StatusBadge status={intervention.status} size="sm" />
      </div>
      
      <h3 className="font-medium text-slate-900 mb-2 leading-snug pr-6">
        {intervention.issue}
      </h3>
      
      {intervention.notes && (
        <div className="flex items-start gap-1.5 text-sm text-slate-600 mb-4 bg-slate-50 p-2 rounded">
          <FileText className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <p className="line-clamp-2">{intervention.notes}</p>
        </div>
      )}
      
      <div className="flex flex-wrap items-center gap-4 mt-auto pt-3 border-t border-slate-100 text-sm text-slate-500">
        <div className="flex items-center gap-1.5">
          <User className="w-4 h-4 text-slate-400" />
          <span className="font-medium">{intervention.assignedTo}</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className={new Date(intervention.dueDate) < new Date() && intervention.status !== 'Resolved' && intervention.status !== 'Closed' ? 'text-rose-600 font-medium' : ''}>
            Due {format(parseISO(intervention.dueDate), 'dd MMM yyyy')}
          </span>
        </div>
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-full shadow-sm border border-slate-200">
        <ChevronRight className="w-5 h-5 text-brand-500" />
      </div>
    </div>
  );
}
