import { AlertCircle, AlertTriangle, CheckCircle, Circle, Info } from 'lucide-react';

const config = {
  critical: { label: 'Critical', color: 'bg-risk-critical', textColor: 'text-risk-critical', bgColor: 'bg-risk-critical-bg', borderColor: 'border-risk-critical-border', icon: AlertCircle, emoji: '🔴' },
  high:     { label: 'High',     color: 'bg-risk-high',     textColor: 'text-risk-high',     bgColor: 'bg-risk-high-bg',     borderColor: 'border-risk-high-border',     icon: AlertTriangle, emoji: '🟠' },
  medium:   { label: 'Medium',   color: 'bg-risk-medium',   textColor: 'text-risk-medium',   bgColor: 'bg-risk-medium-bg',   borderColor: 'border-risk-medium-border',   icon: Info, emoji: '🟡' },
  low:      { label: 'Low',      color: 'bg-risk-low',      textColor: 'text-risk-low',      bgColor: 'bg-risk-low-bg',      borderColor: 'border-risk-low-border',      icon: CheckCircle, emoji: '🟢' },
};

export default function RiskBadge({ level, size = 'md', showIcon = true, showEmoji = false }) {
  const c = config[level] || config.low;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1.5 font-semibold' : 'text-xs px-2.5 py-1 font-medium';
  const Icon = c.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${c.bgColor} ${c.borderColor} ${c.textColor} ${sizeClasses}`}>
      {showEmoji && <span>{c.emoji}</span>}
      {showIcon && !showEmoji && <Icon className="w-3.5 h-3.5" />}
      {c.label}
    </span>
  );
}

export function RiskDot({ level }) {
  const c = config[level] || config.low;
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${c.color}`} title={c.label} />;
}
