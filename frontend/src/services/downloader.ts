import { extractInstagramReel, ApiClientError } from './api';
import { ExtractedVideo, DownloaderState } from '@/types/downloader';
import { trackEvent } from '@/lib/analytics';

export interface ExtractionResult {
  video?: ExtractedVideo;
  error?: string;
  state: DownloaderState;
  statusCode?: number;
}

/**
 * High-level downloader service
 */
export async function processReelExtraction(
  url: string,
  signal?: AbortSignal
): Promise<ExtractionResult> {
  trackEvent('url_submission', { url: url.slice(0, 100) });

  try {
    const response = await extractInstagramReel(url, signal);
    trackEvent('extraction_success', {
      reelId: response.video.id,
      formatCount: response.video.availableFormats.length,
    });

    return {
      video: response.video,
      state: 'SUCCESS',
    };
  } catch (error: unknown) {
    if (error instanceof ApiClientError) {
      if (error.code === 'ABORTED') {
        return {
          state: 'IDLE',
          error: 'Extraction cancelled.',
        };
      }

      trackEvent('extraction_failure', {
        code: error.code,
        status: error.status,
      });

      return {
        state: error.stateMapping,
        error: error.message,
        statusCode: error.status,
      };
    }

    const fallbackMsg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    trackEvent('extraction_failure', {
      code: 'UNEXPECTED',
      error: fallbackMsg,
    });

    return {
      state: 'UNKNOWN_ERROR',
      error: fallbackMsg,
    };
  }
}
