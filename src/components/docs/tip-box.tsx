import { cn } from '@/lib/utils';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface TipBoxProps {
  type: 'tip' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function TipBox({ type, children, className }: TipBoxProps) {
  const config = {
    tip: {
      icon: Lightbulb,
      bgClass: 'bg-primary/10',
      borderClass: 'border-primary/30',
      iconClass: 'text-primary',
      label: 'Tip',
    },
    warning: {
      icon: AlertTriangle,
      bgClass: 'bg-destructive/10',
      borderClass: 'border-destructive/30',
      iconClass: 'text-destructive',
      label: 'Warning',
    },
    info: {
      icon: Info,
      bgClass: 'bg-accent/10',
      borderClass: 'border-accent/30',
      iconClass: 'text-accent',
      label: 'Info',
    },
  };

  const { icon: Icon, bgClass, borderClass, iconClass, label } = config[type];

  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg border p-4',
        bgClass,
        borderClass,
        className
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', iconClass)} />
      <div className="flex-1 space-y-1">
        <div className="font-semibold text-foreground">{label}</div>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
