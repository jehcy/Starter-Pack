'use client';

import { BrandAsset } from '@/lib/brand-theme';
import { AssetUploader } from './AssetUploader';
import { AssetPreview } from './AssetPreview';
import { Plus } from 'lucide-react';

interface MultiAssetUploadProps {
  label: string;
  description?: string;
  assets: BrandAsset[];
  onAdd: (asset: BrandAsset) => void;
  onRemove: (id: string) => void;
  accept?: string;
  maxSize?: number;
  folder?: string;
  maxItems?: number;
}

export function MultiAssetUpload({
  label,
  description,
  assets,
  onAdd,
  onRemove,
  accept = 'image/png,image/jpeg,image/webp',
  maxSize = 10 * 1024 * 1024,
  folder = 'brand',
  maxItems,
}: MultiAssetUploadProps) {
  const canAddMore = !maxItems || assets.length < maxItems;

  return (
    <div className="space-y-2">
      <div>
        <h4 className="text-sm font-medium">{label}</h4>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {maxItems && (
          <p className="text-xs text-muted-foreground">
            {assets.length} / {maxItems} uploaded
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {assets.map((asset) => (
          <AssetPreview
            key={asset.id}
            asset={asset}
            onDelete={() => onRemove(asset.id)}
            size="sm"
          />
        ))}

        {canAddMore && (
          <AssetUploader
            onUpload={onAdd}
            accept={accept}
            maxSize={maxSize}
            folder={folder}
            placeholder={
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex items-center justify-center cursor-pointer">
                <Plus className="size-6 text-muted-foreground" />
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
