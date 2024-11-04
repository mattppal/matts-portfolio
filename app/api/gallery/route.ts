import { NextResponse } from 'next/server';
import { assets } from '@/config/assets';

export async function GET() {
  try {
    // Get all values from hero-carousel
    const images = Object.values(assets['hero-carousel']).flat();
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch images: ${error}` }, { status: 500 });
  }
}
