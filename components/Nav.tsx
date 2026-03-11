'use client';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const reversed = [...NAV_LINKS].reverse();
      for (const { id } of reversed) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 240) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, display:'flex', justifyContent:'space-between', alignItems:'center', padding: isMobile ? '1rem 1.2rem' : '1.3rem 2.8rem', transition:'background 0.4s, border-color 0.4s', background: scrolled ? 'rgba(4,4,10,0.78)' : 'transparent', backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent' }}>
      <span style={{ fontFamily:"var(--font-bebas),'Bebas Neue',Impact,sans-serif", fontSize:'clamp(0.75rem,1.4vw,1rem)', letterSpacing:'0.14em', background:'linear-gradient(135deg,var(--blue),var(--violet))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>CodeWithPascal</span>
      <div style={{ display:'flex', gap: isMobile ? '1.2rem' : '2.4rem' }}>
        {NAV_LINKS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} style={{ fontFamily:"var(--font-mono),monospace", fontSize: isMobile ? '0.55rem' : '0.63rem', letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none', color: active === id ? 'var(--white)' : 'var(--muted)', transition:'color 0.25s', position:'relative', paddingBottom:'4px' }}>
            {label}
            <span style={{ position:'absolute', bottom:0, left:0, right:0, height:'1.5px', background:'linear-gradient(90deg,var(--blue),var(--violet))', transform: active === id ? 'scaleX(1)' : 'scaleX(0)', transformOrigin:'left', transition:'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)', borderRadius:2 }} />
          </a>
        ))}
      </div>
    </nav>
  );
}
