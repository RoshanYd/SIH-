import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Activity, Map, ListTodo, FileText } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/risk-monitor', label: 'Risk Monitor', icon: Activity },
  { path: '/districts', label: 'Districts', icon: Map },
  { path: '/interventions', label: 'Interventions', icon: ListTodo },
  { path: '/reports', label: 'Reports', icon: FileText },
];

export default function Sidebar({ isCollapsed }) {
  const location = useLocation();

  return (
    <aside className={`bg-[#0f172a] text-slate-300 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 min-h-screen border-r border-slate-800`}>
      <div className="h-14 flex items-center px-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3 w-full overflow-hidden">
          <div className="w-8 h-8 bg-brand-500 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg leading-none">LA</span>
          </div>
          {!isCollapsed && <span className="font-semibold text-white tracking-wide truncate">LAIDS</span>}
        </div>
      </div>
      
      <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group relative ${
                isActive 
                  ? 'bg-brand-600 text-white' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`} />
              {!isCollapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50 transition-all pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0 border border-slate-600 flex items-center justify-center text-xs font-medium text-white">
            JD
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-medium text-white truncate">John Doe</span>
              <span className="text-xs text-slate-400 truncate">Regional Officer</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
