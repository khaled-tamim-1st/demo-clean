import Link from 'next/link';
import { ArrowLeft, Home, Search, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }} dir="rtl">
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: '#eef3e8',
            color: '#559a35',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 20px',
          }}
        >
          <ShieldAlert size={36} />
        </div>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          خطأ 404
        </span>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1b3f5a', margin: '14px 0 12px' }}>
          عذراً، هذه الصفحة غير موجودة
        </h1>
        <p style={{ color: '#687771', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
          يبدو أن الرابط الذي حاولت الوصول إليه قد تم نقله أو تغييره، أو لم يعد متاحاً. يمكنك العودة إلى الصفحة الرئيسية أو تصفح خدماتنا في الكويت.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/" className="button-primary">
            <Home size={15} />
            <span>الصفحة الرئيسية</span>
          </Link>
          <Link href="/services" className="button-outline">
            <Search size={15} />
            <span>استعراض الخدمات</span>
          </Link>
          <Link href="/coverage" className="button-outline">
            <span>مناطق التغطية</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
