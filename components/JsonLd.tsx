import { siteConfig } from '@/app/metadata';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    image: `${siteConfig.baseUrl}/profile-image.jpg`,
    sameAs: ['https://linkedin.com/in/matt-palmer', 'https://x.com/mattppal'],
    jobTitle: 'Developer Relations Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Replit',
    },
    description: 'Developer, creator, and technologist building beautiful digital experiences',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
