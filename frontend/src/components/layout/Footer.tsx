'use client';

import React from 'react';
import Link from 'next/link';
import { APP_CONFIG, NAV_LINKS, LEGAL_LINKS, SEO_PAGES_NAV } from '@/lib/constants';
import { SAVEAMEDIA_ICON_DATA_URI } from '@/lib/logoData';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 font-display text-xl font-bold text-slate-900 dark:text-white">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                <img
                  src={SAVEAMEDIA_ICON_DATA_URI}
                  alt="SaveAMedia emblem"
                  className="w-full h-full object-contain"
                  width={36}
                  height={36}
                />
              </div>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent font-extrabold whitespace-nowrap">
                Save<span className="text-brand-500">AMedia</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, high-fidelity public Instagram Reel downloader. Instant in-browser MP4 video preview, 1080p stream extraction, and zero login requirement.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Independent & Privacy-First Utility</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialized Guides */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform Guides
            </h3>
            <ul className="space-y-2 text-sm">
              {SEO_PAGES_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Support
            </h3>
            <ul className="space-y-2 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${APP_CONFIG.supportEmail}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1"
                >
                  <span>{APP_CONFIG.supportEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed max-w-4xl">
            <strong className="text-slate-700 dark:text-slate-400">Disclaimer:</strong> SaveAMedia is an independent educational web tool and is not affiliated, endorsed, or associated with Instagram, Meta Platforms, Inc., or any of their subsidiaries. This service only facilitates the parsing of publicly accessible media URLs where permitted by copyright holders. Users are solely responsible for ensuring they possess the necessary rights and permissions to download and store any third-party content.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© {currentYear} {APP_CONFIG.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Engineered with Next.js & TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
