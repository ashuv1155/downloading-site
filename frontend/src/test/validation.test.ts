import { describe, it, expect } from 'vitest';
import { parseAndCleanInstagramUrl, instagramUrlSchema } from '../lib/validation';

describe('Instagram URL Validation & Cleaning', () => {
  it('accepts standard reel URLs and extracts shortcode', () => {
    const input = 'https://www.instagram.com/reel/C29abcdefgh/';
    const result = parseAndCleanInstagramUrl(input);

    expect(result.isValid).toBe(true);
    expect(result.shortcode).toBe('C29abcdefgh');
    expect(result.cleanedUrl).toBe('https://www.instagram.com/reel/C29abcdefgh/');
  });

  it('cleans tracking parameters (igsh, utm_source, etc.)', () => {
    const input = 'https://instagram.com/reel/C29abcdefgh/?igsh=NzBmMjdhZWRiYQ%3D%3D&utm_source=qr';
    const result = parseAndCleanInstagramUrl(input);

    expect(result.isValid).toBe(true);
    expect(result.shortcode).toBe('C29abcdefgh');
    expect(result.cleanedUrl).toBe('https://www.instagram.com/reel/C29abcdefgh/');
    expect(result.cleanedUrl).not.toContain('igsh');
    expect(result.cleanedUrl).not.toContain('utm_source');
  });

  it('accepts reels with /p/ post path', () => {
    const input = 'https://www.instagram.com/p/CzX912abCDE/';
    const result = parseAndCleanInstagramUrl(input);

    expect(result.isValid).toBe(true);
    expect(result.shortcode).toBe('CzX912abCDE');
    expect(result.cleanedUrl).toBe('https://www.instagram.com/reel/CzX912abCDE/');
  });

  it('handles URLs without https protocol prefix', () => {
    const input = 'instagram.com/reel/C29abcdefgh';
    const result = parseAndCleanInstagramUrl(input);

    expect(result.isValid).toBe(true);
    expect(result.shortcode).toBe('C29abcdefgh');
  });

  it('rejects empty input', () => {
    const result = parseAndCleanInstagramUrl('');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Please enter or paste');
  });

  it('rejects non-Instagram domains (YouTube, TikTok, phishing)', () => {
    const tiktok = parseAndCleanInstagramUrl('https://www.tiktok.com/@user/video/123456');
    expect(tiktok.isValid).toBe(false);
    expect(tiktok.errorMessage).toContain('Invalid domain');

    const phishing = parseAndCleanInstagramUrl('https://www.fake-insta.com/reel/12345');
    expect(phishing.isValid).toBe(false);
  });

  it('rejects unsupported Instagram paths like profiles or explore feed', () => {
    const profile = parseAndCleanInstagramUrl('https://www.instagram.com/natgeo/');
    expect(profile.isValid).toBe(false);
    expect(profile.errorMessage).toContain('not a Reel');

    const explore = parseAndCleanInstagramUrl('https://www.instagram.com/explore/');
    expect(explore.isValid).toBe(false);
  });

  it('validates correctly through zod schema', () => {
    const valid = instagramUrlSchema.safeParse('https://www.instagram.com/reel/C29abcdefgh/');
    expect(valid.success).toBe(true);

    const invalid = instagramUrlSchema.safeParse('not-a-valid-url');
    expect(invalid.success).toBe(false);
  });
});
