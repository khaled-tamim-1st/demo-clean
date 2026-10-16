import fs from 'fs';
import path from 'path';

export interface LeadItem {
  id: number | string;
  name: string;
  phone: string;
  governorate: string;
  service: string;
  notes: string;
  status: 'new' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  governorateName: string;
  areaName: string;
  serviceName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  source?: 'google' | 'website';
  status?: 'approved' | 'pending' | 'rejected';
}

import { articlesData as INITIAL_ARTICLES, type ArticleItem, type ArticleFaq } from '@/data/articles';
import { defaultPricePackages as INITIAL_PRICES, type PricePackageItem } from '@/data/prices';
export type { ArticleItem, ArticleFaq, PricePackageItem };

function resolveDataFile(filename: string): string {
  const cands = [
    path.join(process.cwd(), 'data', filename),
    path.join(process.cwd(), 'artifacts', 'demo-clean', 'data', filename),
  ];
  for (const c of cands) {
    if (fs.existsSync(c)) return c;
  }
  const preferred = path.join(process.cwd(), 'data', filename);
  const dir = path.dirname(preferred);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return preferred;
}

const LEADS_FILE = resolveDataFile('leads.json');
const REVIEWS_FILE = resolveDataFile('reviews.json');
const ARTICLES_FILE = resolveDataFile('articles.json');
const PRICES_FILE = resolveDataFile('prices.json');

function ensureDataDir() {
  const dir = path.dirname(ARTICLES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Initial sample leads if file doesn't exist
const INITIAL_LEADS: LeadItem[] = [
  {
    id: 10421,
    name: 'عبدالله الشمري',
    phone: '67088755',
    governorate: 'الجهراء',
    service: 'مكافحة النمل الأبيض والأرضة',
    notes: 'قسيمة سكنية جديدة في سعد العبدالله محتاجين حقن وقائي',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 10420,
    name: 'مها الصباح',
    phone: '99887766',
    governorate: 'حولي',
    service: 'مكافحة الصراصير بالجل الألماني',
    notes: 'شقة بالسالمية، مطبخ ودواليب بدون رائحة',
    status: 'contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 10419,
    name: 'سالم الدوسري',
    phone: '55443322',
    governorate: 'الأحمدي',
    service: 'مكافحة بق الفراش بالحرارة والضمان',
    notes: 'غرفتين نوم بالمهبولة مع طلب شهادة الكفالة',
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// Initial reviews - empty by default so only real owner/client reviews exist
const INITIAL_REVIEWS: ReviewItem[] = [];

export function getLeads(): LeadItem[] {
  ensureDataDir();
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2), 'utf-8');
      return INITIAL_LEADS;
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading leads:', err);
    return INITIAL_LEADS;
  }
}

export function saveLead(lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>): LeadItem {
  ensureDataDir();
  const leads = getLeads();
  const newLead: LeadItem = {
    ...lead,
    id: Math.floor(10000 + Math.random() * 90000),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving lead:', err);
  }
  return newLead;
}

export function updateLeadStatus(id: number | string, status: LeadItem['status']): boolean {
  ensureDataDir();
  const leads = getLeads();
  const index = leads.findIndex((l) => String(l.id) === String(id));
  if (index === -1) return false;
  leads[index].status = status;
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error updating lead status:', err);
    return false;
  }
}

export function deleteLead(id: number | string): boolean {
  ensureDataDir();
  const leads = getLeads();
  const filtered = leads.filter((l) => String(l.id) !== String(id));
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error deleting lead:', err);
    return false;
  }
}

