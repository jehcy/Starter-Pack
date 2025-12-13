import Link from 'next/link';
import { DocSection } from '@/components/docs/doc-section';
import { TokenTable } from '@/components/docs/token-table';
import { CodeBlock } from '@/components/docs/code-block';
import { TipBox } from '@/components/docs/tip-box';
import { Button } from '@/components/ui/button';
import { Palette, MousePointer, Download, FileJson, Eye, Sparkles, Link as LinkIcon, ImageIcon } from 'lucide-react';

export const metadata = {
  title: 'Theme Editor Documentation | SaaS Starter',
  description: 'Learn how to use the theme editor to customize your design system',
};

export default function DocsPage() {
  return (
    <div className="space-y-16 pb-24">
      {/* Hero Section */}
      <section id="overview" className="scroll-mt-24">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-semibold uppercase tracking-wider text-primary">Theme Editor</p>
            <h1 className="font-bold tracking-tight">
              Customize your design system{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] blur-2xl opacity-30" />
                <span className="relative bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] bg-clip-text text-transparent font-black">
                  without writing CSS
                </span>
              </span>
            </h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              The Theme Editor is a visual tool that lets you customize your entire design system through an intuitive interface.
              Changes are applied as CSS variables, making them instantly available throughout your application.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <QuickLinkCard
              icon={<Palette className="h-5 w-5" />}
              title="Colors"
              description="22 color tokens for light & dark modes"
              href="#colors"
            />
            <QuickLinkCard
              icon={<MousePointer className="h-5 w-5" />}
              title="Typography"
              description="Fonts, sizes, and spacing controls"
              href="#typography"
            />
            <QuickLinkCard
              icon={<Download className="h-5 w-5" />}
              title="Actions"
              description="Apply, export, and download your theme"
              href="#actions"
            />
          </div>

          <div className="mt-8 p-6 rounded-lg border border-primary/20 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-2">Key Benefits</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Real-time preview across multiple page types</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Auto-generates CSS variables in globals.css</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Creates AI-friendly documentation (brand.md)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Export/import themes as JSON for version control</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <DocSection
        id="getting-started"
        title="Getting Started"
        description="Learn how to access and use the theme editor interface"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Accessing the Theme Editor</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Navigate to <code className="px-2 py-1 rounded bg-muted text-foreground">/theme</code> in your browser
              to open the visual theme editor.
            </p>
            <Button asChild>
              <Link href="/theme">Open Theme Editor</Link>
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-foreground mb-3">Interface Overview</h3>
            <p className="text-muted-foreground text-sm mb-4">
              The theme editor uses a 3-column layout:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="font-semibold text-sm text-foreground mb-2">Left: Navigation</div>
                <p className="text-xs text-muted-foreground">
                  Icon-based tabs for Colors, Spacing, Radius, Fonts, and Buttons sections
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="font-semibold text-sm text-foreground mb-2">Center: Preview</div>
                <p className="text-xs text-muted-foreground">
                  Live preview showing your changes on simulated pages (Home, Features, Pricing, Dashboard)
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="font-semibold text-sm text-foreground mb-2">Right: Settings</div>
                <p className="text-xs text-muted-foreground">
                  Controls for the active section with sliders, color pickers, and dropdowns
                </p>
              </div>
            </div>
          </div>

          <TipBox type="tip">
            Use the Light/Dark toggle in the preview to switch between editing light mode and dark mode colors.
          </TipBox>
        </div>
      </DocSection>

      {/* Colors */}
      <DocSection
        id="colors"
        title="Colors"
        description="Customize your color palette for light and dark modes"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Color System</h3>
            <p className="text-muted-foreground text-sm mb-4">
              The theme editor provides 22 color tokens that work together to create a cohesive design system.
              Each color has separate values for light and dark modes.
            </p>
          </div>

          <TipBox type="info">
            Switch between light and dark mode in the preview panel to edit each mode separately.
            Maintaining good contrast ratios ensures your design is accessible.
          </TipBox>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Color Tokens Reference</h3>
            <TokenTable
              headers={['Token', 'Purpose', 'CSS Variable', 'Tailwind Classes']}
              rows={[
                {
                  cells: [
                    <code key="1" className="text-sm">primary</code>,
                    'Main brand color for buttons, links, and CTAs',
                    <code key="2" className="text-xs">--primary</code>,
                    <code key="3" className="text-xs">bg-primary, text-primary, border-primary</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">primaryForeground</code>,
                    'Text color on primary backgrounds',
                    <code key="2" className="text-xs">--primary-foreground</code>,
                    <code key="3" className="text-xs">text-primary-foreground</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">secondary</code>,
                    'Secondary actions and accents',
                    <code key="2" className="text-xs">--secondary</code>,
                    <code key="3" className="text-xs">bg-secondary, text-secondary</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">secondaryForeground</code>,
                    'Text on secondary backgrounds',
                    <code key="2" className="text-xs">--secondary-foreground</code>,
                    <code key="3" className="text-xs">text-secondary-foreground</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">accent</code>,
                    'Highlight color for special elements',
                    <code key="2" className="text-xs">--accent</code>,
                    <code key="3" className="text-xs">bg-accent, text-accent</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">background</code>,
                    'Main page background',
                    <code key="2" className="text-xs">--background</code>,
                    <code key="3" className="text-xs">bg-background</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">foreground</code>,
                    'Primary text color',
                    <code key="2" className="text-xs">--foreground</code>,
                    <code key="3" className="text-xs">text-foreground</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">card</code>,
                    'Card and panel backgrounds',
                    <code key="2" className="text-xs">--card</code>,
                    <code key="3" className="text-xs">bg-card</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">muted</code>,
                    'Subdued backgrounds and disabled states',
                    <code key="2" className="text-xs">--muted</code>,
                    <code key="3" className="text-xs">bg-muted, text-muted</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">mutedForeground</code>,
                    'Secondary text and descriptions',
                    <code key="2" className="text-xs">--muted-foreground</code>,
                    <code key="3" className="text-xs">text-muted-foreground</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">destructive</code>,
                    'Error states and dangerous actions',
                    <code key="2" className="text-xs">--destructive</code>,
                    <code key="3" className="text-xs">bg-destructive, text-destructive</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">border</code>,
                    'Default border color',
                    <code key="2" className="text-xs">--border</code>,
                    <code key="3" className="text-xs">border-border</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">input</code>,
                    'Input field borders',
                    <code key="2" className="text-xs">--input</code>,
                    <code key="3" className="text-xs">border-input</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">ring</code>,
                    'Focus ring color',
                    <code key="2" className="text-xs">--ring</code>,
                    <code key="3" className="text-xs">ring-ring</code>,
                  ],
                },
                {
                  cells: [
                    <code key="1" className="text-sm">chart1-5</code>,
                    'Data visualization colors',
                    <code key="2" className="text-xs">--chart-1 to --chart-5</code>,
                    <code key="3" className="text-xs">bg-chart-1, bg-chart-2, etc.</code>,
                  ],
                },
              ]}
            />
          </div>

          <TipBox type="warning">
            Always ensure sufficient contrast between foreground and background colors for accessibility.
            A minimum contrast ratio of 4.5:1 is recommended for normal text.
          </TipBox>
        </div>
      </DocSection>

      {/* Spacing */}
      <DocSection
        id="spacing"
        title="Spacing"
        description="Control the spacing scale used throughout your application"
      >
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm">
            The spacing scale defines consistent gaps, padding, and margins. The 6-value scale ensures
            visual hierarchy and rhythm throughout your design.
          </p>

          <TokenTable
            headers={['Token', 'Default', 'Range', 'Use Case']}
            rows={[
              { cells: [<code key="1" className="text-sm">xs</code>, '0.25rem', '0-6rem', 'Tight spacing between related elements'] },
              { cells: [<code key="1" className="text-sm">sm</code>, '0.5rem', '0-6rem', 'Small gaps in compact layouts'] },
              { cells: [<code key="1" className="text-sm">md</code>, '1rem', '0-6rem', 'Standard spacing for most elements'] },
              { cells: [<code key="1" className="text-sm">lg</code>, '1.5rem', '0-6rem', 'Medium section spacing'] },
              { cells: [<code key="1" className="text-sm">xl</code>, '2rem', '0-6rem', 'Large section spacing'] },
              { cells: [<code key="1" className="text-sm">2xl</code>, '3rem', '0-6rem', 'Hero sections and major dividers'] },
            ]}
          />

          <div className="p-6 rounded-lg border border-border bg-muted/30">
            <h4 className="font-semibold text-sm text-foreground mb-3">CSS Variables</h4>
            <CodeBlock
              language="css"
              code={`:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
}`}
            />
          </div>

          <TipBox type="tip">
            Use the spacing scale consistently to create visual rhythm. Avoid arbitrary spacing values.
          </TipBox>
        </div>
      </DocSection>

      {/* Radius */}
      <DocSection
        id="radius"
        title="Border Radius"
        description="Define border radius values for different UI elements"
      >
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm">
            Border radius values control the roundness of corners on buttons, cards, inputs, and other elements.
          </p>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Radius Scale</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <RadiusExample value="none" label="None (Sharp)" />
              <RadiusExample value="sm" label="Small (Subtle)" />
              <RadiusExample value="md" label="Medium (Default)" />
              <RadiusExample value="lg" label="Large (Cards)" />
              <RadiusExample value="xl" label="XL (Features)" />
              <RadiusExample value="2xl" label="2XL (Bold)" />
              <RadiusExample value="full" label="Full (Pills)" />
            </div>
          </div>

          <TokenTable
            headers={['Token', 'Use Case', 'Examples']}
            rows={[
              { cells: [<code key="1" className="text-sm">none</code>, 'Sharp corners', 'Data tables, technical UIs'] },
              { cells: [<code key="1" className="text-sm">sm</code>, 'Subtle rounding', 'Small buttons, inputs'] },
              { cells: [<code key="1" className="text-sm">md</code>, 'Standard rounding', 'Default buttons, cards'] },
              { cells: [<code key="1" className="text-sm">lg</code>, 'Card-like elements', 'Modals, large cards'] },
              { cells: [<code key="1" className="text-sm">xl</code>, 'Feature sections', 'Hero cards, callouts'] },
              { cells: [<code key="1" className="text-sm">2xl</code>, 'Bold rounding', 'Large feature cards'] },
              { cells: [<code key="1" className="text-sm">full</code>, 'Circular/pill shape', 'Badges, avatars, pill buttons'] },
            ]}
          />
        </div>
      </DocSection>

      {/* Typography */}
      <DocSection
        id="typography"
        title="Typography"
        description="Customize fonts, text sizes, and typographic styles"
      >
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Font Families</h3>
            <p className="text-muted-foreground text-sm mb-4">
              The theme editor integrates with Google Fonts and provides three font family slots:
            </p>
            <TokenTable
              headers={['Font', 'Purpose', 'Options']}
              rows={[
                { cells: [<code key="1" className="text-sm">sans</code>, 'Body text and UI', 'Inter, Roboto, Poppins, Open Sans, and 14 more'] },
                { cells: [<code key="1" className="text-sm">mono</code>, 'Code blocks', 'JetBrains Mono, Fira Code, Source Code Pro, and 6 more'] },
                { cells: [<code key="1" className="text-sm">heading</code>, 'Headlines', 'Playfair Display, Merriweather, Montserrat, and 12 more'] },
              ]}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Text Sizes</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Control the font size for different text elements:
            </p>
            <TokenTable
              headers={['Element', 'CSS Variable', 'Default Range']}
              rows={[
                { cells: [<code key="1" className="text-sm">h1</code>, <code key="2" className="text-xs">--text-h1</code>, '2-10rem'] },
                { cells: [<code key="1" className="text-sm">h2</code>, <code key="2" className="text-xs">--text-h2</code>, '1.5-4rem'] },
                { cells: [<code key="1" className="text-sm">h3</code>, <code key="2" className="text-xs">--text-h3</code>, '1.25-2rem'] },
                { cells: [<code key="1" className="text-sm">h4</code>, <code key="2" className="text-xs">--text-h4</code>, '1-1.5rem'] },
                { cells: [<code key="1" className="text-sm">p</code>, <code key="2" className="text-xs">--text-p</code>, '0.75-1.25rem'] },
                { cells: [<code key="1" className="text-sm">blockquote</code>, <code key="2" className="text-xs">--text-blockquote</code>, 'Dropdown presets'] },
                { cells: [<code key="1" className="text-sm">label</code>, <code key="2" className="text-xs">--text-label</code>, 'Dropdown presets'] },
                { cells: [<code key="1" className="text-sm">code</code>, <code key="2" className="text-xs">--text-code</code>, 'Dropdown presets'] },
              ]}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Typography Styles</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Fine-tune line heights and letter spacing:
            </p>
            <TokenTable
              headers={['Property', 'CSS Variable', 'Range']}
              rows={[
                { cells: ['Body Line Height', <code key="1" className="text-xs">--line-height</code>, '1.0-2.5'] },
                { cells: ['H1 Line Height', <code key="1" className="text-xs">--line-height-h1</code>, '0.8-1.8'] },
                { cells: ['H2 Line Height', <code key="1" className="text-xs">--line-height-h2</code>, '0.8-1.8'] },
                { cells: ['H3 Line Height', <code key="1" className="text-xs">--line-height-h3</code>, '0.8-1.8'] },
                { cells: ['Letter Spacing', <code key="1" className="text-xs">--letter-spacing</code>, '-0.05em to 0.2em'] },
              ]}
            />
          </div>

          <TipBox type="warning">
            <strong>Important:</strong> Do not override typography sizes with Tailwind classes like{' '}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">text-4xl</code> or{' '}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">leading-tight</code> on headings.
            The theme editor controls these via CSS variables. Use{' '}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">font-bold</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">text-primary</code>, and spacing classes instead.
          </TipBox>
        </div>
      </DocSection>

      {/* Buttons */}
      <DocSection
        id="buttons"
        title="Buttons"
        description="Customize button styling and hover effects"
      >
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm">
            Control button appearance including border radius, font weight, font size, and hover effects.
          </p>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Button Properties</h3>
            <TokenTable
              headers={['Property', 'CSS Variable', 'Options']}
              rows={[
                { cells: ['Border Radius', <code key="1" className="text-xs">--button-radius</code>, '0-3rem slider'] },
                { cells: ['Font Weight', <code key="1" className="text-xs">--button-font-weight</code>, '300-900 (100 steps)'] },
                { cells: ['Font Size', <code key="1" className="text-xs">--button-font-size</code>, '0.75-1.5rem + presets'] },
              ]}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Hover Effects</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Choose from 5 hover effect styles:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <HoverEffectCard effect="None" description="No hover effect" />
              <HoverEffectCard effect="Opacity" description="Fade to 80% opacity" />
              <HoverEffectCard effect="Lift" description="Raise with shadow" />
              <HoverEffectCard effect="Scale" description="Slightly enlarge (1.05x)" />
              <HoverEffectCard effect="Glow" description="Subtle glow effect" />
            </div>
          </div>

          <TipBox type="info">
            Button hover effects use CSS variables like{' '}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">--button-hover-opacity</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">--button-hover-transform</code>, and{' '}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">--button-hover-shadow</code>.
          </TipBox>
        </div>
      </DocSection>

      {/* Actions */}
      <DocSection
        id="actions"
        title="Actions"
        description="Apply your theme, export settings, and download starter projects"
      >
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <ActionCard
              icon={<Download className="h-5 w-5" />}
              title="Apply to Project"
              description="Updates globals.css with new CSS variables and regenerates brand.md documentation"
            />
            <ActionCard
              icon={<FileJson className="h-5 w-5" />}
              title="Export JSON"
              description="Download brand-theme.json with all settings for backup or version control"
            />
            <ActionCard
              icon={<FileJson className="h-5 w-5" />}
              title="Import JSON"
              description="Load a previously saved theme from a JSON file"
            />
            <ActionCard
              icon={<Eye className="h-5 w-5" />}
              title="View CSS"
              description="Preview the CSS code that will be generated before applying"
            />
            <ActionCard
              icon={<Download className="h-5 w-5" />}
              title="Download Starter"
              description="Generate a ZIP file with a starter project using your current theme"
            />
          </div>

          <TipBox type="warning">
            After clicking "Apply to Project", you must refresh your browser to see the changes take effect.
          </TipBox>
        </div>
      </DocSection>

      {/* AI Theme Generator */}
      <DocSection
        id="ai-theme"
        title="AI Theme Generator"
        description="Generate custom themes using AI-powered natural language prompts"
      >
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground text-sm mb-4">
              The AI Theme Generator uses advanced language models to create complete design systems from simple descriptions.
              Describe your vision in plain English, paste a website URL, or upload an inspiration image to get started.
            </p>
            <TipBox type="info">
              Sign in to your account to use the AI Theme Generator. Each prompt generates a complete theme with colors, fonts, spacing, and more.
            </TipBox>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Three Ways to Generate Themes</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <ActionCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Text Prompts"
                description="Describe your theme in plain English like 'Cyberpunk neon theme' or 'Professional law firm'"
              />
              <ActionCard
                icon={<LinkIcon className="h-5 w-5" />}
                title="Website URL"
                description="Paste any website URL to extract colors and styles from that site"
              />
              <ActionCard
                icon={<ImageIcon className="h-5 w-5" />}
                title="Image Upload"
                description="Upload or paste images to extract color palettes and design inspiration"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Using Text Prompts</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Simply describe your desired theme in natural language. The AI understands context and can generate themes based on:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Style & Mood:</strong> &quot;Cyberpunk neon theme&quot;, &quot;Soft pastel minimalist&quot;, &quot;Warm coffee shop vibes&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Industry:</strong> &quot;Professional law firm&quot;, &quot;Modern tech startup&quot;, &quot;Creative agency&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Colors:</strong> &quot;Navy blue and gold luxury theme&quot;, &quot;Forest green nature theme&quot;</span>
              </li>
            </ul>
            <CodeBlock
              language="bash"
              code={`Example prompts:
"Cyberpunk neon theme with pink and cyan accents"
"Professional law firm with navy blue and gold"
"Soft pastel minimalist with rounded corners"
"Warm coffee shop vibes with brown tones"`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Website URL Scraping</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Paste any website URL to extract its colors and design styles. The AI analyzes the site and generates a matching theme.
            </p>
            <CodeBlock
              language="bash"
              code={`Example:
"https://stripe.com create a theme like this"
"https://apple.com make it similar to this website"`}
            />
            <p className="text-muted-foreground text-xs mt-3">
              The AI shows progressive loading status: &quot;Scraping website...&quot; → &quot;Extracting colors and styles...&quot; → &quot;Analyzing design...&quot; → &quot;Generating theme...&quot;
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Image Upload</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Upload inspiration images or paste them directly from your clipboard. The AI analyzes the image to extract color palettes and design inspiration.
            </p>
            <TokenTable
              headers={['Feature', 'Details']}
              rows={[
                { cells: ['Supported formats', 'PNG, JPEG, GIF, WebP'] },
                { cells: ['Max file size', '5MB'] },
                { cells: ['Upload methods', 'File picker button or paste from clipboard (Ctrl/Cmd+V)'] },
              ]}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Generated Theme Preview</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Each AI-generated theme includes:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Complete color palette for both light and dark modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Font selections for body text and headings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Typography sizes (H1, H2, H3, body text)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Border radius, spacing scale, and button styles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>&quot;Apply Theme&quot; button to instantly apply the generated theme</span>
              </li>
            </ul>
          </div>

          <TipBox type="tip">
            You can refine themes with follow-up prompts. The AI remembers your conversation context, so try requests like &quot;make it more vibrant&quot; or &quot;use a different font for headings&quot;.
          </TipBox>
        </div>
      </DocSection>

      {/* Downloadable Files */}
      <DocSection
        id="downloads"
        title="Downloadable Files"
        description="Export your theme in multiple formats for different platforms and use cases"
      >
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground text-sm mb-4">
              The Theme Editor provides 9 different export formats to integrate your theme into various projects and platforms.
              All downloads require authentication.
            </p>
            <TipBox type="info">
              The Starter Pack is recommended for new projects as it includes everything configured and ready to use.
            </TipBox>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Available Export Formats</h3>
            <TokenTable
              headers={['Export', 'Format', 'Description', 'Best For']}
              rows={[
                {
                  cells: [
                    'Starter Pack',
                    <code key="1" className="text-xs">ZIP</code>,
                    'Complete Next.js project with theme',
                    'Starting new projects',
                  ],
                },
                {
                  cells: [
                    'Tailwind Config',
                    <code key="1" className="text-xs">ZIP</code>,
                    'tailwind.config.js + directives',
                    'Existing Tailwind projects',
                  ],
                },
                {
                  cells: [
                    'tokens.json',
                    <code key="1" className="text-xs">JSON</code>,
                    'Design tokens (standard spec)',
                    'Design tools, frameworks',
                  ],
                },
                {
                  cells: [
                    'theme.ts',
                    <code key="1" className="text-xs">TypeScript</code>,
                    'shadcn/ui theme configuration',
                    'Programmatic access',
                  ],
                },
                {
                  cells: [
                    'globals.css',
                    <code key="1" className="text-xs">CSS</code>,
                    'CSS variables only',
                    'Any CSS project',
                  ],
                },
                {
                  cells: [
                    'brand-skill.md',
                    <code key="1" className="text-xs">Markdown</code>,
                    'AI-friendly brand guidelines',
                    'Claude/AI assistants',
                  ],
                },
                {
                  cells: [
                    'Vue.js Theme',
                    <code key="1" className="text-xs">CSS</code>,
                    'CSS vars with --vibecn- prefix',
                    'Vue.js projects',
                  ],
                },
                {
                  cells: [
                    'Java Constants',
                    <code key="1" className="text-xs">.java</code>,
                    'ThemeConstants.java class',
                    'Java/Spring projects',
                  ],
                },
                {
                  cells: [
                    'Java Properties',
                    <code key="1" className="text-xs">.properties</code>,
                    'Spring Boot properties file',
                    'Spring Boot projects',
                  ],
                },
              ]}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">1. Starter Pack (ZIP)</h3>
            <p className="text-muted-foreground text-sm mb-4">
              A complete Next.js project with your theme pre-configured. Includes all necessary files, dependencies, and folder structure.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground ml-6">
              <p className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Full Next.js 16 setup with App Router</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Theme applied to globals.css</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>shadcn/ui components configured</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Ready to run with npm install && npm run dev</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">2. Tailwind Config (ZIP)</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Tailwind CSS v3 configuration file and directives for existing projects.
            </p>
            <CodeBlock
              language="tsx"
              filename="tailwind.config.js"
              code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        // ... more color tokens
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">3. tokens.json</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Design tokens in the standard JSON format, compatible with design tools and token pipelines.
            </p>
            <CodeBlock
              language="json"
              filename="tokens.json"
              code={`{
  "$schema": "https://design-tokens.json-schema.org/",
  "name": "VibeCN Theme",
  "colors": {
    "light": {
      "background": { "value": "0 0% 100%", "type": "color" },
      "foreground": { "value": "222.2 84% 4.9%", "type": "color" },
      "primary": { "value": "221.2 83.2% 53.3%", "type": "color" }
    }
  },
  "spacing": {
    "xs": { "value": "0.5rem", "type": "dimension" },
    "sm": { "value": "0.75rem", "type": "dimension" }
  }
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">4. theme.ts</h3>
            <p className="text-muted-foreground text-sm mb-4">
              TypeScript file exporting your theme as a typed JavaScript object for programmatic access.
            </p>
            <CodeBlock
              language="typescript"
              filename="theme.ts"
              code={`export const theme = {
  name: 'VibeCN Theme',
  colors: {
    light: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      primary: '221.2 83.2% 53.3%',
      // ... more colors
    },
    dark: { /* dark mode colors */ }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    // ... more spacing
  }
} as const;`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">5. globals.css</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Standalone CSS file with all theme variables. Copy directly into your project&apos;s CSS.
            </p>
            <CodeBlock
              language="css"
              filename="globals.css"
              code={`:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">6. brand-skill.md</h3>
            <p className="text-muted-foreground text-sm mb-4">
              AI-friendly brand guidelines for Claude and other AI assistants. Helps AI understand your design system when building features.
            </p>
            <CodeBlock
              language="bash"
              code={`Usage:
1. Download brand-skill.md
2. Add to your project as a skill or in docs/
3. Reference in AI conversations for consistent styling`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">7. Vue.js Theme</h3>
            <p className="text-muted-foreground text-sm mb-4">
              CSS variables prefixed with <code className="px-1 py-0.5 rounded bg-muted text-xs">--vibecn-</code> for Vue.js projects to avoid conflicts.
            </p>
            <CodeBlock
              language="css"
              filename="theme-vars.css"
              code={`:root {
  --vibecn-background: 0 0% 100%;
  --vibecn-foreground: 222.2 84% 4.9%;
  --vibecn-primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}

.dark {
  --vibecn-background: 222.2 84% 4.9%;
  /* ... dark mode overrides */
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">8. Java Constants</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Java class with theme constants for Java/Spring projects.
            </p>
            <CodeBlock
              language="typescript"
              filename="ThemeConstants.java"
              code={`public final class ThemeConstants {
    private ThemeConstants() {
        // Prevent instantiation
    }

    // Colors - Light Mode
    public static final String BACKGROUND = "0 0% 100%";
    public static final String FOREGROUND = "222.2 84% 4.9%";
    public static final String PRIMARY = "221.2 83.2% 53.3%";

    // Spacing
    public static final String SPACING_XS = "0.5rem";
    public static final String SPACING_SM = "0.75rem";
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">9. Java Properties</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Spring Boot compatible properties file for configuration-based theme access.
            </p>
            <CodeBlock
              language="bash"
              filename="theme.properties"
              code={`# Colors - Light Mode
theme.colors.light.background=0 0% 100%
theme.colors.light.foreground=222.2 84% 4.9%
theme.colors.light.primary=221.2 83.2% 53.3%

# Spacing
theme.spacing.xs=0.5rem
theme.spacing.sm=0.75rem

# Usage in Spring Boot:
# @Value("\${theme.colors.light.primary}")
# private String primaryColor;`}
            />
          </div>

          <TipBox type="tip">
            All export formats are generated from your current theme. Make sure to apply your theme changes before downloading.
          </TipBox>
        </div>
      </DocSection>

      {/* brand.md Integration */}
      <DocSection
        id="brand-md"
        title="brand.md Integration"
        description="Understand how the theme editor generates AI-friendly documentation"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">What is brand.md?</h3>
            <p className="text-muted-foreground text-sm">
              <code className="px-1 py-0.5 rounded bg-muted">docs/brand.md</code> is an auto-generated file that documents
              your entire design system in a human-readable and AI-parseable format.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">What it contains</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Complete color palette tables (light and dark modes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Typography settings (fonts, sizes, line heights)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Spacing scale and border radius values</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Button styles and hover effects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Raw theme JSON for programmatic access</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">How it updates</h3>
            <p className="text-muted-foreground text-sm mb-4">
              When you click "Apply to Project" in the theme editor:
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground pl-5 list-decimal">
              <li>The <code className="px-1 py-0.5 rounded bg-muted">:root</code> and <code className="px-1 py-0.5 rounded bg-muted">.dark</code> blocks in <code className="px-1 py-0.5 rounded bg-muted">src/app/globals.css</code> are replaced</li>
              <li>The <code className="px-1 py-0.5 rounded bg-muted">docs/brand.md</code> file is regenerated with current values</li>
              <li>Both files are updated atomically in a single operation</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">AI Integration</h3>
            <p className="text-muted-foreground text-sm mb-4">
              AI code assistants (like Claude, Cursor, GitHub Copilot) can read brand.md to understand your design system
              and generate code that follows your brand guidelines.
            </p>
            <CodeBlock
              language="bash"
              code={`# Example: Ask your AI assistant
"Create a new feature card component using the design system from brand.md"

# The AI will use your custom colors, spacing, and typography`}
            />
          </div>

          <TipBox type="tip">
            Include brand.md in your version control to track design system changes over time.
          </TipBox>

          <div className="p-6 rounded-lg border border-border bg-muted/30">
            <h4 className="font-semibold text-sm text-foreground mb-3">File Locations</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <code className="text-primary">docs/brand.md</code>
                <p className="text-xs text-muted-foreground mt-1">Auto-generated design system documentation</p>
              </div>
              <div className="mt-3">
                <code className="text-primary">src/app/globals.css</code>
                <p className="text-xs text-muted-foreground mt-1">CSS variables updated by theme editor</p>
              </div>
              <div className="mt-3">
                <code className="text-primary">.cursor/commands/brand.md</code>
                <p className="text-xs text-muted-foreground mt-1">Developer guidelines for using the design system</p>
              </div>
            </div>
          </div>
        </div>
      </DocSection>
    </div>
  );
}

// Helper Components

function QuickLinkCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex gap-3 p-4 rounded-lg border border-border bg-card transition-colors hover:border-primary/50 hover:bg-card/80"
    >
      <div className="flex-shrink-0 text-primary">{icon}</div>
      <div>
        <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
          {title}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      </div>
    </Link>
  );
}

function RadiusExample({ value, label }: { value: string; label: string }) {
  const radiusMap: Record<string, string> = {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  };

  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div
        className="w-full h-16 bg-primary/20 border-2 border-primary/40 mb-2"
        style={{ borderRadius: radiusMap[value] }}
      />
      <div className="text-xs font-semibold text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{radiusMap[value]}</div>
    </div>
  );
}

function HoverEffectCard({ effect, description }: { effect: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="font-semibold text-sm text-foreground mb-1">{effect}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-primary">{icon}</div>
        <div className="font-semibold text-sm text-foreground">{title}</div>
      </div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  );
}
