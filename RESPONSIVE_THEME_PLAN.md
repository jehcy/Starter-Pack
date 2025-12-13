# Plan: Breakpoint-Specific Theme Settings

## Overview
Enable users to set different theme values (spacing, typography, buttons) for Desktop, Tablet, and Mobile breakpoints independently. When a user toggles to Mobile and changes font size, it only affects mobile.

## Current State

### What Already Works:
- `ResponsiveSpacingValue` interface exists with `desktop`, `tablet`, `mobile` properties
- Spacing controls already use breakpoint-specific values in the UI
- Desktop/Tablet/Mobile toggle tabs exist in the theme editor
- ThemePreview applies breakpoint-specific spacing

### The Gap:
1. **Typography sizes are NOT responsive** - Single values like `"3.5rem"` for h1
2. **Typography styles (line-height, letter-spacing) are NOT responsive**
3. **Button sizes are NOT responsive**
4. **CSS export doesn't generate media queries** - `generateGlobalsCss()` only uses desktop values
5. **`applyThemeToDOM()` only applies desktop values** - No responsive CSS variables

---

## Implementation Plan

### Phase 1: Type System Changes
**File: `src/lib/brand-theme.ts`**

1. Update `TypographySizeTokens` - ALL sizes become responsive:
```typescript
export interface TypographySizeTokens {
  h1: ResponsiveSpacingValue;
  h2: ResponsiveSpacingValue;
  h3: ResponsiveSpacingValue;
  h4: ResponsiveSpacingValue;
  p: ResponsiveSpacingValue;
  blockquote: ResponsiveSpacingValue;
  label: ResponsiveSpacingValue;
  code: ResponsiveSpacingValue;
  table: ResponsiveSpacingValue;
  list: ResponsiveSpacingValue;
}
```

2. Update `TypographyStyleTokens` - line-height and letter-spacing become responsive:
```typescript
export interface TypographyStyleTokens {
  lineHeight: ResponsiveSpacingValue;
  lineHeightH1: ResponsiveSpacingValue;
  lineHeightH2: ResponsiveSpacingValue;
  lineHeightH3: ResponsiveSpacingValue;
  letterSpacing: ResponsiveSpacingValue;
}
```

3. Update `ButtonTokens` - fontSize becomes responsive:
```typescript
export interface ButtonTokens {
  borderRadius: string;
  fontWeight: string;
  fontSize: ResponsiveSpacingValue;  // NEW: responsive
  hoverEffect: string;
  inputBorderRadius: string;
  inputFontWeight: string;
}
```

4. Update all DEFAULT constants with responsive values:
```typescript
// Typography Sizes
h1: { desktop: '4.5rem', tablet: '3.5rem', mobile: '2.5rem' },
h2: { desktop: '1.875rem', tablet: '1.5rem', mobile: '1.25rem' },
h3: { desktop: '1.5rem', tablet: '1.375rem', mobile: '1.25rem' },
h4: { desktop: '1.25rem', tablet: '1.125rem', mobile: '1rem' },
p: { desktop: '1rem', tablet: '1rem', mobile: '0.9375rem' },
blockquote: { desktop: '1.125rem', tablet: '1rem', mobile: '1rem' },
label: { desktop: '0.875rem', tablet: '0.875rem', mobile: '0.8125rem' },
code: { desktop: '0.875rem', tablet: '0.875rem', mobile: '0.8125rem' },
table: { desktop: '0.875rem', tablet: '0.875rem', mobile: '0.8125rem' },
list: { desktop: '1rem', tablet: '1rem', mobile: '0.9375rem' },

// Typography Styles
lineHeight: { desktop: '1.6', tablet: '1.6', mobile: '1.5' },
lineHeightH1: { desktop: '1.1', tablet: '1.15', mobile: '1.2' },
lineHeightH2: { desktop: '1.2', tablet: '1.25', mobile: '1.3' },
lineHeightH3: { desktop: '1.3', tablet: '1.35', mobile: '1.4' },
letterSpacing: { desktop: '-0.02', tablet: '-0.02', mobile: '-0.01' },

// Button
fontSize: { desktop: '0.875rem', tablet: '0.875rem', mobile: '0.8125rem' },
```

5. Add helper function:
```typescript
function getResponsiveValue(
  value: string | ResponsiveSpacingValue,
  breakpoint: 'desktop' | 'tablet' | 'mobile'
): string
```

---

