import Link from 'next/link';
import Image from 'next/image';
import { Leaf, PhoneCall, ArrowUp, ShieldCheck, Clock, MapPin, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { servicesData } from '@/data/services';
import { governoratesData } from '@/data/locations';
import { COMPANY_INFO } from '@/data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" dir="rtl">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link className="brand" href="/" style={{ color: '#f3f0e7' }} aria-label="ديمو كلين - الرئيسية">
              <Image
                src="/logo-light.webp"
                alt="شعار ديمو كلين"
                width={90}
                height={90}
                sizes="90px"
                style={{
                  height: '84px',
                  width: 'auto',
                  maxHeight: '84px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>
            <p className="footer-about-text">
              الشركة الرائدة في خدمات التنظيف الشامل ومكافحة الحشرات والقوارض والتعقيم البيئي بجميع محافظات الكويت. نعتمد على ماكينات إيطالية متطورة ومبيدات صحية معتمدة تضمن سلامة عائلتك ومنشأتك مع كفالة وضمان موثق.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <a href={COMPANY_INFO.phoneTel} className="footer-phone-cta">
                <PhoneCall size={16} />
                <span>طوارئ 24/7: <strong>{COMPANY_INFO.phone}</strong></span>
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#25D366',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={16} />
                <span>محادثة واتساب: {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>خدمات المكافحة</h3>
            <ul>
              {servicesData.map((svc) => (
                <li key={svc.slug}>
                  <Link href={`/services/${svc.slug}`}>{svc.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>المحافظات ومناطق الكويت</h3>
            <ul>
              {governoratesData.map((gov) => (
                <li key={gov.slug}>
                  <Link href={`/coverage/${gov.slug}`}>{gov.name} ({gov.areas.length} مناطق)</Link>
                </li>
              ))}
              <li>
                <Link href="/coverage" style={{ color: '#bee58f', fontWeight: 600 }}>
                  ← عرض كافة مناطق التغطية
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>روابط هامة ومعلومات</h3>
            <ul>
              <li><Link href="/cleaning-services" style={{ color: '#bee58f', fontWeight: 700 }}>★ قسم خدمات التنظيف الشامل</Link></li>
              <li><Link href="/pest-control-prices" style={{ color: '#bee58f', fontWeight: 600 }}>باقات وقائمة الأسعار</Link></li>
              <li><Link href="/commercial/restaurants">مكافحة حشرات المطاعم والكافيهات</Link></li>
              <li><Link href="/about">عن ديمو كلين</Link></li>
              <li><Link href="/reviews">آراء وتقييمات العملاء</Link></li>
              <li><Link href="/blog">مدونة التوعية بالآفات</Link></li>
              <li><Link href="/faq">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact">تواصل معنا وحجز موعد</Link></li>
            </ul>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#a6b7a8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={13} style={{ color: '#bee58f' }} /> نعمل 24 ساعة يومياً طوال الأسبوع
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} style={{ color: '#bee58f' }} /> نغطي جميع مناطق دولة الكويت الست
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={13} style={{ color: '#bee58f' }} /> ترخيص رقم: {COMPANY_INFO.licenseNumber} | س.ت: {COMPANY_INFO.commercialRegister}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {currentYear} ديمو كلين. شركة مرخصة برقم {COMPANY_INFO.licenseNumber} - سجل تجاري {COMPANY_INFO.commercialRegister}. جميع الحقوق محفوظة لخدمات التنظيف ومكافحة الحشرات والقوارض في الكويت.
          </div>
          <div className="footer-bottom-links">
            <Link href="/cleaning-services">خدمات التنظيف</Link>
            <Link href="/services">مكافحة الحشرات</Link>
            <Link href="/coverage">خريطة المناطق</Link>
            <Link href="/contact">طلب استفسار</Link>
            <a href="#top" className="back-top" aria-label="العودة إلى أعلى الصفحة">
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* WebinOO SEO Backlink Bar */}
      <div className="webinoo-bar">
        <div className="container webinoo-bar-inner">
          <span>صُنع بإتقان وشغف بواسطة</span>
          <a
            href="https://webinoo.online"
            target="_blank"
            rel="noopener"
            className="webinoo-link"
            title="webinOO — تصميم مواقع وتحسين الظهور في Google بالكويت"
          >
            <span className="brand-text">WebinOO</span>
          </a>
          <span style={{ fontSize: '11px', opacity: 0.75 }}>· حلول الويب وتصدر Google</span>
        </div>
      </div>
    </footer>
  );
}
