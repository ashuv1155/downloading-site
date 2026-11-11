import React from 'react';
import { HOW_IT_WORKS_STEPS } from '@/lib/constants';
import { Copy, ClipboardPaste, Download, ArrowRight } from 'lucide-react';

const STEP_ICONS = {
  Copy,
  ClipboardPaste,
  Download,
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            Simple 3-Step Process
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            How to Download Instagram Reels
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Follow these straightforward steps to extract and download public Instagram Reels in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((stepItem, idx) => {
            const Icon = STEP_ICONS[stepItem.icon as keyof typeof STEP_ICONS] || Download;
            return (
              <div
                key={stepItem.step}
                className="relative rounded-2xl bg-white dark:bg-surface-darkCard p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-violet text-white flex items-center justify-center font-bold text-lg shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-200 dark:text-slate-800 group-hover:text-brand-500/30 transition-colors">
                      0{stepItem.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span>Step {stepItem.step} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
