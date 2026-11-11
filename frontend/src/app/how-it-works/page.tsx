import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { UrlInputCard } from '@/components/downloader/UrlInputCard';
import { Copy, ClipboardPaste, Download, CheckCircle, Smartphone, Laptop, AlertCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'How It Works - Step-by-Step Instagram Reel Downloading Guide',
  description:
    'Detailed step-by-step tutorial on how to download publicly accessible Instagram Reels on iPhone, Android, Mac, and Windows PC with high-definition audio and video.',
  canonicalPath: '/how-it-works',
});

export default function HowItWorksPage() {
  const jsonLd = generateHowToSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'How It Works', url: '/how-it-works' },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={[{ label: 'How It Works' }]} />

      <header className="mt-6 mb-12">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          How to Download Instagram Reels: Complete Guide
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          SaveAMedia provides a clean, link-based workflow that requires zero login credentials or software installations. Here is an in-depth breakdown of how public Reel extraction works across all devices.
        </p>
      </header>

      {/* 3 Core Steps in Depth */}
      <div className="space-y-10">
        {/* Step 1 */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Locate and Copy the Public Instagram Reel Link
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Open the Instagram app on your smartphone or visit instagram.com in any web browser. Find the public Reel that you wish to download for offline viewing.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">Where to find the copy link button:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>On Mobile App (iOS / Android):</strong> Tap the <em>Paper Airplane / Share</em> button on the right side of the screen &gt; tap <em>"Copy link"</em>.</li>
              <li><strong>On Desktop Browser:</strong> Click the three horizontal dots (<code className="font-mono">•••</code>) on the bottom-right of the Reel card &gt; click <em>"Copy link"</em>, or copy the URL directly from your browser address bar.</li>
            </ul>
          </div>
        </section>

        {/* Step 2 */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Paste the URL into SaveAMedia
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Return to SaveAMedia and paste the copied link into the URL input card at the top of the homepage. You can also tap the convenient "Paste" button to pull the link directly from your system clipboard.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <p><strong>Validation Note:</strong> SaveAMedia automatically sanitizes query tracking parameters (such as <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">?igsh=xyz</code> or <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">?utm_source=...</code>) to protect your privacy and ensure clean server querying.</p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Preview Video & Select Download Quality
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Once extracted, our built-in HTML5 player renders a playable preview of the vertical video. You can verify the audio track and video quality before saving. Select your desired format:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
              <span className="font-bold text-slate-900 dark:text-white block">1080p Full HD</span>
              <span className="text-slate-500">Highest fidelity MP4 video stream with stereo audio.</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
              <span className="font-bold text-slate-900 dark:text-white block">720p HD</span>
              <span className="text-slate-500">Compressed file size for quick messaging sharing.</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
              <span className="font-bold text-slate-900 dark:text-white block">Audio Only (MP3)</span>
              <span className="text-slate-500">Audio track extraction for podcasts and music ideas.</span>
            </div>
          </div>
        </section>
      </div>

      {/* Troubleshooting Section */}
      <section className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-brand-500" />
          Troubleshooting Common Extraction Issues
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            <strong>"Reel Unavailable" message:</strong> This indicates the creator's profile is set to Private, or the Reel was removed by the author or Instagram. We cannot and do not bypass private profile restrictions.
          </p>
          <p>
            <strong>Gateway Busy / Rate Limit:</strong> When millions of users download simultaneously, Instagram rate-limits server IP pools. In this event, use our <Link href="/download-tools" className="text-brand-600 dark:text-brand-400 font-semibold underline">Bookmarklet Fallback</Link>, which runs locally in your personal browser session.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-brand-500 transition-colors"
          >
            <span>Try SaveAMedia Downloader Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
