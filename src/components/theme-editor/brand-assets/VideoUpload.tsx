'use client';

import { useState } from 'react';
import { Plus, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoAsset } from '@/lib/brand-theme';
import { AssetUploader } from './AssetUploader';
import { toast } from 'sonner';

interface VideoUploadProps {
  videos: VideoAsset[];
  onAdd: (video: VideoAsset) => void;
  onRemove: (id: string) => void;
  maxItems?: number;
}

export function VideoUpload({
  videos,
  onAdd,
  onRemove,
  maxItems = 5,
}: VideoUploadProps) {
  const [embedUrl, setEmbedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const canAddMore = videos.length < maxItems;

  const extractVideoId = (url: string): { platform: string; id: string } | null => {
    // YouTube patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return { platform: 'youtube', id: youtubeMatch[1] };
    }

    // Vimeo patterns
    const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return { platform: 'vimeo', id: vimeoMatch[1] };
    }

    return null;
  };

  const getThumbnailUrl = (platform: string, id: string): string => {
    if (platform === 'youtube') {
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    } else if (platform === 'vimeo') {
      return `https://vimeo.com/api/v2/video/${id}.json`;
    }
    return '';
  };

  const handleAddEmbed = async () => {
    if (!embedUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }

    const videoInfo = extractVideoId(embedUrl);
    if (!videoInfo) {
      toast.error('Invalid video URL', {
        description: 'Please enter a valid YouTube or Vimeo URL',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const thumbnailUrl = getThumbnailUrl(videoInfo.platform, videoInfo.id);

      const video: VideoAsset = {
        id: `${videoInfo.platform}-${videoInfo.id}`,
        url: thumbnailUrl,
        publicId: `${videoInfo.platform}-${videoInfo.id}`,
        format: videoInfo.platform,
        uploadedAt: Date.now(),
        type: 'embed',
        embedUrl: embedUrl.trim(),
      };

      onAdd(video);
      setEmbedUrl('');
      toast.success('Video added successfully');
    } catch {
      toast.error('Failed to add video');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <h4 className="text-sm font-medium">Videos</h4>
        <p className="text-xs text-muted-foreground">
          Upload videos or embed from YouTube/Vimeo
        </p>
        <p className="text-xs text-muted-foreground">
          {videos.length} / {maxItems} added
        </p>
      </div>

      {/* Video grid */}
      {videos.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {videos.map((video) => (
            <div key={video.id} className="relative group">
              <div className="aspect-video rounded-lg border border-border bg-muted overflow-hidden relative">
                {video.type === 'embed' ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Video className="size-8 text-muted-foreground" />
                  </div>
                ) : (
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemove(video.id)}
                    className="size-8"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {video.type === 'embed' ? 'Embed' : 'Upload'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add video section */}
      {canAddMore && (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="embed">Embed URL</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-2">
            <AssetUploader
              onUpload={(asset) => {
                const video: VideoAsset = {
                  ...asset,
                  type: 'upload',
                };
                onAdd(video);
              }}
              accept="video/mp4,video/webm,video/mov"
              maxSize={100 * 1024 * 1024} // 100MB
              folder="brand/videos"
              placeholder={
                <div className="w-full aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <Plus className="size-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Upload Video
                  </span>
                  <span className="text-xs text-muted-foreground">
                    MP4, WebM, MOV (max 100MB)
                  </span>
                </div>
              }
            />
          </TabsContent>

          <TabsContent value="embed" className="space-y-2">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddEmbed();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddEmbed}
                disabled={isProcessing || !embedUrl.trim()}
                className="w-full"
              >
                {isProcessing ? 'Adding...' : 'Add Video'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
