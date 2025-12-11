'use client';

import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  getContrastRatio,
  getContrastLevel,
  getContrastLevelDescription,
  getContrastBadgeColor,
  adjustForContrast,
} from '@/lib/contrast';
import { cn } from '@/lib/utils';

interface ContrastBadgeProps {
  /** Background color in hex format */
  bgColor: string;
  /** Foreground color in hex format */
  fgColor: string;
  /** Callback when auto-fix button is clicked */
  onFix?: (newFgColor: string) => void;
  /** Whether to show the auto-fix button */
  showFixButton?: boolean;
}

export function ContrastBadge({
  bgColor,
  fgColor,
  onFix,
  showFixButton = true,
}: ContrastBadgeProps) {
  const ratio = getContrastRatio(bgColor, fgColor);
  const level = getContrastLevel(ratio);
  const description = getContrastLevelDescription(level);
  const badgeColor = getContrastBadgeColor(level);

  const handleFix = () => {
    if (!onFix) return;
    const fixedColor = adjustForContrast(fgColor, bgColor);
    onFix(fixedColor);
  };

  const shouldShowFixButton = showFixButton && level === 'Fail' && onFix;

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col gap-1 min-w-[70px]">
              {/* Contrast Ratio */}
              <div className="text-xs font-mono text-muted-foreground text-center">
                {ratio.toFixed(1)}:1
              </div>
              {/* Level Badge */}
              <div
                className={cn(
                  'px-2 py-0.5 rounded text-xs font-medium text-center',
                  badgeColor
                )}
              >
                {level}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">{description}</p>
              <p className="text-xs text-muted-foreground">
                Current ratio: {ratio.toFixed(2)}:1
              </p>
              {level === 'Fail' && (
                <p className="text-xs text-red-300">
                  This combination does not meet WCAG accessibility standards.
                  Click the wand to auto-fix.
                </p>
              )}
              {level === 'AA-Large' && (
                <p className="text-xs text-yellow-300">
                  Only suitable for large text (18pt+ or 14pt+ bold).
                </p>
              )}
              {level === 'AA' && (
                <p className="text-xs text-blue-300">
                  Meets standard accessibility requirements.
                </p>
              )}
              {level === 'AAA' && (
                <p className="text-xs text-green-300">
                  Exceeds accessibility standards! Excellent contrast.
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Auto-fix Button */}
      {shouldShowFixButton && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFix}
                className="h-8 w-8 p-0"
                aria-label="Auto-fix contrast"
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs">Auto-fix to meet WCAG AA (4.5:1)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
