import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const logoDirectory = path.join(process.cwd(), 'public/logo-carousel')
        const files = fs.readdirSync(logoDirectory)

        const logos = files
            .filter(file => file.match(/\.(jpg|jpeg|png|svg)$/i))
            .map(file => `/logo-carousel/${file}`)

        return NextResponse.json({ logos })
    } catch (error) {
        console.error('Error reading logos directory:', error)
        return NextResponse.json({ logos: [] }, { status: 500 })
    }
} 