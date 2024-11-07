export const assets = {
  headshot: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/headshot.jpg',
  'hero-carousel': {
    eatin: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/eatin.png',
    'hiking-2':
      'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/hiking-2.png',
    hiking: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/hiking.png',
    'speaking-2':
      'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/speaking-2.png',
    'speaking-3':
      'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/speaking-3.png',
    speaking: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/speaking.png',
    'workin-2':
      'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/workin-2.png',
    workin: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/hero-carousel/workin.png',
  },
  lifts: {
    bench: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/lifts/bench.mp4',
    dead: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/lifts/dead.mp4',
    squat: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/lifts/squat.mp4',
  },
  'logo-carousel': {
    Linkedin: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/Linkedin.svg',
    a16z: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/a16z.svg',
    bytewax: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/bytewax.svg',
    'coalesce-logo':
      'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/coalesce-logo.svg',
    databricks:
      'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/databricks.svg',
    hex: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/hex.svg',
    oreilly: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/oreilly.svg',
    replit: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/replit.svg',
    tobiko: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/tobiko.svg',
    xai: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/xai.svg',
    yc: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/logo-carousel/yc.svg',
  },
  projects: {
    uetl: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/projects/uetl.png',
    vid2gif: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/projects/vid2gif.gif',
    wtw: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/projects/wtw.gif',
    xai: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/projects/xai.jpeg',
    yc: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/projects/yc.jpeg',
    youtube: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/projects/youtube.jpg',
  },
  replit: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/replit.svg',
  robots: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/robots.txt',
  sitemap: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/sitemap.xml',
  whitepapers: {
    'orm-data-transformation':
      'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/whitepapers/orm-data-transformation.pdf',
    'orm-uetl': 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/whitepapers/orm-uetl.pdf',
  },
} as const;

export type AssetUrl = string;
