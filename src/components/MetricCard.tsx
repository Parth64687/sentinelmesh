import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'default';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  variant = 'default',
  onClick,
}) => {
  const borderVariants = {
    default: 'hover:border-slate-700 border-slate-800/80',
    blue: 'border-sky-500/20 hover:border-sky-500/40 bg-gradient-to-b from-sky-950/20 to-slate-900/60',
    green: 'border-emerald-500/20 hover:border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-900/60',
    amber: 'border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-slate-900/60',
    red: 'border-red-500/20 hover:border-red-500/40 bg-gradient-to-b from-red-950/20 to-slate-900/60',
    purple: 'border-purple-500/20 hover:border-purple-500/40 bg-gradient-to-b from-purple-950/20 to-slate-900/60',
  };

  const iconColors = {
    default: 'text-slate-400 bg-slate-800/80',
    blue: 'text-sky-400 bg-sky-950/60 border border-sky-500/30',
    green: 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30',
    amber: 'text-amber-400 bg-amber-950/60 border border-amber-500/30',
    red: 'text-red-400 bg-red-950/60 border border-red-500/30',
    purple: 'text-purple-400 bg-purple-950/60 border border-purple-500/30',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-5 border bg-[#172235] transition-all duration-200 ${
        borderVariants[variant]
      } ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`p-2 rounded-lg ${iconColors[variant]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-50">{value}</span>
        {badge && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300 border border-slate-700">
            {badge}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{subtitle}</p>}
    </div>
  );
};
