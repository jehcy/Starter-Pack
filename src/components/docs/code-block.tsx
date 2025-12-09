import { cn } from '@/lib/utils';

interface CodeBlockProps {
  language: 'css' | 'tsx' | 'bash' | 'json' | 'typescript';
  filename?: string;
  code: string;
  className?: string;
}

export function CodeBlock({
  language,
  filename,
  code,
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-border/50 bg-muted/30',
        className
      )}
    >
      {filename && (
        <div className="border-b border-border/50 bg-muted/50 px-4 py-2">
          <span className="font-mono text-sm text-muted-foreground">
            {filename}
          </span>
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm">
          <code className="text-foreground">{code}</code>
        </pre>
      </div>
    </div>
  );
}
