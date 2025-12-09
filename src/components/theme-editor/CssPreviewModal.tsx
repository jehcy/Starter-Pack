'use client';

import { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { BrandTheme } from '@/lib/brand-theme';
import { generateCssPreview } from '@/lib/brand-theme';
import { useAuthGate } from '@/hooks/useAuthGate';

interface CssPreviewModalProps {
  theme: BrandTheme;
}

function highlightCss(css: string) {
  const lines = css.split('\n');
  return lines.map((line, index) => {
    // Comments
    if (line.trim().startsWith('/*')) {
      return (
        <div key={index} className="text-green-500">
          {line}
        </div>
      );
    }

    // Selectors (lines with { at the end)
    if (line.includes('{')) {
      return (
        <div key={index} className="text-yellow-400">
          {line}
        </div>
      );
    }

    // Closing braces
    if (line.trim() === '}') {
      return (
        <div key={index} className="text-yellow-400">
          {line}
        </div>
      );
    }

    // Properties and values
    if (line.includes(':')) {
      const [property, ...valueParts] = line.split(':');
      const value = valueParts.join(':');
      return (
        <div key={index}>
          <span className="text-cyan-400">{property}:</span>
          <span className="text-orange-400">{value}</span>
        </div>
      );
    }

    // Default (empty lines, etc.)
    return <div key={index}>{line || '\u00A0'}</div>;
  });
}

export function CssPreviewModal({ theme }: CssPreviewModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { requireAuth, AuthGateModalComponent } = useAuthGate();
  const cssPreview = generateCssPreview(theme);

  const handleCopy = requireAuth(async () => {
    try {
      await navigator.clipboard.writeText(cssPreview);
      setIsCopied(true);
      toast.success('CSS copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy CSS');
    }
  }, 'copy CSS to clipboard');

  return (
    <Sheet>
      {AuthGateModalComponent}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" title="View CSS">
          <Code className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-3xl p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b p-6">
            <div className="space-y-1">
              <SheetTitle>CSS Preview</SheetTitle>
              <SheetDescription>
                This CSS will be written to globals.css when you apply the theme.
              </SheetDescription>
            </div>
          </SheetHeader>
          <ScrollArea className="flex-1 p-6">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="absolute top-2 right-2 gap-1.5 z-10"
              >
                {isCopied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy
                  </>
                )}
              </Button>
              <pre className="rounded-md border bg-muted/50 p-4 text-sm font-mono overflow-auto max-h-[calc(100vh-12rem)]">
                <code className="block">{highlightCss(cssPreview)}</code>
              </pre>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
