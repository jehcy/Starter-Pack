'use client';

import { useReducer, useEffect, useCallback, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthGate } from '@/hooks/useAuthGate';
import { useAuth } from '@/hooks/useAuth';
import {
  Palette,
  Type,
  Space,
  Circle,
  SquareIcon,
  ImageIcon,
  RotateCcw,
  FolderDown,
  Sun,
  Moon,
  ChevronDown,
  Package,
  FileJson,
  FileCode,
  FileText,
  Braces,
  BookOpen,
  HelpCircle,
  X,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  type BrandTheme,
  type ColorTokens,
  type ResponsiveSpacingValue,
  type TypographySizeTokens,
  type TypographyStyleTokens,
  type BrandAsset,
  type VideoAsset,
  getDefaultTheme,
  isValidHex,
  DEFAULT_LIGHT_COLORS,
  DEFAULT_DARK_COLORS,
  DEFAULT_SPACING,
  DEFAULT_RADIUS,
  DEFAULT_FONTS,
  DEFAULT_TYPOGRAPHY_SIZES,
  DEFAULT_TYPOGRAPHY_STYLES,
  DEFAULT_BUTTONS,
  DEFAULT_BRAND_ASSETS,
  saveThemeToStorage,
  applyThemeToDOM,
} from '@/lib/brand-theme';
import { CONTRAST_PAIRS } from '@/lib/contrast';
import { ContrastBadge } from './ContrastBadge';
import {
  generateTokensJson,
  generateTailwindConfigZip,
  generateShadcnThemeTs,
  generateGlobalsCssFile,
  generateBrandSkill,
  generateVueCssVars,
  generateJavaConstants,
  generateJavaProperties,
} from '@/lib/theme-exports';
import { ThemePreview } from './ThemePreview';
import { CssPreviewModal } from './CssPreviewModal';
import { PresetPicker } from './PresetPicker';
import { UserMenuDropdown } from './UserMenuDropdown';
import { BrandAssetsSection } from './brand-assets';
import { AiThemeChat } from './AiThemeChat';
import { CreditDisplay } from '@/components/credits/CreditDisplay';
import { generateStarterProject, slugify } from '@/lib/project-generator';
import { applyThemeToGlobals } from '@/app/theme/actions';
import { useThemeEditorTour } from '@/hooks/useThemeEditorTour';
import { CreditsProvider } from '@/contexts/CreditsContext';

// ─────────────────────────────────────────────────────────────────────────────
// Helper functions for slider value conversion
// ─────────────────────────────────────────────────────────────────────────────

function remToNumber(rem: string | undefined): number {
  if (!rem) return 0;
  const match = rem.match(/^([\d.]+)rem$/);
  return match ? parseFloat(match[1]) : 0;
}

function numberToRem(num: number): string {
  return `${num}rem`;
}

