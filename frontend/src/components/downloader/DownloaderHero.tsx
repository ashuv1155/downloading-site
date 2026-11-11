'use client';

import React, { useState } from 'react';
import { useDownloader } from '@/hooks/useDownloader';
import { UrlInputCard } from './UrlInputCard';
import { ProcessingState } from './ProcessingState';
import { SuccessResultCard } from './SuccessResultCard';
import { ErrorStateCard } from './ErrorStateCard';
import { FallbackCard } from './FallbackCard';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface DownloaderHeroProps {
  isSubpage?: boolean;
}

export function DownloaderHero({ isSubpage = false }: DownloaderHeroProps) {
  const {
    state,
    inputUrl,
    setInputUrl,
    inputValidationError,
    activeMessage,
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
  } = useDownloader();

  const [showFallbackManual, setShowFallbackManual] = useState(false);

  const isProcessing = state === 'VALIDATING' || state === 'PROCESSING';
  const isSuccess = state === 'SUCCESS' && video !== null;
  const isErrorState =
    state === 'SERVER_1_FAILED' ||
    state === 'SERVER_2_FAILED' ||
    state === 'RATE_LIMITED' ||
    state === 'PRIVATE_OR_UNAVAILABLE' ||
    state === 'INVALID_URL' ||
    state === 'NETWORK_ERROR' ||
    state === 'UNKNOWN_ERROR';

  const handleOpenFallback = () => {
    setShowFallbackManual(true);
  };

  const handleReturnToDownloader = () => {
    setShowFallbackManual(false);
    reset();
  };

  return (
    <section className="relative w-full pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      {/* Modern Ambient Floating Gradient Glows */}
      <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[520px] h-[340px] bg-gradient-to-tr from-brand-600/18 via-blue-500/12 to-transparent rounded-full blur-[90px] -z-10 pointer-events-none animate-float-slow" />
      <div className="absolute top-24 right-1/4 translate-x-1/2 w-[460px] h-[300px] bg-gradient-to-bl from-accent-violet/18 via-accent-rose/10 to-transparent rounded-full blur-[90px] -z-10 pointer-events-none animate-float-reverse" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Live Feature Pill with Animated Green Ping Dot */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-surface-darkCard/80 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-md mb-6 hover:border-brand-500/40 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Fast 1080p Full HD Instagram Reel Downloader
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
            2026 Pro
          </span>
        </div>

        {/* Dynamic Headlines */}
        {isSubpage ? (
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
            Instagram Reel{' '}
            <span className="bg-gradient-to-r from-blue-600 via-brand-500 to-accent-violet bg-clip-text text-transparent">
              Downloader
            </span>
          </h2>
        ) : (
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
            Instagram Reel{' '}
            <span className="bg-gradient-to-r from-blue-600 via-brand-500 to-accent-violet bg-clip-text text-transparent">
              Downloader
            </span>
          </h1>
        )}

        <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 max-w-2xl mx-auto mb-2">
          Download Instagram Reels in seconds. Simple, fast and easy.
        </p>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed">
          Paste any public Instagram Reel URL to preview and download in 1080p HD MP4 or extract clean 320kbps MP3 audio.
        </p>

        {/* Dynamic Machine Area */}
        <div className="w-full transition-all duration-300">
          {showFallbackManual ? (
            <FallbackCard onReturnToDownloader={handleReturnToDownloader} />
          ) : isProcessing ? (
            <ProcessingState activeMessage={activeMessage} onCancel={cancel} />
          ) : isSuccess ? (
            <SuccessResultCard
              video={video}
              selectedFormat={selectedFormat}
              onSelectFormat={setSelectedFormat}
              onDownload={downloadSelectedFormat}
              isDownloading={isDownloading}
              downloadNotice={downloadSuccessNotice}
              onReset={reset}
            />
          ) : isErrorState ? (
            <div className="space-y-6">
              <UrlInputCard
                inputUrl={inputUrl}
                onUrlChange={setInputUrl}
                onSubmit={() => handleDownload()}
                validationError={null}
                isLoading={false}
                onClear={() => {
                  setInputUrl('');
                  reset();
                }}
              />
              <ErrorStateCard
                state={state}
                errorMessage={errorMessage}
                onRetry={retry}
                onOpenFallback={handleOpenFallback}
                onReset={reset}
              />
            </div>
          ) : (
            <UrlInputCard
              inputUrl={inputUrl}
              onUrlChange={setInputUrl}
              onSubmit={() => handleDownload()}
              validationError={inputValidationError}
              isLoading={isProcessing}
              onClear={() => {
                setInputUrl('');
                reset();
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
