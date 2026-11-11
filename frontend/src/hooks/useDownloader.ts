'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  DownloaderState,
  ExtractedVideo,
  VideoFormat,
} from '@/types/downloader';
import { parseAndCleanInstagramUrl } from '@/lib/validation';
import { processReelExtraction } from '@/services/downloader';
import { PROCESSING_MESSAGES } from '@/lib/constants';
import { triggerFileDownload } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function useDownloader() {
  const [state, setState] = useState<DownloaderState>('IDLE');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [inputValidationError, setInputValidationError] = useState<string | null>(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState<number>(0);
  const [video, setVideo] = useState<ExtractedVideo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccessNotice, setDownloadSuccessNotice] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Rotate processing messages smoothly during PROCESSING state
  useEffect(() => {
    if (state === 'PROCESSING') {
      setActiveMessageIndex(0);
      rotationTimerRef.current = setInterval(() => {
        setActiveMessageIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
      }, 1400);
    } else {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current);
        rotationTimerRef.current = null;
      }
    }

    return () => {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current);
      }
    };
  }, [state]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Reset all state to IDLE
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setState('IDLE');
    setVideo(null);
    setSelectedFormat(null);
    setErrorMessage(null);
    setInputValidationError(null);
    setIsDownloading(false);
    setDownloadSuccessNotice(null);
  }, []);

  // Cancel in-flight request
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setState('IDLE');
  }, []);

  // Main submission handler
  const handleDownload = useCallback(
    async (overrideUrl?: string) => {
      const targetUrl = (overrideUrl !== undefined ? overrideUrl : inputUrl).trim();

      // Step 1: Client-Side Validation
      setInputValidationError(null);
      setErrorMessage(null);

      if (!targetUrl) {
        setInputValidationError('Please paste an Instagram Reel link to continue.');
        setState('INVALID_URL');
        trackEvent('validation_failure', { reason: 'empty_input' });
        return;
      }

      setState('VALIDATING');

      const validation = parseAndCleanInstagramUrl(targetUrl);
      if (!validation.isValid || !validation.cleanedUrl) {
        const err = validation.errorMessage || 'Please provide a valid Instagram Reel URL.';
        setInputValidationError(err);
        setErrorMessage(err);
        setState('INVALID_URL');
        trackEvent('validation_failure', { reason: 'malformed_url', url: targetUrl.slice(0, 50) });
        return;
      }

      // Step 2: Transition to PROCESSING
      setState('PROCESSING');

      // Abort previous in-flight request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const result = await processReelExtraction(validation.cleanedUrl, abortControllerRef.current.signal);

        if (result.state === 'SUCCESS' && result.video) {
          setVideo(result.video);
          setSelectedFormat(result.video.availableFormats[0] || null);
          setState('SUCCESS');
        } else if (result.state === 'IDLE') {
          // User aborted
          setState('IDLE');
        } else {
          // One of the error states
          setErrorMessage(result.error || 'Unable to download this Reel.');
          setState(result.state);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setErrorMessage(msg);
        setState('UNKNOWN_ERROR');
      } finally {
        abortControllerRef.current = null;
      }
    },
    [inputUrl]
  );

  // Trigger media download
  const downloadSelectedFormat = useCallback(
    async (format?: VideoFormat) => {
      const activeFmt = format || selectedFormat || video?.availableFormats[0];
      if (!activeFmt || !video) return;

      setIsDownloading(true);
      setDownloadSuccessNotice(null);

      const ext = activeFmt.extension || 'mp4';
      const cleanAuthor = video.author.username.replace(/[^a-zA-Z0-9_-]/g, '') || 'reel';
      const fileName = `SaveAMedia_${cleanAuthor}_${video.id}.${ext}`;

      trackEvent('download_button_click', {
        format: activeFmt.quality,
        reelId: video.id,
      });

      try {
        const result = await triggerFileDownload(activeFmt.url, fileName);
        if (result.method === 'blob') {
          setDownloadSuccessNotice('Download started successfully!');
        } else if (result.method === 'direct_window') {
          setDownloadSuccessNotice('High-speed video opened in new tab. Right-click or long-press to save.');
        }
      } catch (err) {
        console.error('Download error:', err);
        setDownloadSuccessNotice('Download failed. You can also right click the preview video to save.');
      } finally {
        setIsDownloading(false);
      }
    },
    [selectedFormat, video]
  );

  // Retry previous download
  const retry = useCallback(() => {
    handleDownload();
  }, [handleDownload]);

  // Dev state switcher (to test every UI state)
  const setDevState = useCallback((targetState: DownloaderState) => {
    setState(targetState);
    if (targetState === 'SUCCESS' && !video) {
      setVideo({
        id: 'C29testReel',
        url: '/samples/sample.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        title: 'Cinematic Sunset Over the Pacific Ocean',
        author: {
          username: 'wanderlust_films',
          fullName: 'Wanderlust Cinema',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          isVerified: true,
        },
        durationSeconds: 28,
        likesCount: 284120,
        extractedAt: new Date().toISOString(),
        originalReelUrl: 'https://www.instagram.com/reel/C29testReel/',
        availableFormats: [
          {
            id: '1080p',
            quality: '1080p Full HD',
            resolution: '1080x1920',
            extension: 'mp4',
            url: '/samples/sample.mp4',
            formattedSize: '18.4 MB',
            bitrate: '4.2 Mbps',
            hasAudio: true,
          },
          {
            id: '720p',
            quality: '720p HD',
            resolution: '720x1280',
            extension: 'mp4',
            url: '/samples/sample.mp4',
            formattedSize: '9.8 MB',
            bitrate: '2.1 Mbps',
            hasAudio: true,
          },
          {
            id: 'audio',
            quality: 'Audio Only (MP3)',
            extension: 'mp3',
            url: '/samples/sample.mp4',
            formattedSize: '2.4 MB',
            bitrate: '320 kbps',
            hasAudio: true,
          },
        ],
      });
    }
  }, [video]);

  return {
    state,
    inputUrl,
    setInputUrl,
    inputValidationError,
    activeMessage: PROCESSING_MESSAGES[activeMessageIndex],
    video,
    selectedFormat,
    setSelectedFormat,
    errorMessage,
    isDownloading,
    downloadSuccessNotice,
    handleDownload,
    downloadSelectedFormat,
    cancel,
    reset,
    retry,
    setDevState,
  };
}
