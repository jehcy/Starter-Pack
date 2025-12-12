'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2, Sparkles, ImageIcon, X, Link as LinkIcon, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import type { ChatMessage, ChatImage, ImageMediaType } from '@/types/chat';
import type { BrandTheme } from '@/lib/brand-theme';
import type { ThemeGenerationResponse } from '@/types/chat';
import { validateAndFixContrast } from '@/lib/theme-generation';
import Image from 'next/image';
import { ColorPalette } from './ColorPalette';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/contexts/CreditsContext';
import { PromptUsageIndicator } from './PromptUsageIndicator';
import { CreditPurchaseModal } from '@/components/credits/CreditPurchaseModal';
import Link from 'next/link';

interface AiThemeChatProps {
  onApplyTheme: (theme: BrandTheme) => void;
  currentThemeName: string;
}

export function AiThemeChat({ onApplyTheme, currentThemeName }: AiThemeChatProps) {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { creditsRemaining, isUnlimited, refetch: refetchCredits } = useCredits();
  const canUsePrompt = isUnlimited || creditsRemaining > 0;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Thinking...');
  const [selectedImages, setSelectedImages] = useState<ChatImage[]>([]);
  const [lastAppliedTheme, setLastAppliedTheme] = useState<BrandTheme | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Cleanup loading timer on unmount
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  // Function to start progressive loading status updates
  const startProgressiveLoading = (hasUrl: boolean, hasImages: boolean) => {
    // Clear any existing timer
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }

    // Determine the loading sequence based on input type
    const sequence: Array<{ message: string; delay: number }> = [];

    if (hasUrl) {
      sequence.push(
        { message: 'Scraping website...', delay: 0 },
        { message: 'Extracting colors and styles...', delay: 2000 },
        { message: 'Analyzing design...', delay: 4000 },
        { message: 'Generating theme...', delay: 6000 }
      );
    } else if (hasImages) {
      sequence.push(
        { message: 'Analyzing image...', delay: 0 },
        { message: 'Extracting color palette...', delay: 2000 },
        { message: 'Generating theme...', delay: 4000 }
      );
    } else {
      sequence.push(
        { message: 'Understanding your request...', delay: 0 },
        { message: 'Generating theme...', delay: 2000 },
        { message: 'Finalizing design tokens...', delay: 4000 }
      );
    }

    // Execute the sequence
    sequence.forEach(({ message, delay }) => {
      loadingTimerRef.current = setTimeout(() => {
        setLoadingStatus(message);
      }, delay);
    });
  };

  // Process image file to ChatImage format
  const processImageFile = async (file: File): Promise<ChatImage | null> => {
    // Validate file type
    const supportedTypes: ImageMediaType[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const mediaType = file.type as ImageMediaType;

    if (!supportedTypes.includes(mediaType)) {
      toast.error('Please select a PNG, JPEG, GIF, or WebP image');
      return null;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return null;
    }

    // Convert to base64
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Extract base64 data without the data URL prefix
        const base64Data = result.split(',')[1];
        resolve({
          data: base64Data,
          mediaType,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const chatImage = await processImageFile(file);
    if (chatImage) {
      setSelectedImages([chatImage]);
      toast.success('Image added');
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const chatImage = await processImageFile(file);
          if (chatImage) {
            setSelectedImages([chatImage]);
            toast.success('Image pasted');
          }
        }
        break;
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    // Check if user can use prompt
    if (!canUsePrompt) {
      setShowPurchaseModal(true);
      return;
    }

    // Extract URL from the input text if present
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const urlMatches = input.match(urlRegex);
    const detectedUrl = urlMatches ? urlMatches[0] : null;

    // Use detected URL or manually added URL
    const finalUrl = detectedUrl || urlInput;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
      images: selectedImages.length > 0 ? selectedImages : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    const imagesToSend = selectedImages;
    const urlToSend = finalUrl;
    setSelectedImages([]);
    setUrlInput(''); // Clear URL after sending
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsLoading(true);

    // Start progressive loading status updates
    startProgressiveLoading(!!urlToSend, imagesToSend.length > 0);

    try {
      // Get recent conversation history for context (last 6 messages)
      const recentMessages = messages.slice(-6).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // InstantDB automatically sends auth cookies with the request
      // No need to manually add Authorization header
      const response = await fetch('/api/theme/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent (including InstantDB auth)
        body: JSON.stringify({
          prompt: input.trim(),
          images: imagesToSend.length > 0 ? imagesToSend : undefined,
          url: urlToSend.trim() || undefined,
          currentTheme: lastAppliedTheme || undefined,
          recentMessages: recentMessages.length > 0 ? recentMessages : undefined,
          refreshToken: user?.refresh_token, // Send refresh token for server-side auth verification
        }),
      });

      const data = (await response.json()) as ThemeGenerationResponse;

      if (!response.ok) {
        // Handle authentication error specifically
        if (response.status === 401) {
          toast.error('Session expired', {
            description: 'Please sign in again to continue',
          });
        }
        throw new Error(data.error || 'Failed to generate theme');
      }

      // Refetch credits to update the UI
      refetchCredits();

      if (data.theme) {
        // Validate and auto-fix contrast
        const { theme: fixedTheme, adjustments } = validateAndFixContrast(data.theme);

        // Build assistant message content
        let assistantContent = data.message || `Generated "${fixedTheme.name}" theme`;

        // Add contrast adjustment info if any fixes were made
        if (adjustments.length > 0) {
          const lightAdjustments = adjustments.filter(a => a.mode === 'light').length;
          const darkAdjustments = adjustments.filter(a => a.mode === 'dark').length;

          assistantContent += '\n\n';
          if (lightAdjustments > 0 && darkAdjustments > 0) {
            assistantContent += `⚠️ Auto-fixed ${lightAdjustments} color pair${lightAdjustments > 1 ? 's' : ''} in light mode and ${darkAdjustments} in dark mode for WCAG AA accessibility (4.5:1 contrast).`;
          } else if (lightAdjustments > 0) {
            assistantContent += `⚠️ Auto-fixed ${lightAdjustments} color pair${lightAdjustments > 1 ? 's' : ''} in light mode for WCAG AA accessibility (4.5:1 contrast).`;
          } else {
            assistantContent += `⚠️ Auto-fixed ${darkAdjustments} color pair${darkAdjustments > 1 ? 's' : ''} in dark mode for WCAG AA accessibility (4.5:1 contrast).`;
          }
        }

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantContent,
          timestamp: Date.now(),
          theme: fixedTheme,
          themeDetails: data.themeDetails,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Show different success messages based on whether adjustments were made
        if (adjustments.length > 0) {
          toast.success('Theme generated and auto-corrected!', {
            description: `${adjustments.length} color${adjustments.length > 1 ? 's' : ''} adjusted for accessibility`,
          });
        } else {
          toast.success('Theme generated successfully!');
        }
      } else {
        throw new Error('No theme returned from API');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I couldn't generate a theme. ${errorMessage}`,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      toast.error('Failed to generate theme', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
      // Clear any pending loading status updates
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      setLoadingStatus('Thinking...'); // Reset to default
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setLastAppliedTheme(null); // Reset theme context when clearing chat
    toast.success('Chat cleared');
  };

  const handleApplyTheme = (theme: BrandTheme) => {
    onApplyTheme(theme);
    setLastAppliedTheme(theme); // Save for context in future requests
    toast.success(`Applied "${theme.name}" theme`);
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold">AI Theme Generator</h3>
              <p className="text-xs text-muted-foreground">Authentication required</p>
            </div>
          </div>
        </div>

        {/* Login Prompt */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md px-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Sign in to use AI Theme Generator</h3>
              <p className="text-sm text-muted-foreground">
                Create an account or sign in to generate custom themes with AI.
                Describe your vision, upload inspiration images, or paste website URLs to get started.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/sign-in">
                <Button className="w-full" size="lg">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In to Continue
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="pb-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold">AI Theme Generator</h3>
              <p className="text-xs text-muted-foreground">Describe your desired theme</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearChat}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        <PromptUsageIndicator />
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 py-4">
        <div className="space-y-4 pr-4">
          {messages.length === 0 && !canUsePrompt && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4 max-w-md px-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">No Credits Remaining</h3>
                  <p className="text-sm text-muted-foreground">
                    You've used all your AI theme generation credits.
                    Purchase more credits or upgrade to Pro for unlimited theme generation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button className="w-full" size="lg" onClick={() => setShowPurchaseModal(true)}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get More Credits
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Starting from just $3 for additional credits
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.length === 0 && canUsePrompt && (
            <div className="text-center text-muted-foreground text-sm space-y-2 py-8">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
              <p>Try prompts like:</p>
              <div className="space-y-1 text-xs">
                <p className="font-mono">"Cyberpunk neon theme"</p>
                <p className="font-mono">"Professional law firm"</p>
                <p className="font-mono">"Soft pastel minimalist"</p>
                <p className="font-mono">"Warm coffee shop vibes"</p>
              </div>
              <div className="pt-3 border-t border-border/50 mt-4 space-y-2">
                <p className="text-xs text-muted-foreground">
                  <LinkIcon className="w-3 h-3 inline mr-1" />
                  Paste a URL to scrape colors from any website:
                </p>
                <p className="font-mono text-xs bg-muted/50 px-2 py-1 rounded">
                  "https://stripe.com create a theme like this"
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/50 border border-border shadow-sm'
                }`}
              >
                {message.images && message.images.length > 0 && message.role === 'user' && (
                  <div className="mb-3 space-y-2">
                    {message.images.map((img, idx) => (
                      <div key={idx} className="rounded-md overflow-hidden border border-border/50">
                        <Image
                          src={`data:${img.mediaType};base64,${img.data}`}
                          alt="Uploaded"
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === 'assistant' ? 'text-foreground' : ''
                }`}>
                  {message.content}
                </p>

                {message.theme && message.role === 'assistant' && (
                  <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Theme Details</p>
                    </div>

                    {/* Color Palette */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-primary">Color Palette</p>
                      <ColorPalette
                        lightColors={message.theme.colors.light}
                        darkColors={message.theme.colors.dark}
                        mode="compact"
                      />
                      <p className="text-xs text-muted-foreground">
                        Left: Light mode • Right: Dark mode
                      </p>
                    </div>

                    {/* Fonts & Typography */}
                    <div className="space-y-2.5 text-xs">
                      <div className="flex gap-2">
                        <span className="font-semibold text-primary min-w-[70px]">Body:</span>
                        <span className="text-muted-foreground flex-1 truncate" title={message.theme.fonts.sans}>
                          {message.theme.fonts.sans.split(',')[0]}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-primary min-w-[70px]">Headings:</span>
                        <span className="text-muted-foreground flex-1 truncate" title={message.theme.fonts.heading}>
                          {message.theme.fonts.heading.split(',')[0]}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-primary min-w-[70px]">H1 Size:</span>
                        <span className="text-muted-foreground flex-1">
                          {message.theme.typographySizes.h1}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-primary min-w-[70px]">Body Size:</span>
                        <span className="text-muted-foreground flex-1">
                          {message.theme.typographySizes.p}
                        </span>
                      </div>
                    </div>

                    {/* Other Theme Properties */}
                    <div className="space-y-2.5 text-xs pt-2 border-t border-border/30">
                      <div className="flex gap-2">
                        <span className="font-semibold text-primary min-w-[70px]">Radius:</span>
                        <span className="text-muted-foreground flex-1">
                          {message.theme.radius.lg} ({message.theme.radius.sm} - {message.theme.radius['2xl']})
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-primary min-w-[70px]">Spacing:</span>
                        <span className="text-muted-foreground flex-1">
                          {message.theme.spacing.md} base scale
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-primary min-w-[70px]">Buttons:</span>
                        <span className="text-muted-foreground flex-1">
                          {message.theme.buttons.hoverEffect} effect, {message.theme.buttons.borderRadius} radius
                        </span>
                      </div>
                    </div>

                    {/* AI Description if available */}
                    {message.themeDetails && (
                      <div className="space-y-2.5 text-xs pt-2 border-t border-border/30">
                        <p className="font-semibold text-primary">AI Analysis</p>
                        {message.themeDetails.colors && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Colors:</span> {message.themeDetails.colors}
                          </p>
                        )}
                        {(message.themeDetails as { fonts?: string }).fonts && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Fonts:</span> {(message.themeDetails as { fonts?: string }).fonts}
                          </p>
                        )}
                        {(message.themeDetails as { typography?: string }).typography && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Typography:</span> {(message.themeDetails as { typography?: string }).typography}
                          </p>
                        )}
                        {message.themeDetails.radius && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Radius:</span> {message.themeDetails.radius}
                          </p>
                        )}
                        {message.themeDetails.spacing && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Spacing:</span> {message.themeDetails.spacing}
                          </p>
                        )}
                        {message.themeDetails.buttons && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Buttons:</span> {message.themeDetails.buttons}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {message.theme && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleApplyTheme(message.theme!)}
                      className="w-full font-medium shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-2" />
                      Apply Theme
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg px-4 py-3 bg-muted">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground animate-pulse">{loadingStatus}</span>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-4 w-full rounded-md animate-shimmer"
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 50%, hsl(var(--accent)) 100%)',
                      backgroundSize: '1000px 100%',
                    }}
                  />
                  <div
                    className="h-4 w-4/5 rounded-md animate-shimmer"
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 50%, hsl(var(--accent)) 100%)',
                      backgroundSize: '1000px 100%',
                      animationDelay: '0.1s',
                    }}
                  />
                  <div
                    className="h-4 w-3/4 rounded-md animate-shimmer"
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 50%, hsl(var(--accent)) 100%)',
                      backgroundSize: '1000px 100%',
                      animationDelay: '0.2s',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="pt-4 border-t">
        {/* URL Input */}
        {urlInput && (
          <div className="mb-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-1">
              <LinkIcon className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Scraping Website</span>
              <button
                type="button"
                onClick={() => setUrlInput('')}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground truncate">{urlInput}</p>
          </div>
        )}

        {/* Image Preview */}
        {selectedImages.length > 0 && (
          <div className="mb-3 flex gap-2 flex-wrap">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative inline-block">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={`data:${img.mediaType};base64,${img.data}`}
                    alt="Selected"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={
              !canUsePrompt
                ? "No credits remaining - upgrade to continue..."
                : "Describe your theme, paste a URL, or paste an image..."
            }
            disabled={isLoading || !canUsePrompt}
            rows={2}
            className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim() || !canUsePrompt}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || !canUsePrompt}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Image
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const url = prompt('Enter website URL to scrape colors and styles from:');
                if (url) {
                  setUrlInput(url);
                  toast.success('URL added - colors will be scraped from the website');
                }
              }}
              disabled={isLoading || !canUsePrompt}
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              URL
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </form>

      <CreditPurchaseModal
        open={showPurchaseModal}
        onOpenChange={(open) => {
          setShowPurchaseModal(open);
          if (!open) {
            // Refetch credits when modal closes (in case user purchased)
            refetchCredits();
          }
        }}
      />
    </div>
  );
}
