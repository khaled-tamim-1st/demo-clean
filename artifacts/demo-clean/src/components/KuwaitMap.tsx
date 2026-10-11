'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ArrowLeft,
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  Radio,
} from 'lucide-react';
import { governoratesData, GovernorateItem } from '@/data/locations';
import { COMPANY_INFO } from '@/data/company';

interface KuwaitMapProps {
  initialGovSlug?: string;
  showLinkToPage?: boolean;
}

export default function KuwaitMap({ initialGovSlug, showLinkToPage = true }: KuwaitMapProps) {
  const initialGov = initialGovSlug
    ? governoratesData.find((g) => g.slug === initialGovSlug) || governoratesData[0]
    : governoratesData[0];

  const [selectedGov, setSelectedGov] = useState<GovernorateItem>(initialGov);

  return (
    <div className="map-card" dir="rtl">
      {/* Top Header */}
      <div className="map-top" style={{ flexWrap: 'wrap', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid #e1e6db' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#54883a', boxShadow: '0 0 0 3px rgba(84, 136, 58, 0.25)' }} />
          <strong style={{ fontSize: '15px', color: '#17354a' }}>خريطة التغطية والفرق الفنية في الكويت</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#687770' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eaf2e3', color: '#2d5236', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
            <Radio size={12} style={{ color: '#54883a' }} /> طواقم مجهزة 24 ساعة
          </span>
          <span style={{ direction: 'ltr', letterSpacing: '0.08em', fontWeight: 700 }}>6 GOVERNORATES</span>
        </div>
      </div>

      {/* Mobile-First Governorate Carousel Bar */}
      <div style={{ marginTop: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#576860', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>اختر المحافظة لاستعراض المناطق المخدومة:</span>
          <span style={{ fontSize: '11px', color: '#88968f', fontWeight: 500 }}>(اسحب لاختيار محافظتك)</span>
        </div>
        <div className="gov-carousel-container" role="tablist" aria-label="قائمة المحافظات">
          {governoratesData.map((gov) => {
            const isSelected = selectedGov.id === gov.id;
            return (
              <button
                type="button"
                key={gov.id}
                role="tab"
                aria-selected={isSelected}
                className={`gov-carousel-item ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedGov(gov)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <strong style={{ fontSize: '14px', color: '#17354a' }}>{gov.name}</strong>
                  <span className="gov-item-number" style={{ fontSize: '10px', color: '#8d9c90', direction: 'ltr' }}>
                    {gov.number}
                  </span>
                </div>
                <div className="gov-item-count" style={{ fontSize: '11px', color: '#5a8b3e', fontWeight: 600 }}>
                  {gov.areas.length} مناطق مخدومة
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Graphic & Interactive Visual */}
      <div className="map-content" style={{ marginTop: '10px' }}>
        <div className="kuwait-map-wrapper">
          <svg
            className="kuwait-map"
            viewBox="0 0 1000 1000"
            role="img"
            aria-label={`خريطة تفاعلية لمحافظات وجزر الكويت — ${selectedGov.name} محددة`}
          >
            <defs>
              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d9f0fc" />
                <stop offset="100%" stopColor="#bde4fa" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#204733" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Gulf Sea Background (الخليج العربي) */}
            <path
              d="M 640 0 C 720 100 800 120 840 140 C 900 150 940 90 1000 95 L 1000 1000 L 850 1000 L 838 942 C 825 930 812 915 810 885 C 808 860 822 850 818 825 C 784 810 774 760 740 735 C 716 710 710 660 706 620 C 700 564 686 505 660 450 C 630 452 600 460 580 472 C 540 475 518 475 506 462 C 460 460 450 462 475 450 C 500 445 530 425 560 365 C 580 340 600 320 620 320 C 635 320 660 345 680 345 C 705 345 720 315 725 285 C 700 200 670 145 630 102 C 640 60 635 25 640 0 Z"
              fill="url(#seaGradient)"
              opacity="0.85"
            />
            {/* Arabian Gulf Text Label */}
            <text
              x="890"
              y="400"
              fontSize="24"
              fontWeight="800"
              fill="#528ba7"
              letterSpacing="0.08em"
              textAnchor="middle"
              style={{ pointerEvents: 'none' }}
            >
              الخليج العربي
            </text>

            {/* Kuwait Bay (جون الكويت) Label */}
            <text
              x="620"
              y="390"
              fontSize="16"
              fontWeight="700"
              fill="#427896"
              textAnchor="middle"
              style={{ pointerEvents: 'none' }}
            >
              جون الكويت
            </text>

            {/* Warbah Island (جزيرة وربة) */}
            <g>
              <path
                d="M 660 90 C 700 80 745 88 760 102 C 740 120 690 125 665 110 Z"
                fill="#d8e8b2"
                stroke="#555"
                strokeWidth="1.5"
              />
              <text x="710" y="104" fontSize="13" fill="#3b5220" textAnchor="middle" fontWeight="700">
                وربة
              </text>
            </g>

            {/* Bubiyan Island (جزيرة بوبيان) */}
            <g>
              <path
                d="M 668 116 C 715 110 760 140 790 185 C 820 235 810 290 770 330 C 745 350 725 320 705 285 C 690 250 675 200 662 165 C 655 140 658 122 668 116 Z"
                fill="#d8e8b2"
                stroke="#555"
                strokeWidth="2"
              />
              <text x="735" y="225" fontSize="18" fill="#3b5220" textAnchor="middle" fontWeight="800">
                جزيرة بوبيان
              </text>
            </g>

            {/* Failaka Island (جزيرة فيلكا) */}
            <g>
              <path
                d="M 770 420 C 800 410 825 425 832 445 C 815 450 790 435 770 420 Z"
                fill="#ffc0cb"
                stroke="#555"
                strokeWidth="1.5"
              />
              <text x="800" y="438" fontSize="14" fill="#662233" textAnchor="middle" fontWeight="800">
                فيلكا
              </text>
            </g>

            {/* Governorates Matching Exact Polygons */}
            {governoratesData.map((gov) => {
              const isSelected = selectedGov.id === gov.id;
              // Specific base colors matching user's map
              const defaultFill =
                gov.id === 'jahra' ? '#d9ea9a' :
                gov.id === 'ahmadi' ? '#fff6a8' :
                gov.id === 'capital' ? '#fec7b8' :
                gov.id === 'hawalli' ? '#ff9933' :
                gov.id === 'farwaniya' ? '#fed3a5' :
                '#d8c2e6';

              return (
                <g
                  key={gov.id}
                  onClick={() => setSelectedGov(gov)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedGov(gov);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`اختيار محافظة ${gov.name}`}
                  aria-pressed={isSelected}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  <path
                    className={`map-region ${isSelected ? 'selected' : ''}`}
                    d={gov.path}
                    style={{
                      fill: isSelected ? '#528938' : defaultFill,
                      filter: isSelected ? 'url(#softGlow)' : undefined,
                      transition: 'all 0.25s ease',
                      stroke: isSelected ? '#1b402e' : '#555555',
                      strokeWidth: isSelected ? 4 : 2,
                    }}
                  />
                  <text
                    className="map-region-label"
                    x={gov.label[0]}
                    y={gov.label[1]}
                    style={{
                      fill: isSelected ? '#ffffff' : '#222222',
                      fontWeight: 800,
                      fontSize: gov.id === 'jahra' || gov.id === 'ahmadi' ? '28px' : '18px',
                      textShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.6)' : '0 1px 2px rgba(255,255,255,0.8)',
                    }}
                  >
                    {gov.name}
                  </text>
                </g>
              );
            })}

            {/* Kuwait City / Kuwait Towers dot marker */}
            <g style={{ pointerEvents: 'none' }}>
              <circle cx="650" cy="460" r="5" fill="#153346" stroke="#ffffff" strokeWidth="2" />
            </g>

            {/* Pulsing Radar Wave Marker over Selected Governorate */}
            <circle
              className="map-pulse-wave"
              cx={selectedGov.label[0]}
              cy={selectedGov.label[1] - (selectedGov.id === 'jahra' || selectedGov.id === 'ahmadi' ? 34 : 22)}
              r="8"
            />
            <circle
              cx={selectedGov.label[0]}
              cy={selectedGov.label[1] - (selectedGov.id === 'jahra' || selectedGov.id === 'ahmadi' ? 34 : 22)}
              r="6"
              fill="#18364b"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Selected Governorate Live Status Box */}
        <div style={{
          background: '#fff',
          border: '1px solid #dce2d6',
          borderRadius: '10px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#204733', color: '#b4d78b', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '13px' }}>
                {selectedGov.number}
              </div>
              <div>
                <strong style={{ fontSize: '17px', color: '#17354a', display: 'block' }}>محافظة {selectedGov.name}</strong>
                <span style={{ fontSize: '11px', color: '#687770' }}>{selectedGov.nameEn}</span>
              </div>
            </div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: '#eaf3e3',
              color: '#2a5534',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
            }}>
              <Clock size={13} style={{ color: '#54883a' }} /> {selectedGov.responseTime}
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '12.5px', color: '#52625b', lineHeight: 1.8 }}>
            {selectedGov.coverageNotice}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#6b7972', borderTop: '1px dashed #e1e6db', paddingTop: '10px' }}>
            <ShieldCheck size={14} style={{ color: '#54883a', flex: 'none' }} />
            <span>سيارات الرش مجهزة بكافة مبيدات وزارة الصحة ومكافحة القوارض مع الضمان.</span>
          </div>

          {/* Quick Direct Actions for this Governorate */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            <a
              href={COMPANY_INFO.phoneTel}
              className="button-primary"
              style={{
                flex: '1 1 140px',
                padding: '9px 12px',
                fontSize: '12.5px',
                textAlign: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <PhoneCall size={14} />
              <span>اتصل: {COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                `مرحباً ديمو كلين، أود طلب فني مكافحة حشرات في محافظة ${selectedGov.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-outline"
              style={{
                flex: '1 1 140px',
                padding: '9px 12px',
                fontSize: '12.5px',
                textAlign: 'center',
                justifyContent: 'center',
                background: '#25D366',
                color: '#fff',
                borderColor: '#25D366',
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={14} />
              <span>واتساب {selectedGov.name}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Clickable Area Chips Grid */}
      <div style={{
        marginTop: '20px',
        padding: '16px 18px',
        background: '#f1f5ec',
        border: '1px solid #d5dfce',
        borderRadius: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} style={{ color: '#54883a' }} />
            <strong style={{ fontSize: '13.5px', color: '#17354a' }}>
              المناطق والأحياء المغطاة في محافظة {selectedGov.name} ({selectedGov.areas.length} مناطق):
            </strong>
          </div>
          <span style={{ fontSize: '11px', color: '#687770' }}>
            (اضغط على منطقتك لفتح صفحة الخدمة المخصصة)
          </span>
        </div>

        {/* Clickable Area Chips */}
        <div className="areas-chips-grid">
          {selectedGov.areas.map((area) => (
            <Link
              key={area.slug}
              href={`/coverage/${selectedGov.slug}/${area.slug}`}
              className="area-chip"
              title={`خدمات مكافحة الحشرات في ${area.name} بمحافظة ${selectedGov.name}`}
            >
              <span>{area.name}</span>
              <ChevronLeft size={13} style={{ color: '#6e8574', transition: 'transform 0.2s' }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Summary & Direct Link to Governorate Coverage Page */}
      {showLinkToPage && (
        <div style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px dashed #d5d9cc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '12px',
        }}>
          <span style={{ color: '#497437', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Check size={15} />
            <span>تغطية متكاملة لجميع مدن ومناطق دولة الكويت الست</span>
          </span>
          <Link
            href={`/coverage/${selectedGov.slug}`}
            className="inline-link"
            style={{ margin: 0, fontSize: '12.5px', fontWeight: 700 }}
          >
            <span>دليل خدمات محافظة {selectedGov.name} بالكامل</span>
            <ArrowLeft size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
