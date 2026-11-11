import { DownloaderHero } from '@/components/downloader/DownloaderHero';
import { TrustIndicators } from '@/components/home/TrustIndicators';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { AlternativeMethodsSection } from '@/components/home/AlternativeMethodsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { SeoArticleSection } from '@/components/home/SeoArticleSection';
import { AdBannerPlaceholder } from '@/components/ads/AdBannerPlaceholder';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Downloader Section */}
      <DownloaderHero />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Reserved Sponsor Banner (Zero CLS) */}
      <div className="max-w-6xl mx-auto px-4 w-full">
        <AdBannerPlaceholder slot="leaderboard" />
      </div>

      {/* 3-Step Process */}
      <HowItWorksSection />

      {/* Core Features */}
      <FeaturesSection />

      {/* Alternative Download Methods (Bookmarklet & Extension) */}
      <AlternativeMethodsSection />

      {/* Second Reserved Sponsor Banner */}
      <div className="max-w-6xl mx-auto px-4 w-full">
        <AdBannerPlaceholder slot="in-feed" />
      </div>

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Educational Technical SEO Article */}
      <SeoArticleSection />
    </div>
  );
}
