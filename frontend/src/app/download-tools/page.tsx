'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Bookmark, Chrome, Copy, Check, Terminal, ExternalLink, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export default function DownloadToolsPage() {
  const [copiedBookmarklet, setCopiedBookmarklet] = useState(false);
  const [copiedExtensionManifest, setCopiedExtensionManifest] = useState(false);

  const bookmarkletCode = `javascript:(function(){var u=window.location.href;if(!/instagram\\.com\\/(reel|p)\\//i.test(u)){alert('Please navigate directly to an Instagram Reel or post page!');return;}window.open('https://saveamedia.com/?url='+encodeURIComponent(u),'_blank');})();`;

  const extensionManifestJson = `{
  "manifest_version": 3,
  "name": "SaveAMedia Companion",
  "version": "1.0.0",
  "description": "Send public Instagram Reels directly to SaveAMedia downloader.",
  "permissions": ["activeTab"],
  "action": {
    "default_title": "Download with SaveAMedia"
  },
  "content_scripts": [
    {
      "matches": ["*://*.instagram.com/reel/*", "*://*.instagram.com/p/*"],
      "js": ["content.js"]
    }
  ]
}`;

  const handleCopyBookmarklet = async () => {
    const ok = await copyToClipboard(bookmarkletCode);
    if (ok) {
      setCopiedBookmarklet(true);
      trackEvent('fallback_option_selection', { tool: 'bookmarklet_code_tools_page' });
      setTimeout(() => setCopiedBookmarklet(false), 2500);
    }
  };

  const handleCopyManifest = async () => {
    const ok = await copyToClipboard(extensionManifestJson);
    if (ok) {
      setCopiedExtensionManifest(true);
      setTimeout(() => setCopiedExtensionManifest(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Breadcrumb items={[{ label: 'Download Tools' }]} />

      <header className="mt-6 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Alternative Client-Side Tooling</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          SaveAMedia Bookmarklet & Browser Companion Tools
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          When cloud extraction servers face high concurrency or Instagram rate limits, our client-side tools provide an immediate fallback directly within your personal browser session.
        </p>
      </header>

      <div className="space-y-12">
        {/* Tool 1: Desktop Bookmarklet */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 flex items-center justify-center font-bold">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                1. Zero-Install Desktop Bookmarklet
              </h2>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Works instantly in Chrome, Firefox, Safari, Edge & Brave
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            A bookmarklet is a tiny JavaScript snippet stored as a bookmark in your browser. Whenever you browse Instagram on desktop, clicking this bookmark instantly extracts the public Reel without manually copying URLs.
          </p>

          {/* Interactive Drag Button Box */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              How to Install in 5 Seconds:
            </h3>
            <ol className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-decimal list-inside mb-5">
              <li>Ensure your browser bookmarks bar is visible (press <strong>Ctrl+Shift+B</strong> on Windows or <strong>Cmd+Shift+B</strong> on Mac).</li>
              <li>Click and drag the colored button below straight into your Bookmarks Bar.</li>
              <li>When viewing any public Reel on Instagram, simply click your new bookmark!</li>
            </ol>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                    <a
                      href="${bookmarkletCode}"
                      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-violet text-white text-sm font-bold shadow-lg shadow-brand-500/25 cursor-grab active:cursor-grabbing hover:opacity-95 transition-opacity"
                      title="Drag to your Bookmarks Bar (Ctrl+Shift+B)"
                    >
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                      <span>Drag to Bookmarks: ⚡ SaveAMedia</span>
                    </a>
                  `,
                }}
              />

              <button
                type="button"
                onClick={handleCopyBookmarklet}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedBookmarklet ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Bookmarklet Code Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Raw JavaScript</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Tool 2: Browser Extension Companion */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
              <Chrome className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                2. Open-Source Browser Extension (Developer Mode)
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                Transparent & Unpacked Chrome / Edge Manifest V3
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Rather than relying on third-party web store extensions that may inject ads or track browsing behavior, SaveAMedia provides a zero-telemetry, lightweight Manifest V3 configuration you can inspect and load in under 1 minute.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Installation Steps (Unpacked Extension):
            </h3>
            <ol className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside">
              <li>Create a folder on your computer named <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">saveamedia-extension</code>.</li>
              <li>Save the <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">manifest.json</code> code below inside that folder.</li>
              <li>Open Chrome or Edge and navigate to <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">chrome://extensions</code>.</li>
              <li>Toggle <strong className="text-slate-800 dark:text-slate-200">Developer mode</strong> (top right) to ON.</li>
              <li>Click <strong className="text-slate-800 dark:text-slate-200">Load unpacked</strong> and select your folder.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">manifest.json</span>
              <button
                type="button"
                onClick={handleCopyManifest}
                className="text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                {copiedExtensionManifest ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
              <code>{extensionManifestJson}</code>
            </pre>
          </div>
        </section>

        {/* Security & Limitations */}
        <section className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Honest Security Notice</span>
          </div>
          <p>
            Neither our bookmarklet nor extension can bypass private accounts, deleted videos, or age verification walls. They are simply automated URL dispatchers designed to save you time.
          </p>
        </section>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-sm transition-colors"
          >
            <span>Return to Reel Downloader</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
