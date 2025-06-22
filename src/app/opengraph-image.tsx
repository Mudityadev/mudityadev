import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Muditya Raghav - Full Stack Developer & International Relations Analyst'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Profile Image */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
              border: '4px solid rgba(255,255,255,0.1)',
            }}
          >
            <span
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              M
            </span>
          </div>
          
          {/* Name */}
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 10px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Muditya Raghav
          </h1>
          
          {/* Title */}
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '500',
              color: '#94a3b8',
              margin: '0 0 20px 0',
              letterSpacing: '0.01em',
            }}
          >
            Full Stack Developer & International Relations Analyst
          </h2>
          
          {/* Description */}
          <p
            style={{
              fontSize: '18px',
              color: '#cbd5e1',
              margin: '0',
              maxWidth: '800px',
              lineHeight: '1.5',
            }}
          >
            Specializing in Next.js, React, TypeScript, and Node.js
          </p>
          
          {/* Tech Stack */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '30px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Next.js', 'React', 'TypeScript', 'Node.js'].map((tech) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Bottom Accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
} 