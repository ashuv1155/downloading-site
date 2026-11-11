import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateFaqSchema, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { Smartphone, Image as ImageIcon, CheckCircle, ArrowRight, Apple, Play } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'How to Save Instagram Reels to Camera Roll with Audio (iPhone & Android)',
  description:
    'Complete step-by-step guide on how to save public Instagram Reels directly to your iPhone Camera Roll or Android Gallery with audio, in 1080p HD, without posting or installing third-party apps.',
  canonicalPath: '/save-instagram-reels-to-camera-roll',
  keywords: [
    'Save Instagram Reels to Camera Roll',
    'How to Save Instagram Reels to Camera Roll',
    'Save IG Reels to Photos iPhone',
    'Download Instagram Reels to Gallery Android',
    'Save Instagram Reels to Camera Roll Without Posting',
    'Save Reel to Camera Roll With Audio',
    'Save Instagram Video to Camera Roll Free',
  ],
});

const CAMERA_ROLL_FAQS = [
  {
    question: 'How do I save an Instagram Reel to my iPhone Camera Roll?',
    answer:
      'Copy the public Reel link, paste it into SaveAMedia in Safari, and tap "Download 1080p". When Safari finishes downloading, open the "Files" app > go to "Downloads" > tap the video > tap the Share icon (square with upward arrow) > tap "Save Video". The Reel is now saved directly in your iPhone Photos / Camera Roll with full sound.',
  },
  {
    question: 'How do I save an Instagram Reel to my Android Gallery?',
    answer:
      'Open Chrome or Samsung Internet, paste the Reel link into SaveAMedia, and tap "Download Reel". Tap "Download 1080p". The file saves to your device Download folder and automatically indexes into Google Photos or Samsung Gallery within seconds.',
  },
  {
    question: 'Will the saved video have audio and music?',
    answer:
      'Yes! Unlike Instagram’s internal "Save to Camera Roll" draft feature which frequently mutes copyrighted audio tracks, SaveAMedia captures the full muxed MP4 container containing both high-definition video and original stereo audio.',
  },
  {
    question: 'Do I need to post the Reel to save it to my camera roll?',
    answer:
      'No. You do not need to post, publish, or share anything to your Instagram account or stories to save the video.',
  },
];

export default function SaveToCameraRollPage() {
  const faqSchema = generateFaqSchema(CAMERA_ROLL_FAQS);
  const howToSchema = generateHowToSchema(
    'How to Save Instagram Reels to Camera Roll (iPhone & Android)',
    'A quick visual guide to saving public Instagram Reels to your device photo gallery.'
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Save to Camera Roll', url: '/save-instagram-reels-to-camera-roll' },
  ]);

  return (
    <div className="w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <DownloaderHero isSubpage={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Breadcrumb items={[{ label: 'Save to Camera Roll' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Mobile Photo Gallery Workflow</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              How to Save Instagram Reels to Camera Roll (With Audio)
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Save any public Instagram Reel directly into your iPhone Photos app or Android Gallery in full 1080p HD without audio muting, watermark stamps, or third-party app installations.
            </p>
          </header>

          {/* Quick Conversational Answer Hook for AEO / SearchGPT */}
          <section className="p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 via-accent-violet/5 to-transparent border border-brand-500/20">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Direct Answer: How to Save to Camera Roll in 30 Seconds
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              To save an Instagram Reel to your camera roll with sound: <strong>Copy the Reel link</strong> from Instagram, <strong>paste it into SaveAMedia.com</strong> on your mobile browser, and tap <strong>Download 1080p</strong>. On iPhone, open <em>Files &gt; Downloads</em>, tap the video, tap <em>Share</em>, and select <strong>"Save Video"</strong>. On Android, the MP4 downloads automatically into your <em>Downloads</em> folder and appears immediately inside your Photos / Gallery app.
            </p>
          </section>

          {/* Detailed Platform Instructions */}
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Method 1: Save to iPhone Camera Roll (iOS Safari)
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-brand-600 dark:text-brand-400 block">Step 1: Copy Link & Extract</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  In Instagram, tap the Share icon on the Reel and tap <strong>Copy link</strong>. Open Apple Safari, go to <strong>saveamedia.com</strong>, paste the link, and tap <strong>Download Reel</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-brand-600 dark:text-brand-400 block">Step 2: Safari Download Prompt</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  Tap <strong>Download 1080p</strong>. Safari will display a system dialog: <em>"Do you want to download 'SaveAMedia_Reel_...mp4'?"</em> Tap <strong>Download</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-brand-600 dark:text-brand-400 block">Step 3: Move Video from Files to Photos</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  Tap the circular downward arrow in the Safari address bar and tap the downloaded video. Then tap the <strong>Share</strong> button (bottom-left) and select <strong>Save Video</strong>. The video is now stored permanently in your iPhone Camera Roll!
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Method 2: Save to Android Gallery (Google Chrome & Samsung Internet)
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-accent-violet block">Automatic Gallery Sync</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  Android automatically scans your internal storage for newly created media files. When you tap <strong>Download 1080p</strong> on SaveAMedia using Chrome or Samsung Internet, the MP4 file lands directly in your <code>/Download/</code> directory. Android’s media scanner detects it within seconds, making it available in Google Photos, Samsung Gallery, and WhatsApp.
                </p>
              </div>
            </div>
          </section>

          {/* Why Instagram Mutes Audio */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Does Instagram Mute Audio When Saving In-App?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              When you try to save a Reel using Instagram's native "Save to Camera Roll" three-dot menu, Instagram often strips the audio track and displays a notice stating: <em>"Audio removed due to copyright restrictions."</em>
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              SaveAMedia circumvents this issue because it accesses the public CDN container stream, preserving the original audio encoding without stripping musical tracks or voiceovers.
            </p>
          </section>

          {/* FAQs */}
          <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions: Camera Roll Saving
            </h2>
            <div className="space-y-4">
              {CAMERA_ROLL_FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Navigation Links */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">Related Articles:</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/instagram-downloader-for-iphone"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                iPhone Guide →
              </Link>
              <Link
                href="/instagram-downloader-for-android"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Android Guide →
              </Link>
              <Link
                href="/instagram-video-downloader-without-watermark"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                No Watermark →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
