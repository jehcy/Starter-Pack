import type { ColorTokens } from '@/lib/brand-theme';

interface ColorPaletteProps {
  lightColors: ColorTokens;
  darkColors: ColorTokens;
  mode?: 'compact' | 'full';
}

export function ColorPalette({ lightColors, darkColors, mode = 'compact' }: ColorPaletteProps) {
  const primaryColors = [
    { key: 'primary', label: 'Primary', light: lightColors.primary, dark: darkColors.primary },
    { key: 'secondary', label: 'Secondary', light: lightColors.secondary, dark: darkColors.secondary },
    { key: 'accent', label: 'Accent', light: lightColors.accent, dark: darkColors.accent },
    { key: 'destructive', label: 'Destructive', light: lightColors.destructive, dark: darkColors.destructive },
  ];

  const surfaceColors = [
    { key: 'background', label: 'Background', light: lightColors.background, dark: darkColors.background },
    { key: 'foreground', label: 'Foreground', light: lightColors.foreground, dark: darkColors.foreground },
    { key: 'card', label: 'Card', light: lightColors.card, dark: darkColors.card },
    { key: 'muted', label: 'Muted', light: lightColors.muted, dark: darkColors.muted },
  ];

  const borderColors = [
    { key: 'border', label: 'Border', light: lightColors.border, dark: darkColors.border },
    { key: 'input', label: 'Input', light: lightColors.input, dark: darkColors.input },
    { key: 'ring', label: 'Ring', light: lightColors.ring, dark: darkColors.ring },
  ];

  const renderColorGroup = (colors: typeof primaryColors, title: string) => (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
      <div className="grid grid-cols-2 gap-2">
        {colors.map((color) => (
          <div key={color.key} className="space-y-1.5">
            <div className="flex gap-1.5">
              <div
                className="w-8 h-8 rounded-md border border-border shadow-sm"
                style={{ backgroundColor: color.light }}
                title={`Light: ${color.light}`}
              />
              <div
                className="w-8 h-8 rounded-md border border-border shadow-sm"
                style={{ backgroundColor: color.dark }}
                title={`Dark: ${color.dark}`}
              />
            </div>
            <p className="text-xs text-muted-foreground">{color.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (mode === 'compact') {
    return (
      <div className="space-y-4">
        {renderColorGroup(primaryColors, 'Main Colors')}
        {renderColorGroup(surfaceColors, 'Surface Colors')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {renderColorGroup(primaryColors, 'Main Colors')}
      {renderColorGroup(surfaceColors, 'Surface Colors')}
      {renderColorGroup(borderColors, 'Border Colors')}
    </div>
  );
}
