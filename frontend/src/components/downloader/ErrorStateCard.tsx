'use client';

import React from 'react';
import { DownloaderState } from '@/types/downloader';
import {
  AlertTriangle,
  RotateCcw,
  Bookmark,
  Lock,
  WifiOff,
  ServerCrash,
  Clock,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

interface ErrorStateCardProps {
  state: DownloaderState;
  errorMessage: string | null;
  onRetry: () => void;
  onOpenFallback: () => void;
  onReset: () => void;
}

export function ErrorStateCard({
  state,
  errorMessage,
  onRetry,
  onOpenFallback,
  onReset,
}: ErrorStateCardProps) {
  // Config per state type
  const getErrorDetails = () => {
    switch (state) {
      case 'SERVER_1_FAILED':
        return {
          title: 'Extraction Server 1 Busy',
          description:
            'Our primary extraction node encountered upstream latency from Instagram. Secondary failover is configured, but you can retry immediately or use our desktop bookmarklet.',
          icon: ServerCrash,
          badge: 'Gateway Failover',
          showFallbackBtn: true,
        };
      case 'SERVER_2_FAILED':
        return {
          title: 'Extraction Servers Temporarily Overloaded',
          description:
            'Both server extraction clusters are currently busy handling high Instagram volume. Please use our instant zero-install Bookmarklet or mobile shortcut below.',
          icon: ServerCrash,
          badge: 'High Server Load',
          showFallbackBtn: true,
        };
      case 'RATE_LIMITED':
        return {
          title: 'Instagram Temporary Rate Limit',
          description:
            'Instagram is temporarily restricting high-frequency requests from this IP pool. Please wait 30–60 seconds before retrying, or use our Bookmarklet which bypasses server queues.',
          icon: Clock,
          badge: 'Rate Limited',
          showFallbackBtn: true,
        };
      case 'PRIVATE_OR_UNAVAILABLE':
        return {
          title: 'Reel Private or Unavailable',
          description:
            'This Reel is from a private account, has been deleted by the author, or is age/region-restricted. SaveAMedia only supports publicly accessible media.',
          icon: Lock,
          badge: 'Access Restricted',
          showFallbackBtn: false,
        };
      case 'INVALID_URL':
        return {
          title: 'Invalid Instagram URL',
          description:
            errorMessage ||
            'The link you provided is not a recognized Instagram Reel format. Please ensure it begins with instagram.com/reel/ or instagram.com/p/.',
          icon: AlertTriangle,
          badge: 'URL Format Error',
          showFallbackBtn: false,
        };
      case 'NETWORK_ERROR':
        return {
          title: 'Connection Problem',
          description:
            'Unable to reach the extraction gateway. Please check your internet connection or turn off aggressive VPNs.',
          icon: WifiOff,
          badge: 'Network Issue',
          showFallbackBtn: true,
        };
      default:
        return {
          title: 'Unable to Process This Reel',
          description:
            errorMessage ||
            'An unexpected error occurred while parsing this video. Please verify the URL is public and try again.',
          icon: HelpCircle,
          badge: 'Extraction Error',
          showFallbackBtn: true,
        };
    }
  };

  const details = getErrorDetails();
  const IconComponent = details.icon;

  return (
    <div
      role="alert"
      className="w-full max-w-xl mx-auto mt-6 rounded-2xl bg-white dark:bg-surface-darkCard border border-rose-200 dark:border-rose-900/50 shadow-xl p-5 sm:p-7 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 text-center"
    >
      {/* Icon Graphic */}
      <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40 flex items-center justify-center mx-auto mb-4">
        <IconComponent className="w-7 h-7" />
      </div>

      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 mb-2">
        {details.badge}
      </span>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
        {details.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
        {details.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={onRetry}
          className="w-full sm:w-auto h-11 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        {details.showFallbackBtn && (
          <button
            type="button"
            onClick={onOpenFallback}
            className="w-full sm:w-auto h-11 px-5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/40 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span>Use Bookmarklet Fallback</span>
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto h-11 px-4 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium transition-colors"
        >
          Clear & Start Over
        </button>
      </div>
    </div>
  );
}
