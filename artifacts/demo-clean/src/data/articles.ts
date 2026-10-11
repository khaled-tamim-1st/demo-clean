import { bedbugsArticle } from './articles/bedbugs';
import { cockroachesArticle } from './articles/cockroaches';
import { termitesArticle } from './articles/termites';
import { seasonalArticle } from './articles/seasonal';
import { rodentsArticle } from './articles/rodents';

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  tags: string[];
  relatedServices: string[];
  metaTitle: string;
  metaDescription: string;
  faqs?: ArticleFaq[];
  quickSummary?: string[];
}

export const articlesData: ArticleItem[] = [
  bedbugsArticle,
  cockroachesArticle,
  termitesArticle,
  seasonalArticle,
  rodentsArticle,
];

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return articlesData.find((art) => art.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articlesData.map((art) => art.slug);
}
