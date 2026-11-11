import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Download Tools, Bookmarklet & Browser Extensions',
  description:
    'Free client-side browser tools for SaveAMedia. One-click desktop bookmarklet, open-source Manifest V3 extension, and automated link dispatchers for Instagram Reels.',
  canonicalPath: '/download-tools',
  keywords: [
    'Instagram Reel Bookmarklet',
    'SaveAMedia Browser Extension',
    'Instagram Reel Downloader Chrome Extension',
    'One-Click Reel Downloader Tool',
    'Instagram Video Download Shortcut',
  ],
});

export default function DownloadToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
