import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateFaqSchema, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { Video, Zap, CheckCircle, ArrowRight, Monitor, Layers, Eye } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Instagram Reel Downloader 1080p Full HD - Highest Quality MP4',
  description:
    'Download public Instagram Reels in true 1080p Full HD and 60fps. Save the highest bitrate MP4 master video available from Instagram servers with zero downsampling.',
  canonicalPath: '/instagram-reel-downloader-1080p',
  keywords: [
    'Instagram Reel Downloader 1080p',
    'Download Instagram Reels 1080p Full HD',
    'High Quality Instagram Reel Downloader',
    'Download 4K Instagram Reels',
    'Save Instagram Reels 60fps',
    'Instagram Video Downloader Max Quality',
    'Highest Bitrate Reel Downloader',
  ],
});

const HD_FAQS = [
  {
    question: 'Does Instagram support 1080p Reel downloads?',
    answer:
      'Yes. Instagram stores vertical videos at up to 1080×1920 pixels (9:16 aspect ratio). When creators upload in high quality, SaveAMedia detects the top-tier progressive MP4 rendition and provides direct access to the 1080p stream.',
  },
  {
    question: 'Why do other downloaders only provide 720p or lower quality?',
    answer:
      'Many legacy downloaders fetch only the initial mobile preview rendition (often capped at 720×1280 or 480×854) to conserve their own server bandwidth. SaveAMedia queries public edge nodes for the master progressive video file.',
  },
  {
    question: 'Can I download 4K or 60fps Instagram Reels?',
    answer:
      'Instagram currently transcodes all uploaded videos to a maximum resolution of 1080×1920 pixels. If the creator filmed in 60fps, Instagram preserves the 60fps framerate in the 1080p rendition, which SaveAMedia delivers directly.',
  },
  {
    question: 'How much data does a 1080p Reel download consume?',
    answer:
      'A typical 30-second to 60-second 1080p Reel encoded with H.264 at high bitrate ranges from 12 MB to 35 MB, depending on visual complexity, motion, and audio track fidelity.',
  },
];

export default function InstagramReel1080pPage() {
  const faqSchema = generateFaqSchema(HD_FAQS);
  const howToSchema = generateHowToSchema(
    'How to Download Instagram Reels in 1080p Full HD',
    'Learn how to secure highest-bitrate 1080p MP4 videos from public Instagram Reels.'
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: '1080p Full HD Downloader', url: '/instagram-reel-downloader-1080p' },
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
        <Breadcrumb items={[{ label: '1080p Full HD Downloader' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
              <Monitor className="w-3.5 h-3.5" />
              <span>Full HD 1080p Mastery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Instagram Reel Downloader 1080p Full HD
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Extract public Instagram Reels in pristine 1080×1920 Full HD and up to 60fps. Save the highest bitrate stream available without intermediate transcoding or pixelation.
            </p>
          </header>

          {/* Technical Specs Grid */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Technical Quality Specifications (1080p Master Stream)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-brand-600 dark:text-brand-400 block mb-1">
                  1080×1920 Pixels
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Exact 9:16 vertical Full HD resolution, ideal for Apple Retina displays, 4K monitors, and video production timelines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-accent-violet block mb-1">
                  Up to 60 FPS
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Smooth motion playback preserving fast action, dance sequences, sports highlights, and high-framerate creator footage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-emerald-500 block mb-1">
                  High Bitrate H.264
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clean encoding profile preventing macroblocking, color banding, and compression artifacts in dark or complex scenes.
                </p>
              </div>
            </div>
          </section>

          {/* How SaveAMedia Extracts 1080p */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              How SaveAMedia Discovers the 1080p Rendition
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Instagram uses Dynamic Adaptive Streaming over HTTP (DASH). When you watch a Reel on your phone, Instagram often downgrades the stream to 720p or 480p if your cellular reception dips.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              SaveAMedia does not rely on device network conditions. Our backend gateway parses the underlying media presentation description (MPD) manifest to extract the highest bandwidth representation available on Meta's CDN, ensuring you get the maximum quality available.
            </p>
          </section>

          {/* FAQs */}
          <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1080p Quality Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {HD_FAQS.map((faq, index) => (
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

          {/* Navigation */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">Related Quality Tools:</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/instagram-video-downloader-without-watermark"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                No Watermark HD →
              </Link>
              <Link
                href="/instagram-audio-downloader"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Audio Extractor →
              </Link>
              <Link
                href="/save-instagram-reels-to-camera-roll"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Save to Camera Roll →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
