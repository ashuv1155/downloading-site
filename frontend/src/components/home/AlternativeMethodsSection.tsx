'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Chrome, ArrowRight, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function AlternativeMethodsSection() {
  const [copiedCode, setCopiedCode] = useState(false);

  const bookmarkletCode = `javascript:(function(){var u=window.location.href;if(!/instagram\\.com\\/(reel|p)\\//i.test(u)){alert('Please navigate directly to an Instagram Reel or post page!');return;}window.open('https://saveamedia.com/?url='+encodeURIComponent(u),'_blank');})();`;

  const handleCopy = async () => {
    const success = await copyToClipboard(bookmarkletCode);
    if (success) {
      setCopiedCode(true);
      trackEvent('fallback_option_selection', { option: 'copy_bookmarklet_home' });
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-violet/10 text-accent-violet text-xs font-semibold mb-3">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Resilient Client-Side Fallbacks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Alternative Download Methods
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Instagram extraction servers occasionally experience transient IP throttles or upstream congestion. Use these client-side fallbacks to download seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Bookmarklet */}
          <div className="rounded-2xl bg-gradient-to-b from-brand-500/5 to-transparent p-[1px] shadow-sm">
            <div className="rounded-2xl bg-white dark:bg-surface-darkCard p-6 sm:p-8 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 flex items-center justify-center mb-6">
                  <Bookmark className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Zero-Install Desktop Bookmarklet
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  The fastest alternative for desktop browsers. Drag the button directly to your browser's bookmarks bar. When viewing any Reel on Instagram, click the bookmarklet to send the link directly to extraction.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Installation:
                  </span>
                  <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside">
                    <li>Show your Bookmarks bar (Ctrl+Shift+B or Cmd+Shift+B).</li>
                    <li>Drag the button below directly into your bar.</li>
                    <li>Done! No extension privileges or background scripts.</li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `
                      <a
                        href="${bookmarkletCode}"
                        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/20 cursor-grab active:cursor-grabbing transition-colors"
                        title="Drag this button to your Bookmarks Bar (Ctrl+Shift+B)"
                      >
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                        <span>Drag Me: ⚡ SaveAMedia</span>
                      </a>
                    `,
                  }}
                />

                <button
                  type="button"
                  onClick={handleCopy}
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
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Browser Extension Setup Guide */}
          <div className="rounded-2xl bg-gradient-to-b from-accent-violet/5 to-transparent p-[1px] shadow-sm">
            <div className="rounded-2xl bg-white dark:bg-surface-darkCard p-6 sm:p-8 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-6">
                  <Chrome className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Browser Extension Setup
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  For creators who download Reels daily, load our open-source companion extension via Developer Mode in Chrome, Brave, Edge, or Firefox. Adds an inline download button right beneath Instagram Reels.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Extension Features:
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Zero network analytics or third-party trackers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Operates directly within client-side memory</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Direct link extraction without server queuing</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/download-tools"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>View Extension Setup Instructions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
