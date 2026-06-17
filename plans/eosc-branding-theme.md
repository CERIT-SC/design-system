# EOSC Branding Theme Implementation Plan

## Overview

This plan outlines the implementation of a new EOSC (European Open Science Cloud) branding theme as an alternative styling variant alongside the existing light/dark mode system. The EOSC theme will be based on the Figma design at:
https://www.figma.com/design/0s6TkXB4AY6ttzzif7MxsE/Vizualni-identita-v%C3%BDstup%C5%AF-EOSC-cz?node-id=6-13&m=dev

## Current Architecture Analysis

### Existing Theme System
The design system uses `next-themes` package with a simple `light`/`dark` toggle mechanism:
- [ThemeProvider.tsx](src/components/ThemeProvider.tsx) - Wraps app with NextThemesProvider
- [ModeToggle.tsx](src/components/ModeToggle.tsx) - Toggle button switching between light/dark
- CSS variables defined in `:root` (light) and `.dark` classes in [setup.css](lib_public/setup.css)

### Color Structure in setup.css
- Surfaces: `--background`, `--surface`, `--surface-raised`
- Text: `--text`, `--text-muted`, `--text-heading`
- Brand colors: `--primary`, `--secondary`, `--tertiary` with foreground variants
- Semantic colors: `--info`, `--success`, `--warning`, `--error`
- Shade ramps: `--color-{brand}-{50-950}` for each color family

## EOSC Design Colors (from Figma screenshot)

### Primary Colours
| Name | Hex | Usage |
|------|-----|-------|
| Dark Green | `#025960` | Primary brand color |
| Green Grey | `#F5F7F7` | Secondary/surface |
| Pink | `#C52876` | Tertiary/accent |
| Pink Dark | `#9F0D54` | Darker pink variant |

### State Colours (from Figma - 5 stops each)

**Error/Delete:**
| Stop | Hex |
|------|-----|
| Lightest | `#FACFC9` |
| Light | `#F08F94` |
| Medium | `#E8799A` |
| Dark | `#E1523F` |
| Darkest | `#C92B16` |

**Alert:**
| Stop | Hex |
|------|-----|
| Lightest | `#FBF6D6` |
| Light | `#F9E1AB` |
| Medium | `#F7CD73` |
| Dark | `#EAB238` |
| Darkest | `#C7911C` |

**Confirm/Success:**
| Stop | Hex |
|------|-----|
| Lightest | `#E9FDEA` |
| Light | `#CAF4CC` |
| Medium | `#8DE490` |
| Dark | `#59CD5D` |
| Darkest | `#2FAA34` |

### Button States (from Figma)
- **Primary button**: Dark Green (`#025960`) with default/hover/pressed states
- **Secondary button A**: Grey tone with default/hover/pressed states
- **Secondary button B**: Light blue-grey tone with default/hover/pressed states

## Implementation Approach

### Recommended: Attribute-based Theme Selector

Use `data-theme` attribute for theme switching:
```html
<html data-theme="default">  <!-- or "eosc" -->
<html data-theme="eosc" class="dark">
```

CSS:
```css
[data-theme="default"] { /* default tokens */ }
[data-theme="eosc"] { /* eosc tokens */ }
[data-theme="eosc"].dark { /* eosc dark tokens */ }
```

**Pros:**
- More semantic and scalable
- Easy to add more themes later
- Can combine multiple attributes
- Works with next-themes package

## Complete Color Ramps for EOSC Theme

### Primary Dark Green Ramp (base: `#025960`)
Generated using perceptual lightness interpolation:

```css
--color-primary-50:  #e6fbfc;   /* Very light tint */
--color-primary-100: #baf3f6;   /* Light tint */
--color-primary-200: #7ee6eb;   /* Light-medium tint */
--color-primary-300: #47d4de;   /* Medium tint */
--color-primary-400: #1cb8c4;   /* Rich teal */
--color-primary-500: #025960;   /* Base EOSC green */
--color-primary-600: #024a50;   /* Slightly darker */
--color-primary-700: #023a40;   /* Dark medium */
--color-primary-800: #022a30;   /* Dark */
--color-primary-900: #011a20;   /* Very dark */
--color-primary-950: #010d10;   /* Near black */
```

### Secondary Green Grey Ramp (base: `#F5F7F7`)

```css
--color-secondary-50:  #fafbfb;
--color-secondary-100: #f5f7f7;   /* Base EOSC grey */
--color-secondary-200: #eaedef;
--color-secondary-300: #dbe1e3;
--color-secondary-400: #c7d0d3;
--color-secondary-500: #afb8bc;
--color-secondary-600: #8a9499;
--color-secondary-700: #697277;
--color-secondary-800: #4d5559;
--color-secondary-900: #363d40;
--color-secondary-950: #1d2123;
```

### Tertiary Pink Ramp (base: `#C52876`)

