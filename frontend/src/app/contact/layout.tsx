import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Support & Feedback - SaveAMedia',
  description:
    'Need technical support or have feedback regarding SaveAMedia? Contact our engineering team for assistance with Instagram Reel downloads.',
  canonicalPath: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact SaveAMedia Support',
    url: `${APP_CONFIG.canonicalDomain}/contact`,
    description: 'Get in touch with the SaveAMedia engineering and customer support team.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
