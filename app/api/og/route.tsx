import { ImageResponse } from 'next/og';
import { siteConfig } from '@/app/metadata';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') ?? 'Matt Palmer';
    const subtitle = searchParams.get('subtitle');
    const { origin } = new URL(request.url);

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
            background: `url(${origin}/og-base.png)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
              zIndex: 1,
            }}
          />

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
              fontFamily:
                'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: subtitle ? 80 : 100,
                fontFamily:
                  'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: 900,
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
                  fontFamily:
                    'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontWeight: 700,
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

            {/* Site URL - Positioned at bottom with more spacing */}
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
                  fontFamily:
                    'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  margin: 0,
                }}
              >
                {new URL(siteConfig.baseUrl || '').host}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
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