```css
--color-tertiary-50:  #fdf2f7;
--color-tertiary-100: #f9dceb;
--color-tertiary-200: #f4b8d6;
--color-tertiary-300: #ec8bb9;
--color-tertiary-400: #e3569d;
--color-tertiary-500: #C52876;   /* Base EOSC pink */
--color-tertiary-600: #a31f62;
--color-tertiary-700: #7f184d;
--color-tertiary-800: #62143d;
--color-tertiary-900: #47102e;
--color-tertiary-950: #2d0a1d;
```

### Dark Pink Variant Ramp (base: `#9F0D54`)

```css
--color-pink-50:  #fdf0f6;
--color-pink-100: #fadce9;
--color-pink-200: #f5b8d6;
--color-pink-300: #ef8db9;
--color-pink-400: #e7569d;
--color-pink-500: #9F0D54;   /* Darker pink */
--color-pink-600: #840b46;
--color-pink-700: #690938;
--color-pink-800: #52072c;
--color-pink-900: #3d0521;
--color-pink-950: #260315;
```

### Error Ramp (from Figma values)

```css
--color-error-50:  #fef2f1;   /* Based on #FACFC9 */
--color-error-100: #fdd6d3;
--color-error-200: #fab5ad;   /* Based on #F08F94 */
--color-error-300: #f78e82;   /* Based on #E8799A */
--color-error-400: #f46458;   /* Based on #E1523F */
--color-error-500: #C92B16;   /* Base error red */
--color-error-600: #a82412;
--color-error-700: #841c0e;
--color-error-800: #66160b;
--color-error-900: #4a1008;
--color-error-950: #2f0a05;
```

### Warning/Alert Ramp (from Figma values)

```css
--color-warning-50:  #fefce8;   /* Based on #FBF6D6 */
--color-warning-100: #fef9c3;
--color-warning-200: #fef08a;   /* Based on #F9E1AB */
--color-warning-300: #fde047;   /* Based on #F7CD73 */
--color-warning-400: #facc15;   /* Based on #EAB238 */
--color-warning-500: #C7911C;   /* Base warning amber */
--color-warning-600: #a57716;
--color-warning-700: #805d12;
--color-warning-800: #63470f;
--color-warning-900: #4a340c;
--color-warning-950: #2f1f06;
```

### Success Ramp (from Figma values)

```css
--color-success-50:  #f0fdf4;   /* Based on #E9FDEA */
--color-success-100: #dcfce7;   /* Based on #CAF4CC */
--color-success-200: #bbf7d0;
--color-success-300: #86efac;   /* Based on #8DE490 */
--color-success-400: #4ade80;   /* Based on #59CD5D */
--color-success-500: #2FAA34;   /* Base success green */
--color-success-600: #268d2b;
--color-success-700: #1d6f22;
--color-success-800: #15541b;
--color-success-900: #0f3d15;
--color-success-950: #0a260d;
```

### Info Ramp (complementary cyan)

```css
--color-info-50:  #f0f9ff;
--color-info-100: #e0f2fe;
--color-info-200: #bae6fd;
--color-info-300: #7dd3fc;
--color-info-400: #38bdf8;
--color-info-500: #0ea5e9;
--color-info-600: #0284c7;
--color-info-700: #0369a1;
--color-info-800: #075985;
--color-info-900: #0c4a6e;
--color-info-950: #082f49;
```

### Neutral/Base Ramp (for text and surfaces)

```css
--color-base-50:  #fafafa;
--color-base-100: #f5f5f5;
--color-base-200: #e5e5e5;
--color-base-300: #d4d4d4;
--color-base-400: #a3a3a3;
--color-base-500: #737373;
--color-base-600: #525252;
--color-base-700: #404040;
--color-base-800: #262626;
--color-base-900: #171717;
--color-base-950: #0a0a0a;
```

## EOSC Theme CSS Variables Setup

### EOSC Light Theme (`[data-theme="eosc"]`)

```css
[data-theme="eosc"] {
  /* Surfaces - clean white to grey progression */
  --background:     #ffffff;
  --surface:        #F5F7F7;      /* EOSC Green Grey */
  --surface-raised: #eaebf1;

  /* Text - high contrast on light backgrounds */
  --text:         #1a1a1a;
  --text-muted:   #6b7280;
  --text-heading: #025960;        /* EOSC Dark Green */

  /* Brand - EOSC primary colors */
  --primary:            #025960;
  --primary-foreground: #ffffff;

  --secondary:            #F5F7F7;
  --secondary-foreground: #025960;

  --tertiary:            #C52876;
  --tertiary-foreground: #ffffff;

  /* Borders */
  --border:       #d4d4d4;
  --border-focus: #025960;

  /* Semantic colors - derived from Figma state colours */
  --info:               #0ea5e9;
  --info-foreground:    #ffffff;
  --success:            #2FAA34;
  --success-foreground: #ffffff;
  --warning:            #C7911C;
  --warning-foreground: #ffffff;
  --error:              #C92B16;
  --error-foreground:   #ffffff;

  /* Charts - EOSC palette */
  --chart-1: #025960;
  --chart-2: #C52876;
  --chart-3: #0ea5e9;
  --chart-4: #2FAA34;
  --chart-5: #C7911C;
}
```

