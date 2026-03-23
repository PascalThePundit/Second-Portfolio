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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav style={{ 
        position:'fixed', top:0, left:0, right:0, zIndex:1000, 
        display:'flex', justifyContent:'space-between', alignItems:'center', 
        padding: isMobile ? '1.2rem 1.5rem' : '1.3rem 2.8rem', 
        transition:'background 0.4s, border-color 0.4s', 
        background: scrolled || isMenuOpen ? 'rgba(4,4,10,0.85)' : 'transparent', 
        backdropFilter: scrolled || isMenuOpen ? 'blur(28px) saturate(180%)' : 'none', 
        WebkitBackdropFilter: scrolled || isMenuOpen ? 'blur(28px) saturate(180%)' : 'none', 
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent' 
      }}>
        <span style={{ 
          fontFamily:"var(--font-bebas),'Bebas Neue',Impact,sans-serif", 
          fontSize:'clamp(0.9rem,1.8vw,1.1rem)', 
          letterSpacing:'0.14em', 
          background:'linear-gradient(135deg,var(--blue),var(--violet))', 
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          zIndex: 1001 
        }}>CodeWithPascal</span>

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ display:'flex', gap:'2.8rem' }}>
            {NAV_LINKS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} style={{ 
                fontFamily:"var(--font-mono),monospace", fontSize:'0.63rem', 
                letterSpacing:'0.22em', textTransform:'uppercase', textDecoration:'none', 
                color: active === id ? 'var(--white)' : 'var(--muted)', 
                transition:'color 0.25s', position:'relative', paddingBottom:'4px' 
              }}>
                {label}
                <span style={{ 
                  position:'absolute', bottom:0, left:0, right:0, height:'1.5px', 
                  background:'linear-gradient(90deg,var(--blue),var(--violet))', 
                  transform: active === id ? 'scaleX(1)' : 'scaleX(0)', 
                  transformOrigin:'left', transition:'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)', 
                  borderRadius:2 
                }} />
              </a>
            ))}
          </div>
        )}

        {/* Hamburger Toggle */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer',
              zIndex: 1001, display: 'flex', flexDirection: 'column', gap: '6px'
            }}
          >
            <div style={{ 
              width: 24, height: 1.5, background: '#fff', 
              transition: 'transform 0.4s, background 0.4s',
              transform: isMenuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none'
            }} />
            <div style={{ 
              width: 24, height: 1.5, background: '#fff', 
              transition: 'opacity 0.3s',
              opacity: isMenuOpen ? 0 : 1
            }} />
            <div style={{ 
              width: 24, height: 1.5, background: '#fff', 
              transition: 'transform 0.4s, background 0.4s',
              transform: isMenuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none'
            }} />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(2,2,7,0.98)',
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
        opacity: isMenuOpen ? 1 : 0,
        pointerEvents: isMenuOpen ? 'all' : 'none',
        transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {NAV_LINKS.map(({ id, label }, i) => (
          <a 
            key={id} 
            href={`#${id}`}
            onClick={() => setIsMenuOpen(false)}
            style={{
              fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
              fontSize: '4rem',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              color: active === id ? '#fff' : 'rgba(255,255,255,0.25)',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(40px)',
              opacity: isMenuOpen ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s`,
              position: 'relative',
              textAlign: 'center'
            }}
          >
            {label}
            {active === id && (
              <div style={{
                position: 'absolute', left: '-1.5rem', top: '50%', transform: 'translateY(-50%)',
                width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)',
                boxShadow: '0 0 15px var(--blue)'
              }} />
            )}
          </a>
        ))}

        {/* Bottom Details */}
        <div style={{
          position: 'absolute', bottom: '3rem', textAlign: 'center',
          opacity: isMenuOpen ? 0.4 : 0,
          transition: 'opacity 0.8s ease 0.5s'
        }}>
          <p style={{ fontFamily: 'var(--font-mono),monospace', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Based in Enugu, Nigeria
          </p>
        </div>
      </div>
    </>
  );
}
