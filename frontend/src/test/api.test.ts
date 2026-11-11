import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mapErrorCodeToState, extractInstagramReel, ApiClientError } from '../services/api';

describe('API Service Layer & Error Mapping', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('maps HTTP 429 and RATE_LIMITED to RATE_LIMITED state', () => {
    expect(mapErrorCodeToState('RATE_LIMITED', 429)).toBe('RATE_LIMITED');
    expect(mapErrorCodeToState('OTHER_CODE', 429)).toBe('RATE_LIMITED');
  });

  it('maps 403 and PRIVATE_OR_RESTRICTED to PRIVATE_OR_UNAVAILABLE state', () => {
    expect(mapErrorCodeToState('PRIVATE_OR_RESTRICTED', 403)).toBe('PRIVATE_OR_UNAVAILABLE');
    expect(mapErrorCodeToState('NOT_FOUND', 404)).toBe('PRIVATE_OR_UNAVAILABLE');
  });

  it('maps SERVER_1_FAILED to SERVER_1_FAILED state', () => {
    expect(mapErrorCodeToState('SERVER_1_FAILED', 502)).toBe('SERVER_1_FAILED');
  });

  it('maps SERVER_2_FAILED and SERVERS_UNAVAILABLE to SERVER_2_FAILED state', () => {
    expect(mapErrorCodeToState('SERVER_2_FAILED', 503)).toBe('SERVER_2_FAILED');
    expect(mapErrorCodeToState('SERVERS_UNAVAILABLE', 503)).toBe('SERVER_2_FAILED');
  });

  it('maps GATEWAY_TIMEOUT to NETWORK_ERROR state', () => {
    expect(mapErrorCodeToState('GATEWAY_TIMEOUT', 504)).toBe('NETWORK_ERROR');
    expect(mapErrorCodeToState('NETWORK_ERROR')).toBe('NETWORK_ERROR');
  });

  it('handles successful API extraction (API Success)', async () => {
    const mockSuccess = {
      success: true,
      video: {
        id: 'C29testReel',
        url: 'https://example.com/video.mp4',
        thumbnail: 'https://example.com/thumb.jpg',
        title: 'Test Reel Video',
        author: {
          username: 'test_creator',
        },
        availableFormats: [
          {
            id: '1080p',
            quality: '1080p Full HD',
            extension: 'mp4',
            url: 'https://example.com/1080p.mp4',
            hasAudio: true,
          },
        ],
        extractedAt: new Date().toISOString(),
        originalReelUrl: 'https://www.instagram.com/reel/C29testReel/',
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockSuccess,
    });

    const result = await extractInstagramReel('https://www.instagram.com/reel/C29testReel/');
    expect(result.success).toBe(true);
    expect(result.video.id).toBe('C29testReel');
    expect(result.video.availableFormats.length).toBe(1);
  });

  it('handles API timeout via AbortSignal (API Timeout)', async () => {
    // Simulate fetch throwing an AbortError when timeout controller aborts
    global.fetch = vi.fn().mockImplementation(() => {
      const abortErr = new DOMException('The operation was aborted due to timeout', 'AbortError');
      return Promise.reject(abortErr);
    });

    try {
      await extractInstagramReel('https://www.instagram.com/reel/C29testReel/');
      expect.fail('Should have thrown ApiClientError on timeout');
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(ApiClientError);
      const apiErr = err as ApiClientError;
      expect(apiErr.code).toBe('GATEWAY_TIMEOUT');
      expect(apiErr.stateMapping).toBe('NETWORK_ERROR');
      expect(apiErr.message).toContain('Request timed out');
    }
  });

  it('handles Server 1 failure response (Server Failure 1)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({
        success: false,
        error: {
          code: 'SERVER_1_FAILED',
          message: 'Primary extraction node (Render-1) timed out.',
        },
      }),
    });

    try {
      await extractInstagramReel('https://www.instagram.com/reel/C29testReel/');
      expect.fail('Should have thrown for Server 1 failure');
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(ApiClientError);
      const apiErr = err as ApiClientError;
      expect(apiErr.code).toBe('SERVER_1_FAILED');
      expect(apiErr.stateMapping).toBe('SERVER_1_FAILED');
    }
  });

  it('handles Server 2 failure response (Server Failure 2)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({
        success: false,
        error: {
          code: 'SERVER_2_FAILED',
          message: 'Both Render extraction servers are overloaded.',
          fallbackSuggested: true,
        },
      }),
    });

    try {
      await extractInstagramReel('https://www.instagram.com/reel/C29testReel/');
      expect.fail('Should have thrown for Server 2 failure');
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(ApiClientError);
      const apiErr = err as ApiClientError;
      expect(apiErr.code).toBe('SERVER_2_FAILED');
      expect(apiErr.stateMapping).toBe('SERVER_2_FAILED');
    }
  });

  it('handles rate limiting response (Rate Limiting)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'Instagram temporary rate limit encountered.',
          retryAfterSeconds: 60,
        },
      }),
    });

    try {
      await extractInstagramReel('https://www.instagram.com/reel/C29testReel/');
      expect.fail('Should have thrown for rate limiting');
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(ApiClientError);
      const apiErr = err as ApiClientError;
      expect(apiErr.code).toBe('RATE_LIMITED');
      expect(apiErr.stateMapping).toBe('RATE_LIMITED');
      expect(apiErr.status).toBe(429);
    }
  });

  it('handles unavailable or private reel (Unavailable Reel)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({
        success: false,
        error: {
          code: 'PRIVATE_OR_RESTRICTED',
          message: 'This Reel is from a private account or has been deleted.',
        },
      }),
    });

    try {
      await extractInstagramReel('https://www.instagram.com/reel/C29testReel/');
      expect.fail('Should have thrown for private reel');
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(ApiClientError);
      const apiErr = err as ApiClientError;
      expect(apiErr.code).toBe('PRIVATE_OR_RESTRICTED');
      expect(apiErr.stateMapping).toBe('PRIVATE_OR_UNAVAILABLE');
      expect(apiErr.status).toBe(403);
    }
  });
});
