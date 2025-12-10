'use client';

import { X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandAsset } from '@/lib/brand-theme';
import { CldImage } from 'next-cloudinary';

interface AssetPreviewProps {
  asset: BrandAsset;
  onDelete: () => void;
  size?: 'sm' | 'md' | 'lg';
  showMetadata?: boolean;
}

export function AssetPreview({
  asset,
  onDelete,
  size = 'md',
  showMetadata = false,
}: AssetPreviewProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'].includes(
    asset.format.toLowerCase()
  );

  return (
    <div className="relative group">
      <div
        className={`${sizeClasses[size]} rounded-lg border border-border bg-muted overflow-hidden relative`}
      >
        {isImage ? (
          <CldImage
            src={asset.publicId}
            alt={asset.alt || 'Uploaded asset'}
            width={size === 'sm' ? 64 : size === 'md' ? 96 : 128}
            height={size === 'sm' ? 64 : size === 'md' ? 96 : 128}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <FileText className="size-8 text-muted-foreground" />
          </div>
        )}

        {/* Delete button overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
            className="size-8"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {showMetadata && (
        <div className="mt-2 text-xs text-muted-foreground space-y-0.5">
          {asset.width && asset.height && (
            <div>
              {asset.width} × {asset.height}
            </div>
          )}
          <div className="uppercase">{asset.format}</div>
        </div>
      )}
    </div>
  );
}
