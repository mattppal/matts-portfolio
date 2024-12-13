import { NextResponse } from 'next/server';
import { assets } from '@/config/assets';

export async function GET() {
  try {
    // Get all values from hero-carousel and format them properly
    const rawImages = Object.values(assets['hero-carousel']).flat();
    const images = rawImages.map((url) => ({
      url: url,
      alt: 'Gallery image', // You can add more descriptive alt text if available
    }));

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch images: ${error}` }, { status: 500 });
  }
}
