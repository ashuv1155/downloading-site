import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FallbackCard } from '../components/downloader/FallbackCard';
import { ErrorStateCard } from '../components/downloader/ErrorStateCard';
import { UrlInputCard } from '../components/downloader/UrlInputCard';
import { FaqSection } from '../components/home/FaqSection';
import { detectDeviceClass } from '../lib/utils';
import { trackEvent, registerAnalyticsListener } from '../lib/analytics';
import { AnalyticsEvent } from '../types/downloader';

describe('Specialized Requirements & Integration Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // 1. Fallback Visibility
  it('renders FallbackCard with device-aware tabs, draggable bookmarklet, and back button', () => {
    const handleReturn = vi.fn();
    render(<FallbackCard onReturnToDownloader={handleReturn} />);

    // Assert title and tabs are visible
    expect(screen.getByText(/Alternative Download System/i)).toBeInTheDocument();
    expect(screen.getByText(/Desktop \/ PC/i)).toBeInTheDocument();
    expect(screen.getByText(/iPhone \/ iOS/i)).toBeInTheDocument();
    expect(screen.getByText(/Android/i)).toBeInTheDocument();

    // Assert bookmarklet button and instructions are present
    expect(screen.getByText(/Drag to Bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Copy JavaScript Code/i)).toBeInTheDocument();

    // Assert back to downloader interaction
    const returnBtn = screen.getByText(/Back to Downloader/i);
    fireEvent.click(returnBtn);
    expect(handleReturn).toHaveBeenCalledTimes(1);
  });

  // 2. Retry Functionality
  it('triggers retry callback when user clicks Try Again on error state', () => {
    const handleRetry = vi.fn();
    const handleFallback = vi.fn();
    const handleReset = vi.fn();

    render(
      <ErrorStateCard
        state="SERVER_1_FAILED"
        errorMessage="Primary extraction node failed"
        onRetry={handleRetry}
        onOpenFallback={handleFallback}
        onReset={handleReset}
      />
    );

    const retryBtn = screen.getByText(/Try Again/i);
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);

    const fallbackBtn = screen.getByText(/Use Bookmarklet Fallback/i);
    fireEvent.click(fallbackBtn);
    expect(handleFallback).toHaveBeenCalledTimes(1);
  });

  // 3. Mobile Responsiveness & Device Detection
  it('detectDeviceClass accurately detects desktop, iOS, and Android environments', () => {
    // Test iOS userAgent
    const originalUA = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      configurable: true,
    });
    expect(detectDeviceClass()).toBe('ios');

    // Test Android userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36',
      configurable: true,
    });
    expect(detectDeviceClass()).toBe('android');

    // Test Desktop userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
      configurable: true,
    });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true });
    expect(detectDeviceClass()).toBe('desktop');

    // Restore
    Object.defineProperty(navigator, 'userAgent', { value: originalUA, configurable: true });
  });

  // 4. Keyboard Accessibility
  it('supports full keyboard accessibility: Enter key submission and visible focusable elements', () => {
    const handleSubmit = vi.fn();
    const handleClear = vi.fn();

    render(
      <UrlInputCard
        inputUrl="https://www.instagram.com/reel/C29abcdefgh/"
        onUrlChange={vi.fn()}
        onSubmit={handleSubmit}
        validationError={null}
        isLoading={false}
        onClear={handleClear}
      />
    );

    const input = screen.getByPlaceholderText(/Paste Instagram Reel link here/i);

    // Press Enter to submit
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleSubmit).toHaveBeenCalledTimes(1);

    // Clear button trigger
    const clearBtn = screen.getByLabelText(/Clear input/i);
    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('supports accessible accordion behavior with ARIA attributes and keyboard toggle', () => {
    render(<FaqSection maxItems={3} />);

    // Get first question button
    const firstButton = screen.getByRole('button', { name: /How do I download an Instagram Reel\?/i });
    expect(firstButton).toHaveAttribute('aria-expanded', 'true'); // First is open by default

    // Click to close
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open again
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(firstButton).toHaveAttribute('aria-controls', 'faq-answer-faq-1');
  });

  // 5. Analytics Integration Readiness (Privacy-Safe)
  it('dispatches analytics events without capturing sensitive credentials or cookies', () => {
    const capturedEvents: AnalyticsEvent[] = [];
    const unsubscribe = registerAnalyticsListener((event) => {
      capturedEvents.push(event);
    });

    // Test all required events
    trackEvent('page_view', { path: '/' });
    trackEvent('url_submission', { url: 'https://www.instagram.com/reel/C29abcdefgh/' });
    trackEvent('validation_failure', { reason: 'empty_input' });
    trackEvent('extraction_success', { reelId: 'C29abcdefgh' });
    trackEvent('extraction_failure', { code: 'RATE_LIMITED' });
    trackEvent('fallback_option_selection', { option: 'bookmarklet' });
    trackEvent('download_button_click', { format: '1080p' });

    expect(capturedEvents.length).toBe(7);
    expect(capturedEvents[0].eventName).toBe('page_view');
    expect(capturedEvents[1].eventName).toBe('url_submission');
    expect(capturedEvents[2].eventName).toBe('validation_failure');
    expect(capturedEvents[3].eventName).toBe('extraction_success');
    expect(capturedEvents[4].eventName).toBe('extraction_failure');
    expect(capturedEvents[5].eventName).toBe('fallback_option_selection');
    expect(capturedEvents[6].eventName).toBe('download_button_click');

    // Verify zero passwords, zero session cookies, zero tokens
    capturedEvents.forEach((ev) => {
      const propsStr = JSON.stringify(ev.properties || {});
      expect(propsStr).not.toContain('password');
      expect(propsStr).not.toContain('cookie');
      expect(propsStr).not.toContain('token');
      expect(propsStr).not.toContain('session');
    });

    unsubscribe();
  });
});
