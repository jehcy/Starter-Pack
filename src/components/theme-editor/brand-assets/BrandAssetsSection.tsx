'use client';

import { Dispatch } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BrandAssets, BrandAsset, VideoAsset } from '@/lib/brand-theme';
import { SingleAssetUpload } from './SingleAssetUpload';
import { MultiAssetUpload } from './MultiAssetUpload';
import { VideoUpload } from './VideoUpload';
import { toast } from 'sonner';

// Import the ThemeAction type from themePage.tsx
type ThemeAction =
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
  | { type: 'RESET_ASSETS' };

interface BrandAssetsSectionProps {
  assets: BrandAssets;
  dispatch: Dispatch<ThemeAction>;
}

export function BrandAssetsSection({ assets, dispatch }: BrandAssetsSectionProps) {
  const handleResetAssets = () => {
    dispatch({ type: 'RESET_ASSETS' });
    toast.info('Brand assets reset');
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">Brand Assets</h3>
          <p className="text-sm text-muted-foreground">
            Upload and manage your brand assets
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleResetAssets}>
          <RotateCcw className="size-4" />
        </Button>
      </div>

      {/* Logo Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Logo</h3>
        <div className="grid grid-cols-2 gap-4">
          <SingleAssetUpload
            label="Primary Logo"
            description="Main brand logo"
            asset={assets.logo}
            onUpload={(asset) => dispatch({ type: 'SET_LOGO', payload: asset })}
            onDelete={() => dispatch({ type: 'SET_LOGO', payload: null })}
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            maxSize={2 * 1024 * 1024}
            folder="brand/logo"
            recommendedSize="400×100"
          />

          <SingleAssetUpload
            label="Dark Mode Logo"
            description="Optional dark variant"
            asset={assets.logoDark}
            onUpload={(asset) => dispatch({ type: 'SET_LOGO_DARK', payload: asset })}
            onDelete={() => dispatch({ type: 'SET_LOGO_DARK', payload: null })}
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            maxSize={2 * 1024 * 1024}
            folder="brand/logo"
            recommendedSize="400×100"
          />
        </div>
      </div>

      <Separator />

      {/* Favicon */}
      <SingleAssetUpload
        label="Favicon"
        description="Browser tab icon"
        asset={assets.favicon}
        onUpload={(asset) => dispatch({ type: 'SET_FAVICON', payload: asset })}
        onDelete={() => dispatch({ type: 'SET_FAVICON', payload: null })}
        accept="image/png,image/x-icon,image/svg+xml"
        maxSize={500 * 1024}
        folder="brand/favicon"
        recommendedSize="512×512"
      />

      <Separator />

      {/* OG Image */}
      <SingleAssetUpload
        label="OG Image"
        description="Social sharing preview"
        asset={assets.ogImage}
        onUpload={(asset) => dispatch({ type: 'SET_OG_IMAGE', payload: asset })}
        onDelete={() => dispatch({ type: 'SET_OG_IMAGE', payload: null })}
        accept="image/png,image/jpeg,image/webp"
        maxSize={5 * 1024 * 1024}
        folder="brand/og"
        recommendedSize="1200×630"
      />

      <Separator />

      {/* Hero Images */}
      <MultiAssetUpload
        label="Hero Images"
        description="Landing page backgrounds"
        assets={assets.heroImages}
        onAdd={(asset) => dispatch({ type: 'ADD_HERO_IMAGE', payload: asset })}
        onRemove={(id) => dispatch({ type: 'REMOVE_HERO_IMAGE', payload: id })}
        accept="image/png,image/jpeg,image/webp"
        maxSize={10 * 1024 * 1024}
        folder="brand/hero"
        maxItems={10}
      />

      <Separator />

      {/* Product Images */}
      <MultiAssetUpload
        label="Product Images"
        description="Screenshots and visuals"
        assets={assets.productImages}
        onAdd={(asset) => dispatch({ type: 'ADD_PRODUCT_IMAGE', payload: asset })}
        onRemove={(id) => dispatch({ type: 'REMOVE_PRODUCT_IMAGE', payload: id })}
        accept="image/png,image/jpeg,image/webp"
        maxSize={5 * 1024 * 1024}
        folder="brand/product"
        maxItems={20}
      />

      <Separator />

      {/* Videos */}
      <VideoUpload
        videos={assets.videos}
        onAdd={(video) => dispatch({ type: 'ADD_VIDEO', payload: video })}
        onRemove={(id) => dispatch({ type: 'REMOVE_VIDEO', payload: id })}
        maxItems={5}
      />
    </div>
  );
}
