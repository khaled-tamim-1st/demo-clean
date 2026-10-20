import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import JsonLd from './JsonLd';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { label: 'الرئيسية', href: '/' },
    ...items,
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://democleankw.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav className="breadcrumbs-bar" aria-label="مسار التنقل (Breadcrumbs)" dir="rtl">
        <div className="container">
          <ol className="breadcrumbs-list">
            {fullItems.map((item, index) => {
              const isLast = index === fullItems.length - 1;
              return (
                <li
                  key={index}
                  className={`breadcrumbs-item ${isLast ? 'active' : ''}`}
                >
                  {index > 0 && <ChevronLeft size={13} className="breadcrumbs-separator" />}
                  {index === 0 && <Home size={14} style={{ marginLeft: '4px', color: '#559a35' }} />}
                  {item.href && !isLast ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
