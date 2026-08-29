export default function ConfidenceBadge({ type }) {
  const config = {
    observed: { label: 'Observed', color: 'bg-slate-100 text-slate-700 border-slate-200' },
    derived: { label: 'Derived', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    predicted: { label: 'Predicted', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  };

  const c = config[type] || config.observed;

  return (
    <span className={`inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${c.color}`}>
      {c.label}
    </span>
  );
}
