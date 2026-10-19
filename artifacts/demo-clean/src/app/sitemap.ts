import type { MetadataRoute } from 'next';
import { servicesData } from '@/data/services';
import { cleaningServicesData } from '@/data/cleaning';
import { governoratesData, getAllAreasWithGov } from '@/data/locations';
import { getLoadedArticles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://democleankw.com';
  const defaultOgImage = `${baseUrl}/og-image.jpg`;
  const brandIdentityImage = `${baseUrl}/demo-clean-identity.webp`;

  // Content release & major update milestones (Realistic lastmod dates)
  const siteLaunchDate = new Date('2026-10-01T08:00:00Z');
  const servicesUpdateDate = new Date('2026-10-12T10:00:00Z');
  const cleaningUpdateDate = new Date('2026-10-14T10:00:00Z');
  const pricingUpdateDate = new Date('2026-10-15T12:00:00Z');
  const coverageUpdateDate = new Date('2026-10-08T09:00:00Z');
  const latestSiteAuditDate = new Date('2026-10-18T14:00:00Z');

  // Static / Core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: latestSiteAuditDate,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [defaultOgImage, brandIdentityImage],
    },
    {
      url: `${baseUrl}/services`,
      lastModified: servicesUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [defaultOgImage],
    },
    {
      url: `${baseUrl}/cleaning-services`,
      lastModified: cleaningUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [defaultOgImage],
    },
    {
      url: `${baseUrl}/pest-control-prices`,
      lastModified: pricingUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [defaultOgImage],
    },
    {
      url: `${baseUrl}/commercial/restaurants`,
      lastModified: servicesUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [defaultOgImage],
    },
    {
      url: `${baseUrl}/coverage`,
      lastModified: coverageUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [defaultOgImage],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestSiteAuditDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [defaultOgImage],
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: latestSiteAuditDate,
      changeFrequency: 'weekly',
      priority: 0.75,
      images: [brandIdentityImage],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteLaunchDate,
      changeFrequency: 'monthly',
      priority: 0.6,
      images: [brandIdentityImage],
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: servicesUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLaunchDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteLaunchDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteLaunchDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/review`,
      lastModified: siteLaunchDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 7 Pest Control Services
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((svc) => ({
    url: `${baseUrl}/services/${svc.slug}`,
    lastModified: servicesUpdateDate,
    changeFrequency: 'weekly',
    priority: 0.85,
    images: [defaultOgImage],
  }));

  // 4 Cleaning Services
  const cleaningRoutes: MetadataRoute.Sitemap = cleaningServicesData.map((svc) => ({
    url: `${baseUrl}/cleaning-services/${svc.slug}`,
    lastModified: cleaningUpdateDate,
    changeFrequency: 'weekly',
    priority: 0.85,
    images: [defaultOgImage],
  }));

  // 6 Governorates
  const governorateRoutes: MetadataRoute.Sitemap = governoratesData.map((gov) => ({
    url: `${baseUrl}/coverage/${gov.slug}`,
    lastModified: coverageUpdateDate,
    changeFrequency: 'monthly',
    priority: 0.75,
    images: [defaultOgImage],
  }));

  // 22 Area pages
  const areaRoutes: MetadataRoute.Sitemap = getAllAreasWithGov().map(({ govSlug, areaSlug }) => ({
    url: `${baseUrl}/coverage/${govSlug}/${areaSlug}`,
    lastModified: coverageUpdateDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 5 Blog articles
  const articleRoutes: MetadataRoute.Sitemap = getLoadedArticles().map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [defaultOgImage],
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...cleaningRoutes,
    ...governorateRoutes,
    ...areaRoutes,
    ...articleRoutes,
  ];
}
