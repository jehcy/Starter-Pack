'use client';

import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language === 'tsx' ? 'typescript' : language}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            background: 'transparent',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
