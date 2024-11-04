import { NextResponse } from 'next/server'

const logos = [
    {
        src: "/path/to/logo1.png",
        alt: "Logo 1"
    },
    {
        src: "/path/to/logo2.png",
        alt: "Logo 2"
    },
    // Add more logos as needed
]

export async function GET() {
    return NextResponse.json(logos)
} 