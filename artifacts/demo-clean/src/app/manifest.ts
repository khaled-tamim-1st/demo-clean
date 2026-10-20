import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ديمو كلين',
    short_name: 'ديمو كلين',
    description: 'ديمو كلين لمكافحة الحشرات والقوارض في جميع محافظات الكويت. إبادة الصراصير، بق الفراش، النمل الأبيض، والقوارض.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#559a35',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'maskable',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
