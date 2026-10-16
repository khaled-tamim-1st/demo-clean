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
  status?: 'published' | 'draft';
  faqs?: ArticleFaq[];
  quickSummary?: string[];
}

import fs from 'fs';
import path from 'path';

export const articlesData: ArticleItem[] = [
  bedbugsArticle,
  cockroachesArticle,
  termitesArticle,
  seasonalArticle,
  rodentsArticle,
];

export function getLoadedArticles(includeDrafts = false): ArticleItem[] {
  try {
    const cands = [
      path.join(process.cwd(), 'data', 'articles.json'),
      path.join(process.cwd(), 'artifacts', 'demo-clean', 'data', 'articles.json'),
    ];
    for (const filePath of cands) {
      if (typeof window === 'undefined' && fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return includeDrafts ? parsed : parsed.filter((a: ArticleItem) => a.status !== 'draft');
        }
      }
    }
  } catch {
    // Ignore and fallback
  }
  return includeDrafts ? articlesData : articlesData.filter((a) => a.status !== 'draft');
}

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  const all = getLoadedArticles(true);
  return all.find((art) => art.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  const all = getLoadedArticles(false);
  return all.map((art) => art.slug);
}

