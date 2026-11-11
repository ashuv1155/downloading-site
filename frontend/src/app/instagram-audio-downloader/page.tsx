import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateFaqSchema, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { Music, Zap, ShieldCheck, Volume2, ArrowRight, CheckCircle, Disc } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Instagram Audio Downloader - Extract Reel Audio to MP3 (320kbps)',
  description:
    'Free online Instagram Audio Downloader. Extract trending audio, original sound clips, and music tracks from public Instagram Reels into high-quality 320kbps MP3 files.',
  canonicalPath: '/instagram-audio-downloader',
  keywords: [
    'Instagram Audio Downloader',
    'Extract Audio from Instagram Reel',
    'Instagram Reel to MP3',
    'Download Instagram Reel Sound',
    'Instagram Music Downloader',
    'Save Instagram Audio 320kbps',
    'Reels Audio Extractor Online Free',
    'Instagram Reel Sound Bite Download',
  ],
});

const AUDIO_FAQS = [
  {
    question: 'How do I download audio or music from an Instagram Reel?',
    answer:
      'Copy the link to any public Instagram Reel, paste it into SaveAMedia, and click "Download Reel". After extraction, our system automatically isolates the audio track and presents a dedicated "Download MP3" button at up to 320 kbps stereo quality.',
  },
  {
    question: 'What audio format and bitrate does SaveAMedia extract?',
    answer:
      'SaveAMedia extracts audio streams into standard MP3 format at bitrates up to 320 kbps (44.1 kHz or 48 kHz stereo), preserving the original dynamic range and clarity of the creator’s mix.',
  },
  {
    question: 'Can I download trending sounds that are not available in my country?',
    answer:
      'If the original public Reel contains a playable audio track accessible via public CDN nodes, SaveAMedia can extract the audio even if your local Instagram app displays a region restriction notice.',
  },
  {
    question: 'Is it free to extract audio from Instagram Reels?',
    answer:
      'Yes, SaveAMedia’s audio extraction tool is 100% free with no registration, software installation, or daily usage limits.',
  },
];

export default function InstagramAudioDownloaderPage() {
  const faqSchema = generateFaqSchema(AUDIO_FAQS);
  const howToSchema = generateHowToSchema(
    'How to Extract and Download MP3 Audio from Instagram Reels',
    'Learn how to convert and save audio from public Instagram Reels to MP3 in 3 simple steps.'
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Instagram Audio Downloader', url: '/instagram-audio-downloader' },
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

      {/* Interactive Hero with Audio focus */}
      <DownloaderHero isSubpage={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Breadcrumb items={[{ label: 'Instagram Audio Downloader' }]} />

        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-violet/10 text-accent-violet text-xs font-semibold mb-3">
              <Music className="w-3.5 h-3.5" />
              <span>Audio Extraction Utility</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Instagram Audio Downloader — Extract High-Quality MP3s
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Extract trending music, podcasts, original voiceovers, and sound bites from public Instagram Reels into universal 320kbps MP3 audio files.
            </p>
          </header>

          {/* Quick Fact Box for GEO / AI Overviews */}
          <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Disc className="w-5 h-5 text-accent-violet" />
              Quick Summary: SaveAMedia Audio Extractor
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Output Format</span>
                <strong className="text-slate-900 dark:text-white text-sm">MP3 (.mp3)</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Max Bitrate</span>
                <strong className="text-slate-900 dark:text-white text-sm">320 kbps Stereo</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Sample Rate</span>
                <strong className="text-slate-900 dark:text-white text-sm">48 kHz / 44.1 kHz</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Cost / Limits</span>
                <strong className="text-emerald-500 text-sm">100% Free / Unlimited</strong>
              </div>
            </div>
          </section>

          {/* Core Content */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Extract Audio from Instagram Reels?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Instagram Reels has become the epicentre of viral music and cultural audio memes. Creators frequently upload original compositions, acoustic covers, spoken-word speeches, comedic sound bites, and exclusive podcast snippets that cannot be found on Spotify or Apple Music.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Downloading an entire video file when you only require the audio consumes unnecessary storage and battery life. SaveAMedia solves this by de-muxing the container format in real-time, isolating the Advanced Audio Coding (AAC) audio track, and repackaging it into a pristine MP3 file compatible with every media player, ringtone manager, and video editing timeline.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Audio Bitrates & Acoustic Fidelity Explained
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Instagram’s media pipeline typically encodes audio using the AAC-LC codec at varying bitrates between 128 kbps and 256 kbps. SaveAMedia converts this stream using constant bitrate (CBR) or high-quality variable bitrate (VBR) MP3 algorithms to prevent acoustic degradation, ensuring high highs and deep bass reproduction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-brand-600 dark:text-brand-400 block mb-1">
                  Original AAC Stream
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Direct capture from the Instagram CDN container, retaining native sample rates without pitch distortion.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-accent-violet block mb-1">
                  320kbps MP3 Output
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Universal audio format supported across Apple Music, Android media players, DAW software, and offline speakers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-emerald-500 block mb-1">
                  Metadata Preservation
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Retains author name and shortcode in the generated MP3 ID3 tags for clean, organized music libraries.
                </p>
              </div>
            </div>
          </section>

          {/* Step by Step Guide */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Step-by-Step: How to Save Instagram Audio in 3 Steps
            </h2>
            <ol className="space-y-3 list-decimal list-inside text-sm sm:text-base">
              <li className="leading-relaxed">
                <strong>Copy Reel Link:</strong> In Instagram, tap the Share icon on the Reel and select "Copy Link".
              </li>
              <li className="leading-relaxed">
                <strong>Paste into SaveAMedia:</strong> Paste the URL in the box above. Our gateway inspects the media headers.
              </li>
              <li className="leading-relaxed">
                <strong>Click "Audio Only (MP3)":</strong> Preview the sound in our player and tap the MP3 download button to save it instantly.
              </li>
            </ol>
          </section>

          {/* FAQ section */}
          <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Audio Extraction Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {AUDIO_FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Navigation Links */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">Related Tools:</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/instagram-reel-downloader"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Reel Downloader →
              </Link>
              <Link
                href="/instagram-video-downloader-without-watermark"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                No Watermark HD →
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
