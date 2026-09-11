import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  variant?: 'cyan' | 'green' | 'blue' | 'purple' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  variant = 'cyan',
}) => {
  const iconBgs = {
    cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30',
    green: 'bg-accent-green/10 text-accent-green border-accent-green/30',
    blue: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  return (
    <Card className="p-6 bg-slate-900/90 border-slate-800 flex items-center justify-between">
      <div>
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="text-3xl font-extrabold font-mono text-white mt-1.5">{value}</div>
        {change && (
          <div className="flex items-center gap-1 mt-2 text-xs font-mono">
            <span className={cn(isPositive ? 'text-accent-green' : 'text-rose-400', 'font-bold')}>
              {change}
            </span>
            <span className="text-slate-500">vs last month</span>
          </div>
        )}
      </div>

      <div className={cn('w-12 h-12 rounded-2xl border flex items-center justify-center', iconBgs[variant])}>
        {icon}
      </div>
    </Card>
  );
};
