module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['spellcheck'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals'
  ],
  rules: {
    'spellcheck/spell-checker': [
      'warn',
      {
        comments: true,
        strings: true,
        identifiers: true,
        lang: 'en_US',
        skipWords: [
          // Libraries and frameworks
          'embla', 'Embla', 'clsx', 'radix', 'cva', 'Splide', 'tw',

          // Common web terms
          'href', 'svg', 'pathname', 'noreferrer', 'noopener', 'autoplay',
          'accelerometer', 'nums', 'bezier', 'favicon', 'ico', 'ttf',
          'gpu', 'whitespace', 'nowrap', 'resize', 'headshot', 'cn',
          'og', 'ai', 'latin', 'sitemap', 'Sitemap', 'Ld', 'uv',

          // CSS-related terms
          'bg', 'py', 'px', 'mx', 'my', 'mb', 'mt', 'ml', 'mr',
          'pb', 'pt', 'pl', 'pr', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',
          'semibold', 'vw', 'sr',

          // Technical terms
          'Replit', 'DevRel', 'SaaS', 'API', 'GIFs', 'Figma', 'Guestbook',
          'Hackathon', 'Databricks', 'Combinator', 'Textarea', 'mailto',
          'xai', 'yc',

          // Project-specific terms
          'uetl', 'mattppal', 'mattpalmer', 'maxresdefault', 'jpg'
        ],
        skipIfMatch: [
          // Skip checking URLs
          'https?://[^s]*',
          // Skip checking image paths
          '/[^s]+\\.(jpg|jpeg|png|gif|svg)',
          // Skip checking file paths in config/assets.ts
          'config/assets\\.ts',
          'zdntzuxuw3xqvcia\\.public\\.blob\\.vercel-storage\\.com/[^s]+',
          // Skip checking component/library names
          '[A-Z][a-z]+[A-Z][a-z]+', // matches camelCase component names
          // Skip checking CSS measurements
          '\\d+vw',
          '\\d+vh',
          '\\d+px',
          // Skip checking IDs and hashes
          '[a-zA-Z0-9]{8,}' // matches long alphanumeric strings
        ]
      }
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  }
} 