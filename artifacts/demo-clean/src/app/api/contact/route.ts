import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, governorate, service, notes } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'يرجى إدخال اسم صحيح (حرفين على الأقل)' },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      return NextResponse.json(
        { success: false, message: 'يرجى إدخال رقم هاتف صحيح في الكويت (مثال: 67088755)' },
        { status: 400 }
      );
    }

    if (!governorate || typeof governorate !== 'string') {
      return NextResponse.json(
        { success: false, message: 'يرجى تحديد المحافظة' },
        { status: 400 }
      );
    }

    if (!service || typeof service !== 'string') {
      return NextResponse.json(
        { success: false, message: 'يرجى تحديد نوع الخدمة المطلوبة' },
        { status: 400 }
      );
    }

    // Attempt forward to backend api-server if reachable
    const apiServerUrl = process.env.API_SERVER_URL || 'http://localhost:3001/api/contact';
    try {
      const apiRes = await fetch(apiServerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: cleanPhone, governorate, service, notes }),
      });
      if (apiRes.ok) {
        const apiData = await apiRes.json();
        return NextResponse.json(apiData, { status: 201 });
      }
    } catch {
      // Backend api-server is offline or internal; proceed with self-contained response
    }

    // Save lead to local storage for Dashboard
    const { saveLead } = await import('@/lib/db');
    const leadRecord = saveLead({
      name: name.trim(),
      phone: cleanPhone,
      governorate,
      service,
      notes: notes?.trim() || '',
    });

    return NextResponse.json({
      success: true,
      message: 'تم استلام طلب المعاينة بنجاح، سيتواصل معك فني ديمو كلين خلال 15 دقيقة.',
      lead: leadRecord,
    }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في الخادم أثناء تسجيل الطلب' },
      { status: 500 }
    );
  }
}
