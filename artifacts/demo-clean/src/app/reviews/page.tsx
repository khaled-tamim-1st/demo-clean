import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CheckCircle2, ShieldCheck, ArrowLeft, Quote } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { reviewsData, reviewsStats, getApprovedReviews } from '@/data/reviews';
import ReviewsPageDynamic from '@/components/ReviewsPageDynamic';

export const metadata: Metadata = {
  title: 'آراء وتقييمات العملاء بالكويت',
  description: 'اطلع على تقييمات وتجارب عملاء ديمو كلين الحقيقية في مكافحة الصراصير، بق الفراش، النمل الأبيض، والقوارض بمختلف محافظات الكويت.',
  keywords: [
    'تقييمات ديمو كلين',
    'آراء شركة مكافحة حشرات الكويت',
    'تجارب مكافحة بق الفراش الكويت',
    'افضل شركة رش حشرات عن تجربة',
  ],
  alternates: {
    canonical: 'https://democleankw.com/reviews',
  },
  openGraph: {
    title: 'آراء وتقييمات عملاء ديمو كلين بالكويت',
    description: 'اطلع على تجارب عملاء ديمو كلين الموثقة في مكافحة الحشرات والقوارض في جميع محافظات الكويت.',
    url: 'https://democleankw.com/reviews',
    type: 'website',
    images: ['/og-image.jpg'],
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
    '@id': 'https://democleankw.com/#organization',
    name: 'ديمو كلين لمكافحة الحشرات والقوارض',
    telephone: '+96567088755',
    image: 'https://democleankw.com/demo-clean-identity.webp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'مدينة الكويت، شارع الشهداء، برج التجارية',
      addressLocality: 'مدينة الكويت',
      addressRegion: 'العاصمة',
      addressCountry: 'KW',
    },
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
            <span className="eyebrow" style={{ color: '#bee58f' }}>
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
                  background: '#bee58f',
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

      <section className="section" style={{ background: '#f0f7fe' }} dir="rtl">
        <div className="container">

          <ReviewsPageDynamic initialReviews={reviews} />

          {/* Bottom Action */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e4663', marginBottom: '10px' }}>
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
