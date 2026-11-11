import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2">
        404 • Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
        Looking for a Reel Download?
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
        The page you requested doesn't exist or has moved. Return to the homepage to download any public Instagram Reel.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-violet hover:opacity-95 text-white font-semibold text-sm shadow-md transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Return to Downloader</span>
      </Link>
    </div>
  );
}
