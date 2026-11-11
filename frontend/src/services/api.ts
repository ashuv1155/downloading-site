import {
  ApiResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
  ExtractionRequest,
  DownloaderState,
} from '@/types/downloader';
import { APP_CONFIG } from '@/lib/constants';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS) || APP_CONFIG.defaultTimeoutMs;

export class ApiClientError extends Error {
  public code: string;
  public status?: number;
  public stateMapping: DownloaderState;

  constructor(message: string, code: string, stateMapping: DownloaderState, status?: number) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.status = status;
    this.stateMapping = stateMapping;
  }
}

/**
 * Maps gateway error codes to frontend state machine states
 */
export function mapErrorCodeToState(code?: string, status?: number): DownloaderState {
  if (status === 429 || code === 'RATE_LIMITED') {
    return 'RATE_LIMITED';
  }
  if (code === 'INVALID_URL' || status === 400) {
    return 'INVALID_URL';
  }
  if (code === 'PRIVATE_OR_RESTRICTED' || code === 'NOT_FOUND' || status === 404 || status === 403) {
    return 'PRIVATE_OR_UNAVAILABLE';
  }
  if (code === 'SERVER_1_FAILED') {
    return 'SERVER_1_FAILED';
  }
  if (code === 'SERVER_2_FAILED' || code === 'SERVERS_UNAVAILABLE' || status === 503) {
    return 'SERVER_2_FAILED';
  }
  if (code === 'GATEWAY_TIMEOUT' || status === 504) {
    return 'NETWORK_ERROR';
  }
  if (code === 'NETWORK_ERROR') {
    return 'NETWORK_ERROR';
  }
  return 'UNKNOWN_ERROR';
}

/**
 * Centralized API service interacting with the Cloudflare API Gateway
 */
export async function extractInstagramReel(
  url: string,
  externalSignal?: AbortSignal
): Promise<ApiSuccessResponse> {
  const endpoint = `${BASE_URL}/api/v1/extract`;

  // Create internal abort controller to handle timeout
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => {
    timeoutController.abort();
  }, TIMEOUT_MS);

  // Combine external cancellation signal if provided
  const handleAbort = () => timeoutController.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timeoutId);
      throw new ApiClientError('Request aborted by user.', 'ABORTED', 'IDLE');
    }
    externalSignal.addEventListener('abort', handleAbort);
  }

  try {
    const payload: ExtractionRequest = { url };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: timeoutController.signal,
    });

    clearTimeout(timeoutId);

    let data: ApiResponse;
    try {
      data = (await response.json()) as ApiResponse;
    } catch {
      throw new ApiClientError(
        'Invalid response format received from extraction gateway.',
        'INVALID_RESPONSE',
        'UNKNOWN_ERROR',
        response.status
      );
    }

    if (!response.ok || !data.success) {
      const err = (data as ApiErrorResponse).error || {
        code: 'UNKNOWN_ERROR',
        message: 'Extraction gateway encountered an unexpected problem.',
      };
      const state = mapErrorCodeToState(err.code, response.status);
      throw new ApiClientError(err.message, err.code, state, response.status);
    }

    if (!data.video || !data.video.url) {
      throw new ApiClientError(
        'Extraction gateway responded without video details.',
        'MALFORMED_DATA',
        'UNKNOWN_ERROR',
        response.status
      );
    }

    return data as ApiSuccessResponse;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiClientError) {
      throw err;
    }

    // Check for AbortError / Timeout
    if (err instanceof DOMException && err.name === 'AbortError') {
      if (externalSignal?.aborted) {
        throw new ApiClientError('Request cancelled.', 'ABORTED', 'IDLE');
      }
      throw new ApiClientError(
        'Request timed out waiting for the gateway extraction server.',
        'GATEWAY_TIMEOUT',
        'NETWORK_ERROR'
      );
    }

    // Network / offline error
    const message = err instanceof Error ? err.message : 'Network connection failure.';
    throw new ApiClientError(
      `Unable to reach extraction gateway. Please check your network connection. (${message})`,
      'NETWORK_ERROR',
      'NETWORK_ERROR'
    );
  } finally {
    if (externalSignal) {
      externalSignal.removeEventListener('abort', handleAbort);
    }
  }
}
