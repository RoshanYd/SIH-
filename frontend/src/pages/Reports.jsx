import { FileText, Download, TrendingUp, AlertTriangle } from 'lucide-react';
import SectionCard from '../components/ui/SectionCard';

const predefinedReports = [
  { id: 1, name: 'National Highways Authority (NHAI) Portfolio Risk Review', frequency: 'Monthly', lastGenerated: '2023-11-01', size: '2.4 MB' },
  { id: 2, name: 'Critical Interventions & Delays (>180 Days)', frequency: 'Weekly', lastGenerated: '2023-11-12', size: '1.1 MB' },
  { id: 3, name: 'State-wise Litigation Pendency & Impact Analysis', frequency: 'Quarterly', lastGenerated: '2023-10-01', size: '4.7 MB' },
  { id: 4, name: 'Forest Clearance Dependency Tracker', frequency: 'Monthly', lastGenerated: '2023-11-01', size: '850 KB' },
];

export default function Reports() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-page-title font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
        <p className="text-slate-500 mt-1">Generate and download analytical reports for stakeholders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-brand-600 text-white rounded-lg p-5 shadow-sm relative overflow-hidden group cursor-pointer hover:bg-brand-700 transition-colors">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>
          <FileText className="w-8 h-8 mb-4 text-brand-200" />
          <h3 className="font-bold text-lg leading-tight mb-1">Generate Custom Report</h3>
          <p className="text-brand-200 text-sm">Select filters and metrics to build a tailored report.</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm cursor-pointer hover:border-brand-300 hover:shadow-md transition-all">
          <TrendingUp className="w-8 h-8 mb-4 text-emerald-500" />
          <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">Executive Summary</h3>
          <p className="text-slate-500 text-sm">High-level KPIs and risk metrics across all agencies.</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm cursor-pointer hover:border-brand-300 hover:shadow-md transition-all">
          <AlertTriangle className="w-8 h-8 mb-4 text-amber-500" />
          <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">Bottleneck Analysis</h3>
          <p className="text-slate-500 text-sm">Deep dive into the primary causes of project delays.</p>
        </div>
      </div>

      <SectionCard title="Pre-configured Reports">
        <div className="divide-y divide-slate-100">
          {predefinedReports.map(report => (
            <div key={report.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between md:items-center gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-0.5 group-hover:text-brand-600 transition-colors">{report.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{report.frequency}</span>
                    <span>Last generated: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                    <span className="text-slate-300">•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-md font-medium text-sm transition-colors border border-slate-200 shrink-0">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
