'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { ReviewItem } from '@/data/reviews';

interface HomeReviewsDynamicProps {
  initialReviews?: ReviewItem[];
}

export default function HomeReviewsDynamic({ initialReviews = [] }: HomeReviewsDynamicProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.reviews)) {
            let combined = [...data.reviews];
            if (typeof window !== 'undefined') {
              try {
                const localApproved = JSON.parse(localStorage.getItem('democlean_approved_reviews') || '[]');
                for (const loc of localApproved) {
                  if (!combined.some((c) => String(c.id) === String(loc.id))) {
                    combined.unshift(loc);
                  }
                }
              } catch {}
            }
            if (combined.length > 0) {
              setReviews(combined);
            }
          }
        }
      } catch (e) {
        if (typeof window !== 'undefined') {
          try {
            const localApproved = JSON.parse(localStorage.getItem('democlean_approved_reviews') || '[]');
            if (localApproved.length > 0) {
              setReviews(localApproved);
            }
          } catch {}
        }
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #e1e4d8',
          padding: '36px 20px',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>⭐</div>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e4663', margin: '0 0 6px' }}>
          رأي عملائنا هو فخرنا وشهادتنا
        </h3>
        <p style={{ fontSize: '13px', color: '#687770', margin: '0 0 18px', lineHeight: 1.7 }}>
          نفخر بتقديم خدمات مكافحة الحشرات لجميع مناطق الكويت بكفالة 6 شهور معتمدة. هل تعاملت معنا مؤخراً؟
        </p>
        <Link href="/review" className="button-primary">
          <span>أضف تقييمك ورأيك بالخدمة</span>
          <ArrowLeft size={14} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="cards-auto-grid">
        {reviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            style={{
              background: '#fff',
              border: '1px solid #e1e4d8',
              padding: '24px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '15px', color: '#1e4663' }}>{review.authorName}</strong>
                <div style={{ fontSize: '11px', color: '#4a5550', marginTop: '2px' }}>
                  {review.governorateName} — {review.areaName}
                </div>
              </div>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: '#4d7a33',
                  background: '#eef4e6',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  width: 'fit-content',
                }}
              >
                <CheckCircle2 size={12} />
                <span>خدمة: {review.serviceName}</span>
              </div>

              {review.source === 'google' ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10.5px',
                    color: '#1a73e8',
                    background: '#e8f0fe',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontWeight: 700,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5-2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>Google Maps</span>
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10.5px',
                    color: '#296142',
                    background: '#f0f5ee',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  <span>الموقع</span>
                </div>
              )}
            </div>

            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.85', color: '#586663' }}>
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/reviews" className="button-outline">
          <span>عرض جميع تقييمات العملاء</span>
          <ArrowLeft size={14} />
        </Link>
      </div>
    </>
  );
}
