import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Shield, Lock, EyeOff, FileText, Cookie, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy & Google AdSense Compliance - SaveAMedia',
  description:
    'Comprehensive Privacy Policy for SaveAMedia. Disclosures on zero credential storage, Google AdSense cookies, DART cookie opt-outs, GDPR, CCPA, and client-side URL sanitation.',
  canonicalPath: '/privacy-policy',
  keywords: [
    'SaveAMedia Privacy Policy',
    'Google AdSense Cookie Policy',
    'Instagram Downloader Privacy',
    'GDPR CCPA Compliance SaveAMedia',
  ],
});

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <header className="mt-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Privacy & Compliance Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last revised: January 2026 • Effective Date: January 1, 2026 • Compliant with Google AdSense, GDPR & CCPA
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            At <strong>SaveAMedia</strong> (accessible at <code className="text-brand-600 dark:text-brand-400">{APP_CONFIG.canonicalDomain}</code>), we prioritize the privacy and security of our visitors. This Privacy Policy document outlines the types of personal and non-personal information collected, how it is recorded and used, and your explicit rights under international data protection laws including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and Google AdSense publisher policies.
          </p>
        </section>

        {/* Section 1: Zero Credential Collection */}
        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-500" />
            1. Zero Credential & Authentication Policy
          </h2>
          <p>
            SaveAMedia operates under a strict <strong>zero-credential</strong> architecture. When using our Instagram Reel Downloader:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li>We <strong>never</strong> ask for, record, or store your Instagram username or password.</li>
            <li>We <strong>never</strong> request your Instagram two-factor authentication (2FA) codes or session tokens.</li>
            <li>We <strong>never</strong> access your private Instagram direct messages, follower lists, or private profile media.</li>
            <li>All extractions are performed strictly on publicly accessible URLs published on public Meta Content Delivery Networks.</li>
          </ul>
        </section>

        {/* Section 2: Google AdSense & Third-Party Advertising (MANDATORY FOR ADSENSE) */}
        <section className="space-y-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-brand-500/5 to-transparent border border-blue-500/20">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cookie className="w-5 h-5 text-blue-500" />
            2. Google AdSense & DoubleClick DART Cookies Policy
          </h2>
          <p>
            Google is a third-party vendor on our site. Google uses cookies, specifically DoubleClick DART cookies, to serve advertisements to our site visitors based upon their visit to <code className="text-brand-600 dark:text-brand-400">{APP_CONFIG.canonicalDomain}</code> and other websites across the Internet.
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <p>
              <strong>Important Disclosures required by Google AdSense Policies:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
              </li>
              <li>
                Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting Google's official Ads Settings page:{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-1"
                >
                  Google Ads Settings <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the Digital Advertising Alliance consumer choice page:{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-1"
                >
                  www.aboutads.info <ExternalLink className="w-3 h-3" />
                </a>{' '}
                or the Network Advertising Initiative opt-out page at{' '}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-1"
                >
                  networkadvertising.org <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                Users located in the European Union / UK can manage ad consent via the EDAA consumer portal at{' '}
                <a
                  href="https://www.youronlinechoices.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-1"
                >
                  youronlinechoices.eu <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Client-Side URL Tracking Sanitization */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-accent-violet" />
            3. Client-Side URL Sanitation & Anti-Tracking
          </h2>
          <p>
            When users copy share links from the Instagram mobile app, tracking parameters are automatically attached (such as <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs font-mono">?igsh=...</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs font-mono">?utm_source=...</code>, and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs font-mono">?fbclid=...</code>).
          </p>
          <p>
            SaveAMedia runs an automated client-side regular expression sanitizer directly inside your browser. Before any request is transmitted over the network, all tracking parameters are stripped. This ensures that your private sharing ID cannot be correlated across web queries.
          </p>
        </section>

        {/* Section 4: Log Files & Web Analytics */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            4. Log Files and Aggregate Telemetry
          </h2>
          <p>
            Like most standard website hosts, SaveAMedia follows a standard procedure of utilizing log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable. The sole purpose of this information is for analyzing trends, administering the site, tracking server health, and defending against DDoS abuse.
          </p>
        </section>

        {/* Section 5: GDPR Data Protection Rights */}
        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            5. GDPR Privacy Rights (European Economic Area & UK)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            If you reside in the EEA or UK, you are entitled to the following rights under Regulation (EU) 2016/679 (GDPR):
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request correction of inaccurate data.</li>
            <li><strong>The right to erasure ("Right to be Forgotten"):</strong> You have the right to request deletion of your personal data under certain conditions.</li>
            <li><strong>The right to restrict or object to processing:</strong> You have the right to object to our processing of your personal data.</li>
            <li><strong>The right to data portability:</strong> You have the right to request that we transfer data collected to another organization.</li>
          </ul>
        </section>

        {/* Section 6: CCPA / CPRA Privacy Rights */}
        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            6. California Consumer Privacy Act (CCPA / CPRA)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California consumers have specific rights:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li>The right to know what personal data categories a business collects.</li>
            <li>The right to request deletion of personal information collected by the business.</li>
            <li><strong>Non-Sale of Personal Data:</strong> SaveAMedia does <strong>not sell, rent, or trade</strong> your personal data to third parties for monetary or valuable consideration.</li>
            <li>The right to non-discrimination for exercising your CCPA privacy rights.</li>
          </ul>
        </section>

        {/* Section 7: COPPA Children's Information */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            7. Children's Online Privacy Protection Act (COPPA)
          </h2>
          <p>
            Protecting the privacy of young children is especially important. SaveAMedia does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe that your child provided personal information on our website, we strongly encourage you to contact us immediately and we will make best efforts to promptly remove such information from our records.
          </p>
        </section>

        {/* Section 8: Contact Information */}
        <section className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            8. Data Controller & Privacy Officer Contact
          </h2>
          <p>
            If you have additional questions, require more information about our Privacy Policy, or wish to exercise any of your legal privacy rights, do not hesitate to contact our designated Privacy Compliance Team:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-1">
            <p className="font-bold text-slate-900 dark:text-white">SaveAMedia Privacy & Compliance Office</p>
            <p className="text-slate-600 dark:text-slate-400">Email: <a href={`mailto:${APP_CONFIG.supportEmail}`} className="text-brand-600 dark:text-brand-400 font-semibold">{APP_CONFIG.supportEmail}</a></p>
            <p className="text-slate-600 dark:text-slate-400">Website: <a href={APP_CONFIG.canonicalDomain} className="text-brand-600 dark:text-brand-400 font-semibold">{APP_CONFIG.canonicalDomain}</a></p>
            <p className="text-slate-600 dark:text-slate-400">Response SLA: Within 24–48 business hours</p>
          </div>
        </section>
      </div>
    </div>
  );
}
