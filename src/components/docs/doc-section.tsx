import { cn } from '@/lib/utils';

interface DocSectionProps {
  id: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function DocSection({
  id,
  title,
  description,
  className,
  children,
}: DocSectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 space-y-6', className)}
    >
      <div className="space-y-2">
        <h2 className="font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
