'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DeviceClass } from '@/types/downloader';
import { detectDeviceClass, copyToClipboard } from '@/lib/utils';
import {
  Bookmark,
  Chrome,
  Smartphone,
  Laptop,
  Apple,
  Check,
  Copy,
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface FallbackCardProps {
  onReturnToDownloader: () => void;
}

export function FallbackCard({ onReturnToDownloader }: FallbackCardProps) {
  const [device, setDevice] = useState<DeviceClass>('desktop');
  const [activeTab, setActiveTab] = useState<'desktop' | 'ios' | 'android'>('desktop');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const detected = detectDeviceClass();
    setDevice(detected);
    if (detected === 'ios') setActiveTab('ios');
    else if (detected === 'android') setActiveTab('android');
    else setActiveTab('desktop');
  }, []);

  const bookmarkletCode = `javascript:(function(){var u=window.location.href;if(!/instagram\\.com\\/(reel|p)\\//i.test(u)){alert('Please navigate directly to an Instagram Reel or post page!');return;}window.open('https://saveamedia.com/?url='+encodeURIComponent(u),'_blank');})();`;

  const handleCopyBookmarklet = async () => {
    const ok = await copyToClipboard(bookmarkletCode);
    if (ok) {
      setCopiedCode(true);
      trackEvent('fallback_option_selection', { option: 'copy_bookmarklet_code' });
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleSelectTab = (tab: 'desktop' | 'ios' | 'android') => {
    setActiveTab(tab);
    trackEvent('fallback_option_selection', { tab });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 rounded-2xl bg-white dark:bg-surface-darkCard border border-brand-500/30 dark:border-brand-500/20 shadow-2xl p-5 sm:p-7 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 flex items-center justify-center">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              Alternative Download System
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reliable client-side alternatives when server gateways encounter rate limits
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReturnToDownloader}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Downloader</span>
        </button>
      </div>

      {/* Device Tabs */}
      <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 mb-6">
        <button
          type="button"
          onClick={() => handleSelectTab('desktop')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'desktop'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>Desktop / PC</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectTab('ios')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'ios'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Apple className="w-4 h-4" />
          <span>iPhone / iOS</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectTab('android')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'android'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Android</span>
        </button>
      </div>

      {/* Tab 1: Desktop Bookmarklet & Extension */}
      {activeTab === 'desktop' && (
        <div className="space-y-5 animate-in fade-in-50">
          <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/40">
            <h4 className="font-bold text-sm text-brand-950 dark:text-brand-200 mb-1 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-brand-500" />
              Method 1: Instant Desktop Bookmarklet (Recommended)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Drag this button directly to your browser's Bookmarks bar. While watching any Reel on instagram.com, click the bookmark to send it straight to extraction.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Draggable Bookmarklet Button */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                    <a
                      href="${bookmarkletCode}"
                      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-violet text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 hover:opacity-95 cursor-grab active:cursor-grabbing border border-brand-400/40"
                      title="Drag to your Bookmarks Bar (Ctrl+Shift+B)"
                    >
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                      <span>Drag to Bookmarks: ⚡ SaveAMedia</span>
                    </a>
                  `,
                }}
              />

              {/* Copy Code Button */}
              <button
                type="button"
                onClick={handleCopyBookmarklet}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Code Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JavaScript Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Chrome className="w-4 h-4 text-brand-500" />
              Method 2: Chrome / Edge Browser Extension Setup
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Install the lightweight SaveAMedia developer companion package into your browser via Developer Mode (`chrome://extensions`).
            </p>
            <Link
              href="/download-tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View Extension Documentation & Source Guide</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: iPhone / iOS Instructions */}
      {activeTab === 'ios' && (
        <div className="space-y-4 animate-in fade-in-50 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Apple className="w-4 h-4 text-brand-500" />
              How to Save Public Reels on iPhone (iOS 15+)
            </h4>
            <ol className="space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Copy Reel Link:</strong> In the Instagram app, tap the Paper Airplane / Share icon on the Reel &gt; tap <span className="font-medium text-slate-900 dark:text-white">Copy link</span>.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Use Safari:</strong> Open Safari (avoid in-app browsers) and return to SaveAMedia.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Download to Files:</strong> When tapping Download, Safari displays a system prompt: <em className="text-slate-700 dark:text-slate-300">"Do you want to download this file?"</em> Tap <strong className="text-slate-900 dark:text-white">Download</strong>.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Move to Photos:</strong> Tap the Safari download icon (down arrow in the address bar) &gt; select the video &gt; tap Share &gt; tap <strong className="text-slate-900 dark:text-white">"Save Video"</strong> to save to your Camera Roll.
              </li>
            </ol>
            <div className="pt-2">
              <Link
                href="/instagram-downloader-for-iphone"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline inline-flex items-center gap-1 text-xs"
              >
                <span>Read complete iPhone & Safari download guide</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Android Instructions */}
      {activeTab === 'android' && (
        <div className="space-y-4 animate-in fade-in-50 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              How to Save Public Reels on Android (Chrome & Samsung Internet)
            </h4>
            <ol className="space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Copy Reel URL:</strong> In Instagram, tap Share on any public Reel &gt; tap <span className="font-medium text-slate-900 dark:text-white">Copy link</span>.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Paste in Chrome:</strong> Open Chrome, paste your link into SaveAMedia and tap Download Reel.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Instant Gallery Storage:</strong> Android automatically saves the high-resolution MP4 directly to your <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">/Download</code> folder, visible immediately in Google Photos or Samsung Gallery.
              </li>
            </ol>
            <div className="pt-2">
              <Link
                href="/instagram-downloader-for-android"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline inline-flex items-center gap-1 text-xs"
              >
                <span>Read complete Android & Gallery guide</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Notice on Private content */}
      <div className="mt-5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <span>
          <strong>Important notice:</strong> Neither our server gateway nor our client-side bookmarklet can access private profiles, close-friends stories, or deleted content. We strictly support publicly accessible media that you have permission to download.
        </span>
      </div>
    </div>
  );
}
