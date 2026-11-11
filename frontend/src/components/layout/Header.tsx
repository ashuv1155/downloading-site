'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Shield, Bookmark, HelpCircle, ChevronDown, Music, Video, Monitor, Image as ImageIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS, APP_CONFIG, SEO_PAGES_NAV } from '@/lib/constants';
import { SAVEAMEDIA_ICON_DATA_URI } from '@/lib/logoData';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-white/70 dark:bg-surface-dark/70 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-opacity hover:opacity-95 flex-shrink-0"
            aria-label={`${APP_CONFIG.name} Home`}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <img
                src={SAVEAMEDIA_ICON_DATA_URI}
                alt="SaveAMedia Logo"
                className="w-full h-full object-contain"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="flex items-center gap-0.5 leading-none">
                <span className="font-extrabold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Save
                </span>
                <span className="font-extrabold bg-gradient-to-r from-blue-600 via-brand-500 to-accent-violet bg-clip-text text-transparent">
                  AMedia
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider scale-95 origin-left mt-0.5">
                Pro Downloader
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Quick Tools Hover Link */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"
              >
                <span>Tools</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {toolsDropdownOpen && (
                <div
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <Link
                    href="/instagram-audio-downloader"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Music className="w-4 h-4 text-accent-violet" />
                    <span>Audio Downloader (MP3)</span>
                  </Link>
                  <Link
                    href="/instagram-video-downloader-without-watermark"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>Without Watermark</span>
                  </Link>
                  <Link
                    href="/instagram-reel-downloader-1080p"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Monitor className="w-4 h-4 text-brand-500" />
                    <span>1080p Full HD</span>
                  </Link>
                  <Link
                    href="/save-instagram-reels-to-camera-roll"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    <span>Save to Camera Roll</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/download-tools"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/40 hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarklet</span>
            </Link>

            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-brand-500" />}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-4 block mb-1">
                Popular Tools
              </span>
              <div className="grid grid-cols-1 gap-1">
                <Link
                  href="/instagram-audio-downloader"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Music className="w-3.5 h-3.5 text-accent-violet" />
                  <span>Audio & MP3 Downloader</span>
                </Link>
                <Link
                  href="/instagram-video-downloader-without-watermark"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Without Watermark</span>
                </Link>
                <Link
                  href="/instagram-reel-downloader-1080p"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Monitor className="w-3.5 h-3.5 text-brand-500" />
                  <span>1080p Full HD</span>
                </Link>
                <Link
                  href="/save-instagram-reels-to-camera-roll"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>Save to Camera Roll</span>
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/download-tools"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-accent-violet text-white font-semibold text-xs shadow-md"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Bookmarklet & Extension</span>
              </Link>
              <div className="flex items-center justify-between px-4 py-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  100% Free & No Account Needed
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
