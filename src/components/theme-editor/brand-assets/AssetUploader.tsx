'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandAsset } from '@/lib/brand-theme';
import { toast } from 'sonner';

interface AssetUploaderProps {
  onUpload: (asset: BrandAsset) => void;
  accept?: string;
  maxSize?: number; // in bytes
  folder?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: React.ReactNode;
}

export function AssetUploader({
  onUpload,
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  folder = 'brand',
  disabled = false,
  className = '',
  placeholder,
}: AssetUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (result: any) => {
    setIsUploading(false);

    if (result.event === 'success') {
      const asset: BrandAsset = {
        id: result.info.public_id,
        url: result.info.secure_url,
        publicId: result.info.public_id,
        format: result.info.format,
        width: result.info.width,
        height: result.info.height,
        uploadedAt: Date.now(),
      };

      onUpload(asset);
      toast.success('Asset uploaded successfully');
    }
  };

  const handleUploadError = () => {
    setIsUploading(false);
    toast.error('Upload failed', {
      description: 'Please try again',
    });
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
      onUpload={() => setIsUploading(true)}
      options={{
        folder,
        maxFileSize: maxSize,
        clientAllowedFormats: accept.split(',').map(f => f.split('/')[1]?.trim()),
        sources: ['local', 'url'],
      }}
    >
      {({ open }) => (
        <div className={className}>
          {placeholder ? (
            <div
              onClick={() => !disabled && open()}
              className="cursor-pointer"
            >
              {placeholder}
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => open()}
              disabled={disabled || isUploading}
              className="w-full"
            >
              <Upload className="size-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}
