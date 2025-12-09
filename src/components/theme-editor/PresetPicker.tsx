'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { THEME_PRESETS, type ThemePreset } from '@/lib/theme-presets';

interface PresetPickerProps {
  onSelect: (preset: ThemePreset) => void;
}

export function PresetPicker({ onSelect }: PresetPickerProps) {
  // Color circles for the trigger button
  const triggerColors = ['#0ea5e9', '#10b981', '#f43f5e', '#8b5cf6'];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5"
          title="Load preset theme"
        >
          <div className="flex items-center -space-x-1">
            {triggerColors.map((color, index) => (
              <div
                key={index}
                className="size-3 rounded-full border-2 border-background"
                style={{
                  backgroundColor: color,
                  zIndex: triggerColors.length - index
                }}
              />
            ))}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start" sideOffset={8}>
        <div className="p-3 border-b">
          <div className="text-sm font-semibold">Theme Presets</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {THEME_PRESETS.length} themes
          </div>
        </div>
        <ScrollArea className="h-[280px]">
          <div className="p-2 pb-3 space-y-0.5">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelect(preset)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/50 hover:shadow-sm transition-all text-left group border border-transparent hover:border-border/50"
              >
                <div className="flex gap-1.5 shrink-0">
                  {preset.previewColors.map((color, index) => (
                    <div
                      key={index}
                      className="size-3 rounded-full border-2 border-background shadow-sm ring-1 ring-black/10 dark:ring-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium group-hover:text-foreground transition-colors">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
