import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData, getFilters } from '../data/mockData';
import MetricCard from '../components/ui/MetricCard';
import SectionCard from '../components/ui/SectionCard';
import FilterBar from '../components/ui/FilterBar';
import RiskDistribution from '../components/charts/RiskDistribution';
import BottleneckChart from '../components/charts/BottleneckChart';
import RiskTrend from '../components/charts/RiskTrend';
import RiskMap from '../components/maps/RiskMap';
import RiskBadge from '../components/ui/RiskBadge';
import { getDistrictsData } from '../data/mockData';
import { ArrowRight, AlertCircle, FileText } from 'lucide-react';

export default function Dashboard() {
  const [activeFilters, setActiveFilters] = useState({});
  const navigate = useNavigate();
  
  const data = getDashboardData();
  const filters = getFilters();
  const districts = getDistrictsData();

  const handleFilterChange = (key, value) => {
    if (key === 'clear_all') {
      setActiveFilters({});
    } else {
      setActiveFilters({ ...activeFilters, [key]: value });
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-page-title font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Portfolio risk summary as of today.</p>
        </div>
        <FilterBar 
          filters={{ state: filters.states, district: filters.districts, agency: filters.agencies, risk: filters.riskLevels }} 
          activeFilters={activeFilters} 
          onFilterChange={handleFilterChange} 
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard title="Active Projects" value={data.kpis.active} />
        <MetricCard title="Critical Risk" value={data.kpis.critical} trend="up" trendValue="+1 from last month" />
        <MetricCard title="High Risk" value={data.kpis.high} trend="down" trendValue="-2 from last month" />
        <MetricCard title="Land Required" value={`${(data.kpis.totalLand / 1000).toFixed(1)}k`} subtitle="Ha" />
        <MetricCard title="Require Action" value={data.kpis.requireAction} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard 
            title={
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                <span className="text-rose-600">Attention Required</span>
              </div>
            }
            action={
              <button onClick={() => navigate('/projects')} className="text-sm font-medium text-brand-600 hover:text-brand-800 flex items-center gap-1">
                View all projects <ArrowRight className="w-4 h-4" />
              </button>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="text-sm text-slate-500 mb-2">
                <span className="font-semibold text-slate-700">{data.attentionProjects.length} projects</span> require immediate follow-up.
              </div>
              
              {data.attentionProjects.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => navigate(`/project/${p.id}`)}
                  className="p-4 rounded-lg border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer bg-white group flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <RiskBadge level={p.risk.level} />
                      <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{p.name}</h3>
                    </div>
                    <div className="text-sm font-medium text-rose-600 mb-1">{p.daysOverdue} days overdue</div>
                    <div className="text-sm text-slate-600 flex items-center gap-1.5">
                      <span className="font-medium text-slate-800">Primary concern: {p.risk.primaryBottleneck}</span>
                      <span className="text-slate-300">•</span>
                      <span>{p.risk.drivers[0]?.detail || 'Review required'}</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors">
                      Review issue
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium bg-brand-50 text-brand-700 rounded hover:bg-brand-100 transition-colors">
                      View project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        
        <div className="flex flex-col gap-6">
          <SectionCard title="Project Risk">
            <RiskDistribution data={data.riskDistribution} />
          </SectionCard>
          
          <SectionCard title="Primary Bottlenecks">
            <BottleneckChart data={data.bottlenecks} />
          </SectionCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard 
          title="Project Risk Trend"
          action={
            <select className="text-sm border-none bg-transparent font-medium text-slate-600 focus:ring-0 cursor-pointer">
              <option>1 Year</option>
              <option>90 Days</option>
              <option>30 Days</option>
            </select>
          }
        >
          <RiskTrend data={data.riskTrend} />
        </SectionCard>
        
        <SectionCard title="Geographic Risk Concentration">
          <RiskMap districts={districts} />
        </SectionCard>
      </div>
    </div>
  );
}
