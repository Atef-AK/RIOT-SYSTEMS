import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'blue' | 'violet' | 'green' | 'amber' | 'rose' | 'slate' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'cyan',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    cyan: 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30',
    blue: 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
    violet: 'bg-accent-violet/15 text-purple-300 border border-accent-violet/30',
    green: 'bg-accent-green/10 text-accent-green border border-accent-green/30',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    slate: 'bg-slate-800 text-slate-300 border border-slate-700',
    outline: 'bg-transparent text-slate-300 border border-slate-600',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase',
    md: 'px-3 py-1 text-xs font-semibold tracking-wider uppercase',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono transition-colors select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
