import { ImageResponse } from 'next/og';
import { siteConfig } from '@/app/metadata';
import { assets } from '@/config/assets';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') ?? siteConfig.author;
    const subtitle = searchParams.get('subtitle') ?? siteConfig.description;
    const bgNumber = searchParams.get('bg');

    // Use specific bg if provided and valid, otherwise use random
    const background =
      bgNumber && Number(bgNumber) >= 0 && Number(bgNumber) <= 19
        ? assets.bg[`bg-${bgNumber}` as keyof typeof assets.bg]
        : assets.bg[`bg-${Math.floor(Math.random() * 20)}` as keyof typeof assets.bg];

    // Load the Inter font files
    const interRegular = await fetch(
      new URL('../../assets/fonts/Inter-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const interBold = await fetch(
      new URL('../../assets/fonts/Inter-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `url(${background})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div />

          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '85%',
              zIndex: 2,
              padding: '60px',
              paddingBottom: '120px',
              gap: '32px',
              fontFamily: 'Inter',
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: subtitle ? 80 : 100,
                fontFamily: 'Inter',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                textShadow: '0 2px 30px rgba(0,0,0,0.4)',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  fontSize: 40,
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  color: '#e2e8f0',
                  margin: 0,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                }}
              >
                {subtitle}
              </p>
            )}

            {/* Site URL */}
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                left: 60,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  boxShadow: `
                    0 0 10px rgba(59, 130, 246, 0.5),
                    0 0 20px rgba(59, 130, 246, 0.3),
                    0 0 30px rgba(59, 130, 246, 0.2),
                    inset 0 0 4px rgba(255, 255, 255, 0.5)
                  `,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              />
              <p
                style={{
                  fontSize: 28,
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  margin: 0,
                }}
              >
                {new URL(siteConfig.baseUrl || '').href}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: interBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error generating image: ${error.message}`);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
