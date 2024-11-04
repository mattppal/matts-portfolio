/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Specify domains if you're loading images from external sources
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        // Configure default image device sizes
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // Configure default image sizes
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Format array to generate images in
        formats: ['image/webp'],
    },
}

module.exports = nextConfig 