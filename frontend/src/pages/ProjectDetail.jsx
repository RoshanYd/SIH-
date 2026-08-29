import { useParams, Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, ExternalLink, Activity, AlertTriangle, ShieldAlert } from 'lucide-react';
import { projects, interventions } from '../data/mockData';
import RiskBadge from '../components/ui/RiskBadge';
import MetricCard from '../components/ui/MetricCard';
import ProgressBar from '../components/ui/ProgressBar';
import SectionCard from '../components/ui/SectionCard';
import ConfidenceBadge from '../components/ui/ConfidenceBadge';
import SourceBadge from '../components/ui/SourceBadge';
import StatusBadge from '../components/ui/StatusBadge';
import AcquisitionTimeline from '../components/status/AcquisitionTimeline';
import RiskDrivers from '../components/status/RiskDrivers';
import InterventionCard from '../components/status/InterventionCard';
import RiskTrajectory from '../components/charts/RiskTrajectory';
import EmptyState from '../components/ui/EmptyState';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id) || projects[0];
  const projectInterventions = interventions.filter(i => i.projectId === project.id);

  if (!project) return <EmptyState title="Project not found" />;

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* 1. PROJECT IDENTITY */}
      <div>
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">{project.id}</span>
              <span>{project.agency}</span>
              <span className="text-slate-300">•</span>
              <span>{project.sector}</span>
              <span className="text-slate-300">•</span>
              <span>{project.location.district}, {project.location.state}</span>
            </div>
          </div>
          <div className="shrink-0 pt-1">
            <RiskBadge level={project.risk.level} size="lg" />
          </div>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard title="Land Required" value={project.acquisition.landRequiredHa} subtitle="Ha" />
        <MetricCard title="Land Acquired" value={project.acquisition.landAcquiredHa} subtitle="Ha" />
        <MetricCard title="Current Stage" value={project.acquisition.currentStage} />
        <MetricCard title="Target" value={format(parseISO(project.targetDate), 'MMM yyyy')} subtitle={project.daysOverdue > 0 ? `${project.daysOverdue} days late` : 'On track'} />
        <MetricCard title="Est. Cost" value={`₹${project.sanctionedCost}`} subtitle="Cr" />
      </div>

      {/* 3. ACQUISITION TIMELINE */}
      <SectionCard 
        title="Land Acquisition Lifecycle" 
        className="overflow-visible"
        action={<ConfidenceBadge type="observed" />}
      >
        <AcquisitionTimeline 
          milestones={project.acquisition.milestones} 
          daysSinceLastMilestone={project.acquisition.daysSinceLastMilestone}
        />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4. LAND ACQUISITION */}
        <SectionCard title="Land Acquisition" action={<ConfidenceBadge type="observed" />}>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between text-sm mb-4">
                <div>
                  <div className="text-slate-500">Required</div>
                  <div className="font-semibold text-lg">{project.acquisition.landRequiredHa} Ha</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-500">Acquired</div>
                  <div className="font-semibold text-lg text-emerald-600">{project.acquisition.landAcquiredHa} Ha</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-500">Remaining</div>
                  <div className="font-semibold text-lg text-rose-600">{project.acquisition.landRemainingHa} Ha</div>
                </div>
              </div>
              <ProgressBar value={project.acquisition.acquiredPct} label="Overall Progress" subtitle={`${project.acquisition.acquiredPct}% acquired`} />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Physical Land Complexity</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500 mb-1">Agricultural Land</div>
                  <div className="font-medium">{project.physicalComplexity.agriculturalLandRatio}%</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Built-up Density</div>
                  <div className="font-medium">{project.physicalComplexity.builtUpDensity}</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Flood Hazard</div>
                  <div className="font-medium">{project.physicalComplexity.floodHazard}</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Parcel Fragmentation</div>
                  <div className="font-medium">{project.physicalComplexity.parcelFragmentation}</div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 5. LITIGATION */}
        <SectionCard title="Litigation Intelligence" action={<ConfidenceBadge type="observed" />}>
          <div className="flex flex-col h-full justify-between gap-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Project Level</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Active litigation</span>
                    <span className="font-semibold">{project.litigation.projectLevel.activeCases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Stay orders</span>
                    <span className="font-semibold text-rose-600">{project.litigation.projectLevel.stayOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">3G arbitration</span>
                    <span className="font-semibold">{project.litigation.projectLevel.arbitrationPetitions}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">District Context</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pending disputes</span>
                    <span className="font-semibold">{project.litigation.districtLevel.pendingDisputes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg disposal time</span>
                    <span className="font-semibold">{project.litigation.districtLevel.avgDisposalDays.toLocaleString()} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Uncontested ratio</span>
                    <span className="font-semibold">{(project.litigation.districtLevel.uncontestedRatio * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50 p-3 rounded-md">
              <span className="text-sm font-semibold text-slate-700">Litigation Exposure</span>
              <RiskBadge level={project.litigation.exposure} showIcon={false} size="sm" />
            </div>
          </div>
        </SectionCard>

        {/* 6. CLEARANCES */}
        <SectionCard title="Statutory Clearances" action={<ConfidenceBadge type="observed" />}>
          <div className="flex flex-col h-full justify-between gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-500 mb-1">Forest Land Required</div>
                <div className="text-lg font-semibold mb-4">{project.clearances.forestLandHa} Ha</div>
                
                <div className="text-sm text-slate-500 mb-1">Eco-Sensitive Zone</div>
                <div className="font-medium text-sm">{project.clearances.eszOverlap ? 'Yes - Overlap Detected' : 'No Overlap'}</div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold">Stage 1</span>
                    <StatusBadge status={project.clearances.stage1.status} size="sm" />
                  </div>
                  {project.clearances.stage1.processingDays > 0 && (
                    <div className="text-xs text-slate-500">{project.clearances.stage1.processingDays} days processing</div>
                  )}
                </div>
                
                <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Stage 2</span>
                    <StatusBadge status={project.clearances.stage2.status} size="sm" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50 p-3 rounded-md">
              <span className="text-sm font-semibold text-slate-700">Clearance Exposure</span>
              <RiskBadge level={project.clearances.exposure} showIcon={false} size="sm" />
            </div>
          </div>
        </SectionCard>

        {/* 7. COMPENSATION */}
        <SectionCard title="Compensation & Valuation" action={<ConfidenceBadge type="derived" />}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="text-slate-500 mb-1">Circle Rate (Agri)</div>
                <div className="font-semibold">₹{project.compensation.circleRateAgricultural.toLocaleString()} / m²</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="text-slate-500 mb-1">Circle Rate (Non-Agri)</div>
                <div className="font-semibold">₹{project.compensation.circleRateNonAgricultural.toLocaleString()} / m²</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-md col-span-2 flex justify-between items-center">
                <div>
                  <div className="text-slate-500 mb-1">Estimated Market Valuation</div>
                  <div className="font-semibold text-brand-700">₹{project.compensation.marketValuation.toLocaleString()} / m²</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 mb-1">Valuation Discrepancy</div>
                  <div className="font-bold text-lg">{project.compensation.valuationDiscrepancy}×</div>
                </div>
              </div>
            </div>
            {project.compensation.valuationDiscrepancy > 1.5 && (
              <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm border border-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p>Large discrepancy between baseline valuation and estimated market valuation may increase likelihood of compensation disputes.</p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* 8. RISK ASSESSMENT & EXPLANATION */}
        <div className="flex flex-col gap-4">
          <SectionCard 
            title="Delay Risk Assessment" 
            className="border-brand-200 bg-brand-50/20"
            action={<ConfidenceBadge type="predicted" />}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Overall Risk</div>
                  <RiskBadge level={project.risk.level} size="lg" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">Likelihood of significant delay</div>
                  <div className="text-3xl font-bold text-slate-900">{Math.round(project.risk.score * 100)}%</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex justify-between items-center">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Estimated additional delay</div>
                  <div className="text-xs text-slate-500 mt-0.5">Based on current trajectory</div>
                </div>
                <div className="text-lg font-bold text-rose-600">
                  {project.risk.estimatedDelayDays.min} – {project.risk.estimatedDelayDays.max} days
                </div>
              </div>
            </div>
          </SectionCard>
          
          <RiskDrivers drivers={project.risk.drivers} />
        </div>

        {/* 9. INTERVENTIONS */}
        <div className="flex flex-col gap-4">
          <SectionCard 
            title="Interventions & Follow-ups"
            action={
              <button className="text-sm font-medium bg-brand-600 text-white px-3 py-1.5 rounded-md hover:bg-brand-700 transition-colors">
                Create follow-up
              </button>
            }
          >
            {projectInterventions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {projectInterventions.map(i => (
                  <InterventionCard key={i.id} intervention={i} />
                ))}
              </div>
            ) : (
              <EmptyState title="No active interventions" description="Create a follow-up to track required actions for this project." />
            )}
          </SectionCard>
        </div>

        {/* 10. HISTORY */}
        <SectionCard title="Risk History & Snapshots" className="lg:col-span-2">
          <RiskTrajectory snapshots={project.snapshots} />
        </SectionCard>
      </div>

      {/* FOOTER */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Data Quality:</span>
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.dataQuality.completeness}%` }}></div>
          </div>
          <span className="text-xs font-semibold text-slate-500 ml-1">{project.dataQuality.completeness}%</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Source records:</span>
          {project.sources.map(s => (
            <SourceBadge key={s} source={s} />
          ))}
          <span className="text-xs text-slate-400 ml-2 border-l border-slate-300 pl-4">
            Last updated: {format(parseISO(project.lastUpdated), 'dd MMM yyyy')}
          </span>
        </div>
      </div>
    </div>
  );
}
