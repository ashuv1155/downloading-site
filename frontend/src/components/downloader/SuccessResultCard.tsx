'use client';

import React, { useState, useRef } from 'react';
import {
  ExtractedVideo,
  VideoFormat,
} from '@/types/downloader';
import {
  Download,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  Sparkles,
  Info,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { copyToClipboard, formatDuration } from '@/lib/utils';

interface SuccessResultCardProps {
  video: ExtractedVideo;
  selectedFormat: VideoFormat | null;
  onSelectFormat: (format: VideoFormat) => void;
  onDownload: (format?: VideoFormat) => void;
  isDownloading: boolean;
  downloadNotice: string | null;
  onReset: () => void;
}

export function SuccessResultCard({
  video,
  selectedFormat,
  onSelectFormat,
  onDownload,
  isDownloading,
  downloadNotice,
  onReset,
}: SuccessResultCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeFormat = selectedFormat || video.availableFormats[0];

  const handleCopyLink = async () => {
    const success = await copyToClipboard(activeFormat?.url || video.url);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      aria-label="Extraction Result"
      className="w-full max-w-3xl mx-auto mt-6 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-200"
    >
      {/* Top Banner Status */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Reel Ready for Download
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Download Another</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Video Preview Player */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[260px] aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-lg border border-slate-800 group">
            <video
              ref={videoRef}
              src={video.url}
              poster={video.thumbnail}
              playsInline
              loop
              autoPlay
              muted
              aria-label={`Preview video for Instagram Reel by @${video.author.username}`}
              className="w-full h-full object-cover"
            />

            {/* In-video Overlay Controls */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs">
              <span className="font-mono bg-black/60 px-2 py-0.5 rounded text-[11px]">
                {formatDuration(video.durationSeconds)}
              </span>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                aria-label={isMuted ? 'Unmute video preview' : 'Mute video preview'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500 text-center">
            Live preview of extracted stream
          </p>
        </div>

        {/* Right Column: Metadata & Format Options */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            {/* Author info */}
            <div className="flex items-center gap-2.5 mb-2.5">
              {video.author.avatarUrl ? (
                <img
                  src={video.author.avatarUrl}
                  alt={`Profile avatar of @${video.author.username}`}
                  className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0"
                  loading="lazy"
                  width={32}
                  height={32}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-accent-rose text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm overflow-hidden flex-shrink-0"
                >
                  {video.author.username.slice(0, 2)}
                </div>
              )}
              <div className="leading-tight">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white text-sm">
                  <span>@{video.author.username}</span>
                  {video.author.isVerified && (
                    <span className="w-3.5 h-3.5 rounded-full bg-brand-500 text-white text-[9px] flex items-center justify-center font-bold" title="Verified Creator">
                      ✓
                    </span>
                  )}
                </div>
                {video.author.fullName && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">{video.author.fullName}</span>
                )}
              </div>
            </div>

            {/* Reel Title / Caption */}
            <h4 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2 mb-4">
              {video.title || 'Instagram Reel Video'}
            </h4>

            {/* Format Selection Title */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                Available Download Formats
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {video.availableFormats.map((fmt) => {
                  const isSelected = activeFormat?.id === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => onSelectFormat(fmt)}
                      className={`flex flex-col text-left p-2.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 ring-1 ring-brand-500'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>{fmt.quality}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-500" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {fmt.formattedSize && <span>{fmt.formattedSize}</span>}
                        {fmt.resolution && <span>• {fmt.resolution}</span>}
                        <span className="uppercase font-mono font-bold text-[10px] px-1 py-0.2 bg-slate-200 dark:bg-slate-800 rounded">
                          {fmt.extension}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            {/* Primary Download Button */}
            <button
              type="button"
              onClick={() => onDownload(activeFormat)}
              disabled={isDownloading}
              className="w-full h-12 px-5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white font-semibold text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Preparing Download...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download {activeFormat ? activeFormat.quality : 'Video'}</span>
                </>
              )}
            </button>

            {/* Secondary actions: Copy link & Open stream */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Direct Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Media URL</span>
                  </>
                )}
              </button>

              <a
                href={activeFormat?.url || video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                title="Open stream in raw browser player"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Stream</span>
              </a>
            </div>

            {/* Download Status Notification */}
            {downloadNotice && (
              <div
                role="status"
                className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in-50"
              >
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>{downloadNotice}</span>
              </div>
            )}

            {/* Browser Safe Hint */}
            <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
              Works seamlessly on iOS Safari, Android, and Desktop. No watermarks added.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
