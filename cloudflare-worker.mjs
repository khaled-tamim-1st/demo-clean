const INITIAL_LEADS = [
  {
    id: 10421,
    name: 'عبدالله الشمري',
    phone: '67088755',
    governorate: 'الجهراء',
    service: 'مكافحة النمل الأبيض والأرضة',
    notes: 'قسيمة سكنية جديدة في سعد العبدالله محتاجين حقن وقائي',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 10420,
    name: 'مها الصباح',
    phone: '99887766',
    governorate: 'حولي',
    service: 'مكافحة الصراصير بالجل الألماني',
    notes: 'شقة بالسالمية، مطبخ ودواليب بدون رائحة',
    status: 'contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 10419,
    name: 'سالم الدوسري',
    phone: '55443322',
    governorate: 'الأحمدي',
    service: 'مكافحة بق الفراش بالحرارة والضمان',
    notes: 'غرفتين نوم بالمهبولة مع طلب شهادة الكفالة',
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

let leadsStore = [...INITIAL_LEADS];
let reviewsStore = [];

const SECURITY_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...SECURITY_HEADERS,
    },
  });
}

async function handleApi(request, url) {
  const { pathname, searchParams } = url;
  const method = request.method.toUpperCase();

  if (pathname === '/api/contact' && method === 'POST') {
    try {
      const body = await request.json();
      const { name, phone, governorate, service, notes } = body || {};

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return jsonResponse(
          { success: false, message: 'يرجى إدخال اسم صحيح (حرفين على الأقل)' },
          400
        );
      }

      const cleanPhone = String(phone || '').replace(/[^0-9]/g, '');
      if (!cleanPhone || cleanPhone.length < 7) {
        return jsonResponse(
          { success: false, message: 'يرجى إدخال رقم هاتف صحيح في الكويت (مثال: 67088755)' },
          400
        );
      }

      if (!governorate || typeof governorate !== 'string') {
        return jsonResponse({ success: false, message: 'يرجى تحديد المحافظة' }, 400);
      }

      if (!service || typeof service !== 'string') {
        return jsonResponse({ success: false, message: 'يرجى تحديد نوع الخدمة المطلوبة' }, 400);
      }

      const newLead = {
        id: Math.floor(10000 + Math.random() * 90000),
        name: name.trim(),
        phone: cleanPhone,
        governorate,
        service,
        notes: notes?.trim() || '',
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      leadsStore.unshift(newLead);

      return jsonResponse(
        {
          success: true,
          message: 'تم استلام طلب المعاينة بنجاح، سيتواصل معك فني ديمو كلين خلال 15 دقيقة.',
          lead: newLead,
        },
        201
      );
    } catch {
      return jsonResponse({ success: false, message: 'حدث خطأ في الخادم أثناء تسجيل الطلب' }, 500);
    }
  }

  if (pathname === '/api/reviews' && method === 'POST') {
    try {
      const body = await request.json();
      const { authorName, governorateName, areaName, serviceName, rating, comment } = body || {};

      if (!authorName || !comment || !serviceName) {
        return jsonResponse(
          { success: false, message: 'يرجى كتابة الاسم ونوع الخدمة ورأيك بالتجربة' },
          400
        );
      }

      const newRev = {
        id: `rev-${Date.now()}`,
        authorName: authorName.trim(),
        governorateName: governorateName || 'الكويت',
        areaName: areaName || 'عام',
        serviceName: serviceName || 'مكافحة حشرات',
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        comment: comment.trim(),
        verified: true,
        source: 'website',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      };
      reviewsStore.unshift(newRev);

      return jsonResponse({
        success: true,
        review: newRev,
        message: 'شكراً لك! تم استلام تقييمك وإضافته بنجاح.',
      });
    } catch {
      return jsonResponse({ success: false, message: 'حدث خطأ أثناء حفظ التقييم' }, 500);
    }
  }

  if (pathname === '/api/dashboard/leads') {
    if (method === 'GET') {
      return jsonResponse({ success: true, leads: leadsStore });
    }
    if (method === 'PATCH') {
      try {
        const { id, status } = await request.json();
        if (!id || !status) {
          return jsonResponse({ success: false, message: 'البيانات غير مكتملة' }, 400);
        }
        const item = leadsStore.find((l) => String(l.id) === String(id));
        if (!item) {
          return jsonResponse({ success: false, message: 'الطلب غير موجود' }, 404);
        }
        item.status = status;
        return jsonResponse({ success: true, message: 'تم تحديث حالة الطلب بنجاح' });
      } catch {
        return jsonResponse({ success: false, message: 'فشل التحديث' }, 500);
      }
    }
    if (method === 'DELETE') {
      const id = searchParams.get('id');
      if (!id) {
        return jsonResponse({ success: false, message: 'معرف الطلب مطلوب' }, 400);
      }
      leadsStore = leadsStore.filter((l) => String(l.id) !== String(id));
      return jsonResponse({ success: true, message: 'تم حذف الطلب بنجاح' });
    }
  }

  if (pathname === '/api/dashboard/reviews') {
    if (method === 'GET') {
      return jsonResponse({ success: true, reviews: reviewsStore });
    }
    if (method === 'POST') {
      try {
        const body = await request.json();
        const { authorName, governorateName, areaName, serviceName, rating, comment, source, date, status } = body || {};
        if (!authorName || !comment || !serviceName) {
          return jsonResponse({ success: false, message: 'يرجى إكمال البيانات الأساسية للتقييم' }, 400);
        }
        const reviewSource = source === 'google' ? 'google' : 'website';
        const reviewStatus = status || (reviewSource === 'google' ? 'approved' : 'pending');
        const newRev = {
          id: `rev-${Date.now()}`,
          authorName: authorName.trim(),
          governorateName: governorateName || 'الكويت',
          areaName: areaName || 'عام',
          serviceName: serviceName || 'مكافحة حشرات',
          rating: Number(rating) || 5,
          comment: comment.trim(),
          verified: true,
          source: reviewSource,
          date: date || new Date().toISOString().split('T')[0],
          status: reviewStatus,
        };
        reviewsStore.unshift(newRev);
        return jsonResponse({ success: true, review: newRev, message: 'تمت إضافة التقييم بنجاح' }, 201);
      } catch {
        return jsonResponse({ success: false, message: 'فشل إضافة التقييم' }, 500);
      }
    }
    if (method === 'PATCH') {
      try {
        const { id, status } = await request.json();
        if (!id || !status) {
          return jsonResponse({ success: false, message: 'معرف التقييم والحالة مطلوبان' }, 400);
        }
        const item = reviewsStore.find((r) => r.id === id);
        if (!item) {
          return jsonResponse({ success: false, message: 'التقييم غير موجود' }, 404);
        }
        item.status = status;
        return jsonResponse({ success: true, message: 'تم تحديث حالة التقييم بنجاح' });
      } catch {
        return jsonResponse({ success: false, message: 'فشل تحديث حالة التقييم' }, 500);
      }
    }
    if (method === 'DELETE') {
      const id = searchParams.get('id');
      if (!id) {
        return jsonResponse({ success: false, message: 'معرف التقييم مطلوب' }, 400);
      }
      reviewsStore = reviewsStore.filter((r) => r.id !== id);
      return jsonResponse({ success: true, message: 'تم حذف التقييم بنجاح' });
    }
  }

  return jsonResponse({ success: false, message: 'غير موجود' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Handle API endpoints
    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, url);
    }

    // 2. Handle Next.js Image Optimization fallback
    if (url.pathname === '/_next/image') {
      const imgUrl = url.searchParams.get('url');
      if (imgUrl && imgUrl.startsWith('/')) {
        const assetUrl = new URL(imgUrl, url.origin);
        return env.ASSETS.fetch(new Request(assetUrl.toString(), request));
      }
    }

    // 3. Handle Next.js App Router RSC payload requests
    if (request.headers.get('RSC') === '1') {
      const cleanPath = url.pathname === '/' ? '/index' : url.pathname.replace(/\/$/, '');
      const rscUrl = new URL(`${cleanPath}.rsc`, url.origin);
      const rscRes = await env.ASSETS.fetch(new Request(rscUrl.toString(), request));
      if (rscRes.ok) {
        const headers = new Headers(rscRes.headers);
        headers.set('Content-Type', 'text/x-component; charset=utf-8');
        for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
          headers.set(k, v);
        }
        return new Response(rscRes.body, { status: rscRes.status, headers });
      }
    }

    // 4. Serve static assets with security headers
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
      headers.set(k, v);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
