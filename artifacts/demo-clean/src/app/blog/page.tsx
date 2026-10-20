import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, User, ArrowLeft, Tag, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getLoadedArticles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'مدونة مكافحة الحشرات والآفات بالكويت',
  description: 'مقالات وأدلة علمية متخصصة للقضاء على بق الفراش، الصراصير، النمل الأبيض، والقوارض في الكويت. نصائح وقائية لحماية المنازل من حرارة الصيف.',
  keywords: [
    'مدونة مكافحة الحشرات',
    'كيف اتخلص من بق الفراش',
    'مكافحة الصراصير الصغيرة',
    'علامات النمل الابيض',
    'طرق ابعاد الفئران',
    'نصائح مكافحة الحشرات الكويت',
  ],
  alternates: {
    canonical: 'https://democleankw.com/blog',
  },
  openGraph: {
    title: 'مدونة مكافحة الحشرات والآفات بالكويت | ديمو كلين',
    description: 'مقالات وأدلة علمية متخصصة للقضاء على بق الفراش، الصراصير، النمل الأبيض، والقوارض في الكويت.',
    url: 'https://democleankw.com/blog',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function BlogIndexPage() {
  const articles = getLoadedArticles();

  return (
    <>
      <Breadcrumbs items={[{ label: 'المدونة' }]} />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#bee58f' }}>
              معرفة وتوعية بيئية
            </span>
            <h1>المركز المعرفي لمكافحة الآفات في الكويت</h1>
            <p>
              أدلة إرشادية ونصائح عملية يقدمها نخبة من خبراء المكافحة والصحة العامة في ديمو كلين. اكتشف أحدث طرق حماية منزلك وعائلتك من الآفات والتصدي بفعالية لتحديات الطقس الحار في الكويت باستخدام أساليب آمنة ومعتمدة.
            </p>
            <div className="page-header-meta">
              <span><BookOpen size={16} /> {articles.length} أدلة تفصيلية شاملة</span>
              <span><Clock size={16} /> مقالات حديثة ومحدثة دورياً</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f0f7fe' }} dir="rtl">
        <div className="container">
          <div className="cards-auto-grid">
            {articles.map((article) => (
              <article
                key={article.slug}
                style={{
                  background: '#fff',
                  border: '1px solid #e1e4da',
                  padding: '28px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'transform .2s, box-shadow .2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <span
                    style={{
                      background: '#edf3e6',
                      color: '#466f2f',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    {article.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#828e87' }}>
                    <Clock size={13} />
                    <span>قراءة في {article.readingTimeMinutes} دقائق</span>
                  </div>
                </div>

                <h2 style={{ fontSize: '19px', fontWeight: 700, margin: 0, color: '#1b3f5a', lineHeight: 1.45 }}>
                  <Link
                    href={`/blog/${article.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {article.title}
                  </Link>
                </h2>

                <p style={{ margin: 0, fontSize: '13px', color: '#62716c', lineHeight: 1.85 }}>
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '6px 0' }}>
                  {article.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '11px',
                        color: '#65736f',
                        background: '#f4f5f0',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #edf0e6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#687771' }}>
                    <User size={13} style={{ color: '#559a35' }} />
                    <span>{article.author.name}</span>
                  </div>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="service-arrow"
                    style={{ fontSize: '13px' }}
                  >
                    <span>قراءة المقال</span>
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
