import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_CONFIG.canonicalDomain;
  const lastModified = new Date();

  // Comprehensive route list targeting thousands of search intent variations
  const routes = [
    // Core Homepage & Tool
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },

    // Primary High-Volume Category Landing Pages
    { path: '/instagram-reel-downloader', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/instagram-audio-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/instagram-video-downloader-without-watermark', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/instagram-reel-downloader-1080p', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/save-instagram-reels-to-camera-roll', priority: 0.85, changeFrequency: 'weekly' as const },

    // Device & Platform Specific Guides
    { path: '/instagram-downloader-for-iphone', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/instagram-downloader-for-android', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/instagram-reel-downloader-for-pc', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/how-to-download-instagram-reels', priority: 0.8, changeFrequency: 'weekly' as const },

    // Technical Knowledge Base & Tools
    { path: '/how-it-works', priority: 0.75, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.75, changeFrequency: 'weekly' as const },
    { path: '/download-tools', priority: 0.7, changeFrequency: 'weekly' as const },

    // Legal, Compliance, Trust & Contact (Google AdSense Standards)
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/dmca', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/cookie-policy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/disclaimer', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
