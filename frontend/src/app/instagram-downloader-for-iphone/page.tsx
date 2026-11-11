import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { Apple, Smartphone, FolderDown, Image, Share, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Instagram Reel Downloader for iPhone - iOS & Safari Guide',
  description:
    'Step-by-step guide on downloading public Instagram Reels on iPhone and iPad using Safari. Learn how to save MP4 videos directly to your Camera Roll / Photos app.',
  canonicalPath: '/instagram-downloader-for-iphone',
  keywords: [
    'Instagram Downloader for iPhone',
    'Download Reels on iPhone',
    'Save Instagram Reels to Camera Roll',
    'iOS Reel Downloader Safari',
  ],
});

export default function InstagramDownloaderForIphonePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'For iPhone', url: '/instagram-downloader-for-iphone' },
  ]);
  const howToSchema = generateHowToSchema(
    'How to Download Instagram Reels on iPhone to Camera Roll',
    'Step-by-step tutorial on using Safari to download public Reels directly into iOS Photos.'
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
        <Breadcrumb items={[{ label: 'Instagram Downloader for iPhone' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
              <Apple className="w-3.5 h-3.5" />
              <span>iOS 15 / 16 / 17 / 18 Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              How to Download Instagram Reels on iPhone to Camera Roll
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Apple’s Safari mobile browser includes a native Download Manager. Follow this exact workflow to download public Reels and save them directly into your iPhone Photos app.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Safari Is Required on iOS
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              If you open links from inside Instagram or other social media apps, iOS renders them in an "In-App Browser" (SFSafariViewController), which frequently blocks direct file downloads. For the smoothest experience, always use the standalone <strong>Safari</strong> browser app on your iPhone.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Step-by-Step: From Link to Photos App
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    Copy Link in Instagram
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Open Instagram, tap the Share arrow on the public Reel, and select <strong>"Copy link"</strong>.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    Paste & Extract on SaveAMedia
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Open Safari, visit SaveAMedia, paste your link, and tap <strong>Download Reel</strong>. Review the video preview player.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    Confirm Safari Prompt
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    When tapping Download, Safari displays: <em>"Do you want to download this file?"</em> Tap <strong className="text-brand-600 dark:text-brand-400">Download</strong>. A blue circular arrow will appear in Safari’s address bar.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darkCard flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-4">
                    4
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    Save to Camera Roll
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tap the blue down-arrow in Safari &gt; tap the downloaded MP4 video &gt; tap the iOS Share icon at the bottom left &gt; tap <strong>"Save Video"</strong>. The Reel is now in your Photos app!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Where do downloaded files go on iPhone?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              By default, iOS stores web downloads inside the built-in <strong>Files</strong> app under the <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">iCloud Drive &gt; Downloads</code> or <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">On My iPhone &gt; Downloads</code> directory. Following Step 4 above immediately registers the file with your system Photo Library.
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
              <span>Download Reel on iPhone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
