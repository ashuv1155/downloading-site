# SaveAMedia — Production-Ready Instagram Reel Downloader

SaveAMedia is a modern, high-performance web utility built for downloading public Instagram Reels with instant video preview, high-definition audio/video rendition extraction, and client-side fallback systems.

---

## 1. Project Overview & Architecture

SaveAMedia is engineered with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, designed from the ground up for seamless deployment to **Cloudflare Workers / Pages** via **OpenNext**.

### Cloudflare Gateway & Two-Server Backend Architecture

```
                    ┌─────────────────────────┐
                    │    SaveAMedia Frontend    │
                    │   (Next.js on Cloudflare│
                    │      Workers / Pages)   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Cloudflare API Gateway  │
                    │  (Rate Limiting, Cache, │
                    │   Failover, Routing)    │
                    └──────┬───────────┬──────┘
                           │           │
                Primary    │           │   Secondary
                Failover   ▼           ▼   Failover
             ┌───────────────┐       ┌───────────────┐
             │ Render Node 1 │       │ Render Node 2 │
             │  (Extraction  │       │  (Extraction  │
             │   Worker A)   │       │   Worker B)   │
             └───────────────┘       └───────────────┘
```

The frontend communicates with **ONE centralized API Gateway** endpoint (`/api/v1/extract`). The Cloudflare Gateway handles node selection, health checks, timeout aborts, and failover between Render Server 1 and Render Server 2. Internal server addresses and credentials are never exposed to the client.

---

## 2. Technology Stack

- **Framework**: Next.js 14.2 (App Router, Server & Client Component separation)
- **Language**: TypeScript 5.5 (Strict typing, zero implicit any)
- **Styling**: Tailwind CSS 3.4 with custom design tokens, dark/light theme classes, glow effects
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form
- **Typography**: Next/Font with Inter & Outfit (zero render-blocking layout shifts)
- **Testing**: Vitest + Testing Library (21 automated test cases)
- **Cloudflare Runtime**: OpenNext Cloudflare nodejs_compat compatibility

---

## 3. Project Structure

```
/home/user/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── vitest.config.ts
├── open-next.config.ts
├── wrangler.toml
├── .env.example
├── .env.local
└── src/
    ├── app/
    │   ├── layout.tsx                     # Root layout with fonts, anti-flicker theme, WebApp schema
    │   ├── page.tsx                       # Homepage with DownloaderHero, trust indicators, FAQ, SEO
    │   ├── globals.css                    # Tailwind layers, custom animations, scrollbars
    │   ├── not-found.tsx                  # Accessible custom 404 page
    │   ├── sitemap.ts                     # Automated XML sitemap generation
    │   ├── robots.ts                      # Robots.txt directives
    │   ├── api/v1/extract/route.ts        # Built-in Gateway simulation handler
    │   ├── how-it-works/page.tsx          # 3-step deep breakdown
    │   ├── faq/page.tsx                   # Full searchable FAQ page with FAQPage schema
    │   ├── download-tools/page.tsx        # Bookmarklet & Browser Extension tools page
    │   ├── instagram-reel-downloader/     # Technical codec & format landing page
    │   ├── how-to-download-instagram-reels/# 2026 Comprehensive tutorial
    │   ├── instagram-downloader-for-iphone/# iOS & Safari download manager guide
    │   ├── instagram-downloader-for-android/# Android, Samsung & Google Photos guide
    │   ├── instagram-reel-downloader-for-pc/# Desktop shortcuts, PC & Mac guide
    │   ├── privacy-policy/page.tsx        # Comprehensive zero-credential privacy policy
    │   ├── terms/page.tsx                 # Terms of service, copyright compliance
    │   └── contact/page.tsx               # Functional contact form with Zod validation
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx                 # Sticky navigation, logo, mobile drawer, theme toggle
    │   │   ├── Footer.tsx                 # Compliance disclaimers, links, status badge
    │   │   ├── ThemeToggle.tsx            # Light/Dark mode switcher
    │   │   └── Breadcrumb.tsx             # Accessible breadcrumb navigation
    │   ├── downloader/
    │   │   ├── DownloaderHero.tsx         # Flagship hero with state controller
    │   │   ├── UrlInputCard.tsx           # Input with paste, clear, validation & sample links
    │   │   ├── ProcessingState.tsx        # Rotating animated progress indicators (4 steps)
    │   │   ├── SuccessResultCard.tsx      # Video preview, format selection, CORS-safe download
    │   │   ├── ErrorStateCard.tsx         # Specific error handling with retry & fallback
    │   │   ├── FallbackCard.tsx           # Device-specific fallback (Bookmarklet & Mobile guides)
    │   │   └── DevStateSwitcher.tsx       # Live interactive state switcher (11 states)
    │   ├── home/
    │   │   ├── TrustIndicators.tsx        # 3 factual trust pillars
    │   │   ├── HowItWorksSection.tsx      # 3-step visual cards
    │   │   ├── FeaturesSection.tsx        # 6 core feature cards
    │   │   ├── AlternativeMethodsSection.tsx# Bookmarklet & Extension introduction
    │   │   ├── FaqSection.tsx             # Accessible accordion for 10 questions
    │   │   └── SeoArticleSection.tsx      # Technical educational guide with H2/H3 structure
    │   └── ads/
    │       └── AdBannerPlaceholder.tsx    # Non-intrusive, zero-CLS reserved sponsor slots
    ├── services/
    │   ├── api.ts                         # Central API client, AbortController, error mapping
    │   └── downloader.ts                  # High-level downloader service + analytics dispatch
    ├── hooks/
    │   ├── useDownloader.ts               # Complete 11-state state machine hook
    │   └── useTheme.ts                    # Dark/Light theme preference manager
    ├── lib/
    │   ├── constants.ts                   # App config, FAQ items, trust indicators, features
    │   ├── validation.ts                  # URL sanitation, shortcode extraction & Zod schemas
    │   ├── utils.ts                       # Cross-origin download trigger, clipboard, device detection
    │   ├── seo.ts                         # Metadata constructor & JSON-LD schema generators
    │   └── analytics.ts                   # Privacy-first event tracker (zero PII)
    ├── types/
    │   └── downloader.ts                  # Strict TypeScript interfaces & state unions
    └── test/
        ├── setup.ts                       # Jest DOM setup
        ├── validation.test.ts             # URL regex, cleaning & edge case tests
        ├── api.test.ts                    # Gateway error mapping & fetch tests
        └── components.test.tsx            # Downloader components, keyboard & render tests
```

