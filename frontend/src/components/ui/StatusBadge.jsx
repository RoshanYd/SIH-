export default function StatusBadge({ status, size = 'md' }) {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';
  
  let colors = 'bg-slate-100 text-slate-700 border-slate-200';
  
  if (['Completed', 'Approved', 'Resolved', 'Closed'].includes(status) || status === 'completed') {
    colors = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (['In Progress', 'in-progress'].includes(status)) {
    colors = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (['Pending', 'pending', 'Open', 'Awaiting External Response'].includes(status)) {
    colors = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (['Rejected', 'Critical'].includes(status)) {
    colors = 'bg-red-50 text-red-700 border-red-200';
  }

  const label = typeof status === 'string' ? (status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')) : 'Unknown';

  return (
    <span className={`inline-flex items-center rounded-full border ${colors} ${sizeClasses} font-medium`}>
      {label}
    </span>
  );
}
