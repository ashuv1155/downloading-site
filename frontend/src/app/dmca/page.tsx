import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Scale, ShieldAlert, CheckCircle, Mail, AlertOctagon, FileText } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = constructMetadata({
  title: 'DMCA Copyright Policy & Takedown Procedure - SaveAMedia',
  description:
    'SaveAMedia DMCA copyright policy, designated agent contact details, and notice submission procedures in accordance with 17 U.S.C. Section 512(c).',
  canonicalPath: '/dmca',
  keywords: [
    'SaveAMedia DMCA Policy',
    'Instagram Downloader Copyright Takedown',
    'Designated DMCA Agent SaveAMedia',
    'DMCA Notice Submission',
  ],
});

export default function DmcaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'DMCA Policy', url: '/dmca' },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={[{ label: 'DMCA Policy' }]} />

      <header className="mt-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Copyright Compliance (17 U.S.C. § 512)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          DMCA Copyright Policy & Takedown Procedure
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          SaveAMedia respects the intellectual property rights of creators and adheres to the Digital Millennium Copyright Act of 1998.
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            <strong>SaveAMedia</strong> ({APP_CONFIG.canonicalDomain}) is an automated web utility that allows users to parse publicly available Instagram media URLs. We do not host, store, duplicate, or maintain a permanent catalog of third-party media files on our servers. All media data is streamed directly from public Meta/Instagram content distribution nodes to the requesting user’s browser client.
          </p>
          <p>
            It is our strict policy to respond promptly to clear, formal notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act of 1998 (17 U.S.C. § 512).
          </p>
        </section>

        {/* Requirements for Filing a Notice */}
        <section className="space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-500" />
            Requirements for Filing a Valid DMCA Notice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            To file a valid copyright infringement notification with our designated agent, you must provide a written communication containing all of the following six elements:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-1">
            <li>
              <strong>Physical or Electronic Signature:</strong> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
            </li>
            <li>
              <strong>Identification of Copyrighted Work:</strong> Clear identification of the copyrighted work claimed to have been infringed, or, if multiple works are covered by a single notification, a representative list.
            </li>
            <li>
              <strong>Identification of Infringing URL:</strong> Identification of the specific material or public Instagram URL that is claimed to be infringing, with information sufficient to allow us to locate the material.
            </li>
            <li>
              <strong>Contact Information:</strong> Information reasonably sufficient to permit us to contact you, including your legal name, physical mailing address, telephone number, and email address.
            </li>
            <li>
              <strong>Good Faith Statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              <strong>Accuracy & Perjury Statement:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
            </li>
          </ol>
        </section>

        {/* Designated Agent Details */}
        <section className="space-y-3 p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-accent-violet/5 to-transparent border border-brand-500/20">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-brand-500" />
            Designated DMCA Agent Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Please direct all DMCA notices and copyright communications to our Designated Copyright Agent:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1">
            <p><strong>Entity:</strong> SaveAMedia Technologies Inc.</p>
            <p><strong>Attn:</strong> Designated DMCA Compliance Officer</p>
            <p><strong>Email:</strong> <a href={`mailto:${APP_CONFIG.supportEmail}`} className="text-brand-400 hover:underline">{APP_CONFIG.supportEmail}</a></p>
            <p><strong>Subject Line Required:</strong> DMCA Copyright Takedown Request - [URL or Title]</p>
            <p><strong>Turnaround SLA:</strong> All valid notices are processed and blacklisted within 24–48 hours.</p>
          </div>
        </section>

        {/* Counter-Notification */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Counter-Notification Procedure (17 U.S.C. § 512(g))
          </h2>
          <p>
            If you believe your content was blocked or removed as a result of mistake or misidentification, you may submit a formal counter-notification in writing to our designated agent containing your physical/electronic signature, identification of the material removed, a statement under penalty of perjury of good faith belief, and consent to federal jurisdiction.
          </p>
        </section>

        {/* Repeat Infringer Policy */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Repeat Infringer Policy
          </h2>
          <p>
            In accordance with the DMCA and other applicable international intellectual property laws, SaveAMedia has adopted a policy of blacklisting and terminating access for users or IP ranges who are determined to be repeat infringers in appropriate circumstances.
          </p>
        </section>
      </div>
    </div>
  );
}
