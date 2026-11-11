import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Sparkles, Shield, Cpu, Users, Heart, ArrowRight, CheckCircle2, Lock, Globe } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = constructMetadata({
  title: 'About Us - Our Mission & Engineering Principles',
  description:
    'Learn about SaveAMedia, our mission to build a clean, ad-light, privacy-first Instagram Reel downloader, and the edge engineering behind our sub-second extraction gateway.',
  canonicalPath: '/about',
  keywords: [
    'About SaveAMedia',
    'SaveAMedia Mission',
    'Instagram Reel Downloader Team',
    'Privacy-First Media Tools',
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={[{ label: 'About Us' }]} />

      <header className="mt-6 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          About SaveAMedia
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          We believe downloading public media should be fast, private, and free from intrusive pop-ups, fake download buttons, and forced account registrations.
        </p>
      </header>

      <div className="space-y-12 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Why We Built SaveAMedia */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            Why We Built SaveAMedia
          </h2>
          <p>
            For years, the online media downloader landscape has been plagued by predatory user experiences: websites littered with deceptive "Download Now" advertisements, disguised malware prompts, slow rendering speeds, and tools that demand users enter their private social media passwords.
          </p>
          <p>
            We created <strong>SaveAMedia</strong> in 2026 to set a new benchmark in web utility design. By utilizing modern web technologies like Next.js 14, TypeScript, and edge gateway computing, we provide creators, educators, journalists, and everyday users with an ultra-clean, trustworthy tool that does exactly what it promises—extracting clean 1080p video and MP3 audio in seconds without compromise.
          </p>
        </section>

        {/* Core Principles */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            Our Core Engineering Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Lock className="w-4 h-4 text-brand-500" />
                <span>Zero Account Credentials</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You will never be asked to log in or share passwords. We operate purely on publicly accessible URL links.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Client-Side Sanitization</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Our code strips personal tracking parameters (?igsh=) directly inside your browser before sending extraction requests.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Cpu className="w-4 h-4 text-accent-violet" />
                <span>True 1080p Master Rendition</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                We discover the uncompressed progressive MP4 master stream from public CDN nodes with zero watermark overlays.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Universal Device Support</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Full native support for Apple Safari on iPhone, Google Chrome on Android, and all modern desktop web browsers.
              </p>
            </div>
          </div>
        </section>

        {/* Ethical Commitment */}
        <section className="space-y-4 p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 via-accent-violet/5 to-transparent border border-brand-500/20">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Ethical Boundaries & Creator Rights
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            SaveAMedia is designed for authorized personal archiving, educational study, and fair use research under 17 U.S.C. § 107. We strictly respect creator privacy boundaries: we do not access private Instagram accounts, deleted media, or restricted profiles. We urge all users to always respect creator copyright and refrain from re-uploading or commercializing others' creative work without proper consent.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Have Questions or Want to Get in Touch?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Our engineering and support team is always available to answer technical inquiries, take feedback, or handle partnership requests.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
