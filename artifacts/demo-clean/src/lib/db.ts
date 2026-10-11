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

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');
const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
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
