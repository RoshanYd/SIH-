import { Menu, Bell, ChevronDown } from 'lucide-react';
import { notifications } from '../../data/mockData';

export default function TopBar({ toggleSidebar }) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex flex-col">
          <h1 className="text-sm font-semibold text-slate-900 leading-tight">Land Acquisition Intelligence System</h1>
          <span className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">Early Warning & Decision Support</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Demonstration environment · Data is illustrative
        </div>
        
        <div className="h-5 w-px bg-slate-200 hidden sm:block mx-1"></div>
        
        <button className="relative p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
          )}
        </button>
        
        <div className="h-5 w-px bg-slate-200 mx-1"></div>
        
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-slate-700 leading-tight">Patna District</div>
            <div className="text-xs text-slate-500">All Projects</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
