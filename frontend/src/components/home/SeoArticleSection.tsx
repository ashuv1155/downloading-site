import React from 'react';
import Link from 'next/link';
import { BookOpen, Video, ShieldAlert, Cpu, CheckCircle, Music, Sparkles, Layers, Lock, Monitor, HelpCircle, Check, X } from 'lucide-react';
import { COMPARISON_MATRIX } from '@/lib/constants';

export function SeoArticleSection() {
  return (
    <article className="w-full py-16 sm:py-24 bg-white dark:bg-surface-dark border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 text-slate-700 dark:text-slate-300">
          {/* Header */}
          <header className="border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
              <span>Comprehensive Technical & Architecture Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              The Definitive Guide to Instagram Reel Download & Media Extraction
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Understanding video encoding standards, audio tracks, CDN delivery pipelines, and privacy-preserving extraction methods in 2026.
            </p>
          </header>

          {/* Quick Direct Answer Hook (AEO / SearchGPT / AI Overview) */}
          <section className="p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 via-accent-violet/5 to-transparent border border-brand-500/20 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Direct Summary: What is SaveAMedia and How Does It Work?
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>SaveAMedia</strong> (https://saveamedia.com) is an open-access web utility designed to extract, preview, and download public Instagram Reels, videos, and audio tracks in 1080p Full HD MP4 format. It strips tracking queries client-side, queries public content distribution nodes in sub-second speeds, requires zero login or registration, and delivers unaltered master streams with zero watermarks or compression loss.
            </p>
          </section>

          {/* Section 1: Technical Foundations */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-brand-500" />
              1. How Instagram Reel Encoding & Delivery Architecture Works
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              When a creator uploads a Reel to Instagram, the Meta media ingestion infrastructure transposes the master file into multiple renditions optimized for varying bandwidths and devices. This pipeline leverages Dynamic Adaptive Streaming over HTTP (DASH) and HTTP Live Streaming (HLS):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-brand-600 dark:text-brand-400 block mb-1">
                  1080p Full HD (Master)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  1080×1920 pixels vertical (9:16 aspect ratio) encoded in H.264/AVC or HEVC at up to 60fps. Highest visual fidelity for archiving.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-brand-600 dark:text-brand-400 block mb-1">
                  720p HD Standard
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  720×1280 resolution with optimized compression. Balances visual quality with fast downloading over mobile networks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-accent-violet block mb-1">
                  Audio Only (320kbps MP3)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Direct extraction of AAC stereo tracks converted to universal MP3 at up to 320 kbps for podcasts and music saving.
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              SaveAMedia’s edge gateway queries public edge nodes to discover the highest available bitrate progressive MP4 file, bypassing intermediate client downsampling so you receive optimal visual clarity.
            </p>
          </section>

          {/* Section 2: Machine-Parseable Comparison Table (GEO & Perplexity RAG Optimization) */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent-violet" />
              2. SaveAMedia vs Alternative Reel Saving Methods
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A comprehensive technical comparison of SaveAMedia against common alternatives:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 sm:p-4">Feature / Requirement</th>
                    <th className="p-3 sm:p-4 text-brand-600 dark:text-brand-400">SaveAMedia</th>
                    <th className="p-3 sm:p-4 text-slate-500">Screen Recording</th>
                    <th className="p-3 sm:p-4 text-slate-500">App Store Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {COMPARISON_MATRIX.map((row, i) => (
                    <tr key={i}>
                      <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-white">{row.feature}</td>
                      <td className="p-3 sm:p-4 text-emerald-500 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Yes (Native)
                      </td>
                      <td className="p-3 sm:p-4 text-slate-500">
                        {typeof row.screenRecording === 'boolean' ? (
                          row.screenRecording ? 'Yes' : 'No'
                        ) : (
                          row.screenRecording
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-slate-500">
                        {typeof row.mobileApps === 'boolean' ? (
                          row.mobileApps ? 'Yes' : 'No'
                        ) : (
                          row.mobileApps
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Privacy & Security */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-500" />
              3. Privacy Architecture: Client-Side Tracking Sanitization
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              When you copy a link from the Instagram app, Instagram appends distinct tracking parameters to the URL string (such as <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">?igsh=OGQ5ZDc2ODk2ZA==</code> or <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">?utm_source=ig_web_copy_link</code>). These tokens associate the shared link with your personal user account.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              SaveAMedia executes a client-side regular expression pipeline directly inside your browser before transmitting the link to our extraction gateway. This eliminates tracking queries, preventing user cross-profiling and maintaining anonymous downloading.
            </p>
          </section>

          {/* Section 4: Ethics, Fair Use & Legal Framework */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              4. Fair Use, Copyright Standards & Creator Respect
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              SaveAMedia operates under international Fair Use (17 U.S.C. § 107) and private archival standards. When saving media:
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm sm:text-base pl-1">
              <li>
                <strong>Respect Authorship:</strong> Creators hold intellectual property rights to their videos and sound compositions.
              </li>
              <li>
                <strong>Personal Offline Archival:</strong> Downloading for offline review, study, research, or personal backup is permissible under fair use.
              </li>
              <li>
                <strong>No Unauthorized Redistribution:</strong> Do not re-upload, broadcast, or commercially monetize creators' works without explicit permission.
              </li>
              <li>
                <strong>Private Boundary Protection:</strong> SaveAMedia does not access, decode, or download private accounts or restricted profiles.
              </li>
            </ul>
          </section>

          {/* Internal Linking Graph */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Explore Our Comprehensive Topic Clusters
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link
                href="/instagram-audio-downloader"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 text-slate-700 dark:text-slate-300 font-semibold transition-colors flex flex-col gap-1"
              >
                <Music className="w-4 h-4 text-accent-violet" />
                <span>Audio Downloader →</span>
              </Link>

              <Link
                href="/instagram-video-downloader-without-watermark"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 text-slate-700 dark:text-slate-300 font-semibold transition-colors flex flex-col gap-1"
              >
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Without Watermark →</span>
              </Link>

              <Link
                href="/instagram-reel-downloader-1080p"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 text-slate-700 dark:text-slate-300 font-semibold transition-colors flex flex-col gap-1"
              >
                <Monitor className="w-4 h-4 text-brand-500" />
                <span>1080p Full HD →</span>
              </Link>

              <Link
                href="/save-instagram-reels-to-camera-roll"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 text-slate-700 dark:text-slate-300 font-semibold transition-colors flex flex-col gap-1"
              >
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Save to Camera Roll →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
