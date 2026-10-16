import { NextResponse } from 'next/server';
import { getArticles, getArticleBySlug, type ArticleItem } from '@/lib/db';

function articleToMarkdown(article: ArticleItem): string {
  const frontmatter = [
    '---',
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `slug: "${article.slug}"`,
    `category: "${article.category}"`,
    `publishedAt: "${article.publishedAt}"`,
    `updatedAt: "${article.updatedAt || article.publishedAt}"`,
    `readingTimeMinutes: ${article.readingTimeMinutes}`,
    `author: "${article.author?.name || 'فريق ديمو كلين'}"`,
    `metaTitle: "${(article.metaTitle || '').replace(/"/g, '\\"')}"`,
    `metaDescription: "${(article.metaDescription || '').replace(/"/g, '\\"')}"`,
    `tags: [${(article.tags || []).map((t) => `"${t}"`).join(', ')}]`,
    `status: "${article.status || 'published'}"`,
    '---',
    '',
  ].join('\n');

  let body = `# ${article.title}\n\n`;

  if (article.excerpt) {
    body += `> ${article.excerpt}\n\n`;
  }

  if (article.quickSummary && article.quickSummary.length > 0) {
    body += `### ملخص سريع وأهم النقاط:\n\n`;
    for (const point of article.quickSummary) {
      body += `- ${point}\n`;
    }
    body += '\n';
  }

  body += `### المحتوى التفصيلي:\n\n`;
  for (const para of article.content || []) {
    body += `${para}\n\n`;
  }

  if (article.faqs && article.faqs.length > 0) {
    body += `### الأسئلة الشائعة:\n\n`;
    for (const faq of article.faqs) {
      body += `#### س: ${faq.question}\n\n`;
      body += `ج: ${faq.answer}\n\n`;
    }
  }

  return `${frontmatter}${body}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const format = (searchParams.get('format') || 'json').toLowerCase();

    const allArticles = getArticles(true);

    // If specific article requested
    if (id || slug) {
      const article = allArticles.find((a) => (id && a.id === id) || (slug && a.slug === slug));
      if (!article) {
        return NextResponse.json({ success: false, message: 'المقال غير موجود' }, { status: 404 });
      }

      if (format === 'markdown' || format === 'md') {
        const mdContent = articleToMarkdown(article);
        return new Response(mdContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Content-Disposition': `attachment; filename="${article.slug}.md"`,
          },
        });
      }

      // JSON format
      const jsonContent = JSON.stringify(article, null, 2);
      return new Response(jsonContent, {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Disposition': `attachment; filename="${article.slug}.json"`,
        },
      });
    }

    // Bulk export (all articles)
    if (format === 'markdown' || format === 'md') {
      const fullMarkdown = allArticles.map((art) => articleToMarkdown(art)).join('\n\n---\n\n');
      return new Response(fullMarkdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="demo-clean-all-articles.md"`,
        },
      });
    }

    // Default: Bulk JSON archive
    const jsonArchive = JSON.stringify(allArticles, null, 2);
    return new Response(jsonArchive, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="demo-clean-articles-backup-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error('Error exporting articles:', error);
    return NextResponse.json({ success: false, message: 'فشل تصدير المقالات' }, { status: 500 });
  }
}