export function getReviews(): ReviewItem[] {
  ensureDataDir();
  try {
    if (!fs.existsSync(REVIEWS_FILE)) {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading reviews:', err);
    return [];
  }
}

export function addReview(review: Omit<ReviewItem, 'id'> & { date?: string }): ReviewItem {
  ensureDataDir();
  const reviews = getReviews();
  const source = review.source || 'website';
  const status = review.status || (source === 'google' ? 'approved' : 'pending');

  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}`,
    date: review.date || new Date().toISOString().split('T')[0],
    source,
    status,
  };
  reviews.unshift(newReview);
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error adding review:', err);
  }
  return newReview;
}

export function updateReviewStatus(id: string, status: 'approved' | 'pending' | 'rejected'): boolean {
  ensureDataDir();
  const reviews = getReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return false;
  reviews[index].status = status;
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error updating review status:', err);
    return false;
  }
}

export function deleteReview(id: string): boolean {
  ensureDataDir();
  const reviews = getReviews();
  const filtered = reviews.filter((r) => r.id !== id);
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error deleting review:', err);
    return false;
  }
}

export function getPublishedReviews(): ReviewItem[] {
  const all = getReviews();
  return all.filter((r) => r.status === 'approved' || (!r.status && r.verified));
}

// ------------------------------------------------------------------
// Articles Database Operations
// ------------------------------------------------------------------

export function getArticles(includeDrafts = false): ArticleItem[] {
  ensureDataDir();
  try {
    if (!fs.existsSync(ARTICLES_FILE)) {
      // Seed with initial articles
      fs.writeFileSync(ARTICLES_FILE, JSON.stringify(INITIAL_ARTICLES, null, 2), 'utf-8');
      return includeDrafts ? INITIAL_ARTICLES : INITIAL_ARTICLES.filter((a) => a.status !== 'draft');
    }
    const data = fs.readFileSync(ARTICLES_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    const articles: ArticleItem[] = Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ARTICLES;
    return includeDrafts ? articles : articles.filter((a) => a.status !== 'draft');
  } catch (err) {
    console.error('Error reading articles:', err);
    return includeDrafts ? INITIAL_ARTICLES : INITIAL_ARTICLES.filter((a) => a.status !== 'draft');
  }
}

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  const articles = getArticles(true);
  return articles.find((a) => a.slug === slug);
}

export function saveArticle(article: Partial<ArticleItem>): ArticleItem {
  ensureDataDir();
  const articles = getArticles(true);
  const now = new Date().toISOString().split('T')[0];

  const totalWords = (article.content || []).join(' ').split(/\s+/).length;
  const autoReadingTime = Math.max(2, Math.ceil(totalWords / 150));

  const newArticle: ArticleItem = {
    id: article.id || `art-${Date.now()}`,
    slug: article.slug || `article-${Date.now()}`,
    title: article.title || 'مقال جديد بدون عنوان',
    excerpt: article.excerpt || '',
    content: article.content || [],
    category: article.category || 'نصائح عامة',
    author: {
      name: article.author?.name || 'فريق ديمو كلين',
      role: article.author?.role || 'خبراء مكافحة الآفات والصحة العامة',
    },
    publishedAt: article.publishedAt || now,
    updatedAt: now,
    readingTimeMinutes: article.readingTimeMinutes || autoReadingTime,
    tags: article.tags || [],
    relatedServices: article.relatedServices || ['cockroaches', 'bedbugs'],
    metaTitle: article.metaTitle || `${article.title || 'مقال'} | ديمو كلين الكويت`,
    metaDescription: article.metaDescription || article.excerpt || '',
    status: article.status || 'published',
    quickSummary: article.quickSummary || [],
    faqs: article.faqs || [],
  };

  // Prepend to top of articles list
  articles.unshift(newArticle);

  try {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving article:', err);
  }

  return newArticle;
}

export function updateArticle(id: string, updates: Partial<ArticleItem>): ArticleItem | null {
  ensureDataDir();
  const articles = getArticles(true);
  const index = articles.findIndex((a) => a.id === id || a.slug === id);
  if (index === -1) return null;

  const current = articles[index];
  const totalWords = (updates.content || current.content || []).join(' ').split(/\s+/).length;
  const autoReadingTime = Math.max(2, Math.ceil(totalWords / 150));

  const updated: ArticleItem = {
    ...current,
    ...updates,
    id: current.id, // Preserve ID
    updatedAt: new Date().toISOString().split('T')[0],
    readingTimeMinutes: updates.readingTimeMinutes || autoReadingTime,
    author: {
      ...current.author,
      ...(updates.author || {}),
    },
  };

  articles[index] = updated;

  try {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf-8');
    return updated;
  } catch (err) {
    console.error('Error updating article:', err);
    return null;
  }
}

export function deleteArticle(id: string): boolean {
  ensureDataDir();
  const articles = getArticles(true);
  const filtered = articles.filter((a) => a.id !== id && a.slug !== id);
  try {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error deleting article:', err);
    return false;
  }
}

// ------------------------------------------------------------------
// Price Packages Database Operations
// ------------------------------------------------------------------

export function getPricePackages(includeHidden = false): PricePackageItem[] {
  ensureDataDir();
  try {
    if (!fs.existsSync(PRICES_FILE)) {
      fs.writeFileSync(PRICES_FILE, JSON.stringify(INITIAL_PRICES, null, 2), 'utf-8');
      const sorted = [...INITIAL_PRICES].sort((a, b) => (a.order || 0) - (b.order || 0));
      return includeHidden ? sorted : sorted.filter((p) => p.status !== 'hidden');
    }
    const data = fs.readFileSync(PRICES_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    const list: PricePackageItem[] = Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRICES;
    const sorted = [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
    return includeHidden ? sorted : sorted.filter((p) => p.status !== 'hidden');
  } catch (err) {
    console.error('Error reading prices:', err);
    const sorted = [...INITIAL_PRICES].sort((a, b) => (a.order || 0) - (b.order || 0));
    return includeHidden ? sorted : sorted.filter((p) => p.status !== 'hidden');
  }
}

export function savePricePackage(pkg: Partial<PricePackageItem>): PricePackageItem {
  ensureDataDir();
  const prices = getPricePackages(true);
  const now = new Date().toISOString().split('T')[0];

  const newPkg: PricePackageItem = {
    id: pkg.id || `pkg-${Date.now()}`,
    slug: pkg.slug || 'pest-control',
    title: pkg.title || 'باقة مكافحة جديدة',
    subtitle: pkg.subtitle || '',
    price: String(pkg.price || '25'),
    unit: pkg.unit || 'دينار كويتي (يبدأ من)',
    currency: pkg.currency || 'KWD',
    badge: pkg.badge || '',
    popular: Boolean(pkg.popular),
    order: pkg.order ?? prices.length + 1,
    status: pkg.status === 'hidden' ? 'hidden' : 'active',
    features: Array.isArray(pkg.features) ? pkg.features.filter(Boolean) : [],
    warrantyMonths: Number(pkg.warrantyMonths) || 6,
    updatedAt: now,
  };

  prices.push(newPkg);

  try {
    fs.writeFileSync(PRICES_FILE, JSON.stringify(prices, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving price package:', err);
  }

  return newPkg;
}

export function updatePricePackage(id: string, updates: Partial<PricePackageItem>): PricePackageItem | null {
  ensureDataDir();
  const prices = getPricePackages(true);
  const index = prices.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = prices[index];
  const updated: PricePackageItem = {
    ...current,
    ...updates,
    id: current.id, // Preserve id
    features: updates.features ? updates.features.filter(Boolean) : current.features,
    updatedAt: new Date().toISOString().split('T')[0],
  };

  prices[index] = updated;

  try {
    fs.writeFileSync(PRICES_FILE, JSON.stringify(prices, null, 2), 'utf-8');
    return updated;
  } catch (err) {
    console.error('Error updating price package:', err);
    return null;
  }
}

export function deletePricePackage(id: string): boolean {
  ensureDataDir();
  const prices = getPricePackages(true);
  const filtered = prices.filter((p) => p.id !== id);
  try {
    fs.writeFileSync(PRICES_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error deleting price package:', err);
    return false;
  }
}

export function reorderPricePackages(ids: string[]): boolean {
  ensureDataDir();
  const prices = getPricePackages(true);
  const reordered: PricePackageItem[] = [];

  ids.forEach((id, index) => {
    const found = prices.find((p) => p.id === id);
    if (found) {
      found.order = index + 1;
      reordered.push(found);
    }
  });

  prices.forEach((p) => {
    if (!reordered.find((r) => r.id === p.id)) {
      p.order = reordered.length + 1;
      reordered.push(p);
    }
  });

  try {
    fs.writeFileSync(PRICES_FILE, JSON.stringify(reordered, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error reordering price packages:', err);
    return false;
  }
}
