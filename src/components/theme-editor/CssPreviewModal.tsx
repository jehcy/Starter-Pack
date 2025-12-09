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

interface CssPreviewModalProps {
  theme: BrandTheme;
}

export function CssPreviewModal({ theme }: CssPreviewModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const cssPreview = generateCssPreview(theme);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssPreview);
      setIsCopied(true);
      toast.success('CSS copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy CSS');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" title="View CSS">
          <Code className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <SheetTitle>CSS Preview</SheetTitle>
                <SheetDescription>
                  This CSS will be written to globals.css when you apply the theme.
                </SheetDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5 shrink-0"
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
            </div>
          </SheetHeader>
          <ScrollArea className="flex-1 p-6">
            <pre className="rounded-md border bg-muted/50 p-4 text-sm font-mono text-foreground">
              <code className="whitespace-pre">{cssPreview}</code>
            </pre>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
