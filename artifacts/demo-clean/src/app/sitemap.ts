import type { MetadataRoute } from 'next';
import { servicesData } from '@/data/services';
import { cleaningServicesData } from '@/data/cleaning';
import { governoratesData, getAllAreasWithGov } from '@/data/locations';
import { articlesData } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://democlean-kuwait.com';
  const currentDate = new Date();

  // Static / Core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cleaning-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pest-control-prices`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/commercial/restaurants`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coverage`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 6 Services
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((svc) => ({
    url: `${baseUrl}/services/${svc.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Cleaning Services
  const cleaningRoutes: MetadataRoute.Sitemap = cleaningServicesData.map((svc) => ({
    url: `${baseUrl}/cleaning-services/${svc.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 6 Governorates
  const governorateRoutes: MetadataRoute.Sitemap = governoratesData.map((gov) => ({
    url: `${baseUrl}/coverage/${gov.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // All Area pages
  const areaRoutes: MetadataRoute.Sitemap = getAllAreasWithGov().map(({ govSlug, areaSlug }) => ({
    url: `${baseUrl}/coverage/${govSlug}/${areaSlug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Blog articles
  const articleRoutes: MetadataRoute.Sitemap = articlesData.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
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