### EOSC Dark Theme (`[data-theme="eosc"].dark`)

```css
[data-theme="eosc"].dark {
  /* Surfaces - dark teal-tinted greys */
  --background:     #0a1a1a;
  --surface:        #122626;
  --surface-raised: #1a3636;

  /* Text - light on dark */
  --text:         #f5f7f7;
  --text-muted:   #9ca3af;
  --text-heading: #baf3f6;

  /* Brand - inverted for dark mode */
  --primary:            #baf3f6;
  --primary-foreground: #0a1a1a;

  --secondary:            #1a3636;
  --secondary-foreground: #baf3f6;

  --tertiary:            #e7569d;
  --tertiary-foreground: #0a1a1a;

  /* Borders */
  --border:       #2d3d3d;
  --border-focus: #baf3f6;

  /* Semantic - adjusted for dark backgrounds */
  --info:               #38bdf8;
  --info-foreground:    #0a1a1a;
  --success:            #4ade80;
  --success-foreground: #0a1a1a;
  --warning:            #facc15;
  --warning-foreground: #0a1a1a;
  --error:              #f87171;
  --error-foreground:   #0a1a1a;

  /* Charts - brighter for dark mode */
  --chart-1: #67e8f9;
  --chart-2: #f472b6;
  --chart-3: #38bdf8;
  --chart-4: #4ade80;
  --chart-5: #fbbf24;
}
```

## Implementation Steps

### Step 1: Create `lib_public/eosc_setup.css`
Create the complete EOSC theme file with all color ramps and semantic tokens.

### Step 2: Update ThemeProvider
Extend [ThemeProvider.tsx](src/components/ThemeProvider.tsx) to support custom themes:

```tsx
// src/components/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "light" | "dark" | "eosc" | "eosc-dark";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      forcedTheme="light" // fallback
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
```

### Step 3: Create ThemeSelector Component
New component for switching between branding themes:

```tsx
// src/components/ThemeSelector.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@e-infra/design-system";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@e-infra/design-system";
import { Sun, Moon, Palette } from "lucide-react";

const THEMES = [
  { id: "light", name: "Default Light", icon: Sun, description: "Light theme" },
  { id: "dark", name: "Default Dark", icon: Moon, description: "Dark theme" },
  { id: "eosc", name: "EOSC Light", icon: Palette, description: "EOSC branding" },
  { id: "eosc-dark", name: "EOSC Dark", icon: Palette, description: "EOSC dark" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="h-4 w-4 mr-2" />
          Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={theme === t.id ? "bg-accent" : ""}
          >
            <t.icon className="mr-2 h-4 w-4" />
            <div>
              <span>{t.name}</span>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Step 4: Update import in entry point
Ensure both CSS files are imported:

```tsx
// In your main entry point (e.g., App.tsx or layout.tsx)
import '@e-infra/design-system/setup.css';
import '@e-infra/design-system/eosc_setup.css';
```

### Step 5: Document the Theme System
Add documentation in `docs/foundations/`:
- New `themes.mdx` explaining how to switch themes
- Update `colors.mdx` with EOSC palette reference

### Step 6: Create Storybook stories
Add stories demonstrating EOSC theme components

## File Structure

```
lib_public/
  ├── setup.css          # Default theme (existing)
  └── eosc_setup.css     # EOSC theme (new)

src/components/
  ├── ThemeProvider.tsx  # Updated with theme support
  ├── ModeToggle.tsx     # Existing light/dark toggle
  └── ThemeSelector.tsx  # New branding theme selector

docs/foundations/
  ├── colors.mdx         # Updated with EOSC palette
  └── themes.mdx         # New theme documentation

plans/
  └── eosc-branding-theme.md  # This plan
```

## Tasks

1. **[ ] Create eosc_setup.css** - Implement complete EOSC color tokens and shade ramps
2. **[ ] Update ThemeProvider** - Extend to support custom themes with data-theme attribute
3. **[ ] Create ThemeSelector component** - UI for theme switching
4. **[ ] Test theme switching** - Verify all components work with EOSC theme
5. **[ ] Update documentation** - Add theme usage guide in docs/foundations/
6. **[ ] Create Storybook stories** - Demonstrate EOSC theme components
7. **[ ] Verify accessibility** - Check contrast ratios for both light and dark EOSC

## Success Criteria

- [ ] EOSC theme applies consistently across all components
- [ ] `[data-theme="eosc"]` and `[data-theme="eosc"].dark` work correctly
- [ ] All interactive states (hover, focus, active) render properly
- [ ] Accessibility contrast ratios met (WCAG AA minimum) for both light and dark EOSC
- [ ] Theme switching is smooth and persistent (saved in localStorage)
- [ ] Documentation is clear and actionable
- [ ] Color ramps provide sufficient granularity for all use cases
