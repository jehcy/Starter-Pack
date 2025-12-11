import type { BrandTheme } from '@/lib/brand-theme';

export type ImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

export interface ChatImage {
  data: string; // base64 encoded image data
  mediaType: ImageMediaType; // Supported image formats
}

export interface ThemeDetails {
  colors?: string; // Summary of color changes
  fonts?: string; // Summary of font choices
  typography?: string; // Summary of typography scale
  radius?: string; // Summary of radius changes
  spacing?: string; // Summary of spacing changes
  buttons?: string; // Summary of button changes
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  theme?: BrandTheme; // Attached theme if AI generated one
  images?: ChatImage[]; // Attached images for vision (supports paste)
  themeDetails?: ThemeDetails; // Detailed explanation of theme changes
}

export interface ThemeGenerationRequest {
  prompt: string;
  images?: ChatImage[]; // Optional images for vision-based theme generation
  url?: string; // Optional website URL to scrape colors and styles from
  currentTheme?: BrandTheme; // Current theme for modification context
  recentMessages?: Array<{ role: 'user' | 'assistant'; content: string }>; // Conversation history for context
}

export interface ThemeGenerationResponse {
  theme?: BrandTheme;
  error?: string;
  message?: string; // Conversational response from AI
  themeDetails?: ThemeDetails; // Detailed explanation of theme changes
}
