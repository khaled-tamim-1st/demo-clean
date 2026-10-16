'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X, PhoneCall, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';
import JsonLd from '@/components/JsonLd';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/services', label: 'مكافحة الحشرات' },
    { href: '/cleaning-services', label: 'خدمات التنظيف' },
    { href: '/pest-control-prices', label: 'الأسعار' },
    { href: '/commercial/restaurants', label: 'قطاع المطاعم' },
    { href: '/coverage', label: 'نطاق التغطية' },
    { href: '/blog', label: 'المدونة' },
    { href: '/reviews', label: 'آراء العملاء' },
    { href: '/about', label: 'من نحن' },
  ];

  const navSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: navLinks.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.label,
      url: `https://democleankw.com${link.href}`,
    })),
  };

  return (
    <header className="topbar">
      <JsonLd data={navSchema} />
      <div className="container nav-inner">
        <Link className="brand" href="/" onClick={closeMenu} aria-label="ديمو كلين - الرئيسية">
          <Image
            src="/logo.webp"
            alt="شعار ديمو كلين"
            width={76}
            height={76}
            sizes="76px"
            style={{
              height: '72px',
              width: 'auto',
              maxHeight: '72px',
              objectFit: 'contain',
              display: 'block',
            }}
            priority
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="التنقل الرئيسي">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? 'active' : ''}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <a
            href={COMPANY_INFO.phoneTel}
            className="nav-phone-btn"
            aria-label={`اتصل بنا الآن على ${COMPANY_INFO.phone}`}
          >
            <PhoneCall size={15} />
            <span>{COMPANY_INFO.phone}</span>
          </a>
          <Link className="nav-cta" href="/contact" onClick={closeMenu}>
            <span>طلب معاينة</span>
            <ArrowLeft size={14} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