---

## 4. Frontend State Machine (11 Distinct States)

| State | Purpose | User Experience |
|---|---|---|
| `IDLE` | Default initial state | Clean input card, "Paste Link" button, sample link suggestions. |
| `VALIDATING` | Syntax verification | Pre-flight link cleaning, strips tracking parameters (`?igsh=...`). |
| `PROCESSING` | Remote gateway request | Glowing tech rings, 4 rotating messages (1.4s interval), cancel button. |
| `SUCCESS` | Extraction succeeded | In-browser HTML5 video preview, format selector (1080p, 720p, MP3), direct download CTA. |
| `SERVER_1_FAILED` | Node 1 timeout/failure | Informs user of gateway failover; retry or bookmarklet fallback. |
| `SERVER_2_FAILED` | Both nodes busy/failed | Automatic prompt to use client-side Bookmarklet fallback. |
| `RATE_LIMITED` | Instagram throttle | Notice with retry countdown timer and zero-queue bookmarklet option. |
| `PRIVATE_OR_UNAVAILABLE` | Non-public video | Clear message explaining privacy boundaries and deleted media. |
| `INVALID_URL` | Malformed link | Field highlighting and supported format explanation. |
| `NETWORK_ERROR` | Connection drop/timeout | Network recovery guidance with offline notice. |
| `UNKNOWN_ERROR` | System exception | Friendly error message without exposing backend stack traces. |

---

## 5. Local Development Commands

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite (Vitest)
npm run test

# 3. Start local development server
npm run dev

# 4. Production build & static generation
npm run build

# 5. Start production server
npm run start
```

---

## 6. Environment Variables Documentation

Configure these in `.env.local` or Cloudflare dashboard:

```env
# Cloudflare API Gateway Endpoint
# Leave blank to use built-in local route handler (/api/v1/extract)
NEXT_PUBLIC_API_BASE_URL=

# Public Canonical URL for SEO
NEXT_PUBLIC_SITE_URL=https://saveamedia.com

# Request Timeout in Milliseconds (Default: 20000)
NEXT_PUBLIC_API_TIMEOUT_MS=20000

# Enable interactive dev state tester toolbar (true in dev/preview, false in prod)
NEXT_PUBLIC_ENABLE_MOCK_CONTROLS=true
```

---

## 7. Cloudflare Deployment Instructions

SaveAMedia is configured for Cloudflare Pages / Workers via OpenNext:

1. **Prerequisites**: Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. **Build with OpenNext**:
   ```bash
   npx @opennextjs/cloudflare
   ```

3. **Deploy to Cloudflare Workers / Pages**:
   ```bash
   wrangler deploy
   ```

4. **Set Production Secrets in Cloudflare Dashboard**:
   - `NEXT_PUBLIC_API_BASE_URL`: URL of your Cloudflare API Gateway Worker.
   - `NEXT_PUBLIC_ENABLE_MOCK_CONTROLS`: `false`.

---

## 8. Two-Server Backend Integration Checklist

When ready to wire the Cloudflare Gateway to Render Server 1 and Server 2:

- [ ] **Gateway Health Checks**: Cloudflare Gateway Worker implements 5-second interval `/healthz` polling on both Render endpoints.
- [ ] **Circuit Breaker**: If Render Server 1 fails 3 consecutive requests, route 100% traffic to Render Server 2.
- [ ] **CORS Headers**: Gateway must respond with `Access-Control-Allow-Origin: https://saveamedia.com`.
- [ ] **Proxy Streaming**: Ensure extraction responses return signed or proxied streaming URLs to avoid client-side CORS issues during blob download.
- [ ] **Update Frontend Base URL**: Set `NEXT_PUBLIC_API_BASE_URL=https://gateway.saveamedia.com` in `.env.production`.
