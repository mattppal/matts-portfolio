import { NextResponse } from 'next/server';
import { assets } from '@/config/assets';

export async function GET() {
  try {
    // Get all values from logo-carousel
    const logos = Object.values(assets['logo-carousel']);
    return NextResponse.json({ logos });
  } catch (error) {
    console.error('Error reading logos:', error);
    return NextResponse.json({ logos: [] }, { status: 500 });
  }
}
