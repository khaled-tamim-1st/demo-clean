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

    const safeGov = (governorate && typeof governorate === 'string' && governorate.trim())
      ? governorate.trim()
      : 'الكويت (عام)';
    const safeService = (service && typeof service === 'string' && service.trim())
      ? service.trim()
      : 'مكافحة حشرات عامة';

    // 1. ALWAYS save lead to database / leads.json for the Dashboard
    const { saveLead } = await import('@/lib/db');
    const leadRecord = saveLead({
      name: name.trim(),
      phone: cleanPhone,
      governorate: safeGov,
      service: safeService,
      notes: notes?.trim() || '',
    });

    // 2. Also forward to backend api-server in background if reachable
    const apiServerUrl = process.env.API_SERVER_URL || 'http://localhost:3001/api/contact';
    try {
      await fetch(apiServerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: cleanPhone, governorate, service, notes }),
      });
    } catch {
      // Backend api-server is offline or internal; lead is already safely stored in local db
    }

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
