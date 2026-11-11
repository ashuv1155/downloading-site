/**
 * SaveAMedia Instagram Reel Downloader Types
 */

export type DownloaderState =
  | 'IDLE'
  | 'VALIDATING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'SERVER_1_FAILED'
  | 'SERVER_2_FAILED'
  | 'RATE_LIMITED'
  | 'PRIVATE_OR_UNAVAILABLE'
  | 'INVALID_URL'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export type DeviceClass = 'desktop' | 'ios' | 'android' | 'unknown';

export interface VideoFormat {
  id: string;
  quality: string; // e.g., '1080p Full HD', '720p HD', 'Audio Only (MP3)'
  resolution?: string; // e.g., '1080x1920'
  extension: 'mp4' | 'mp3' | 'webm';
  url: string;
  formattedSize?: string;
  bitrate?: string;
  hasAudio: boolean;
}

export interface ExtractedVideo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  author: {
    username: string;
    fullName?: string;
    avatarUrl?: string;
    isVerified?: boolean;
  };
  durationSeconds?: number;
  likesCount?: number;
  availableFormats: VideoFormat[];
  extractedAt: string;
  originalReelUrl: string;
}

export interface ApiSuccessResponse {
  success: true;
  video: ExtractedVideo;
}

export type ApiErrorCode =
  | 'INVALID_URL'
  | 'PRIVATE_OR_RESTRICTED'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'GATEWAY_TIMEOUT'
  | 'SERVER_1_FAILED'
  | 'SERVER_2_FAILED'
  | 'SERVERS_UNAVAILABLE'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface ApiErrorResponse {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    fallbackSuggested?: boolean;
    retryAfterSeconds?: number;
  };
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export interface ExtractionRequest {
  url: string;
}

export interface AnalyticsEvent {
  eventName:
    | 'page_view'
    | 'url_submission'
    | 'validation_failure'
    | 'extraction_success'
    | 'extraction_failure'
    | 'fallback_option_selection'
    | 'download_button_click'
    | 'theme_change';
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp: number;
}
