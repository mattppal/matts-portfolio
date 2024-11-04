import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const imagesDirectory = path.join(process.cwd(), 'public/hero-carousel')
        const imageFiles = fs.readdirSync(imagesDirectory)
        const images = imageFiles.map(file => `/hero-carousel/${file}`)

        return NextResponse.json({ images })
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch images: ${error}` }, { status: 500 })
    }
} 