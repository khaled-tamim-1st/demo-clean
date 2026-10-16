import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Leaf,
  Clock,
  ArrowLeft,
  Building,
  PhoneCall,
  FileText,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'عن ديمو كلين | افضل شركة مكافحة حشرات مرخصة في الكويت',
  description: 'تعرف على ديمو كلين، الشركة الرائدة في مكافحة الآفات في الكويت. خبراء معتمدون، مبيدات مرخصة من وزارة الصحة آمنة للأطفال، وضمان حقيقي للقضاء على الحشرات.',
  keywords: [
    'عن ديمو كلين',
    'شركة مكافحة حشرات معتمدة الكويت',
    'افضل شركة رش حشرات بالكويت',
    'شركة مكافحة قوارض مرخصة',
  ],
  alternates: {
    canonical: 'https://democleankw.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'من نحن' }]} />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>
              ريادة وخبرة معتمدة
            </span>
            <h1>عن شركة ديمو كلين لمكافحة الحشرات بالكويت</h1>
            <p>
              تأسست ديمو كلين برؤية واضحة: تقديم خدمات مكافحة آفات وقوارض بمعايير علمية وبيئية صارمة، تجمع بين الفعالية الألمانية الحاسمة والأمان التام لصحة العائلة وراحة المكان.
            </p>
            <div className="page-header-meta">
              <span><FileText size={16} /> ترخيص رقم: {COMPANY_INFO.licenseNumber}</span>
              <span><ShieldCheck size={16} /> سجل تجاري: {COMPANY_INFO.commercialRegister}</span>
              <span><Award size={16} /> مبيدات مصرحة من وزارة الصحة الكويتية</span>
              <span><Clock size={16} /> خدمة 24 ساعة لجميع المحافظات</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container">
          {/* Story & Philosophy */}
          <div className="two-col-layout" style={{ alignItems: 'center', marginBottom: '56px' }}>
            <div>
              <span className="eyebrow">قصتنا وفلسفتنا</span>
              <h2 className="section-heading" style={{ fontSize: '30px' }}>
                مكافحة متطورة<br />تراعي صحة الإنسان والبيئة
              </h2>
              <p className="section-copy">
                في بيئة مناخية قاسية مثل الكويت ذات الصيف الحار جداً، تتكاثر الحشرات وتتسلل إلى المباني باحثة عن الرطوبة والبرودة. لعقود، اعتمد السوق على العمالة غير المتخصصة أو مبيدات كيميائية تقليدية ذات روائح نفاذة وأضرار تنفسية بالغة.
              </p>
              <p className="section-copy" style={{ marginTop: '12px' }}>
                انطلقت ديمو كلين بخبرات هندسية متخصصة لتغيير هذه المعادلة جذرياً؛ نعتمد حصراً على نظام المكافحة المتكاملة (IPM)، واستخدام الجل الألماني المتطور والمبيدات الميكروكبسولية المعتمدة. نحقق نسبة إبادة 100% بأمان تام على الرضع، كبار السن، والحيوانات الأليفة، دون أن يضطر أفراد الأسرة إلى مغادرة منزلهم أو إفراغ خزائنهم.
              </p>
            </div>

            <div
              style={{
                background: '#fff',
                padding: '36px',
                borderRadius: '12px',
                border: '1px solid #e1e3da',
                boxShadow: '0 16px 36px rgba(0,0,0,.04)',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 18px', color: '#18354b' }}>
                ركائز العمل الأساسية في ديمو كلين:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e5efd8', color: '#55833c', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: '#17354a' }}>الأمان الصحي والبيئي أولاً:</strong>
                    <div style={{ fontSize: '12px', color: '#687771', marginTop: '2px' }}>
                      لا نستخدم أي مادة دون التحقق من مطابقتها لاشتراطات وزارة الصحة الكويتية ومنظمة الصحة العالمية (WHO).
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e5efd8', color: '#55833c', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Award size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: '#17354a' }}>الضمان الحقيقي والالتزام:</strong>
                    <div style={{ fontSize: '12px', color: '#687771', marginTop: '2px' }}>
                      كل خدمة تصدر معها شهادة كفالة خطية؛ وفي حال ظهور أي آفة خلال مدة الضمان نتحرك لإعادة الرش مجاناً خلال 24 ساعة.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e5efd8', color: '#55833c', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Users size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: '#17354a' }}>طواقم فنية مؤهلة:</strong>
                    <div style={{ fontSize: '12px', color: '#687771', marginTop: '2px' }}>
                      فنيون مدربون على أعلى مستوى يلتزمون بالزي الرسمي، النظافة، وأدق تعليمات خصوصية المنازل الكويتية.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges & Credentials Section for E-E-A-T */}
          <div style={{ marginBottom: '56px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="eyebrow">الاعتمادات والتراخيص</span>
              <h2 className="section-heading" style={{ fontSize: '26px' }}>موثوقية مدعومة بالشهادات الرسمية</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '10px', border: '1px solid #e1e3da', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f1f5eb', color: '#55833c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Award size={24} />
                </div>
                <h4 style={{ fontSize: '16px', color: '#18354b', marginBottom: '8px' }}>ترخيص وزارة الصحة</h4>
                <p style={{ fontSize: '13px', color: '#687771', margin: 0 }}>جميع مبيداتنا مسجلة ومعتمدة من قبل إدارة التسجيل والمراقبة الطبية بوزارة الصحة الكويتية.</p>
              </div>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '10px', border: '1px solid #e1e3da', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f1f5eb', color: '#55833c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <ShieldCheck size={24} />
                </div>
                <h4 style={{ fontSize: '16px', color: '#18354b', marginBottom: '8px' }}>شركة مرخصة رسمياً</h4>
                <p style={{ fontSize: '13px', color: '#687771', margin: 0 }}>نعمل بشكل قانوني بترخيص رقم {COMPANY_INFO.licenseNumber} وسجل تجاري رقم {COMPANY_INFO.commercialRegister}.</p>
              </div>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '10px', border: '1px solid #e1e3da', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f1f5eb', color: '#55833c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={24} />
                </div>
                <h4 style={{ fontSize: '16px', color: '#18354b', marginBottom: '8px' }}>وكلاء مبيدات عالمية</h4>
                <p style={{ fontSize: '13px', color: '#687771', margin: 0 }}>نستخدم منتجات أصلية (أمريكية وألمانية) مثبتة الفعالية وغير ضارة بالصحة العامة.</p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            className="stats-four-grid"
            style={{
              background: '#18354b',
              color: '#fff',
              padding: '40px',
              borderRadius: '12px',
              textAlign: 'center',
              marginBottom: '56px',
            }}
          >
            <div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#a9cd7d' }}>+5,200</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.8)', marginTop: '4px' }}>منزل ومنشأة تم حمايتها</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#a9cd7d' }}>6</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.8)', marginTop: '4px' }}>محافظات مغطاة بالكامل</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#a9cd7d' }}>99%</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.8)', marginTop: '4px' }}>نسبة رضا العملاء</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#a9cd7d' }}>24/7</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.8)', marginTop: '4px' }}>طوارئ واستجابة سريعة</div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#18354b', marginBottom: '12px' }}>
              مستعدون لحماية منزلك أو منشأتك اليوم
            </h2>
            <p style={{ color: '#677470', fontSize: '15px', maxWidth: '520px', margin: '0 auto 24px' }}>
              تواصل مع فريقنا الفني للحصول على معاينة مجانية واقتراح خطة المعالجة المثالية مع شهادة الضمان.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a href={COMPANY_INFO.phoneTel} className="button-primary">
                <PhoneCall size={15} />
                <span>اتصل بنا الآن: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline"
                style={{ background: '#25D366', color: '#fff', borderColor: '#25D366' }}
              >
                <span>محادثة واتساب سريعة</span>
              </a>
              <Link href="/services" className="button-outline">
                <span>تصفح دليل الخدمات</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
