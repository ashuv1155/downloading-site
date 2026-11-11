import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { BookOpen, CheckCircle, Smartphone, Laptop, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'How to Download Instagram Reels Online (2026 Tutorial)',
  description:
    'Complete 2026 tutorial on downloading public Instagram Reels on iOS, Android, PC, and Mac without apps or logins. Verified step-by-step instructions.',
  canonicalPath: '/how-to-download-instagram-reels',
  keywords: [
    'How to Download Instagram Reels',
    'Download Reels Online',
    'Instagram Reel Download Tutorial',
    'Save Instagram Reels 2026',
  ],
});

export default function HowToDownloadReelsPage() {
  const jsonLd = generateHowToSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'How to Download Instagram Reels', url: '/how-to-download-instagram-reels' },
  ]);

  return (
    <div className="w-full flex flex-col">
      <DownloaderHero isSubpage={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <Breadcrumb items={[{ label: 'How to Download Instagram Reels' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              How to Download Instagram Reels: Complete 2026 Tutorial
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Learn how to quickly save high-definition Instagram Reels to your device for offline viewing, research, or content creation.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why People Save Instagram Reels
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Instagram Reels host educational tutorials, fitness routines, recipe guides, marketing case studies, and creative inspiration. However, Instagram does not always offer a direct offline save option for every device or audio track, particularly when users want to watch content without a cellular data connection or save videos to desktop editing suites.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The 3-Step Downloading Process
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Step 1: Obtain the Clean Link
                </h3>
                <p className="text-sm leading-relaxed mb-3">
                  Navigate to the Reel within Instagram. Tap the Share icon (paper airplane) and click <strong>"Copy Link"</strong>. The URL will look like:
                </p>
                <code className="block p-3 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono text-xs text-brand-600 dark:text-brand-400">
                  https://www.instagram.com/reel/C29abcdefgh/?igsh=...
                </code>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Step 2: Submit to SaveAMedia
                </h3>
                <p className="text-sm leading-relaxed">
                  Paste the URL into the input field at the top of SaveAMedia. SaveAMedia parses the link, strips unnecessary UTM and tracking queries, and queries our API gateway to check for public stream availability.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Step 3: Preview and Save
                </h3>
                <p className="text-sm leading-relaxed">
                  Review the video preview directly in the player. Pick your preferred quality (1080p Full HD, 720p HD, or Audio Only MP3) and tap the Download button. The MP4 file is saved to your default download location.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Device-Specific Advice
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1">Apple iPhone & iPad</strong>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Always use Safari rather than in-app web views. Tap the blue download arrow in the address bar after saving to transfer the video into your Photos app.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1">Android Smartphones</strong>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Use Chrome or Samsung Internet. The MP4 file saves directly to your device storage and appears in your gallery immediately.
                </p>
              </div>
            </div>
          </section>

          <section className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Safety & Fair Use Guidelines</span>
            </div>
            <p>
              Only download videos that you have permission to store. Never claim ownership of content created by other individuals or redistribute videos commercially without written authorization.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">Ready to download?</span>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Go to Downloader</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
