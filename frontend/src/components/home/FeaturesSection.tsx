import React from 'react';
import { FEATURES_LIST } from '@/lib/constants';
import {
  Sparkles,
  Zap,
  PlayCircle,
  Smartphone,
  Chrome,
  Bookmark,
} from 'lucide-react';

const FEATURE_ICONS = {
  Sparkles,
  Zap,
  PlayCircle,
  Smartphone,
  Chrome,
  Bookmark,
};

export function FeaturesSection() {
  return (
    <section className="w-full py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            Engineered For Performance
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Key Downloader Features
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A reliable toolchain designed for fast, clean public Reel extraction with verified video streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((feat) => {
            const Icon = FEATURE_ICONS[feat.icon as keyof typeof FEATURE_ICONS] || Sparkles;
            return (
              <div
                key={feat.id}
                className="rounded-2xl bg-white dark:bg-surface-darkCard p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-brand-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
