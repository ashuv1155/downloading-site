import React from 'react';
import { Metadata } from 'next';
import { constructMetadata, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/home/FaqSection';
import { FAQ_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { HelpCircle, Mail, Bookmark } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'FAQ - Frequently Asked Questions About Instagram Reel Downloading',
  description:
    'Answers to all common questions regarding downloading Instagram Reels, safety, mobile compatibility, iPhone & Android storage, and rate limits.',
  canonicalPath: '/faq',
});

export default function FaqPage() {
  const jsonLd = generateFaqSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
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

      <Breadcrumb items={[{ label: 'FAQ' }]} />

      <header className="mt-6 mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Everything you need to know about SaveAMedia, copyright guidelines, audio extraction, and device-specific downloads.
        </p>
      </header>

      {/* Render Full FAQ component */}
      <div className="w-full">
        <FaqSection />
      </div>

      {/* Help box */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-tr from-brand-500/10 via-accent-violet/5 to-transparent border border-brand-500/20 text-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Have an unanswered question?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-5">
          If you are experiencing unexpected extraction errors or need technical assistance with your browser setup, our team is happy to help.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
          <Link
            href="/download-tools"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span>View Download Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
