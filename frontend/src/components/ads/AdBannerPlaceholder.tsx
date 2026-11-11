'use client';

import React, { useEffect } from 'react';

interface AdBannerPlaceholderProps {
  slot: 'leaderboard' | 'rectangle' | 'in-feed';
  className?: string;
  adSlotId?: string;
}

export function AdBannerPlaceholder({ slot, className = '', adSlotId }: AdBannerPlaceholderProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (clientId && adSlotId) {
      try {
        // @ts-expect-error - Google AdSense global array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Silently catch ad-blocker or script delivery blocks
      }
    }
  }, [clientId, adSlotId]);

  // Fixed dimensions to guarantee ZERO Cumulative Layout Shift (CLS: 0.0)
  const getDimensions = () => {
    switch (slot) {
      case 'leaderboard':
        return 'w-full max-w-[728px] min-h-[90px]';
      case 'rectangle':
        return 'w-full max-w-[300px] min-h-[250px]';
      case 'in-feed':
        return 'w-full max-w-4xl min-h-[100px] sm:min-h-[120px]';
      default:
        return 'w-full max-w-[728px] min-h-[90px]';
    }
  };

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto my-8 flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-1.5 select-none">
        Advertisement
      </span>

      {clientId && adSlotId ? (
        <div className={`${getDimensions()} overflow-hidden rounded-xl flex items-center justify-center`}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={clientId}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div
          className={`${getDimensions()} rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center p-4 transition-colors`}
        >
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Advertisement Space ({slot})
          </span>
          <span className="text-[10px] text-slate-400/80 dark:text-slate-600 mt-0.5">
            Non-intrusive sponsor unit • Zero layout shift reserved
          </span>
        </div>
      )}
    </aside>
  );
}
