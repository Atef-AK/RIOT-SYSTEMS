import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface-card border border-surface-border rounded-2xl p-6 relative overflow-hidden backdrop-blur-md transition-all duration-300',
          hoverEffect && 'hover:border-accent-cyan/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-cyan/5',
          glow && 'border-accent-cyan/30 shadow-lg shadow-accent-cyan/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
