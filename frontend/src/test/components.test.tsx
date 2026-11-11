import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UrlInputCard } from '../components/downloader/UrlInputCard';
import { ProcessingState } from '../components/downloader/ProcessingState';
import { ErrorStateCard } from '../components/downloader/ErrorStateCard';
import { SuccessResultCard } from '../components/downloader/SuccessResultCard';
import { FallbackCard } from '../components/downloader/FallbackCard';
import { ExtractedVideo } from '../types/downloader';

const mockVideo: ExtractedVideo = {
  id: 'C29testReel',
  url: 'https://example.com/video.mp4',
  thumbnail: 'https://example.com/thumb.jpg',
  title: 'Test Reel Title',
  author: {
    username: 'creator123',
    fullName: 'Creator Name',
    isVerified: true,
  },
  durationSeconds: 25,
  extractedAt: new Date().toISOString(),
  originalReelUrl: 'https://www.instagram.com/reel/C29testReel/',
  availableFormats: [
    {
      id: '1080p',
      quality: '1080p Full HD',
      extension: 'mp4',
      url: 'https://example.com/1080p.mp4',
      formattedSize: '15 MB',
      hasAudio: true,
    },
    {
      id: 'audio',
      quality: 'Audio Only (MP3)',
      extension: 'mp3',
      url: 'https://example.com/audio.mp3',
      formattedSize: '2 MB',
      hasAudio: true,
    },
  ],
};

describe('Downloader UI Components', () => {
  it('renders UrlInputCard and handles Enter keyboard submission', () => {
    const handleSubmit = vi.fn();
    const handleUrlChange = vi.fn();

    render(
      <UrlInputCard
        inputUrl="https://www.instagram.com/reel/C29abcdefgh/"
        onUrlChange={handleUrlChange}
        onSubmit={handleSubmit}
        validationError={null}
        isLoading={false}
        onClear={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/Paste Instagram Reel link here/i);
    expect(input).toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders validation error message in UrlInputCard', () => {
    render(
      <UrlInputCard
        inputUrl="invalid-link"
        onUrlChange={vi.fn()}
        onSubmit={vi.fn()}
        validationError="Invalid Instagram Reel URL structure."
        isLoading={false}
        onClear={vi.fn()}
      />
    );

    expect(screen.getByText(/Invalid Instagram Reel URL structure/i)).toBeInTheDocument();
  });

  it('renders ProcessingState with active status message and cancel trigger', () => {
    const handleCancel = vi.fn();
    render(
      <ProcessingState
        activeMessage="Checking video availability..."
        onCancel={handleCancel}
      />
    );

    expect(screen.getByText('Checking video availability...')).toBeInTheDocument();

    const cancelBtn = screen.getByText(/Cancel request/i);
    fireEvent.click(cancelBtn);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('renders SuccessResultCard with formats, preview, and author info', () => {
    const handleDownload = vi.fn();
    const handleReset = vi.fn();

    render(
      <SuccessResultCard
        video={mockVideo}
        selectedFormat={mockVideo.availableFormats[0]}
        onSelectFormat={vi.fn()}
        onDownload={handleDownload}
        isDownloading={false}
        downloadNotice={null}
        onReset={handleReset}
      />
    );

    expect(screen.getByText('@creator123')).toBeInTheDocument();
    expect(screen.getByText('Test Reel Title')).toBeInTheDocument();
    expect(screen.getByText('1080p Full HD')).toBeInTheDocument();
    expect(screen.getByText('Audio Only (MP3)')).toBeInTheDocument();

    const downloadBtn = screen.getByRole('button', { name: /Download 1080p Full HD/i });
    fireEvent.click(downloadBtn);
    expect(handleDownload).toHaveBeenCalled();
  });

  it('renders ErrorStateCard with retry and fallback triggers', () => {
    const handleRetry = vi.fn();
    const handleFallback = vi.fn();

    render(
      <ErrorStateCard
        state="SERVER_2_FAILED"
        errorMessage="Both extraction servers busy"
        onRetry={handleRetry}
        onOpenFallback={handleFallback}
        onReset={vi.fn()}
      />
    );

    expect(screen.getByText(/Extraction Servers Temporarily Overloaded/i)).toBeInTheDocument();

    const retryBtn = screen.getByText(/Try Again/i);
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);

    const fallbackBtn = screen.getByText(/Use Bookmarklet Fallback/i);
    fireEvent.click(fallbackBtn);
    expect(handleFallback).toHaveBeenCalledTimes(1);
  });

  it('renders FallbackCard with desktop bookmarklet and mobile tabs', () => {
    const handleReturn = vi.fn();

    render(<FallbackCard onReturnToDownloader={handleReturn} />);

    expect(screen.getByText(/Alternative Download System/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag to Bookmarks/i)).toBeInTheDocument();

    const backBtn = screen.getByText(/Back to Downloader/i);
    fireEvent.click(backBtn);
    expect(handleReturn).toHaveBeenCalledTimes(1);
  });
});
