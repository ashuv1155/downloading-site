import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { Video, Zap, Smartphone, Layers, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Instagram Reel Downloader - High-Definition MP4 Video Extraction',
  description:
    'Dedicated Instagram Reel Downloader utility. Extract public 1080p vertical videos, original audio tracks, and high-framerate clips with in-browser preview.',
  canonicalPath: '/instagram-reel-downloader',
  keywords: [
    'Instagram Reel Downloader',
    'Instagram Video Downloader',
    'Save Reel MP4',
    'Reel Downloader Online',
    'Instagram Reel Video Download',
  ],
});

export default function InstagramReelDownloaderPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Instagram Reel Downloader', url: '/instagram-reel-downloader' },
  ]);
  const howToSchema = generateHowToSchema(
    'How to Download Instagram Reels in Full HD',
    'Step-by-step guide to downloading public Instagram Reels in master quality.'
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

      {/* Interactive Hero Downloader on this landing page */}
      <DownloaderHero isSubpage={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Breadcrumb items={[{ label: 'Instagram Reel Downloader' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Professional Instagram Reel Video Downloader
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Fast, direct public Instagram Reel extraction engineered for creators, marketers, and researchers who require reliable media backups.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Instagram Reel Technical Specifications & Architecture
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Instagram Reels are encoded specifically for mobile-first consumption. When an author posts a Reel, the platform transposes the source video into vertical container formats that adhere to strict rendering parameters:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Aspect Ratio & Resolution</span>
                <p className="text-slate-500 dark:text-slate-400">
                  9:16 vertical aspect ratio (1080 × 1920 pixels maximum master rendition). Lower renditions include 720 × 1280 and 480 × 854.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Codecs & Container</span>
                <p className="text-slate-500 dark:text-slate-400">
                  Container: standard MP4. Video Codec: H.264 (AVC Baseline/High) or HEVC. Audio Codec: AAC Stereo at 128 kbps to 256 kbps, 44.1/48 kHz.
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              SaveAMedia queries the public Content Delivery Network (CDN) to locate the highest progressive MP4 rendition, bypassing intermediate downsampling where possible so you receive optimal visual clarity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why In-Browser Preview Matters
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Many legacy downloaders force users to blindly download mystery files that may turn out to be corrupt, audio-less, or completely different videos. SaveAMedia integrates an HTML5 inline video player that streams the parsed media directly in your browser. You can confirm:
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm sm:text-base pl-2">
              <li>Audio synchronization and volume levels</li>
              <li>Visual resolution before consuming device storage</li>
              <li>Verification that the video is the exact Reel intended</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Reels vs. Stories vs. Feed Posts
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              While Instagram Stories expire after 24 hours and often require active user authentication, Instagram Reels are permanent public posts stored with permanent shortcodes (e.g., <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">/reel/C29abcdefgh/</code>). This architecture enables high-speed, link-based retrieval without session cookies or personal login tokens.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Related Guides:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/how-to-download-instagram-reels" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                Step-by-Step Guide →
              </Link>
              <Link href="/instagram-downloader-for-iphone" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                iPhone Safari Guide →
              </Link>
              <Link href="/instagram-downloader-for-android" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                Android Guide →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
