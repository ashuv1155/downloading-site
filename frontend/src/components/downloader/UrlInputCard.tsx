'use client';

import React, { useState } from 'react';
import { Clipboard, ArrowRight, X, AlertCircle, ShieldCheck, Sparkles, Check, Lock, Zap } from 'lucide-react';

interface UrlInputCardProps {
  inputUrl: string;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
  validationError: string | null;
  isLoading: boolean;
  onClear: () => void;
}

export function UrlInputCard({
  inputUrl,
  onUrlChange,
  onSubmit,
  validationError,
  isLoading,
  onClear,
}: UrlInputCardProps) {
  const [isPasting, setIsPasting] = useState(false);
  const [pasteNotice, setPasteNotice] = useState<string | null>(null);

  const handlePaste = async () => {
    setIsPasting(true);
    setPasteNotice(null);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onUrlChange(text.trim());
          setPasteNotice('Pasted from clipboard!');
          setTimeout(() => setPasteNotice(null), 2500);
        } else {
          setPasteNotice('Clipboard is empty.');
          setTimeout(() => setPasteNotice(null), 2500);
        }
      } else {
        setPasteNotice('Clipboard access not supported in this browser.');
        setTimeout(() => setPasteNotice(null), 2500);
      }
    } catch {
      setPasteNotice('Please paste link manually (Ctrl+V / Cmd+V).');
      setTimeout(() => setPasteNotice(null), 3000);
    } finally {
      setIsPasting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Outer Glow Wrapper with Modern Gradient Sheen */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-brand-500/40 via-accent-violet/20 to-slate-200/50 dark:to-slate-800/50 shadow-2xl shadow-brand-500/10 group transition-all duration-300">
        <div className="relative rounded-[23px] bg-white/90 dark:bg-surface-darkCard/95 p-3.5 sm:p-5 border border-white/60 dark:border-slate-800/90 shadow-inner backdrop-blur-xl">
          {/* Main Input Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            {/* Input Container */}
            <div className="relative flex-1 flex items-center">
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => onUrlChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste Instagram Reel link here..."
                disabled={isLoading}
                aria-label="Instagram Reel URL"
                aria-invalid={!!validationError}
                aria-describedby={validationError ? 'url-validation-error' : undefined}
                className="w-full h-14 sm:h-15 pl-4 sm:pl-5 pr-24 sm:pr-28 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-500/80 focus:border-brand-500 transition-all duration-200 disabled:opacity-60 shadow-sm"
              />

              {/* In-field Action Buttons: Clear & Paste */}
              <div className="absolute right-2.5 flex items-center gap-1.5">
                {inputUrl && !isLoading && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Clear input"
                    title="Clear"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePaste}
                  disabled={isLoading || isPasting}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all duration-150 active:scale-95"
                  title="Paste Link from clipboard"
                  aria-label="Paste Link from clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5 text-brand-500" />
                  <span className="hidden xs:inline">Paste</span>
                </button>
              </div>
            </div>

            {/* Primary Action Button with Dynamic Hover & Glow */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="group/btn relative h-14 sm:h-15 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-brand-500 to-accent-violet hover:from-blue-500 hover:to-accent-violet text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
            >
              {/* Subtle button sheen line on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />

              <span className="relative z-10">Download Reel</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Inline Validation Notice */}
          {validationError && (
            <div
              id="url-validation-error"
              role="alert"
              className="mt-3.5 flex items-center gap-2 text-xs sm:text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 animate-in fade-in-50 duration-200"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Paste Notification Feedback */}
          {pasteNotice && (
            <div className="mt-2.5 text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-3 py-1.5 rounded-lg border border-brand-200/60 dark:border-brand-900/40 flex items-center gap-1.5 animate-in fade-in-50 duration-150">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>{pasteNotice}</span>
            </div>
          )}

          {/* Clean Trust Chips (Production Standards) */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-medium text-slate-600 dark:text-slate-300">
                100% Free • No Login Required • High-Speed Public Extraction
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-brand-500" /> Client-Side Sanitized
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> 1080p MP4 &amp; MP3
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
