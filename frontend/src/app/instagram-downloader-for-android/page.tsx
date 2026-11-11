import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { Smartphone, FolderCheck, HardDrive, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Instagram Reel Downloader for Android - Chrome & Gallery Guide',
  description:
    'Complete guide on downloading public Instagram Reels on Samsung, Google Pixel, and Android smartphones. Save high-definition MP4 videos directly to your Gallery.',
  canonicalPath: '/instagram-downloader-for-android',
  keywords: [
    'Instagram Downloader for Android',
    'Download Reels on Android',
    'Save Instagram Reels to Gallery',
    'Android Reel Downloader MP4',
  ],
});

export default function InstagramDownloaderForAndroidPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'For Android', url: '/instagram-downloader-for-android' },
  ]);
  const howToSchema = generateHowToSchema(
    'How to Download Instagram Reels on Android to Gallery',
    'Complete guide on saving public Instagram Reels to Android device storage and Google Photos.'
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
        <Breadcrumb items={[{ label: 'Instagram Downloader for Android' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android 13 / 14 / 15 Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              How to Download Instagram Reels on Android to Gallery
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Android offers an open file system where downloaded media immediately synchronizes with your device photos and media player. Here is how to save Reels on any Android device.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Compatibility Across Android Devices
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              SaveAMedia requires zero APK installs and works out-of-the-box across all major Android manufacturers and browsers, including:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-semibold text-center">
                Samsung Galaxy (One UI)
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-semibold text-center">
                Google Pixel (Stock Android)
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-semibold text-center">
                OnePlus (OxygenOS)
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-semibold text-center">
                Xiaomi / Redmi (HyperOS)
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Simple 3-Step Android Workflow
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  1. Copy the Reel Link
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Inside the Instagram app, tap the Share icon &gt; tap <strong>Copy link</strong>.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  2. Open SaveAMedia in Chrome
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Open Chrome or your preferred browser, paste the link into the URL card at the top, and tap <strong>Download Reel</strong>.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  3. Direct Storage in Gallery
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Tap <strong>Download 1080p MP4</strong>. The file is instantly saved to your <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">/Download</code> folder. You can immediately open Samsung Gallery or Google Photos to watch, trim, or send the video.
                </p>
              </div>
            </div>
          </section>

          <section className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Why don’t I need an APK?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Third-party Android APK downloaders frequently request broad storage permissions or contain intrusive adware. SaveAMedia is a zero-permission progressive web tool that relies entirely on standard HTML5 browser download APIs.
            </p>
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Download Reel on Android</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
