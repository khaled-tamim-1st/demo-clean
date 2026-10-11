'use client';

import { useEffect } from 'react';

const AI_REFERRERS_REGEX = /(chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai)/i;

export default function AiAnalyticsTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const referrer = document.referrer;
    if (referrer && AI_REFERRERS_REGEX.test(referrer)) {
      const match = referrer.match(AI_REFERRERS_REGEX);
      const aiEngine = match ? match[1] : 'unknown_ai';

      // Push event to Google tag (gtag) if present
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'ai_engine_referral', {
          event_category: 'GEO Traffic',
          event_label: aiEngine,
          referrer_url: referrer,
          landing_page: window.location.pathname,
        });
      }
    }
  }, []);

  return null;
}
