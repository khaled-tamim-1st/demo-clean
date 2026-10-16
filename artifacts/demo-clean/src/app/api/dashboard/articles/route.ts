import { NextResponse } from 'next/server';
import { getArticles, saveArticle, updateArticle, deleteArticle } from '@/lib/db';

export async function GET() {
  try {
    const articles = getArticles(true);
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ success: false, message: 'فشل جلب المقالات' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category } = body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: 'يرجى إدخال عنوان مناسب للمقال (3 أحرف على الأقل)' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { success: false, message: 'يرجى تحديد تصنيف المقال' },
        { status: 400 }
      );
    }

    // Auto-generate clean slug if not provided
    let slug = body.slug?.trim();
    if (!slug) {
      slug = title
        .trim()
        .toLowerCase()
        .replace(/[^\u0621-\u064Aa-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      if (!slug) {
        slug = `article-${Date.now()}`;
      }
    }

    // Ensure content is array of strings (paragraphs)
    let processedContent: string[] = [];
    if (Array.isArray(body.content)) {
      processedContent = body.content.map((p: any) => String(p).trim()).filter(Boolean);
    } else if (typeof body.content === 'string') {
      processedContent = body.content
        .split('\n\n')
        .map((p: string) => p.trim())
        .filter(Boolean);
    }

    if (processedContent.length === 0) {
      processedContent = [title.trim()];
    }

    const newArticle = saveArticle({
      ...body,
      title: title.trim(),
      slug,
      content: processedContent,
      category: category.trim(),
      status: body.status === 'draft' ? 'draft' : 'published',
    });

    return NextResponse.json(
      { success: true, article: newArticle, message: 'تم حفظ المقال ونشره بنجاح' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json({ success: false, message: 'حدث خطأ أثناء حفظ المقال' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'معرف المقال مطلوب' }, { status: 400 });
    }

    // Process content if passed as single string
    if (typeof updates.content === 'string') {
      updates.content = updates.content
        .split('\n\n')
        .map((p: string) => p.trim())
        .filter(Boolean);
    }

    const updated = updateArticle(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'المقال غير موجود' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article: updated, message: 'تم تحديث المقال بنجاح' });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ success: false, message: 'فشل تحديث المقال' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'معرف المقال مطلوب' }, { status: 400 });
    }

    const deleted = deleteArticle(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'المقال غير موجود أو تعذر حذفه' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'تم حذف المقال بنجاح' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ success: false, message: 'فشل حذف المقال' }, { status: 500 });
  }
}
