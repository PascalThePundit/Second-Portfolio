'use client';
import { useEffect, useState } from 'react';

export default function Intro({ onDone }: { onDone: () => void }) {
  const [line1In,   setLine1In]   = useState(false);
  const [line2In,   setLine2In]   = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [done,      setDone]      = useState(false);

  useEffect(() => {
    // line 1 slides up from bottom immediately
    const t1 = setTimeout(() => setLine1In(true),   80);
    // line 2 slides down from top shortly after
    const t2 = setTimeout(() => setLine2In(true),   900);
    // panels split apart
    const t3 = setTimeout(() => setSplitting(true), 2200);
    // unmount and reveal page
    const t4 = setTimeout(() => { setDone(true); onDone(); }, 3100);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onDone]);

  if (done) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      pointerEvents: splitting ? 'none' : 'all',
      background: '#05050f',
    }}>

      {/* ── TOP PANEL — slides up on split ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        background: '#05050f',
        transform: splitting ? 'translateY(-100%)' : 'translateY(0)',
        transition: splitting ? 'transform 0.82s cubic-bezier(0.76,0,0.24,1)' : 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '2.5rem',
      }}>
        {/* "Got an idea?" slides DOWN from top into this panel */}
        <div style={{
          transform: line1In ? 'translateY(0)' : 'translateY(-110%)',
          opacity:   line1In ? 1 : 0,
          transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
            fontSize: 'clamp(3rem,11vw,10rem)',
            letterSpacing: '0.04em',
            color: '#ffffff',
            display: 'block',
            lineHeight: 1,
          }}>
            Got an idea?
          </span>
        </div>
      </div>

      {/* ── BOTTOM PANEL — slides down on split ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '50%',
        background: '#05050f',
        transform: splitting ? 'translateY(100%)' : 'translateY(0)',
        transition: splitting ? 'transform 0.82s cubic-bezier(0.76,0,0.24,1)' : 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '2.5rem',
      }}>
        {/* "Let's build." slides UP from bottom into this panel */}
        <div style={{
          transform: line2In ? 'translateY(0)' : 'translateY(110%)',
          opacity:   line2In ? 1 : 0,
          transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
            fontSize: 'clamp(2.2rem,7vw,6.5rem)',
            letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
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
