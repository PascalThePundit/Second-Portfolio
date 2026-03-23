'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Aurora = dynamic(() => import('./Aurora'), { ssr: false });

export default function Intro({ onDone }: { onDone: () => void }) {
  const [line1In,   setLine1In]   = useState(false);
  const [line2In,   setLine2In]   = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [done,      setDone]      = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLine1In(true),   80);
    const t2 = setTimeout(() => setLine2In(true),   900);
    const t3 = setTimeout(() => setSplitting(true), 2200);
    const t4 = setTimeout(() => { setDone(true); onDone(); }, 3100);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onDone]);

  if (done) return null;

  // Colorful "Aurora" mesh blobs - One single source for both panels
  const AuroraMesh = ({ opacity = 0.2 }: { opacity?: number }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity }}>
      <div style={{
        position: 'absolute', top: '-10%', left: '10%', width: '70vw', height: '70vw',
        background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
        filter: 'blur(100px)', borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '5%', width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
        filter: 'blur(120px)', borderRadius: '50%'
      }} />
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      pointerEvents: splitting ? 'none' : 'all',
      background: '#020207',
    }}>

      {/* ── TOP PANEL ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        // Removed linear gradient, using a solid but subtle translucent layer
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        transform: splitting ? 'translateY(-100%)' : 'translateY(0)',
        transition: splitting ? 'transform 0.82s cubic-bezier(0.76,0,0.24,1)' : 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '0.4rem',
        zIndex: 2,
      }}>
        {/* We place the TOP half of the mesh here */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200%', pointerEvents: 'none' }}>
           <AuroraMesh opacity={0.2} />
        </div>
        
        <div style={{
          position: 'relative',
          zIndex: 3,
          transform: line1In ? 'translateY(0)' : 'translateY(-110%)',
          opacity:   line1In ? 1 : 0,
          transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
            fontSize: 'clamp(3rem,11vw,10rem)',
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            lineHeight: 1,
          }}>
            Got an idea?
          </span>
        </div>
      </div>

      {/* ── BOTTOM PANEL ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '50%',
        background: '#020207',
        transform: splitting ? 'translateY(100%)' : 'translateY(0)',
        transition: splitting ? 'transform 0.82s cubic-bezier(0.76,0,0.24,1)' : 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '0.4rem',
        zIndex: 1,
      }}>
        {/* We place the BOTTOM half of the mesh here */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200%', pointerEvents: 'none' }}>
           <AuroraMesh opacity={0.2} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 3,
          transform: line2In ? 'translateY(0)' : 'translateY(110%)',
          opacity:   line2In ? 1 : 0,
          transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
            fontSize: 'clamp(2.2rem,7vw,6.5rem)',
            letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.78) 75%, rgba(255,255,255,0.92) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 14px rgba(56,189,248,0.4)) drop-shadow(0 0 3px rgba(255,255,255,0.25))',
            display: 'block',
            lineHeight: 1,
          }}>
            Let&apos;s build.
          </span>
        </div>
      </div>
    </div>
  );
}
