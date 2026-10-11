import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CheckCircle2, ShieldCheck, ArrowLeft, Quote } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { reviewsData, reviewsStats, getApprovedReviews } from '@/data/reviews';

export const metadata: Metadata = {
  title: 'آراء وتقييمات عملاء ديمو كلين لمكافحة الحشرات في الكويت',
  description: 'اطلع على تقييمات وتجارب عملاء ديمو كلين الحقيقية في مكافحة الصراصير، بق الفراش، النمل الأبيض، والقوارض بمختلف محافظات الكويت.',
  keywords: [
    'تقييمات ديمو كلين',
    'آراء شركة مكافحة حشرات الكويت',
    'تجارب مكافحة بق الفراش الكويت',
    'افضل شركة رش حشرات عن تجربة',
  ],
  alternates: {
    canonical: 'https://democlean-kuwait.com/reviews',
  },
};

export default function ReviewsPage() {
  const reviews = getApprovedReviews();
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'PestControl',
    name: 'ديمو كلين لمكافحة الحشرات والقوارض',
    ...(reviews.length > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating,
        reviewCount: reviews.length.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
    review: reviews.map((rev) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.authorName,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.rating.toString(),
        bestRating: '5',
      },
      reviewBody: rev.comment,
      datePublished: rev.date,
    })),
  };

  return (
    <>
      <JsonLd data={aggregateRatingSchema} />
      <Breadcrumbs items={[{ label: 'آراء العملاء' }]} />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>
              دليل اجتماعي موثق
            </span>
            <h1>آراء وتقييمات عملاء ديمو كلين في الكويت</h1>
            <p>
              نفخر بثقة آلاف الأسر وأصحاب المطاعم والشركات في محافظات الكويت الست. إليك تجارب حقيقية موثقة لخدماتنا في مكافحة الصراصير، بق الفراش، النمل الأبيض، والقوارض.
            </p>
            <div className="page-header-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <Link
                href="/review"
                style={{
                  background: '#b2d488',
                  color: '#122e20',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '13px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>شاركنا تقييمك وتجربتك</span>
                <ArrowLeft size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container">

          {/* Testimonials Grid or Empty State */}
          {reviews.length === 0 ? (
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
          ) : (
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
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#446e2c', background: '#edf4e6', padding: '4px 10px', borderRadius: '4px' }}>
                      <CheckCircle2 size={13} />
                      <span>الخدمة المنفذة: {rev.serviceName}</span>
                    </div>

                    {rev.source === 'google' ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#1a73e8', background: '#e8f0fe', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>تقييم عبر Google Maps</span>
                      </div>
                    ) : (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#204733', background: '#f0f5ee', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        <span>تقييم موثق من الموقع</span>
                      </div>
                    )}
                  </div>

                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 2, color: '#52625f' }}>
                    "{rev.comment}"
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #edf0e6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#88948f' }}>
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
          )}

          {/* Bottom Action */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#18354b', marginBottom: '10px' }}>
              انضم إلى آلاف العملاء الراضين في الكويت
            </h3>
            <p style={{ color: '#687771', fontSize: '14px', marginBottom: '20px' }}>
              احجز موعد المعاينة اليوم واحصل على حماية فعالة مع كفالة كتابية معتمدة.
            </p>
            <Link href="/contact" className="button-primary">
              <span>طلب معاينة مجانية الآن</span>
              <ArrowLeft size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
