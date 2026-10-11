import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ديمو كلين',
    short_name: 'ديمو كلين',
    description: 'ديمو كلين لمكافحة الحشرات والقوارض في جميع محافظات الكويت. إبادة الصراصير، بق الفراش، النمل الأبيض، والقوارض.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#55833c',
    icons: [
      {
        src: '/favicon.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