function parseNumber(val: string): number {
  return parseFloat(val) || 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Curated Google Fonts list
// ─────────────────────────────────────────────────────────────────────────────

interface FontOption {
  label: string;
  value: string;
}

const SANS_FONTS: FontOption[] = [
  { label: 'Inter', value: 'Inter, system-ui, -apple-system, sans-serif' },
  { label: 'Roboto', value: 'Roboto, system-ui, sans-serif' },
  { label: 'Poppins', value: 'Poppins, system-ui, sans-serif' },
  { label: 'Open Sans', value: '"Open Sans", system-ui, sans-serif' },
  { label: 'Lato', value: 'Lato, system-ui, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, system-ui, sans-serif' },
  { label: 'Nunito', value: 'Nunito, system-ui, sans-serif' },
  { label: 'Raleway', value: 'Raleway, system-ui, sans-serif' },
  { label: 'Sora', value: 'Sora, system-ui, sans-serif' },
  { label: 'Space Grotesk', value: '"Space Grotesk", system-ui, sans-serif' },
  { label: 'DM Sans', value: '"DM Sans", system-ui, sans-serif' },
  { label: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", system-ui, sans-serif' },
  { label: 'Outfit', value: 'Outfit, system-ui, sans-serif' },
  { label: 'Manrope', value: 'Manrope, system-ui, sans-serif' },
  { label: 'Work Sans', value: '"Work Sans", system-ui, sans-serif' },
  { label: 'Figtree', value: 'Figtree, system-ui, sans-serif' },
  { label: 'Geist', value: 'Geist, system-ui, sans-serif' },
  { label: 'System UI', value: 'system-ui, -apple-system, sans-serif' },
];

const MONO_FONTS: FontOption[] = [
  { label: 'JetBrains Mono', value: '"JetBrains Mono", Fira Code, monospace' },
  { label: 'Fira Code', value: '"Fira Code", monospace' },
  { label: 'Source Code Pro', value: '"Source Code Pro", monospace' },
  { label: 'IBM Plex Mono', value: '"IBM Plex Mono", monospace' },
  { label: 'Roboto Mono', value: '"Roboto Mono", monospace' },
  { label: 'Ubuntu Mono', value: '"Ubuntu Mono", monospace' },
  { label: 'Space Mono', value: '"Space Mono", monospace' },
  { label: 'Geist Mono', value: '"Geist Mono", monospace' },
  { label: 'SF Mono', value: '"SF Mono", Menlo, Monaco, monospace' },
];

const HEADING_FONTS: FontOption[] = [
  { label: 'Inter', value: 'Inter, system-ui, -apple-system, sans-serif' },
  { label: 'Playfair Display', value: '"Playfair Display", Georgia, serif' },
  { label: 'Merriweather', value: 'Merriweather, Georgia, serif' },
  { label: 'Lora', value: 'Lora, Georgia, serif' },
  { label: 'Poppins', value: 'Poppins, system-ui, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, system-ui, sans-serif' },
  { label: 'Sora', value: 'Sora, system-ui, sans-serif' },
  { label: 'Space Grotesk', value: '"Space Grotesk", system-ui, sans-serif' },
  { label: 'DM Sans', value: '"DM Sans", system-ui, sans-serif' },
  { label: 'Outfit', value: 'Outfit, system-ui, sans-serif' },
  { label: 'Manrope', value: 'Manrope, system-ui, sans-serif' },
  { label: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", system-ui, sans-serif' },
  { label: 'Bricolage Grotesque', value: '"Bricolage Grotesque", system-ui, sans-serif' },
  { label: 'Cabinet Grotesk', value: '"Cabinet Grotesk", system-ui, sans-serif' },
  { label: 'System UI', value: 'system-ui, -apple-system, sans-serif' },
];

function findFontLabel(fonts: FontOption[], value: string): string {
  const found = fonts.find((f) => f.value === value);
  return found?.label ?? 'Custom';
}

// ─────────────────────────────────────────────────────────────────────────────
// Typography Size Options
// ─────────────────────────────────────────────────────────────────────────────

interface TextSizeOption {
  label: string;
  value: string;
}

const HEADING_1_SIZES: TextSizeOption[] = [
  { label: 'Small (2rem)', value: '2rem' },
  { label: 'Default (2.25rem)', value: '2.25rem' },
  { label: 'Large (2.5rem)', value: '2.5rem' },
  { label: 'XL (3rem)', value: '3rem' },
  { label: '2XL (3.5rem)', value: '3.5rem' },
  { label: '3XL (4rem)', value: '4rem' },
  { label: '4XL (4.5rem)', value: '4.5rem' },
  { label: '5XL (5rem)', value: '5rem' },
  { label: '6XL (6rem)', value: '6rem' },
  { label: '8XL (8rem)', value: '8rem' },
  { label: '9XL (10rem)', value: '10rem' },
];

const HEADING_2_SIZES: TextSizeOption[] = [
  { label: 'Small (1.5rem)', value: '1.5rem' },
  { label: 'Default (1.875rem)', value: '1.875rem' },
  { label: 'Large (2rem)', value: '2rem' },
  { label: 'XL (2.25rem)', value: '2.25rem' },
  { label: '2XL (2.5rem)', value: '2.5rem' },
  { label: '3XL (3rem)', value: '3rem' },
  { label: '4XL (3.5rem)', value: '3.5rem' },
  { label: '5XL (4rem)', value: '4rem' },
];

const HEADING_3_SIZES: TextSizeOption[] = [
  { label: 'Small (1.25rem)', value: '1.25rem' },
  { label: 'Default (1.5rem)', value: '1.5rem' },
  { label: 'Large (1.75rem)', value: '1.75rem' },
  { label: 'XL (1.875rem)', value: '1.875rem' },
];

const HEADING_4_SIZES: TextSizeOption[] = [
  { label: 'Small (1rem)', value: '1rem' },
  { label: 'Default (1.25rem)', value: '1.25rem' },
  { label: 'Large (1.375rem)', value: '1.375rem' },
  { label: 'XL (1.5rem)', value: '1.5rem' },
];

const BODY_TEXT_SIZES: TextSizeOption[] = [
  { label: 'XS (0.75rem)', value: '0.75rem' },
  { label: 'Small (0.875rem)', value: '0.875rem' },
  { label: 'Default (1rem)', value: '1rem' },
  { label: 'Large (1.125rem)', value: '1.125rem' },
  { label: 'XL (1.25rem)', value: '1.25rem' },
];

const BLOCKQUOTE_SIZES: TextSizeOption[] = [
  { label: 'Small (1rem)', value: '1rem' },
  { label: 'Default (1.125rem)', value: '1.125rem' },
  { label: 'Large (1.25rem)', value: '1.25rem' },
  { label: 'XL (1.5rem)', value: '1.5rem' },
];

const SMALL_TEXT_SIZES: TextSizeOption[] = [
  { label: 'XS (0.625rem)', value: '0.625rem' },
  { label: 'Small (0.75rem)', value: '0.75rem' },
  { label: 'Default (0.875rem)', value: '0.875rem' },
  { label: 'Base (1rem)', value: '1rem' },
];

interface TypographySizeConfig {
  key: keyof TypographySizeTokens;
  label: string;
  description: string;
  options: TextSizeOption[];
}

const TYPOGRAPHY_SIZE_CONFIGS: TypographySizeConfig[] = [
  { key: 'h1', label: 'H1', description: 'Main page titles', options: HEADING_1_SIZES },
  { key: 'h2', label: 'H2', description: 'Section headings', options: HEADING_2_SIZES },
  { key: 'h3', label: 'H3', description: 'Sub-section headings', options: HEADING_3_SIZES },
  { key: 'h4', label: 'H4', description: 'Minor headings', options: HEADING_4_SIZES },
  { key: 'p', label: 'Paragraph', description: 'Body text', options: BODY_TEXT_SIZES },
  { key: 'blockquote', label: 'Blockquote', description: 'Quoted text', options: BLOCKQUOTE_SIZES },
  { key: 'label', label: 'Label', description: 'Form labels', options: SMALL_TEXT_SIZES },
  { key: 'code', label: 'Code', description: 'Inline code', options: SMALL_TEXT_SIZES },
  { key: 'table', label: 'Table', description: 'Table cells', options: SMALL_TEXT_SIZES },
  { key: 'list', label: 'List', description: 'List items', options: BODY_TEXT_SIZES },
];

// ─────────────────────────────────────────────────────────────────────────────
// Button Font Sizes
// ─────────────────────────────────────────────────────────────────────────────

interface ButtonSizeOption {
  label: string;
  value: string;
}

const BUTTON_FONT_SIZES: ButtonSizeOption[] = [
  { label: 'Extra Small', value: '0.75rem' },
  { label: 'Small', value: '0.875rem' },
  { label: 'Base', value: '1rem' },
  { label: 'Large', value: '1.125rem' },
  { label: 'Extra Large', value: '1.25rem' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Button Hover Effects
// ─────────────────────────────────────────────────────────────────────────────

interface HoverEffectOption {
  label: string;
  value: string;
  description: string;
}

const BUTTON_HOVER_EFFECTS: HoverEffectOption[] = [
  { label: 'None', value: 'none', description: 'No hover effect' },
  { label: 'Opacity', value: 'opacity', description: 'Fade to 80% opacity' },
  { label: 'Lift', value: 'lift', description: 'Lift up with shadow' },
  { label: 'Scale', value: 'scale', description: 'Slight scale up' },
  { label: 'Glow', value: 'glow', description: 'Subtle glow effect' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Button Preview Component with Hover Effects
// ─────────────────────────────────────────────────────────────────────────────

interface ButtonPreviewProps {
  label: string;
  bgColor: string;
  textColor: string;
  borderRadius: string;
  fontWeight: string;
  fontSize: string;
  hoverEffect: string;
}

function ButtonPreview({
  label,
  bgColor,
  textColor,
  borderRadius,
  fontWeight,
  fontSize,
  hoverEffect,
}: ButtonPreviewProps) {
  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'opacity':
        return 'hover:opacity-80';
      case 'lift':
        return 'hover:-translate-y-0.5 hover:shadow-lg';
      case 'scale':
        return 'hover:scale-105';
      case 'glow':
        return 'hover:shadow-[0_0_15px_rgba(var(--primary-rgb,0,0,0),0.4)]';
      default:
        return '';
    }
  };

  return (
    <button
      className={`px-4 py-2 transition-all duration-200 ${bgColor} ${textColor} ${getHoverClasses()}`}
      style={{
        borderRadius,
        fontWeight,
        fontSize,
      }}
    >
      {label}
    </button>
  );
}

// Theme reducer actions
type ThemeAction =
  | { type: 'SET_THEME'; payload: BrandTheme }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_LIGHT_COLOR'; key: keyof ColorTokens; value: string }
  | { type: 'SET_DARK_COLOR'; key: keyof ColorTokens; value: string }
  | { type: 'SET_SPACING'; key: string; value: string | ResponsiveSpacingValue }
  | { type: 'SET_RADIUS'; key: string; value: string }
  | { type: 'SET_FONT'; key: string; value: string }
  | { type: 'SET_TYPOGRAPHY_SIZE'; key: keyof TypographySizeTokens; value: string }
  | { type: 'SET_TYPOGRAPHY_STYLE'; key: keyof TypographyStyleTokens; value: string }
  | { type: 'SET_BUTTON'; key: string; value: string }
  | { type: 'SET_LOGO'; payload: BrandAsset | null }
  | { type: 'SET_LOGO_DARK'; payload: BrandAsset | null }
  | { type: 'SET_FAVICON'; payload: BrandAsset | null }
  | { type: 'SET_OG_IMAGE'; payload: BrandAsset | null }
  | { type: 'ADD_HERO_IMAGE'; payload: BrandAsset }
  | { type: 'REMOVE_HERO_IMAGE'; payload: string }
  | { type: 'ADD_PRODUCT_IMAGE'; payload: BrandAsset }
  | { type: 'REMOVE_PRODUCT_IMAGE'; payload: string }
  | { type: 'ADD_VIDEO'; payload: VideoAsset }
  | { type: 'REMOVE_VIDEO'; payload: string }
  | { type: 'RESET' }
  | { type: 'RESET_COLORS' }
  | { type: 'RESET_SPACING' }
  | { type: 'RESET_RADIUS' }
  | { type: 'RESET_FONTS' }
  | { type: 'RESET_TYPOGRAPHY_SIZES' }
  | { type: 'RESET_TYPOGRAPHY_STYLES' }
  | { type: 'RESET_BUTTONS' }
  | { type: 'RESET_ASSETS' };

function themeReducer(state: BrandTheme, action: ThemeAction): BrandTheme {
  switch (action.type) {
    case 'SET_THEME':
      return action.payload;
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_LIGHT_COLOR':
      return {
        ...state,
        colors: {
          ...state.colors,
          light: { ...state.colors.light, [action.key]: action.value },
        },
      };
    case 'SET_DARK_COLOR':
      return {
        ...state,
        colors: {
          ...state.colors,
          dark: { ...state.colors.dark, [action.key]: action.value },
        },
      };
    case 'SET_SPACING':
      return {
        ...state,
        spacing: { ...state.spacing, [action.key]: action.value },
      };
    case 'SET_RADIUS':
      return {
        ...state,
        radius: { ...state.radius, [action.key]: action.value },
      };
    case 'SET_FONT':
      return {
        ...state,
        fonts: { ...state.fonts, [action.key]: action.value },
      };
    case 'SET_TYPOGRAPHY_SIZE':
      return {
        ...state,
        typographySizes: { ...state.typographySizes, [action.key]: action.value },
      };
    case 'SET_TYPOGRAPHY_STYLE':
      return {
        ...state,
        typographyStyles: { ...state.typographyStyles, [action.key]: action.value },
      };
    case 'SET_BUTTON':
      return {
        ...state,
        buttons: { ...state.buttons, [action.key]: action.value },
      };
    case 'RESET':
      return getDefaultTheme();
    case 'RESET_COLORS':
      return {
        ...state,
        colors: {
          light: { ...DEFAULT_LIGHT_COLORS },
          dark: { ...DEFAULT_DARK_COLORS },
        },
      };
    case 'RESET_SPACING':
      return {
        ...state,
        spacing: { ...DEFAULT_SPACING },
      };
    case 'RESET_RADIUS':
      return {
        ...state,
        radius: { ...DEFAULT_RADIUS },
      };
    case 'RESET_FONTS':
      return {
        ...state,
        fonts: { ...DEFAULT_FONTS },
      };
    case 'RESET_TYPOGRAPHY_SIZES':
      return {
        ...state,
        typographySizes: { ...DEFAULT_TYPOGRAPHY_SIZES },
      };
    case 'RESET_TYPOGRAPHY_STYLES':
      return {
        ...state,
        typographyStyles: { ...DEFAULT_TYPOGRAPHY_STYLES },
      };
    case 'RESET_BUTTONS':
      return {
        ...state,
        buttons: { ...DEFAULT_BUTTONS },
      };
    case 'SET_LOGO':
      return { ...state, assets: { ...state.assets, logo: action.payload } };
    case 'SET_LOGO_DARK':
      return { ...state, assets: { ...state.assets, logoDark: action.payload } };
    case 'SET_FAVICON':
      return { ...state, assets: { ...state.assets, favicon: action.payload } };
    case 'SET_OG_IMAGE':
      return { ...state, assets: { ...state.assets, ogImage: action.payload } };
    case 'ADD_HERO_IMAGE':
      return {
        ...state,
        assets: {
          ...state.assets,
          heroImages: [...state.assets.heroImages, action.payload],
        },
      };
    case 'REMOVE_HERO_IMAGE':
      return {
        ...state,
        assets: {
          ...state.assets,
          heroImages: state.assets.heroImages.filter((img) => img.id !== action.payload),
        },
      };
    case 'ADD_PRODUCT_IMAGE':
      return {
        ...state,
        assets: {
          ...state.assets,
          productImages: [...state.assets.productImages, action.payload],
        },
      };
    case 'REMOVE_PRODUCT_IMAGE':
      return {
        ...state,
        assets: {
          ...state.assets,
          productImages: state.assets.productImages.filter((img) => img.id !== action.payload),
        },
      };
    case 'ADD_VIDEO':
      return {
        ...state,
        assets: {
          ...state.assets,
          videos: [...state.assets.videos, action.payload],
        },
      };
    case 'REMOVE_VIDEO':
      return {
        ...state,
        assets: {
          ...state.assets,
          videos: state.assets.videos.filter((v) => v.id !== action.payload),
        },
      };
    case 'RESET_ASSETS':
      return { ...state, assets: { ...DEFAULT_BRAND_ASSETS } };
    default:
      return state;
  }
}

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleTextChange = (newValue: string) => {
    setInputValue(newValue);
    if (isValidHex(newValue)) {
      onChange(newValue);
    }
  };

  const handleColorChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="size-8 rounded-md border border-input shadow-sm flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          className="size-10 -m-1 cursor-pointer opacity-0"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Label className="text-xs text-muted-foreground truncate block">{label}</Label>
        <Input
          value={inputValue}
          onChange={(e) => handleTextChange(e.target.value)}
          className="h-7 text-xs font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

interface ThemePageProps {
  initialTheme: BrandTheme;
}

type ActiveSection = 'colors' | 'spacing' | 'radius' | 'fonts' | 'buttons' | 'brand' | 'ai';

const NAV_ITEMS: { id: ActiveSection; icon: typeof Palette; label: string }[] = [
  { id: 'colors', icon: Palette, label: 'Colors' },
  { id: 'spacing', icon: Space, label: 'Space' },
  { id: 'radius', icon: Circle, label: 'Radius' },
  { id: 'fonts', icon: Type, label: 'Fonts' },
  { id: 'buttons', icon: SquareIcon, label: 'Buttons' },
  { id: 'brand', icon: ImageIcon, label: 'Brand' },
  { id: 'ai', icon: Sparkles, label: 'AI' },
];

export function ThemePage({ initialTheme }: ThemePageProps) {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);
  const { theme: currentTheme, setTheme: setGlobalTheme } = useTheme();
  const { requireAuth, AuthGateModalComponent } = useAuthGate();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>(() => {
    // Auto-detect current theme, default to dark
    return (currentTheme === 'light' || currentTheme === 'dark') ? currentTheme : 'dark';
  });
  const [activeSection, setActiveSection] = useState<ActiveSection>('colors');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [activeBreakpoint, setActiveBreakpoint] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Detect if running in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Initialize theme editor tour
  const { startTour } = useThemeEditorTour();

  // Sync preview mode with current theme when it changes externally
  useEffect(() => {
    if (currentTheme === 'light' || currentTheme === 'dark') {
      setPreviewMode(currentTheme);
    }
  }, [currentTheme]);

  // Auto-save theme to localStorage on every change
  useEffect(() => {
    saveThemeToStorage(theme);
  }, [theme]);

  const handlePreviewModeChange = useCallback((mode: 'light' | 'dark') => {
    setPreviewMode(mode);
    setGlobalTheme(mode);
  }, [setGlobalTheme]);

  const handleDownloadStarter = useCallback(
    requireAuth(async () => {
      setIsGenerating(true);
      try {
        const blob = await generateStarterProject(theme);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slugify(theme.name || 'my-theme')}-starter.zip`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Starter project downloaded!', {
          description: 'Extract the ZIP and run npm install to get started.',
        });
      } catch {
        toast.error('Failed to generate project', {
          description: 'An unexpected error occurred.',
        });
      } finally {
        setIsGenerating(false);
      }
    }, 'download the Starter Pack'),
    [theme, requireAuth]
  );

  const handleDownloadTokensJson = useCallback(
    requireAuth(async () => {
      try {
        const content = generateTokensJson(theme);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slugify(theme.name || 'my-theme')}-tokens.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Design tokens downloaded!');
      } catch {
        toast.error('Failed to generate tokens');
      }
    }, 'download design tokens'),
    [theme, requireAuth]
  );

  const handleDownloadTailwindConfig = useCallback(
    requireAuth(async () => {
      setIsGenerating(true);
      try {
        const blob = await generateTailwindConfigZip(theme);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slugify(theme.name || 'my-theme')}-tailwind-config.zip`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Tailwind config downloaded!', {
          description: 'Includes Tailwind v3 configuration.',
        });
      } catch {
        toast.error('Failed to generate Tailwind config');
      } finally {
        setIsGenerating(false);
      }
    }, 'download Tailwind config'),
    [theme, requireAuth]
  );

  const handleDownloadShadcnTheme = useCallback(
    requireAuth(async () => {
      try {
        const content = generateShadcnThemeTs(theme);
        const blob = new Blob([content], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slugify(theme.name || 'my-theme')}-theme.ts`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('shadcn/ui theme file downloaded!');
      } catch {
        toast.error('Failed to generate theme file');
      }
    }, 'download theme file'),
    [theme, requireAuth]
  );

  const handleDownloadGlobalsCss = useCallback(
    requireAuth(async () => {
      try {
        const content = generateGlobalsCssFile(theme);
        const blob = new Blob([content], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slugify(theme.name || 'my-theme')}-globals.css`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('CSS variables file downloaded!');
      } catch {
        toast.error('Failed to generate CSS');
      }
    }, 'download CSS file'),
    [theme, requireAuth]
  );

  const handleDownloadBrandSkill = useCallback(
    requireAuth(async () => {
      try {
        const content = generateBrandSkill();
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'brand-skill.md';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Brand skill markdown downloaded!');
      } catch {
        toast.error('Failed to generate brand skill');
      }
    }, 'download brand guidelines'),
    [requireAuth]
  );

  const handleDownloadVueCss = useCallback(
    requireAuth(async () => {
      try {
        const content = generateVueCssVars(theme);
        const blob = new Blob([content], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slugify(theme.name || 'my-theme')}-vue.css`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Vue.js theme downloaded!');
      } catch {
        toast.error('Failed to generate Vue.js theme');
      }
    }, 'download Vue.js theme'),
    [theme, requireAuth]
  );

  const handleDownloadJavaConstants = useCallback(
    requireAuth(async () => {
      try {
        const content = generateJavaConstants(theme);
        const blob = new Blob([content], { type: 'text/x-java-source' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ThemeConstants.java';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Java constants downloaded!');
      } catch {
        toast.error('Failed to generate Java constants');
      }
    }, 'download Java constants'),
    [theme, requireAuth]
  );

  const handleDownloadJavaProperties = useCallback(
    requireAuth(async () => {
      try {
        const content = generateJavaProperties(theme);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slugify(theme.name || 'my-theme')}-theme.properties`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Java properties downloaded!');
      } catch {
        toast.error('Failed to generate Java properties');
      }
    }, 'download Java properties'),
    [theme, requireAuth]
  );

  const handleApplyStyle = useCallback(async () => {
    // Apply theme to DOM immediately for instant visual feedback
    applyThemeToDOM(theme);

    setIsApplying(true);
    try {
      if (isDevelopment) {
        // Development: write to files
        const result = await applyThemeToGlobals(theme);
        if (result.success) {
          toast.success('Style applied!', {
            description: 'globals.css and brand.md updated',
            duration: 3000,
          });
        } else {
          toast.error('Failed to apply style', { description: result.message });
        }
      } else {
        // Production: save to localStorage
        saveThemeToStorage(theme);
        toast.success('Style saved!', {
          description: 'Saved to browser storage',
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to apply style', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsApplying(false);
    }
  }, [theme, isDevelopment]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    toast.info('Theme reset to defaults');
  }, []);

  const handleResetColors = useCallback(() => {
    dispatch({ type: 'RESET_COLORS' });
    toast.info('Colors reset to defaults');
  }, []);

  const handleResetSpacing = useCallback(() => {
    dispatch({ type: 'RESET_SPACING' });
    toast.info('Spacing reset to defaults');
  }, []);

  const handleResetRadius = useCallback(() => {
    dispatch({ type: 'RESET_RADIUS' });
    toast.info('Radius reset to defaults');
  }, []);

  const handleResetFonts = useCallback(() => {
    dispatch({ type: 'RESET_FONTS' });
    toast.info('Fonts reset to defaults');
  }, []);

  const handleResetTypographySizes = useCallback(() => {
    dispatch({ type: 'RESET_TYPOGRAPHY_SIZES' });
    toast.info('Typography sizes reset to defaults');
  }, []);

  const handleResetButtons = useCallback(() => {
    dispatch({ type: 'RESET_BUTTONS' });
    toast.info('Buttons reset to defaults');
  }, []);

  const colorGroups = [
    {
      title: 'Primary Colors',
      colors: ['primary', 'primaryForeground'] as const,
    },
    {
      title: 'Secondary Colors',
      colors: ['secondary', 'secondaryForeground'] as const,
    },
    {
      title: 'Accent Colors',
      colors: ['accent', 'accentForeground'] as const,
    },
    {
      title: 'Base Colors',
      colors: ['background', 'foreground'] as const,
    },
    {
      title: 'Card Colors',
      colors: ['card', 'cardForeground'] as const,
    },
    {
      title: 'Popover Colors',
      colors: ['popover', 'popoverForeground'] as const,
    },
    {
      title: 'Muted Colors',
      colors: ['muted', 'mutedForeground'] as const,
    },
    {
      title: 'Destructive Colors',
      colors: ['destructive', 'destructiveForeground'] as const,
    },
    {
      title: 'Border & Input',
      colors: ['border', 'input', 'ring'] as const,
    },
    {
      title: 'Chart Colors',
      colors: ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'] as const,
    },
  ];

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/(\d)/g, ' $1');
  };

  return (
    <CreditsProvider>
      <div className="relative flex flex-col h-screen">
        {AuthGateModalComponent}
      {/* Top Header Bar */}
      <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-muted-foreground">Theme Editor</span>
          <PresetPicker onSelect={(preset) => dispatch({ type: 'SET_THEME', payload: preset.theme })} />
          <Input
            data-tour="theme-name-input"
            value={theme.name}
            onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            className="w-48 h-8"
            placeholder="Theme name"
          />
          {/* Responsive Breakpoint Tabs */}
          <Tabs
            value={activeBreakpoint}
            onValueChange={(v) => setActiveBreakpoint(v as 'desktop' | 'tablet' | 'mobile')}
            className="shrink-0"
          >
            <TabsList className="h-8">
              <TabsTrigger value="desktop" className="gap-1.5 text-xs px-2.5">
                <Monitor className="size-3.5" />
                <span className="hidden lg:inline">Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="tablet" className="gap-1.5 text-xs px-2.5">
                <Tablet className="size-3.5" />
                <span className="hidden lg:inline">Tablet</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="gap-1.5 text-xs px-2.5">
                <Smartphone className="size-3.5" />
                <span className="hidden lg:inline">Mobile</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-1">
          <Button
            data-tour="apply-button"
            onClick={handleApplyStyle}
            disabled={isApplying}
            size="sm"
            variant="default"
          >
            {isApplying ? 'Applying...' : 'Apply your style'}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button data-tour="download-dropdown" disabled={isGenerating} size="sm" variant="outline">
                <FolderDown className="size-4 mr-1.5" />
                {isGenerating ? 'Downloading...' : 'Download'}
                <ChevronDown className="size-3.5 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleDownloadStarter}>
                <Package className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">Starter Pack</span>
                  <span className="text-xs text-muted-foreground">
                    Full Next.js project ZIP
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleDownloadTailwindConfig}>
                <FileCode className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">Tailwind Config</span>
                  <span className="text-xs text-muted-foreground">
                    v3 configuration
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleDownloadTokensJson}>
                <Braces className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">tokens.json</span>
                  <span className="text-xs text-muted-foreground">
                    Design tokens in JSON
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleDownloadShadcnTheme}>
                <FileJson className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">theme.ts</span>
                  <span className="text-xs text-muted-foreground">
                    shadcn/ui theme file
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleDownloadGlobalsCss}>
                <FileText className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">globals.css</span>
                  <span className="text-xs text-muted-foreground">
                    CSS variables only
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleDownloadBrandSkill}>
                <BookOpen className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">brand-skill.md</span>
                  <span className="text-xs text-muted-foreground">
                    AI assistant instructions
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Other Frameworks</DropdownMenuLabel>

              <DropdownMenuItem onClick={handleDownloadVueCss}>
                <FileCode className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">Vue.js Theme</span>
                  <span className="text-xs text-muted-foreground">
                    CSS variables for Vue
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleDownloadJavaConstants}>
                <Braces className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">Java Constants</span>
                  <span className="text-xs text-muted-foreground">
                    Static final class
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleDownloadJavaProperties}>
                <FileText className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">Java Properties</span>
                  <span className="text-xs text-muted-foreground">
                    Spring Boot config
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div data-tour="css-preview-button">
            <CssPreviewModal theme={theme} />
          </div>
          <Button variant="ghost" size="sm" onClick={startTour} title="Start walkthrough">
            <HelpCircle className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset} title="Reset all">
            <RotateCcw className="size-4" />
          </Button>
          {!isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              title="Close and return to homepage"
            >
              <X className="size-4" />
            </Button>
          )}
          <CreditDisplay />
          <UserMenuDropdown />
        </div>
      </header>


      {/* Main 3-Column Layout */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left Navigation */}
        <nav className="w-[72px] border-r border-border bg-card flex flex-col items-center py-3 gap-1 shrink-0">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const tourAttribute =
              item.id === 'colors' ? 'nav-colors' :
              item.id === 'fonts' ? 'nav-fonts' :
              item.id === 'buttons' ? 'nav-buttons' : undefined;
            return (
              <button
                key={item.id}
                data-tour={tourAttribute}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'w-full flex flex-col items-center gap-1 py-2 px-1 rounded-md transition-colors mx-1',
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Center - Preview */}
        <main data-tour="preview-area" className="flex-1 overflow-hidden">
          <ThemePreview theme={theme} mode={previewMode} onModeChange={handlePreviewModeChange} breakpoint={activeBreakpoint} onBreakpointChange={setActiveBreakpoint} />
        </main>

        {/* Right Sidebar - Settings */}
        <aside className="w-[350px] border-l border-border bg-card flex flex-col shrink-0 overflow-hidden min-h-0">
          {/* Fixed Color Mode Toggle - Only visible in Colors section */}
          {activeSection === 'colors' && (
            <div className="p-4 pb-0 border-b border-border bg-card shrink-0">
              <div data-tour="light-dark-toggle" className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                <Button
                  variant={previewMode === 'light' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handlePreviewModeChange('light')}
                  className="flex-1"
                >
                  <Sun className="size-4 mr-1.5" />
                  Light
                </Button>
                <Button
                  variant={previewMode === 'dark' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handlePreviewModeChange('dark')}
                  className="flex-1"
                >
                  <Moon className="size-4 mr-1.5" />
                  Dark
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetColors}
                  title="Reset colors to defaults"
                >
                  <RotateCcw className="size-4" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 h-full">
            <div className="p-4 pb-6 space-y-6">
              {/* Colors Section */}
              {activeSection === 'colors' && (
                <div className="space-y-6">

              {colorGroups.map((group) => {
                // Find if this group has a contrast pair
                const contrastPair = CONTRAST_PAIRS.find(
                  (pair) => group.colors.includes(pair.bg as never) && group.colors.includes(pair.fg as never)
                );

                return (
                  <div key={group.title}>
                    <h3 className="text-sm font-medium mb-3">{group.title}</h3>
                    <div className="space-y-2">
                      {group.colors.map((colorKey, index) => {
                        // Check if this is a foreground color in a pair
                        const isForegroundInPair = contrastPair && colorKey === contrastPair.fg;
                        const backgroundKey = contrastPair?.bg;

                        return (
                          <div key={colorKey} data-tour={colorKey === 'primary' ? 'primary-color' : undefined}>
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <ColorInput
                                  label={formatLabel(colorKey)}
                                  value={
                                    previewMode === 'light'
                                      ? theme.colors.light[colorKey as keyof ColorTokens]
                                      : theme.colors.dark[colorKey as keyof ColorTokens]
                                  }
                                  onChange={(value) => {
                                    if (previewMode === 'light') {
                                      dispatch({
                                        type: 'SET_LIGHT_COLOR',
                                        key: colorKey as keyof ColorTokens,
                                        value,
                                      });
                                    } else {
                                      dispatch({
                                        type: 'SET_DARK_COLOR',
                                        key: colorKey as keyof ColorTokens,
                                        value,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              {/* Show contrast badge for foreground colors in pairs */}
                              {isForegroundInPair && backgroundKey && (
                                <ContrastBadge
                                  bgColor={
                                    previewMode === 'light'
                                      ? theme.colors.light[backgroundKey as keyof ColorTokens]
                                      : theme.colors.dark[backgroundKey as keyof ColorTokens]
                                  }
                                  fgColor={
                                    previewMode === 'light'
                                      ? theme.colors.light[colorKey as keyof ColorTokens]
                                      : theme.colors.dark[colorKey as keyof ColorTokens]
                                  }
                                  onFix={(newFgColor) => {
                                    if (previewMode === 'light') {
                                      dispatch({
                                        type: 'SET_LIGHT_COLOR',
                                        key: colorKey as keyof ColorTokens,
                                        value: newFgColor,
                                      });
                                    } else {
                                      dispatch({
                                        type: 'SET_DARK_COLOR',
                                        key: colorKey as keyof ColorTokens,
                                        value: newFgColor,
                                      });
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
                </div>
              )}

              {/* Spacing Section */}
              {activeSection === 'spacing' && (
                <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  Control responsive padding and gaps for desktop, tablet, and mobile screens.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSpacing}
                  title="Reset spacing to defaults"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>

              {/* Breakpoint Tabs */}
              <Tabs value={activeBreakpoint} onValueChange={(v) => setActiveBreakpoint(v as 'desktop' | 'tablet' | 'mobile')}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="desktop">
                    <Monitor className="size-4 mr-1.5" />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="tablet">
                    <Tablet className="size-4 mr-1.5" />
                    Tablet
                  </TabsTrigger>
                  <TabsTrigger value="mobile">
                    <Smartphone className="size-4 mr-1.5" />
                    Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>

                {/* Horizontal Padding (px) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Label className="text-sm">Horizontal Padding (px)</Label>
                      <p className="text-xs text-muted-foreground">Container side padding</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.spacing.px[activeBreakpoint]}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.spacing.px[activeBreakpoint])]}
                    onValueChange={([num]) =>
                      dispatch({
                        type: 'SET_SPACING',
                        key: 'px',
                        value: { ...theme.spacing.px, [activeBreakpoint]: numberToRem(num) }
                      })
                    }
                    min={0.5}
                    max={6}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.5rem</span>
                    <span>6rem</span>
                  </div>
                </div>

                {/* Vertical Padding (py) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Label className="text-sm">Vertical Padding (py)</Label>
                      <p className="text-xs text-muted-foreground">Section top/bottom padding</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.spacing.py[activeBreakpoint]}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.spacing.py[activeBreakpoint])]}
                    onValueChange={([num]) =>
                      dispatch({
                        type: 'SET_SPACING',
                        key: 'py',
                        value: { ...theme.spacing.py, [activeBreakpoint]: numberToRem(num) }
                      })
                    }
                    min={2}
                    max={12}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>2rem</span>
                    <span>12rem</span>
                  </div>
                </div>

                {/* Horizontal Gap (space-x) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Label className="text-sm">Horizontal Gap (space-x)</Label>
                      <p className="text-xs text-muted-foreground">Gap between inline elements</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.spacing.spaceX[activeBreakpoint]}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.spacing.spaceX[activeBreakpoint])]}
                    onValueChange={([num]) =>
                      dispatch({
                        type: 'SET_SPACING',
                        key: 'spaceX',
                        value: { ...theme.spacing.spaceX, [activeBreakpoint]: numberToRem(num) }
                      })
                    }
                    min={0.25}
                    max={4}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.25rem</span>
                    <span>4rem</span>
                  </div>
                </div>

                {/* Vertical Gap (space-y) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Label className="text-sm">Vertical Gap (space-y)</Label>
                      <p className="text-xs text-muted-foreground">Gap between stacked elements</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.spacing.spaceY[activeBreakpoint]}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.spacing.spaceY[activeBreakpoint])]}
                    onValueChange={([num]) =>
                      dispatch({
                        type: 'SET_SPACING',
                        key: 'spaceY',
                        value: { ...theme.spacing.spaceY, [activeBreakpoint]: numberToRem(num) }
                      })
                    }
                    min={0.5}
                    max={6}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.5rem</span>
                    <span>6rem</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Global Padding (p) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Label className="text-sm">Global Padding (p)</Label>
                      <p className="text-xs text-muted-foreground">General padding for divs and components</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.spacing.p[activeBreakpoint]}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.spacing.p[activeBreakpoint])]}
                    onValueChange={([num]) =>
                      dispatch({
                        type: 'SET_SPACING',
                        key: 'p',
                        value: { ...theme.spacing.p, [activeBreakpoint]: numberToRem(num) }
                      })
                    }
                    min={0.5}
                    max={4}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.5rem</span>
                    <span>4rem</span>
                  </div>
                </div>
                </div>
              )}

              {/* Radius Section */}
              {activeSection === 'radius' && (
                <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  Border radius values for rounded corners.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetRadius}
                  title="Reset radius to defaults"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>
              {Object.entries(theme.radius).map(([key, value]) => {
                // Handle "full" specially (9999px)
                const isFull = value === '9999px' || key === 'full';
                const numericValue = isFull ? 3 : remToNumber(value);

                // Get description for each radius
                const getDescription = (k: string) => {
                  const descriptions: Record<string, string> = {
                    none: 'Sharp corners',
                    sm: 'Subtle rounding',
                    md: 'Medium rounding',
                    lg: 'Default rounding',
                    xl: 'Large rounding',
                    '2xl': 'Extra large',
                    full: 'Fully rounded',
                  };
                  return descriptions[k] || '';
                };

                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <Label className="text-sm font-medium">{key.toUpperCase()}</Label>
                        <p className="text-xs text-muted-foreground">{getDescription(key)}</p>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">
                        {value}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2 flex-shrink-0">
                        <div
                          className="size-10 bg-primary"
                          style={{ borderRadius: value }}
                        />
                        <div
                          className="size-10 bg-secondary"
                          style={{ borderRadius: value }}
                        />
                      </div>
                      <Slider
                        value={[numericValue]}
                        onValueChange={([num]) => {
                          // If at max and key is 'full', keep 9999px
                          if (key === 'full') {
                            dispatch({ type: 'SET_RADIUS', key, value: '9999px' });
                          } else {
                            dispatch({ type: 'SET_RADIUS', key, value: numberToRem(num) });
                          }
                        }}
                        min={0}
                        max={3}
                        step={0.125}
                        className="flex-1"
                        disabled={key === 'full'}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0rem</span>
                      <span>3rem</span>
                    </div>
                  </div>
                );
              })}

              <Separator className="my-4" />

              {/* Visual Preview Grid */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Visual Comparison</Label>
                <div className="grid grid-cols-4 gap-3 p-4 rounded-lg border border-border bg-muted/30">
                  {Object.entries(theme.radius).slice(0, 7).map(([key, value]) => (
                    <div key={key} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60"
                        style={{ borderRadius: value }}
                      />
                      <span className="text-xs font-medium">{key}</span>
                      <span className="text-xs text-muted-foreground font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
                </div>
              )}

              {/* Fonts Section */}
              {activeSection === 'fonts' && (
                <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  Select font families from Google Fonts.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFonts}
                  title="Reset fonts to defaults"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>
              <div>
                <Label className="text-sm mb-1.5 block">Sans (Body)</Label>
                <Select
                  value={theme.fonts.sans}
                  onValueChange={(value) =>
                    dispatch({ type: 'SET_FONT', key: 'sans', value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font">
                      {findFontLabel(SANS_FONTS, theme.fonts.sans)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {SANS_FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-1.5 block">Mono (Code)</Label>
                <Select
                  value={theme.fonts.mono}
                  onValueChange={(value) =>
                    dispatch({ type: 'SET_FONT', key: 'mono', value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font">
                      {findFontLabel(MONO_FONTS, theme.fonts.mono)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {MONO_FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-1.5 block">Heading</Label>
                <Select
                  value={theme.fonts.heading}
                  onValueChange={(value) =>
                    dispatch({ type: 'SET_FONT', key: 'heading', value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font">
                      {findFontLabel(HEADING_FONTS, theme.fonts.heading)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {HEADING_FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Typography Sizes Section */}
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium">Text Sizes</h3>
                  <p className="text-xs text-muted-foreground">
                    Font sizes for typography elements
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetTypographySizes}
                  title="Reset text sizes to defaults"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>

              <div className="space-y-4 pt-2">
                {/* H1 Size Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">H1 Size</Label>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.typographySizes.h1}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.typographySizes.h1)]}
                    onValueChange={([num]) =>
                      dispatch({ type: 'SET_TYPOGRAPHY_SIZE', key: 'h1', value: numberToRem(num) })
                    }
                    min={2}
                    max={10}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>2rem</span>
                    <span>10rem</span>
                  </div>
                </div>

                {/* H2 Size Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">H2 Size</Label>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.typographySizes.h2}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.typographySizes.h2)]}
                    onValueChange={([num]) =>
                      dispatch({ type: 'SET_TYPOGRAPHY_SIZE', key: 'h2', value: numberToRem(num) })
                    }
                    min={1.5}
                    max={4}
                    step={0.125}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1.5rem</span>
                    <span>4rem</span>
                  </div>
                </div>

                {/* H3 Size Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">H3 Size</Label>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.typographySizes.h3}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.typographySizes.h3)]}
                    onValueChange={([num]) =>
                      dispatch({ type: 'SET_TYPOGRAPHY_SIZE', key: 'h3', value: numberToRem(num) })
                    }
                    min={1.25}
                    max={2}
                    step={0.125}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1.25rem</span>
                    <span>2rem</span>
                  </div>
                </div>

                {/* H4 Size Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">H4 Size</Label>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.typographySizes.h4}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.typographySizes.h4)]}
                    onValueChange={([num]) =>
                      dispatch({ type: 'SET_TYPOGRAPHY_SIZE', key: 'h4', value: numberToRem(num) })
                    }
                    min={1}
                    max={1.5}
                    step={0.125}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1rem</span>
                    <span>1.5rem</span>
                  </div>
                </div>

                {/* Paragraph Size Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">Paragraph Size</Label>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.typographySizes.p}
                    </span>
                  </div>
                  <Slider
                    value={[remToNumber(theme.typographySizes.p)]}
                    onValueChange={([num]) =>
                      dispatch({ type: 'SET_TYPOGRAPHY_SIZE', key: 'p', value: numberToRem(num) })
                    }
                    min={0.75}
                    max={1.25}
                    step={0.125}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.75rem</span>
                    <span>1.25rem</span>
                  </div>
                </div>

                {/* Compact Grid for Remaining Sizes */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {TYPOGRAPHY_SIZE_CONFIGS.slice(5).map((config) => (
                    <div key={config.key}>
                      <Label className="text-xs mb-1 block">
                        {config.label}
                        <span className="text-muted-foreground ml-1 font-normal">
                          ({config.description})
                        </span>
                      </Label>
                      <Select
                        value={theme.typographySizes[config.key]}
                        onValueChange={(value) =>
                          dispatch({ type: 'SET_TYPOGRAPHY_SIZE', key: config.key, value })
                        }
                      >
                        <SelectTrigger className="w-full h-8 text-xs">
                          <SelectValue placeholder="Select size">
                            {config.options.find((o) => o.value === theme.typographySizes[config.key])?.label ?? theme.typographySizes[config.key]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {config.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <span className="flex items-center gap-2">
                                <span style={{ fontSize: option.value, lineHeight: 1.2 }}>Aa</span>
                                <span className="text-muted-foreground text-xs">{option.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Styles Section */}
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium">Typography Styles</h3>
                  <p className="text-xs text-muted-foreground">
                    Line height and letter spacing
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    dispatch({ type: 'RESET_TYPOGRAPHY_STYLES' });
                    toast.info('Typography styles reset to defaults');
                  }}
                  title="Reset typography styles to defaults"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>

              {/* Line Height Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Line Height (Body)</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.typographyStyles.lineHeight}
                  </span>
                </div>
                <Slider
                  value={[parseFloat(theme.typographyStyles.lineHeight)]}
                  onValueChange={([num]) =>
                    dispatch({ type: 'SET_TYPOGRAPHY_STYLE', key: 'lineHeight', value: num.toFixed(2) })
                  }
                  min={1}
                  max={2.5}
                  step={0.05}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tight (1.0)</span>
                  <span>Relaxed (2.5)</span>
                </div>
              </div>

              {/* H1 Line Height Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Line Height (H1)</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.typographyStyles.lineHeightH1}
                  </span>
                </div>
                <Slider
                  value={[parseFloat(theme.typographyStyles.lineHeightH1)]}
                  onValueChange={([num]) =>
                    dispatch({ type: 'SET_TYPOGRAPHY_STYLE', key: 'lineHeightH1', value: num.toFixed(2) })
                  }
                  min={0.8}
                  max={1.8}
                  step={0.05}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tight (0.8)</span>
                  <span>Loose (1.8)</span>
                </div>
              </div>

              {/* H2 Line Height Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Line Height (H2)</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.typographyStyles.lineHeightH2}
                  </span>
                </div>
                <Slider
                  value={[parseFloat(theme.typographyStyles.lineHeightH2)]}
                  onValueChange={([num]) =>
                    dispatch({ type: 'SET_TYPOGRAPHY_STYLE', key: 'lineHeightH2', value: num.toFixed(2) })
                  }
                  min={0.8}
                  max={1.8}
                  step={0.05}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tight (0.8)</span>
                  <span>Loose (1.8)</span>
                </div>
              </div>

              {/* H3 Line Height Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Line Height (H3)</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.typographyStyles.lineHeightH3}
                  </span>
                </div>
                <Slider
                  value={[parseFloat(theme.typographyStyles.lineHeightH3)]}
                  onValueChange={([num]) =>
                    dispatch({ type: 'SET_TYPOGRAPHY_STYLE', key: 'lineHeightH3', value: num.toFixed(2) })
                  }
                  min={0.8}
                  max={1.8}
                  step={0.05}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tight (0.8)</span>
                  <span>Loose (1.8)</span>
                </div>
              </div>

              {/* Letter Spacing Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Letter Spacing</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.typographyStyles.letterSpacing}em
                  </span>
                </div>
                <Slider
                  value={[parseFloat(theme.typographyStyles.letterSpacing)]}
                  onValueChange={([num]) =>
                    dispatch({ type: 'SET_TYPOGRAPHY_STYLE', key: 'letterSpacing', value: num.toFixed(3) })
                  }
                  min={-0.05}
                  max={0.2}
                  step={0.005}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tighter (-0.05em)</span>
                  <span>Wider (0.2em)</span>
                </div>
              </div>

              {/* Live Typography Preview */}
              <div className="pt-4 border-t border-border mt-4">
                <Label className="text-sm mb-3 block">Preview</Label>
                <div 
                  className="p-4 rounded-lg border border-border bg-background"
                  style={{
                    lineHeight: theme.typographyStyles.lineHeight,
                    letterSpacing: `${theme.typographyStyles.letterSpacing}em`,
                  }}
                >
                  <p className="text-base mb-2" style={{ fontFamily: theme.fonts.sans }}>
                    The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                  </p>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: theme.fonts.sans }}>
                    Sphinx of black quartz, judge my vow.
                  </p>
                </div>
              </div>
                </div>
              )}

              {/* Buttons Section */}
              {activeSection === 'buttons' && (
                <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  Default button styling tokens.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetButtons}
                  title="Reset buttons to defaults"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>

              {/* Border Radius Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Border Radius</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.buttons.borderRadius}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="size-8 bg-primary flex-shrink-0"
                    style={{ borderRadius: theme.buttons.borderRadius }}
                  />
                  <Slider
                    value={[remToNumber(theme.buttons.borderRadius)]}
                    onValueChange={([num]) =>
                      dispatch({ type: 'SET_BUTTON', key: 'borderRadius', value: numberToRem(num) })
                    }
                    min={0}
                    max={3}
                    step={0.125}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Square (0rem)</span>
                  <span>Very Rounded (3rem)</span>
                </div>
              </div>
              {/* Font Weight Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Font Weight</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.buttons.fontWeight}
                  </span>
                </div>
                <Slider
                  value={[parseNumber(theme.buttons.fontWeight)]}
                  onValueChange={([num]) =>
                    dispatch({ type: 'SET_BUTTON', key: 'fontWeight', value: String(num) })
                  }
                  min={300}
                  max={900}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Light (300)</span>
                  <span>Bold (900)</span>
                </div>
              </div>

              {/* Font Size - Select & Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Font Size</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.buttons.fontSize}
                  </span>
                </div>
                <Slider
                  value={[remToNumber(theme.buttons.fontSize)]}
                  onValueChange={([num]) =>
                    dispatch({ type: 'SET_BUTTON', key: 'fontSize', value: numberToRem(num) })
                  }
                  min={0.75}
                  max={1.5}
                  step={0.125}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>XS (0.75rem)</span>
                  <span>XL (1.5rem)</span>
                </div>
                <Select
                  value={theme.buttons.fontSize}
                  onValueChange={(value) =>
                    dispatch({ type: 'SET_BUTTON', key: 'fontSize', value })
                  }
                >
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select a size">
                      {BUTTON_FONT_SIZES.find((s) => s.value === theme.buttons.fontSize)?.label ?? 'Custom'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {BUTTON_FONT_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        <span className="flex items-center gap-2">
                          <span style={{ fontSize: size.value }}>{size.label}</span>
                          <span className="text-muted-foreground text-xs font-mono">{size.value}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Hover Effect */}
              <div>
                <Label className="text-sm mb-1.5 block">Hover Effect</Label>
                <Select
                  value={theme.buttons.hoverEffect}
                  onValueChange={(value) =>
                    dispatch({ type: 'SET_BUTTON', key: 'hoverEffect', value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select hover effect">
                      {BUTTON_HOVER_EFFECTS.find((e) => e.value === theme.buttons.hoverEffect)?.label ?? 'None'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {BUTTON_HOVER_EFFECTS.map((effect) => (
                      <SelectItem key={effect.value} value={effect.value}>
                        <span className="flex flex-col">
                          <span>{effect.label}</span>
                          <span className="text-muted-foreground text-xs">{effect.description}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              {/* Input Button Specific Settings */}
              <div>
                <div className="mb-3">
                  <Label className="text-sm font-medium">Input Button Settings</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate styles for &lt;input type="button"&gt; and &lt;input type="submit"&gt;
                  </p>
                </div>

                {/* Input Button Border Radius */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">Input Border Radius</Label>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.buttons.inputBorderRadius}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 bg-secondary flex-shrink-0"
                      style={{ borderRadius: theme.buttons.inputBorderRadius }}
                    />
                    <Slider
                      value={[remToNumber(theme.buttons.inputBorderRadius)]}
                      onValueChange={([num]) =>
                        dispatch({ type: 'SET_BUTTON', key: 'inputBorderRadius', value: numberToRem(num) })
                      }
                      min={0}
                      max={3}
                      step={0.125}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Square (0rem)</span>
                    <span>Very Rounded (3rem)</span>
                  </div>
                </div>

                {/* Input Button Font Weight */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">Input Font Weight</Label>
                    <span className="text-xs font-mono text-muted-foreground">
                      {theme.buttons.inputFontWeight}
                    </span>
                  </div>
                  <Slider
                    value={[parseNumber(theme.buttons.inputFontWeight)]}
                    onValueChange={([num]) =>
                      dispatch({ type: 'SET_BUTTON', key: 'inputFontWeight', value: String(num) })
                    }
                    min={300}
                    max={900}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Light (300)</span>
                    <span>Bold (900)</span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Button Element Types Preview */}
              <div>
                <div className="mb-3">
                  <Label className="text-sm font-medium">Button Element Types</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Test how your button styles apply to different HTML elements
                  </p>
                </div>
                <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
                  <div>
                    <Label className="text-xs text-muted-foreground block mb-1.5">&lt;button&gt;</Label>
                    <ButtonPreview
                      label="Button Element"
                      bgColor="bg-primary"
                      textColor="text-primary-foreground"
                      borderRadius={theme.buttons.borderRadius}
                      fontWeight={theme.buttons.fontWeight}
                      fontSize={theme.buttons.fontSize}
                      hoverEffect={theme.buttons.hoverEffect}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground block mb-1.5">&lt;button type="submit"&gt;</Label>
                    <ButtonPreview
                      label="Submit Button"
                      bgColor="bg-primary"
                      textColor="text-primary-foreground"
                      borderRadius={theme.buttons.borderRadius}
                      fontWeight={theme.buttons.fontWeight}
                      fontSize={theme.buttons.fontSize}
                      hoverEffect={theme.buttons.hoverEffect}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground block mb-1.5">&lt;input type="button"&gt;</Label>
                    <ButtonPreview
                      label="Input Button"
                      bgColor="bg-secondary"
                      textColor="text-secondary-foreground"
                      borderRadius={theme.buttons.inputBorderRadius}
                      fontWeight={theme.buttons.inputFontWeight}
                      fontSize={theme.buttons.fontSize}
                      hoverEffect={theme.buttons.hoverEffect}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground block mb-1.5">&lt;input type="submit"&gt;</Label>
                    <ButtonPreview
                      label="Input Submit"
                      bgColor="bg-secondary"
                      textColor="text-secondary-foreground"
                      borderRadius={theme.buttons.inputBorderRadius}
                      fontWeight={theme.buttons.inputFontWeight}
                      fontSize={theme.buttons.fontSize}
                      hoverEffect={theme.buttons.hoverEffect}
                    />
                  </div>
                </div>
              </div>

              {/* Button Variants preview */}
              <div className="pt-4 border-t border-border">
                <Label className="text-sm mb-3 block">Button Variants (hover to see {theme.buttons.hoverEffect} effect)</Label>
                <div className="flex flex-wrap gap-2">
                  <ButtonPreview
                    label="Primary"
                    bgColor="bg-primary"
                    textColor="text-primary-foreground"
                    borderRadius={theme.buttons.borderRadius}
                    fontWeight={theme.buttons.fontWeight}
                    fontSize={theme.buttons.fontSize}
                    hoverEffect={theme.buttons.hoverEffect}
                  />
                  <ButtonPreview
                    label="Secondary"
                    bgColor="bg-secondary"
                    textColor="text-secondary-foreground"
                    borderRadius={theme.buttons.borderRadius}
                    fontWeight={theme.buttons.fontWeight}
                    fontSize={theme.buttons.fontSize}
                    hoverEffect={theme.buttons.hoverEffect}
                  />
                </div>
              </div>
                </div>
              )}

              {/* Brand Assets Section */}
              {activeSection === 'brand' && (
                <BrandAssetsSection assets={theme.assets} dispatch={dispatch} />
              )}

              {/* AI Theme Generator Section */}
              {activeSection === 'ai' && (
                <AiThemeChat
                  onApplyTheme={(newTheme) => dispatch({ type: 'SET_THEME', payload: newTheme })}
                  currentThemeName={theme.name}
                />
              )}
            </div>
          </ScrollArea>
        </aside>
      </div>
      </div>
    </CreditsProvider>
  );
}
