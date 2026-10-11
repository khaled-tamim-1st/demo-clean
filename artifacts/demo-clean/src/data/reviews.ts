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

// No hardcoded mock reviews - purely driven by actual approved reviews
export const reviewsData: ReviewItem[] = [];

export const reviewsStats = {
  averageRating: 4.9,
  totalReviews: 840,
  satisfactionRate: '99%',
  completedJobsCount: '+5,200',
};

export function getApprovedReviews(): ReviewItem[] {
  try {
    const { getPublishedReviews } = require('@/lib/db');
    const dynamicList = getPublishedReviews() as ReviewItem[];
    if (Array.isArray(dynamicList)) {
      return dynamicList;
    }
  } catch {
    // Fallback if db is unavailable
  }
  return reviewsData;
}
