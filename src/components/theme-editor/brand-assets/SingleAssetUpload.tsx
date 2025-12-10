'use client';

import { BrandAsset } from '@/lib/brand-theme';
import { AssetUploader } from './AssetUploader';
import { AssetPreview } from './AssetPreview';
import { Upload } from 'lucide-react';

interface SingleAssetUploadProps {
  label: string;
  description?: string;
  asset: BrandAsset | null;
  onUpload: (asset: BrandAsset) => void;
  onDelete: () => void;
  accept?: string;
  maxSize?: number;
  folder?: string;
  recommendedSize?: string;
}

export function SingleAssetUpload({
  label,
  description,
  asset,
  onUpload,
  onDelete,
  accept = 'image/png,image/jpeg,image/svg+xml,image/webp',
  maxSize = 5 * 1024 * 1024,
  folder = 'brand',
  recommendedSize,
}: SingleAssetUploadProps) {
  return (
    <div className="space-y-2">
      <div>
        <h4 className="text-sm font-medium">{label}</h4>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {recommendedSize && (
          <p className="text-xs text-muted-foreground">
            Recommended: {recommendedSize}
          </p>
        )}
      </div>

      {asset ? (
        <AssetPreview asset={asset} onDelete={onDelete} size="md" showMetadata />
      ) : (
        <AssetUploader
          onUpload={onUpload}
          accept={accept}
          maxSize={maxSize}
          folder={folder}
          placeholder={
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer">
              <Upload className="size-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Upload</span>
            </div>
          }
        />
      )}
    </div>
  );
}
