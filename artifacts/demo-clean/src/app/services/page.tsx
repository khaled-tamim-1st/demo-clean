import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bug, ShieldAlert, Rat, Sparkles, CalendarCheck, ShieldCheck, Check, Clock, Award } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { servicesData } from '@/data/services';

export const metadata: Metadata = {
  title: 'شركة مكافحة حشرات الكويت | أفضل خدمات ابادة وضمان خطي - ديمو كلين',
  description: 'دليل خدمات ديمو كلين الكويت (ترخيص 14620/2025): مكافحة الصراصير بالجل، علاج بق الفراش بالتبخير والحرارة 180°C، مكافحة النمل الابيض حقن الارضة، وصيد الفئران والقوارض. نصلك خلال 30 دقيقة.',
  keywords: [
    'شركة مكافحة حشرات الكويت',
    'مكافحة الصراصير الكويت بالجل',
    'علاج بق الفراش بالتبخير',
    'مكافحة النمل الابيض حقن الارضة',
    'صيد الفئران والقوارض',
    'رش حشرات الكويت',
    'اسعار مكافحة الحشرات بالكويت',
  ],
  alternates: {
    canonical: 'https://democleankw.com/services',
  },
};

const serviceIcons: Record<string, React.ReactNode> = {
  cockroaches: <Bug size={24} />,
  bedbugs: <ShieldAlert size={24} />,
  termites: <ShieldAlert size={24} />,
  rodents: <Rat size={24} />,
  'preventive-spraying': <CalendarCheck size={24} />,
  disinfection: <Sparkles size={24} />,
  'gecko-control': <ShieldAlert size={24} />,
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'خدماتنا' }]} />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>شركة معتمدة بوزارة الصحة - ترخيص رقم 14620/2025</span>
            <h1>خدمات مكافحة الحشرات والقوارض في الكويت</h1>
            <p>
              في ديمو كلين نطبق بروتوكولات الإدارة المتكاملة للآفات (IPM) المعتمدة عالمياً. 
              نستخدم مبيدات الكبسولات الدقيقة وتقنيات الحقن والتبخير المصممة خصيصاً لتحمل حرارة صيف الكويت القاسية (50°C+). 
              حلولنا آمنة تماماً للأطفال، الحوامل، ومرضى الربو والحيوانات الأليفة.
            </p>
            <div className="page-header-meta" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <span><ShieldCheck size={16} /> مبيدات مرخصة بوزارة الصحة (WHO)</span>
              <span><Clock size={16} /> استجابة خلال 30 دقيقة</span>
              <span><Award size={16} /> كفالة خطية (6 أشهر إلى 10 سنوات)</span>
              <span><Check size={16} /> أسعار شفافة تبدأ من 20 د.ك</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f5f4ed' }} dir="rtl">
        <div className="container">
          <div className="services-grid-6">
            {servicesData.map((svc, index) => (
              <div
                key={svc.slug}
                className="service-card"
                style={{ background: '#fff' }}
              >
                <span className="service-card-badge">{svc.badge}</span>
                <span className="service-index">0{index + 1} / SERVICE</span>
                <span className="service-icon">
                  {serviceIcons[svc.slug] || <Bug size={24} />}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 10px' }}>{svc.title}</h2>
                <p>{svc.shortDescription}</p>

                <div style={{ margin: '18px 0', borderTop: '1px solid #ebede4', paddingTop: '14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#436d2c', marginBottom: '8px' }}>
                    أبرز المزايا والبروتوكولات:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {svc.features.slice(0, 3).map((f, i) => (
                      <li key={i} style={{ fontSize: '12px', color: '#63706c', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Check size={13} style={{ color: '#578740', flex: 'none', marginTop: '2px' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-footer">
                  <div>
                    <span style={{ fontSize: '11px', color: '#88948e', display: 'block' }}>السعر التقريبي</span>
                    <span className="service-price">{svc.priceStartingFrom}</span>
                  </div>
                  <Link href={`/services/${svc.slug}`} className="service-arrow">
                    <span>عرض التفاصيل العلمية والأسعار</span>
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
