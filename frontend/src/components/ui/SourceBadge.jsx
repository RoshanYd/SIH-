import { Database } from 'lucide-react';

export default function SourceBadge({ source }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
      <Database className="w-3 h-3" />
      {source}
    </span>
  );
}
