'use client';
import { useEffect, useRef } from 'react';

const CONTACTS = [
  {
    label:'Email', value:'chukwupascal20@gmail.com', href:'mailto:chukwupascal20@gmail.com', color:'#f59e0b',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  },
  {
    label:'GitHub', value:'@PascalThePundit', href:'https://github.com/PascalThePundit', color:'#38bdf8',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    label:'Twitter / X', value:'@chefthepreacher', href:'https://x.com/chefthepreacher', color:'#a78bfa',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('is-visible'); }, { threshold:0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="section-bg" style={{ padding:'clamp(5rem,12vw,9rem) clamp(1.5rem,9vw,9rem)', minHeight:'60vh', position:'relative' }}>
      <div aria-hidden style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'50%', height:'80%', bottom:'-10%', right:'-10%', background:'radial-gradient(ellipse at center, rgba(167,139,250,0.12) 0%, transparent 70%)' }} />
        <div style={{ position:'absolute', width:'40%', height:'60%', top:'0%', left:'-5%', background:'radial-gradient(ellipse at center, rgba(56,189,248,0.1) 0%, transparent 70%)' }} />
      </div>
      <div ref={ref} className="section-reveal" style={{ position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:'1.1rem', marginBottom:'1.2rem' }}>
          <span style={{ fontFamily:"var(--font-mono),monospace", fontSize:'0.62rem', letterSpacing:'0.22em', color:'var(--blue)', opacity:0.45 }}>04</span>
          <h2 style={{ fontFamily:"var(--font-syne),'Syne',sans-serif", fontSize:'clamp(2.2rem,5.5vw,4rem)', fontWeight:800, letterSpacing:'-0.03em' }}>Get In Touch</h2>
        </div>
        <p style={{ fontFamily:"var(--font-dm),sans-serif", fontStyle:'italic', fontSize:'clamp(0.88rem,1.8vw,1.05rem)', color:'var(--muted)', lineHeight:1.9, maxWidth:440, marginBottom:'3rem' }}>
          Open to collabs, contracts & interesting problems.<br />Let&apos;s build something worth shipping.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', marginBottom:'4rem' }}>
          {CONTACTS.map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" className="glass-card"
              style={{ display:'flex', flexDirection:'column', gap:'1rem', padding:'1.4rem 1.6rem', textDecoration:'none', minWidth:200, flex:'1 1 200px', cursor:'pointer' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${c.color}55`; e.currentTarget.style.boxShadow=`0 20px 60px rgba(0,0,0,0.55),inset 0 2px 0 rgba(255,255,255,0.3),0 0 60px ${c.color}18`; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.16)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.5),inset 0 2px 0 rgba(255,255,255,0.28)'; }}>
              <div style={{ width:42, height:42, borderRadius:'12px', background:`${c.color}18`, border:`1px solid ${c.color}30`, display:'flex', alignItems:'center', justifyContent:'center', color:c.color, position:'relative', zIndex:2 }}>{c.icon}</div>
              <div style={{ position:'relative', zIndex:2 }}>
                <div style={{ fontFamily:"var(--font-mono),monospace", fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color:c.color, marginBottom:'0.3rem' }}>{c.label}</div>
                <div style={{ fontFamily:"var(--font-dm),sans-serif", fontSize:'0.88rem', color:'var(--white)', wordBreak:'break-all' }}>{c.value}</div>
              </div>
              <div style={{ marginTop:'auto', alignSelf:'flex-end', color:c.color, fontSize:'1rem', opacity:0.6, position:'relative', zIndex:2 }}>↗</div>
            </a>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'0.5rem' }}>
          <span style={{ fontFamily:"var(--font-mono),monospace", fontSize:'0.55rem', letterSpacing:'0.2em', color:'rgba(240,244,255,0.15)' }}>2026 PASCAL C. CHUKWU</span>
        </div>      </div>
    </section>
  );
}
