import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Scale, ShieldAlert, CheckCircle, AlertOctagon } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service - Responsible Use & Guidelines',
  description:
    'Review the SaveAMedia Terms of Service. Guidelines for authorized downloading of public Instagram Reels, personal use boundaries, and copyright ownership.',
  canonicalPath: '/terms',
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Breadcrumb items={[{ label: 'Terms of Service' }]} />

      <header className="mt-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last revised: January 2026 • Please read carefully before using SaveAMedia.
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By visiting or utilizing the services provided by SaveAMedia ({APP_CONFIG.canonicalDomain}), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the service immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            2. Permitted Use & Intellectual Property
          </h2>
          <p>
            SaveAMedia is an educational and utility web tool designed exclusively to facilitate personal offline access to publicly accessible media. You warrant and represent that:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li>You will only process media URLs for which you own the copyright or have received explicit authorization from the legitimate copyright holder.</li>
            <li>You will not re-distribute, re-sell, or broadcast downloaded material for commercial gain without license.</li>
            <li>You will respect creator attribution and copyright markings.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-500" />
            3. Prohibited Activities
          </h2>
          <p>
            Users are strictly prohibited from attempting to bypass technological access measures, scrape mass databases, abuse server gateways with automated bots, or reverse-engineer private Instagram profiles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            4. Third-Party Platform Disclaimer
          </h2>
          <p>
            SaveAMedia is an independent software tool and is not associated, affiliated, authorized, endorsed by, or in any way officially connected with Instagram, Meta Platforms, Inc., or any of their affiliates or subsidiaries. The official Instagram website can be found at https://instagram.com.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            5. Disclaimer of Warranties
          </h2>
          <p>
            The service is provided on an "AS IS" and "AS AVAILABLE" basis without representations or warranties of any kind. SaveAMedia does not guarantee uninterrupted availability, error-free operation, or that Instagram media URLs will remain permanently accessible.
          </p>
        </section>
      </div>
    </div>
  );
}
