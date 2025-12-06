'use client';

import { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="View CSS">
          <Code className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>CSS Preview</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
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
          </DialogTitle>
          <DialogDescription>
            This CSS will be written to globals.css when you apply the theme.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] rounded-md border bg-muted/50">
          <pre className="p-4 text-sm font-mono text-foreground whitespace-pre overflow-x-auto">
            <code>{cssPreview}</code>
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
