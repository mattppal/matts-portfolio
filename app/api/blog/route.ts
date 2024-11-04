import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

type CustomFeed = {
    title: string
    description: string
    link: string
}

type CustomItem = {
    title: string
    link: string
    content: string
    contentSnippet?: string
    isoDate?: string
    pubDate: string
}

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
        item: ['content', 'contentSnippet']
    }
})

export async function GET() {
    try {
        const feed = await parser.parseURL('https://blog.mattpalmer.io/rss.xml')
        const posts = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            content: item.content,
            snippet: item.contentSnippet,
            date: item.pubDate ? new Date(item.pubDate) : null
        }))

        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        return NextResponse.json([], { status: 500 })
    }
} 