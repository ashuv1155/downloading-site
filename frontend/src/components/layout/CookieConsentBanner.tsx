'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('saveamedia-cookie-consent');
      if (!consent) {
        // Delay to prevent CLS
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      } else if (consent === 'accepted_all') {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted',
          });
        }
      }
    } catch {
      // Storage access disabled / private browsing
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('saveamedia-cookie-consent', 'accepted_all');
    } catch {}

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }

    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem('saveamedia-cookie-consent', 'essential_only');
    } catch {}

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      role="region"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h2 className="font-bold text-slate-900 dark:text-white text-sm">
            Cookie & Privacy Preferences
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We use functional cookies to operate this utility and third-party advertising cookies (including Google AdSense) to deliver relevant, non-intrusive ads. Review our{' '}
            <Link
              href="/cookie-policy"
              className="text-brand-600 dark:text-brand-400 underline font-medium"
            >
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy-policy"
              className="text-brand-600 dark:text-brand-400 underline font-medium"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={handleRejectNonEssential}
          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={handleAcceptAll}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-accent-violet hover:opacity-95 text-white text-xs font-semibold shadow-sm transition-opacity"
        >
          Accept All
        </button>
      </div>
    </aside>
  );
}
