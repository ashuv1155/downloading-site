import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AlertTriangle, ShieldCheck, Scale, CheckCircle, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = constructMetadata({
  title: 'Legal Disclaimer & Non-Affiliation Notice - SaveAMedia',
  description:
    'Legal disclaimer for SaveAMedia. Non-affiliation with Instagram or Meta Platforms, Inc., Fair Use policy, copyright guidelines, and limitation of liability.',
  canonicalPath: '/disclaimer',
  keywords: [
    'SaveAMedia Disclaimer',
    'Instagram Downloader Legal Notice',
    'Meta Platforms Non Affiliation',
    'Fair Use Notice SaveAMedia',
  ],
});

export default function DisclaimerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Disclaimer', url: '/disclaimer' },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={[{ label: 'Disclaimer' }]} />

      <header className="mt-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Notice of Non-Affiliation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Legal Disclaimer
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last revised: January 2026 • Please read this disclaimer carefully before using SaveAMedia.
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Section 1: Non-Affiliation */}
        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-brand-500" />
            1. Notice of Non-Affiliation with Meta Platforms, Inc.
          </h2>
          <p>
            <strong>SaveAMedia</strong> is an independent software tool and web utility. We are <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with Instagram, Meta Platforms, Inc., or any of their subsidiaries or affiliates.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            The official Instagram website can be accessed at <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline font-semibold">https://www.instagram.com</a>.
          </p>
        </section>

        {/* Section 2: Trademark Ownership */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            2. Trademark Ownership
          </h2>
          <p>
            The names "Instagram", "Meta", as well as related names, marks, emblems, and images are registered trademarks of their respective owners. The use of the word "Instagram" on this website is strictly for nominative, descriptive, and educational identification purposes under nominative fair use principles. SaveAMedia claims no intellectual property rights or ownership of any third-party trademarks.
          </p>
        </section>

        {/* Section 3: Educational and Fair Use Purpose */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            3. Educational & Fair Use Purpose (17 U.S.C. § 107)
          </h2>
          <p>
            SaveAMedia is designed exclusively as an educational tool to facilitate the private offline archival and study of publicly available media under Fair Use doctrine. We do not provide access to private, restricted, copyrighted-locked, or non-public content. Users are solely responsible for ensuring that their use of any extracted media complies with all applicable local, national, and international copyright laws.
          </p>
        </section>

        {/* Section 4: Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall SaveAMedia, its developers, operators, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with the use or inability to use this website, or for any unauthorized downloading, reproduction, or distribution of third-party media carried out by users.
          </p>
        </section>
      </div>
    </div>
  );
}
