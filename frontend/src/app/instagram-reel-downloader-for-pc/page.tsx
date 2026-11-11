import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { Laptop, Monitor, Bookmark, Keyboard, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Instagram Reel Downloader for PC & Mac - Desktop HD Workflow',
  description:
    'Download public Instagram Reels directly on Windows PC, macOS, and Linux laptops. 1080p Full HD MP4 downloads, zero installation bookmarklet, and fast desktop shortcuts.',
  canonicalPath: '/instagram-reel-downloader-for-pc',
  keywords: [
    'Instagram Reel Downloader for PC',
    'Download Instagram Reels on Mac',
    'Instagram Reel PC Download Windows 11',
    'Desktop Instagram Video Downloader',
  ],
});

export default function InstagramReelDownloaderForPcPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'For PC & Mac', url: '/instagram-reel-downloader-for-pc' },
  ]);
  const howToSchema = generateHowToSchema(
    'How to Download Instagram Reels on PC and Mac',
    'Desktop guide to saving public Instagram Reels to Windows, macOS, or Linux in Full HD.'
  );

  return (
    <div className="w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <DownloaderHero isSubpage={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Breadcrumb items={[{ label: 'Instagram Downloader for PC & Mac' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
              <Laptop className="w-3.5 h-3.5" />
              <span>Windows, macOS & Linux Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              How to Download Instagram Reels on PC and Mac
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Desktop workstations provide higher processing speeds, large display previews, and flexible file management for video editors and creators. Here is the optimal desktop Reel download workflow.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Desktop Advantages for Reel Archiving
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1">Editing Software Integration</strong>
                <p className="text-slate-500">
                  Direct import into Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, or CapCut Desktop.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1">Keyboard Shortcuts</strong>
                <p className="text-slate-500">
                  Instant workflow with <kbd className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">Ctrl+V</kbd> paste and <kbd className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">Enter</kbd> submit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1">High-Speed Storage</strong>
                <p className="text-slate-500">
                  Save massive archives directly to NVMe SSDs or external storage drives without phone storage constraints.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Instant Desktop Method: The SaveAMedia Bookmarklet
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              If you browse Instagram on a PC or laptop, you do not even need to copy and paste links manually. Simply drag our bookmarklet into your Bookmarks Bar once.
            </p>
            <div className="p-5 rounded-2xl border border-brand-500/30 bg-brand-50/50 dark:bg-brand-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  Ready to install the desktop bookmarklet?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Takes 5 seconds. Works across Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari on macOS.
                </p>
              </div>
              <Link
                href="/download-tools"
                className="px-4 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-brand-500 transition-colors whitespace-nowrap"
              >
                Get Desktop Bookmarklet →
              </Link>
            </div>
          </section>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link
              href="/how-it-works"
              className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              ← Back to general guide
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Back to Downloader</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