### Phase 2: Migration for Existing Themes
**File: `src/lib/brand-theme.ts`**

Update `loadThemeFromStorage()` to migrate old string values to responsive format:
- If typography value is string, convert to `{ desktop: value, tablet: value, mobile: value }`
- If typography style is string, convert similarly
- If button fontSize is string, convert similarly
- If already responsive, use as-is

---

### Phase 3: UI Controls Update
**File: `src/components/theme-editor/themePage.tsx`**

1. **Typography Sizes Section:**
   - Add breakpoint tabs (Desktop/Tablet/Mobile) like spacing section
   - Update ALL typography sliders (h1-h4, p, blockquote, label, code, table, list) to:
     - Read from `theme.typographySizes.h1[activeBreakpoint]`
     - Write to specific breakpoint: `{ ...currentValue, [activeBreakpoint]: newValue }`
   - Update displayed values to show breakpoint-specific value

2. **Typography Styles Section:**
   - Add breakpoint tabs
   - Update line-height and letter-spacing controls to be breakpoint-aware

3. **Buttons Section:**
   - Add breakpoint tabs
   - Update fontSize control to be breakpoint-aware

---

### Phase 4: Preview Component Update
**File: `src/components/theme-editor/ThemePreview.tsx`**

Update ALL inline styles to use breakpoint-specific values:
```typescript
// Typography sizes
fontSize: getResponsiveValue(theme.typographySizes.h1, breakpoint)

// Typography styles
lineHeight: getResponsiveValue(theme.typographyStyles.lineHeightH1, breakpoint)
letterSpacing: `${getResponsiveValue(theme.typographyStyles.letterSpacing, breakpoint)}em`

// Button
fontSize: getResponsiveValue(theme.buttons.fontSize, breakpoint)
```

Apply to ALL text elements throughout the preview (h1-h4, p, blockquote, labels, code, tables, lists, buttons).

---

### Phase 5: CSS Generation with Media Queries
**File: `src/lib/brand-theme.ts`**

1. Update `generateGlobalsCss()` to output responsive CSS:

```css
:root {
  /* Typography Sizes - Desktop */
  --text-h1: 4.5rem;
  --text-h2: 1.875rem;
  /* ... */

  /* Typography Styles - Desktop */
  --line-height: 1.6;
  --line-height-h1: 1.1;
  /* ... */

  /* Button - Desktop */
  --button-font-size: 0.875rem;
}

/* Tablet */
@media (max-width: 1023px) and (min-width: 768px) {
  :root {
    --text-h1: 3.5rem;
    --line-height-h1: 1.15;
    --button-font-size: 0.875rem;
    /* ... */
  }
}

/* Mobile */
@media (max-width: 767px) {
  :root {
    --text-h1: 2.5rem;
    --line-height-h1: 1.2;
    --button-font-size: 0.8125rem;
    /* ... */
  }
}
```

2. Update `applyThemeToDOM()` to inject a `<style>` element with responsive media queries for real-time preview

---

### Phase 6: Export Formats Update
**File: `src/lib/theme-exports.ts`**

Update all export generators to handle ALL responsive values:
- `generateVueCssVars()` - Add media queries for typography, styles, buttons
- `generateTokensJson()` - Expand all responsive values (e.g., `h1-desktop`, `h1-tablet`, `h1-mobile`)
- `generateShadcnThemeTs()` - Include breakpoint-specific values
- Java exports - Add constants for each breakpoint variation

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/brand-theme.ts` | Type changes (TypographySizeTokens, TypographyStyleTokens, ButtonTokens), defaults, migration, CSS generation |
| `src/components/theme-editor/themePage.tsx` | Breakpoint tabs for Typography Sizes, Typography Styles, Buttons sections; slider/control updates |
| `src/components/theme-editor/ThemePreview.tsx` | Breakpoint-aware rendering for all typography and buttons |
| `src/lib/theme-exports.ts` | All export generators |

---

## Breakpoint Values
- **Desktop**: ≥1024px (default)
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

---

## Estimated Changes

| Section | Properties Made Responsive |
|---------|---------------------------|
| Typography Sizes | h1, h2, h3, h4, p, blockquote, label, code, table, list (10 props) |
| Typography Styles | lineHeight, lineHeightH1, lineHeightH2, lineHeightH3, letterSpacing (5 props) |
| Buttons | fontSize (1 prop) |
| **Total** | **16 new responsive properties** |

Plus existing responsive spacing props that need CSS export fixes.
