# Portfolio Site

A modern, responsive portfolio website built with Next.js 15, featuring beautiful animations and a clean design aesthetic.

## Features

- 🎨 Modern UI with shadcn components
- 🌊 Smooth animations powered by Framer Motion
- 📱 Fully responsive design
- 🎯 Project showcase grid
- 🎥 Video gallery integration
- 💰 Service pricing pages
- 🖼️ Dynamic OG image generation
- 📚 API integration for content

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Components**: shadcn components
- **Animations**: Framer Motion
- **Package Manager**: PNPM
- **Asset Management**: Custom upload scripts
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/           # API routes for books and OG images
│   ├── pricing/       # Service pricing pages
│   └── page.tsx       # Homepage
├── components/
│   ├── project-grid   # Project showcase component
│   └── video-gallery  # Video gallery component
├── scripts/
│   └── upload-assets  # Asset management utilities
```

## Development

- **Asset Upload**: Use `pnpm upload-assets` to manage project assets with Vercel Blob Storage
- **Pre-commit Hooks**: Husky ensures code quality before commits
- **API Routes**:
  - `/api/books`: Manages book-related content
  - `/api/og`: Generates dynamic Open Graph images

## Contact

Matt Palmer - [@mattpalmer](https://twitter.com/mattpalmer)
