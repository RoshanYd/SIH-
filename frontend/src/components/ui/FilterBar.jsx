export default function FilterBar({ filters, activeFilters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {Object.entries(filters).map(([key, options]) => (
        <select
          key={key}
          className="block w-40 pl-3 pr-8 py-1.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-colors"
          value={activeFilters[key] || ''}
          onChange={(e) => onFilterChange(key, e.target.value)}
        >
          <option value="">{key.charAt(0).toUpperCase() + key.slice(1)}: All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
      
      {Object.values(activeFilters).some(v => v !== '') && (
        <button 
          onClick={() => {
            const cleared = {};
            Object.keys(activeFilters).forEach(k => cleared[k] = '');
            onFilterChange('clear_all', cleared);
          }}
          className="text-xs text-brand-600 font-medium hover:text-brand-800"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
