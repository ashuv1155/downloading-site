'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

/**
 * Automatically dispatches privacy-friendly 'page_view' events
 * on initial load and client-side route transitions.
 * Does not collect IP addresses, passwords, or personal session data.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackEvent('page_view', {
        path: pathname,
        title: typeof document !== 'undefined' ? document.title : '',
      });
    }
  }, [pathname]);

  return null;
}
