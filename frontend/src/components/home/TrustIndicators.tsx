import React from 'react';
import { TRUST_INDICATORS } from '@/lib/constants';
import { ShieldCheck, Link2, Smartphone } from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  Link2,
  Smartphone,
};

export function TrustIndicators() {
  return (
    <section aria-labelledby="trust-indicators-heading" className="w-full py-8 border-y border-slate-200/70 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/30">
      <h2 id="trust-indicators-heading" className="sr-only">Verified Service Guarantees</h2>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TRUST_INDICATORS.map((item) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="flex items-start gap-3.5 p-3.5 rounded-xl transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
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
