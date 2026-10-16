import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شاركنا تجربتك | تقييم خدمات ديمو كلين لمكافحة الحشرات',
  description: 'شاركنا رأيك في خدمات ديمو كلين لمكافحة الحشرات والقوارض في الكويت. نعتز بتقييمك ونسعى دائماً لتقديم الأفضل لعملائنا.',
  alternates: {
    canonical: 'https://democleankw.com/review',
  },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
