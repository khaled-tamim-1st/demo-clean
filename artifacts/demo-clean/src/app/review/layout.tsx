import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شاركنا تقييمك ورأيك بالخدمة',
  description: 'شاركنا رأيك في خدمات ديمو كلين لمكافحة الحشرات والتنظيف في الكويت لنستمر في تقديم أعلى معايير الجودة والكفالة.',
  alternates: {
    canonical: 'https://democleankw.com/review',
  },
  openGraph: {
    title: 'شاركنا تقييمك ورأيك بالخدمة | ديمو كلين الكويت',
    description: 'شاركنا رأيك في خدمات ديمو كلين لمكافحة الحشرات والتنظيف في الكويت.',
    url: 'https://democleankw.com/review',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
