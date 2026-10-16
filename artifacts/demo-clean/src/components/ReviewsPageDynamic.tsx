'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import type { ReviewItem } from '@/data/reviews';

interface ReviewsPageDynamicProps {
  initialReviews?: ReviewItem[];
}

export default function ReviewsPageDynamic({ initialReviews = [] }: ReviewsPageDynamicProps) {
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
          border: '1px solid #e1e3da',
          padding: '48px 24px',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>⭐</div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#18354b', margin: '0 0 8px' }}>
          شاركنا تجربتك الأولى مع ديمو كلين
        </h3>
        <p style={{ fontSize: '14px', color: '#667770', lineHeight: 1.8, marginBottom: '22px' }}>
          نحرص دائماً على تقديم أعلى معايير الجودة ورضا العملاء في جميع محافظات الكويت. إذا استفدت من خدماتنا، يسعدنا سماع رأيك.
        </p>
        <Link href="/review" className="button-primary">
          <span>كتابة تقييم وتجربة الآن</span>
          <ArrowLeft size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cards-auto-grid">
      {reviews.map((rev) => (
        <div
          key={rev.id}
          style={{
            background: '#fff',
            border: '1px solid #e1e3da',
            padding: '28px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 10px 24px rgba(0,0,0,.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: '#18354b' }}>
                {rev.authorName}
              </h3>
              <span style={{ fontSize: '12px', color: '#778680', marginTop: '2px', display: 'block' }}>
                {rev.governorateName} — منطقة {rev.areaName}
              </span>
            </div>
            <div style={{ display: 'flex', color: '#f59e0b' }}>
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#446e2c',
                background: '#edf4e6',
                padding: '4px 10px',
                borderRadius: '4px',
              }}
            >
              <CheckCircle2 size={13} />
              <span>الخدمة المنفذة: {rev.serviceName}</span>
            </div>

            {rev.source === 'google' ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '11px',
                  color: '#1a73e8',
                  background: '#e8f0fe',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: 700,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>تقييم عبر Google Maps</span>
              </div>
            ) : (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '11px',
                  color: '#204733',
                  background: '#f0f5ee',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
              >
                <span>تقييم موثق من الموقع</span>
              </div>
            )}
          </div>

          <p style={{ margin: 0, fontSize: '14px', lineHeight: 2, color: '#52625f' }}>
            "{rev.comment}"
          </p>

          <div
            style={{
              marginTop: 'auto',
              paddingTop: '14px',
              borderTop: '1px solid #edf0e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#88948f',
            }}
          >
            <span>تاريخ الخدمة: {rev.date}</span>
            {rev.verified && (
              <span style={{ color: '#4f7d37', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={13} /> عميل موثق
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
