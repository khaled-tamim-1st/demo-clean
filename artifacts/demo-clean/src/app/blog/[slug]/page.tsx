import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, User, Calendar, Tag, ArrowLeft, PhoneCall, ShieldCheck, Share2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { getLoadedArticles, getArticleBySlug, getAllArticleSlugs } from '@/data/articles';
import { servicesData } from '@/data/services';
import { COMPANY_INFO } from '@/data/company';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'المقال غير موجود' };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.tags,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      url: `https://democleankw.com/blog/${article.slug}`,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://democleankw.com/blog/${article.slug}`,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: 'https://democleankw.com/og-image.jpg',
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ديمو كلين لمكافحة الحشرات والقوارض',
      logo: {
        '@type': 'ImageObject',
        url: 'https://democleankw.com/logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://democleankw.com/blog/${article.slug}`,
    },
  };
  const schemaList: Record<string, unknown>[] = [articleSchema];
  if (article.faqs && article.faqs.length > 0) {
    schemaList.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  const relatedServicesList = servicesData.filter((svc) =>
    article.relatedServices.includes(svc.slug)
  );

  const formatInline = (text: string) => {
    return text
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #436d2b; text-decoration: underline; font-weight: 700;">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #18354b;">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  };

  return (
    <>
      {schemaList.map((s, idx) => (
        <JsonLd key={idx} data={s} />
      ))}
      <Breadcrumbs
        items={[
          { label: 'المدونة', href: '/blog' },
          { label: article.title },
        ]}
      />

      <article dir="rtl">
        <header className="page-header">
          <div className="container">
            <div className="page-header-content" style={{ maxWidth: '860px' }}>
              <span className="eyebrow" style={{ color: '#b2d488' }}>
                {article.category} · إرشادات عملية
              </span>
              <h1 style={{ fontSize: 'clamp(26px, 3.8vw, 40px)', lineHeight: 1.35 }}>
                {article.title}
              </h1>
              <p style={{ fontSize: '16px' }}>{article.excerpt}</p>

              <div className="page-header-meta" style={{ gap: '20px' }}>
                <span><User size={15} /> {article.author.name} ({article.author.role})</span>
                <span><Calendar size={15} /> نُشر في: {article.publishedAt}</span>
                {article.updatedAt && (
                  <span><Clock size={15} /> آخر تحديث: {article.updatedAt}</span>
                )}
                <span><Clock size={15} /> وقت القراءة: {article.readingTimeMinutes} دقائق</span>
              </div>
            </div>
          </div>
        </header>

        <section className="section" style={{ background: '#f6f5ef' }}>
          <div className="container content-sidebar-layout">
            <div>
              {/* Main Article Body */}
              <div
                style={{
                  background: '#fff',
                  padding: '36px',
                  borderRadius: '10px',
                  border: '1px solid #e2e4db',
                  lineHeight: 2.2,
                  fontSize: '16px',
                  color: '#44514f',
                }}
              >
                {/* GEO & AI Quick Summary Box */}
                {article.quickSummary && article.quickSummary.length > 0 && (
                  <div
                    style={{
                      background: '#f3f8ee',
                      border: '2px solid #b2d488',
                      borderRadius: '10px',
                      padding: '24px',
                      marginBottom: '32px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <ShieldCheck size={22} style={{ color: '#436d2b' }} />
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#18354b' }}>
                        الخلاصة السريعة من خبراء ديمو كلين (إجابة حاسمة وموجزة):
                      </h3>
                    </div>
                    <ul style={{ margin: 0, paddingRight: '22px', lineHeight: 1.9, color: '#2b3f20' }}>
                      {article.quickSummary.map((point, idx) => (
                        <li key={idx} style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: formatInline(point) }} />
                      ))}
                    </ul>
                  </div>
                )}

                {article.content.map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2
                        key={index}
                        style={{
                          fontSize: '24px',
                          fontWeight: 800,
                          color: '#18354b',
                          marginTop: '36px',
                          marginBottom: '16px',
                          borderRight: '4px solid #a9cd7d',
                          paddingRight: '12px',
                        }}
                      >
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3
                        key={index}
                        style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#18354b',
                          marginTop: '26px',
                          marginBottom: '12px',
                        }}
                      >
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('> ')) {
                    return (
                      <div
                        key={index}
                        style={{
                          background: '#fdfbf4',
                          borderRight: '4px solid #e09f3e',
                          padding: '16px 20px',
                          margin: '20px 0',
                          borderRadius: '4px 8px 8px 4px',
                          color: '#5c4327',
                          lineHeight: 1.9,
                        }}
                        dangerouslySetInnerHTML={{ __html: formatInline(paragraph.replace('> ', '')) }}
                      />
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li
                        key={index}
                        style={{ marginBottom: '10px', marginRight: '22px', listStyleType: 'disc' }}
                        dangerouslySetInnerHTML={{ __html: formatInline(paragraph.replace('- ', '')) }}
                      />
                    );
                  }
                  if (/^\d+\.\s/.test(paragraph)) {
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          marginBottom: '12px',
                          alignItems: 'baseline',
                        }}
                      >
                        <span
                          style={{
                            background: '#18354b',
                            color: '#fff',
                            borderRadius: '50%',
                            minWidth: '24px',
                            height: '24px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          {paragraph.match(/^(\d+)\./)?.[1]}
                        </span>
                        <div
                          style={{ flex: 1 }}
                          dangerouslySetInnerHTML={{ __html: formatInline(paragraph.replace(/^\d+\.\s*/, '')) }}
                        />
                      </div>
                    );
                  }
                  return (
                    <p 
                      key={index} 
                      style={{ marginBottom: '22px' }}
                      dangerouslySetInnerHTML={{ __html: formatInline(paragraph) }} 
                    />
                  );
                })}

                {/* Interactive FAQ Section with Schema */}
                {article.faqs && article.faqs.length > 0 && (
                  <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px dashed #e2e4db' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#18354b', marginBottom: '20px' }}>
                      الأسئلة الأكثر شيوعاً وإجابات الخبراء (PAA & GEO)
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {article.faqs.map((faq, i) => (
                        <details
                          key={i}
                          style={{
                            background: '#f9faf6',
                            border: '1px solid #e2e4db',
                            borderRadius: '8px',
                            padding: '16px 20px',
                            cursor: 'pointer',
                          }}
                        >
                          <summary style={{ fontWeight: 700, color: '#18354b', fontSize: '16px', outline: 'none' }}>
                            {faq.question}
                          </summary>
                          <p style={{ margin: '12px 0 0 0', color: '#44514f', lineHeight: 1.9, fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: formatInline(faq.answer) }} />
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Box for E-E-A-T */}
                <div style={{ marginTop: '40px', padding: '24px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#b2d488', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#18354b', fontSize: '24px', fontWeight: 'bold' }}>
                      {article.author.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1e293b' }}>{article.author.name}</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>{article.author.role}</p>
                    </div>
                  </div>
                  <p style={{ margin: '0', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                    خبير معتمد في صحة البيئة والمكافحة المتكاملة (IPM) في دولة الكويت. يمتلك خبرة عملية واسعة في معالجة الآفات الحضرية والإنشائية ومطابقة المعايير الصارمة لوزارة الصحة الكويتية (ترخيص رقم 14620/2025).
                  </p>
                </div>

                {/* Tags */}
                <div style={{ marginTop: '36px', paddingTop: '22px', borderTop: '1px solid #edf0e6' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#18354b', marginBottom: '10px' }}>
                    وسوم الموضوع:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          background: '#f1f5eb',
                          color: '#436d2b',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation / Call to Action Box */}
              <div
                style={{
                  marginTop: '28px',
                  background: 'linear-gradient(135deg, #18354b 0%, #20455f 100%)',
                  color: '#fff',
                  padding: '30px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px', color: '#a9cd7d' }}>
                    هل تواجه هذه المشكلة في منزلك الآن؟
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,.8)' }}>
                    فريق ديمو كلين يقدم لك استشارة فنية مجانية وحلول إبادة فورية بجميع محافظات الكويت.
                  </p>
                </div>
                <a
                  href={COMPANY_INFO.phoneTel}
                  className="button-primary"
                  style={{ background: '#a9cd7d', color: '#18354b', borderColor: '#a9cd7d' }}
                >
                  <PhoneCall size={15} />
                  <span>اتصل بالخبير: {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '100px' }}>
              {/* Related Services */}
              {relatedServicesList.length > 0 && (
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '10px',
                    border: '1px solid #e2e4db',
                    marginBottom: '24px',
                  }}
                >
                  <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px', color: '#18354b' }}>
                    خدمات مكافحة مرتبطة بهذا المقال:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {relatedServicesList.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        style={{
                          padding: '12px',
                          background: '#fbfaf6',
                          borderRadius: '6px',
                          border: '1px solid #e5e8dc',
                          textDecoration: 'none',
                          color: '#1a374b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          fontWeight: 600,
                        }}
                      >
                        <span>{svc.title}</span>
                        <ArrowLeft size={14} style={{ color: '#54883a' }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Articles */}
              <div
                style={{
                  background: '#fff',
                  padding: '24px',
                  borderRadius: '10px',
                  border: '1px solid #e2e4db',
                }}
              >
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px', color: '#18354b' }}>
                  مقالات أخرى قد تهمك:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getLoadedArticles()
                    .filter((a) => a.slug !== article.slug)
                    .slice(0, 3)
                    .map((otherArt) => (
                      <Link
                        key={otherArt.slug}
                        href={`/blog/${otherArt.slug}`}
                        style={{
                          textDecoration: 'none',
                          color: '#19364c',
                          fontSize: '13px',
                          lineHeight: 1.6,
                          fontWeight: 600,
                          borderBottom: '1px solid #edf0e6',
                          paddingBottom: '10px',
                        }}
                      >
                        {otherArt.title}
                      </Link>
                    ))}
                </div>
                <div style={{ marginTop: '16px' }}>
                  <Link href="/blog" className="inline-link" style={{ fontSize: '12px' }}>
                    <span>تصفح جميع مقالات المدونة</span>
                    <ArrowLeft size={13} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </>
  );
}
