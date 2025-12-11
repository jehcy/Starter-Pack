import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import type { ThemeGenerationRequest, ThemeGenerationResponse, ImageMediaType } from '@/types/chat';
import {
  THEME_GENERATION_SYSTEM_PROMPT,
  extractThemeJson,
  validateTheme,
  mergeWithDefaults,
  extractThemeDetails,
} from '@/lib/theme-generation';
import { scrapeWebsiteDesign, formatScrapedDesignForPrompt } from '@/lib/website-scraper';
import { getUserSubscriptionStatus, getPromptUsage, recordPromptUsage } from '@/lib/prompt-limits';

export async function POST(request: Request) {
  try {
    // 1. Check authentication - InstantDB stores auth token in cookies
    const appId = process.env.NEXT_PUBLIC_INSTANTDB_APP_ID;

    if (!appId) {
      return NextResponse.json(
        { error: 'InstantDB app ID not configured' },
        { status: 500 }
      );
    }

    // Check for authentication via cookies
    const cookies = request.headers.get('cookie') || '';

    // InstantDB auth cookies - be specific to avoid false positives
    // Look for actual auth-related cookies, not just any cookie with "instant" in it
    const cookieNames = cookies.split(';').map(c => c.trim().split('=')[0]);
    const hasInstantDBAuth = cookieNames.some(name =>
      name.startsWith('__idb_') || // InstantDB session cookies
      name === 'instant_user_id' || // User ID cookie
      name === 'instant_user_email' || // User email cookie
      name.startsWith('instantdb-') // Alternative cookie pattern
    );

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Theme Gen] Auth check:', hasInstantDBAuth ? 'PASSED' : 'FAILED');
      console.log('[Theme Gen] Available cookies:', cookieNames.join(', '));
      if (!hasInstantDBAuth) {
        console.log('[Theme Gen] Expected cookies: __idb_*, instant_user_id, instant_user_email, or instantdb-*');
      }
    }

    if (!hasInstantDBAuth) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to use the AI theme generator.' },
        { status: 401 }
      );
    }

    // 2. Parse request body (do this before getUserSubscriptionStatus to avoid double-parsing)
    const body = (await request.json()) as ThemeGenerationRequest;

    // 3. Check prompt limits for free users
    const { userId, isPaid } = await getUserSubscriptionStatus(body.userId);

    if (!isPaid) {
      const usage = await getPromptUsage(userId);
      const promptsUsed = usage?.promptCount ?? 0;

      if (promptsUsed >= 3) {
        return NextResponse.json(
          {
            error: 'Free prompt limit reached',
            message: 'You have used all 3 free prompts this month. Upgrade to Pro for unlimited AI theme generation.',
            upgradeUrl: '/pricing',
            promptsUsed: 3,
            promptsLimit: 3,
          },
          { status: 403 }
        );
      }
    }

    // 4. Validate API key exists
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured. Please add ANTHROPIC_API_KEY to .env.local' },
        { status: 500 }
      );
    }
    const { prompt, images, url, currentTheme, recentMessages } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required and must be a non-empty string' }, { status: 400 });
    }

    // 6. Handle URL scraping if provided
    let enhancedPrompt = prompt;
    if (url && typeof url === 'string' && url.trim().length > 0) {
      try {
        const scrapedDesign = await scrapeWebsiteDesign(url.trim());
        const scrapedInfo = formatScrapedDesignForPrompt(scrapedDesign);
        enhancedPrompt = `${scrapedInfo}\n\nUser Request: ${prompt}`;
      } catch (error) {
        console.error('URL scraping error:', error);
        return NextResponse.json(
          {
            error: 'Failed to scrape website',
            message: error instanceof Error ? error.message : 'Unknown error occurred while scraping',
          },
          { status: 400 }
        );
      }
    }

    // 8. Call Claude API
    const client = new Anthropic({ apiKey });

    // Build message content - support both text-only and image+text
    type MessageContent =
      | string
      | Array<
          | { type: 'text'; text: string }
          | { type: 'image'; source: { type: 'base64'; media_type: ImageMediaType; data: string } }
        >;

    let currentMessageContent: MessageContent;

    if (images && images.length > 0) {
      // Build array with images and text
      currentMessageContent = [
        ...images.map((img) => ({
          type: 'image' as const,
          source: {
            type: 'base64' as const,
            media_type: img.mediaType as ImageMediaType,
            data: img.data,
          },
        })),
        {
          type: 'text' as const,
          text: enhancedPrompt, // Use enhanced prompt with scraped data
        },
      ];
    } else {
      currentMessageContent = enhancedPrompt; // Use enhanced prompt with scraped data
    }

    // Build messages array with conversation history
    const messages: Array<{ role: 'user' | 'assistant'; content: string | MessageContent }> = [];

    // Add conversation history if available
    if (recentMessages && recentMessages.length > 0) {
      recentMessages.forEach((msg) => {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: currentMessageContent,
    });

    // Build system prompt with current theme context if available
    let systemPrompt = THEME_GENERATION_SYSTEM_PROMPT;
    if (currentTheme) {
      systemPrompt += `\n\n## Current Theme Context\n\nThe user has previously applied a theme called "${currentTheme.name}". When they ask to modify specific aspects (like "make it more rounded" or "adjust the colors"), you should:\n\n1. Start with the current theme as a base\n2. Only modify the requested properties\n3. Keep all other properties the same\n4. Mention in your response what you changed from the previous theme\n\nCurrent theme configuration:\n${JSON.stringify(currentTheme, null, 2)}`;
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    });

    // 10. Extract text content from response
    const content = response.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response type from API' }, { status: 500 });
    }

    // 12. Extract and validate theme JSON
    const themeData = extractThemeJson(content.text);

    if (!themeData) {
      return NextResponse.json(
        {
          error: 'Failed to extract theme from AI response',
          message: content.text,
        },
        { status: 500 }
      );
    }

    // 14. Validate theme structure
    if (!validateTheme(themeData)) {
      return NextResponse.json(
        {
          error: 'Generated theme has invalid structure',
          message: content.text,
        },
        { status: 500 }
      );
    }

    // 16. Merge with defaults to ensure all properties exist
    const completeTheme = mergeWithDefaults(themeData);

    // 17. Extract theme details from the response text
    const themeDetails = extractThemeDetails(content.text);

    // 18. Record prompt usage for free users
    if (!isPaid) {
      await recordPromptUsage(userId);
    }

    // 19. Return success response
    const result: ThemeGenerationResponse = {
      theme: completeTheme,
      message: `Generated "${completeTheme.name}" theme`,
      themeDetails: themeDetails || undefined,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Theme generation error:', error);

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in a moment.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the theme' },
      { status: 500 }
    );
  }
}
