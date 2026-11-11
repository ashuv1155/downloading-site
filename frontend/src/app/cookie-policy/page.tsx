import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Cookie, Shield, CheckCircle, ExternalLink, Settings, Eye } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = constructMetadata({
  title: 'Cookie Policy & Cookie Consent Management - SaveAMedia',
  description:
    'Learn how SaveAMedia uses essential cookies, analytics tokens, and Google AdSense advertising cookies. Detailed instructions for managing and disabling cookies across browsers.',
  canonicalPath: '/cookie-policy',
  keywords: [
    'SaveAMedia Cookie Policy',
    'Manage Cookies SaveAMedia',
    'Google AdSense Cookie Opt Out',
    'Third-Party Advertising Cookies',
  ],
});

export default function CookiePolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cookie Policy', url: '/cookie-policy' },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={[{ label: 'Cookie Policy' }]} />

      <header className="mt-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
          <Cookie className="w-3.5 h-3.5" />
          <span>ePrivacy Directive & Google AdSense Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Cookie Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last revised: January 2026 • Effective Date: January 1, 2026
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            This Cookie Policy explains what cookies are, how <strong>SaveAMedia</strong> ("we", "us", or "our") uses them on <code className="text-brand-600 dark:text-brand-400">{APP_CONFIG.canonicalDomain}</code>, and how you can manage your preferences.
          </p>
        </section>

        {/* What are Cookies */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites function properly, work more efficiently, and provide reporting information to website operators.
          </p>
        </section>

        {/* Types of Cookies Used */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-500" />
            2. Categories of Cookies We Use
          </h2>

          <div className="space-y-4 pt-1">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                A. Strictly Necessary & Functional Cookies (Essential)
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                These cookies are necessary for the website to function and cannot be switched off. They store your theme preference (<code className="font-mono text-xs">saveamedia-theme</code>), preserve your cookie consent selection, and enforce rate-limiting protections against automated denial-of-service attacks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                B. Analytics & Performance Cookies
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                These allow us to count page visits and extraction traffic sources so we can measure and improve gateway stability. All data collected by these cookies is aggregated and completely anonymous.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 block">
                C. Advertising Cookies (Google AdSense & DoubleClick DART)
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Third-party advertising vendors, including Google, set cookies to serve relevant ads to you based on your browsing patterns across this site and other websites on the Internet. These cookies also limit the number of times you see an ad (frequency capping) and measure the effectiveness of advertising campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* How to Opt-Out & Manage Cookies */}
        <section className="space-y-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-brand-500/5 to-transparent border border-blue-500/20">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-500" />
            3. How to Opt Out of Advertising Cookies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            You can manage or opt out of personalized third-party advertising cookies at any time using the official industry tools:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-2">
            <li>
              <strong>Google Ad Settings:</strong>{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-1"
              >
                https://adssettings.google.com <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <strong>Digital Advertising Alliance (DAA):</strong>{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-1"
              >
                https://www.aboutads.info/choices <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <strong>Network Advertising Initiative (NAI):</strong>{' '}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-1"
              >
                https://optout.networkadvertising.org <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </section>

        {/* Browser Settings Guide */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            4. Managing Cookies in Your Web Browser
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Most modern web browsers allow you to control cookies through their settings preferences:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-1">Google Chrome:</strong>
              Settings &gt; Privacy and security &gt; Third-party cookies &gt; Block third-party cookies.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-1">Apple Safari (iOS & Mac):</strong>
              Settings / Preferences &gt; Privacy &gt; Prevent Cross-Site Tracking.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-1">Mozilla Firefox:</strong>
              Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection &gt; Strict.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-1">Microsoft Edge:</strong>
              Settings &gt; Cookies and site permissions &gt; Manage and delete cookies.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
