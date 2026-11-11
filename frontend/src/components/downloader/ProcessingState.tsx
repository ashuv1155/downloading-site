'use client';

import React from 'react';
import { Loader2, XCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { PROCESSING_MESSAGES } from '@/lib/constants';

interface ProcessingStateProps {
  activeMessage: string;
  onCancel: () => void;
}

export function ProcessingState({ activeMessage, onCancel }: ProcessingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full max-w-xl mx-auto mt-6 p-7 sm:p-9 rounded-3xl bg-white/95 dark:bg-surface-darkCard/95 border border-brand-500/30 dark:border-brand-500/20 shadow-2xl shadow-brand-500/15 backdrop-blur-2xl text-center animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Animated Modern Orbital Ring & Loader */}
      <div className="relative w-22 h-22 mx-auto mb-6 flex items-center justify-center">
        {/* Soft pulse glow behind */}
        <div className="absolute inset-0 rounded-full bg-brand-500/25 blur-xl animate-pulse-glow" />

        {/* Dual outer spinning rings */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-500/30 dark:border-brand-400/30 animate-spin-slow" />
        <div className="absolute -inset-2 rounded-full border border-accent-violet/20 animate-spin" style={{ animationDuration: '6s' }} />

        {/* Center Gradient Core */}
        <div className="relative w-15 h-15 rounded-2xl bg-gradient-to-tr from-blue-600 via-brand-500 to-accent-violet flex items-center justify-center text-white shadow-xl shadow-brand-500/40">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>

      {/* Rotating Status Message with Smooth Transition */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Live Stream Discovery</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight transition-all duration-300">
        {activeMessage}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
        Querying public content delivery nodes to discover highest bitrate 1080p MP4 and MP3 audio streams.
      </p>

      {/* Smooth Shimmer Progress Bar */}
      <div className="w-full max-w-xs mx-auto h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-6 relative">
        <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-600 via-brand-500 to-accent-violet animate-gradient-x" />
      </div>

      {/* Step dots indicator */}
      <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
        {PROCESSING_MESSAGES.map((msg, idx) => {
          const isActive = msg === activeMessage;
          return (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'w-8 bg-brand-500' : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          );
        })}
      </div>

      {/* Cancel Action Button */}
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-150 active:scale-95"
      >
        <XCircle className="w-3.5 h-3.5" />
        <span>Cancel request</span>
      </button>
    </div>
  );
}
