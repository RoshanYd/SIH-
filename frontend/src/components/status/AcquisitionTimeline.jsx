import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function AcquisitionTimeline({ milestones, daysSinceLastMilestone }) {
  return (
    <div className="flex flex-col w-full py-4 relative">
      {/* Background Line */}
      <div className="absolute top-[34px] left-[24px] right-[24px] h-[2px] bg-slate-200 z-0"></div>
      
      <div className="flex justify-between items-start w-full relative z-10">
        {milestones.map((m, i) => {
          const isCompleted = m.status === 'completed';
          const isInProgress = m.status === 'in-progress';
          const isPending = m.status === 'pending';
          
          return (
            <div key={i} className="flex flex-col items-center flex-1 relative group cursor-pointer">
              {/* Connector line overlay for completed progress */}
              {i > 0 && (isCompleted || isInProgress) && (
                <div className="absolute top-[18px] right-[50%] w-full h-[2px] bg-emerald-500 -z-10"></div>
              )}

              {/* Status Icon */}
              <div className="bg-white p-1 rounded-full mb-3">
                {isCompleted ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 bg-white" />
                ) : isInProgress ? (
                  <div className="w-8 h-8 rounded-full border-[3px] border-brand-500 bg-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-brand-500 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <Circle className="w-8 h-8 text-slate-300 bg-white" />
                )}
              </div>

              {/* Label */}
              <div className={`font-semibold text-sm mb-1 ${isCompleted ? 'text-slate-900' : isInProgress ? 'text-brand-700' : 'text-slate-400'}`}>
                {m.stage}
              </div>
              
              {/* Date */}
              {m.date ? (
                <div className="text-xs text-slate-500">
                  {format(parseISO(m.date), 'dd MMM yyyy')}
                </div>
              ) : (
                <div className="text-[10px] uppercase font-medium text-slate-400 tracking-wider">
                  Pending
                </div>
              )}

              {/* Duration connecting to next stage */}
              {i < milestones.length - 1 && m.durationDays && (
                <div className="absolute top-[48px] left-[50%] w-full flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded font-medium translate-x-1/2 flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3" />
                    {m.durationDays} days
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stagnation Warning */}
      {daysSinceLastMilestone > 180 && (
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-md text-sm shadow-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="font-medium">Progress has slowed:</span> {daysSinceLastMilestone} days since last milestone completion.
          </div>
        </div>
      )}
    </div>
  );
}
