'use client';
import { useEffect, useState } from 'react';

export default function SidebarName() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  if (isMobile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: '1rem',
        top: 0,
        bottom: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.46,0.64,1)',
      }}
    >
      <span
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
          fontSize: 'clamp(0.75rem,1.1vw,0.92rem)',
          letterSpacing: '0.32em',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.78) 75%, rgba(255,255,255,0.92) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 14px rgba(56,189,248,0.4)) drop-shadow(0 0 3px rgba(255,255,255,0.25))',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        PASCAL CHUKWU
      </span>
    </div>
  );
}
