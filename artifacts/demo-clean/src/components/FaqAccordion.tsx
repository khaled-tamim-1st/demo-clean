'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import JsonLd from './JsonLd';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  includeSchema?: boolean;
}

export default function FaqAccordion({ items, includeSchema = true }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {includeSchema && <JsonLd data={faqSchema} />}
      <div className="faq-list" dir="rtl">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown size={18} />
              </button>
              {isOpen && (
                <div className="faq-answer" role="region">
                  <p 
                    style={{ margin: 0 }}
                    dangerouslySetInnerHTML={{ __html: item.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #436d2b; text-decoration: underline; font-weight: bold;">$1</a>') }} 
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
