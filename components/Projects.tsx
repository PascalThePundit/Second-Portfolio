'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const CornerOrb = dynamic(() => import('./CornerOrb'), { ssr: false });

const TAG_ICONS: Record<string, string | null> = {
  'TypeScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Rust':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
  'Next.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'React':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Python':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'CSS':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'PostgreSQL':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Supabase':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  'Anchor':       'https://cryptologos.cc/logos/solana-sol-logo.svg',
  'Solana':       'https://cryptologos.cc/logos/solana-sol-logo.svg',
  'ZK Proofs':    null,
  'SDK':          null,
  'Cryptography': null,
  'OpenAI':       null,
};

const PROJECTS = [
  { title:'Veil SDK',          primaryIcon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',   primaryAlt:'TypeScript', desc:'Developer-first privacy abstraction for Solana. Standardizes fragmented ZK protocols into a single TypeScript SDK — making privacy a primitive, not a pivot.',                                                                     tags:['TypeScript','Solana','ZK Proofs','SDK'],        color:'#38bdf8', github:'https://github.com/PascalThePundit/Veil-SDK',                         live:'https://veil-sdk-docs-site.vercel.app'              },
  { title:'ArciumHyde',        primaryIcon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',                primaryAlt:'Rust',        desc:'Privacy-as-a-service platform combining ZKP, MPC, FHE, and TEE on Solana. Named after Jekyll & Hyde — data exists encrypted yet remains mathematically computable.',                                                             tags:['Rust','TypeScript','Solana','Cryptography'],    color:'#a78bfa', github:'https://github.com/PascalThePundit/ArciumHyde',                       live:'https://arcium-hyde.vercel.app'                     },
  { title:'CredVault',         primaryIcon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',                primaryAlt:'Rust',        desc:'On-chain certificate platform. Students earn verifiable credentials for completed courses; employers validate authenticity directly on Solana.',                                                                                   tags:['Rust','TypeScript','Solana','Next.js'],         color:'#f59e0b', github:'https://github.com/PascalThePundit/CredVault',                        live:'https://cred-vault-ten.vercel.app'                  },
  { title:'Note100',           primaryIcon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',            primaryAlt:'Next.js',     desc:'AI-powered academic platform with note sharing, real-time collaboration, Voho AI predictions, and anonymous peer discussions for students.',                                                                                      tags:['Next.js','TypeScript','PostgreSQL','OpenAI'],   color:'#34d399', github:'https://github.com/PascalThePundit/Note-100',                         live:null                                                 },
  { title:'Multisig Wallet',   primaryIcon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',                primaryAlt:'Rust',        desc:'Production-grade N-of-M multisig wallet on Solana. Threshold signing, expirable proposals, replay protection. Built for Superteam Nigeria DevQuest.',                                                                           tags:['Rust','Anchor','Solana','TypeScript'],          color:'#f87171', github:'https://github.com/PascalThePundit/multisig-wallet',                   live:null                                                 },
  { title:'NAAS SE Convention',primaryIcon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',            primaryAlt:'Next.js',     desc:'Full-stack event registration platform for NAAS South East Convention 2026. Supabase backend with real-time registration and polished Next.js frontend.',                                                                       tags:['Next.js','JavaScript','Supabase','CSS'],        color:'#fb923c', github:'https://github.com/PascalThePundit/NAAS-SOUTH-EAST-CONVENTION26',    live:'https://naas-south-east-convention-26.vercel.app'   },
];

export default function Projects() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('is-visible'); }); },
      { threshold: 0.06 }
    );
    cardRefs.current.forEach(c => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.02)`;
    card.style.transition = 'transform 0.08s ease';
  };

  const handleMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    setHoveredIndex(null);
  };

  return (
    <section id="projects" className="section-bg" style={{ padding:'clamp(5rem,12vw,9rem) clamp(1.5rem,9vw,9rem)', position:'relative' }}>
      {/* Ambient glow */}
      <div aria-hidden style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'50%', height:'70%', top:'-10%', left:'-5%',  background:'radial-gradient(ellipse at center,rgba(56,189,248,0.16) 0%,transparent 70%)',  animation:'drift1 14s ease-in-out infinite alternate' }}/>
        <div style={{ position:'absolute', width:'45%', height:'60%', top:'20%',  right:'-5%', background:'radial-gradient(ellipse at center,rgba(167,139,250,0.16) 0%,transparent 70%)', animation:'drift2 17s ease-in-out infinite alternate' }}/>
        <div style={{ position:'absolute', width:'40%', height:'55%', bottom:'-5%',left:'20%', background:'radial-gradient(ellipse at center,rgba(245,158,11,0.12) 0%,transparent 70%)',  animation:'drift3 20s ease-in-out infinite alternate' }}/>
        <style>{`
          @keyframes drift1{from{transform:translate(0,0)}to{transform:translate(6%,8%)}}
          @keyframes drift2{from{transform:translate(0,0)}to{transform:translate(-6%,6%)}}
          @keyframes drift3{from{transform:translate(0,0)}to{transform:translate(5%,-7%)}}
        `}</style>
      </div>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'baseline', gap:'1.1rem', marginBottom:'3rem', position:'relative', zIndex:3 }}>
        <span style={{ fontFamily:"var(--font-mono),monospace", fontSize:'0.62rem', letterSpacing:'0.22em', color:'var(--violet)', opacity:0.45 }}>03</span>
        <h2 style={{ fontFamily:"var(--font-syne),'Syne',sans-serif", fontSize:'clamp(2.2rem,5.5vw,4rem)', fontWeight:800, letterSpacing:'-0.03em' }}>Selected Work</h2>
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,360px),1fr))', gap:'1.5rem', position:'relative', zIndex:3 }}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            ref={el => { cardRefs.current[i] = el; }}
            className="scroll-card glass-card"
            style={{
              '--delay': `${i * 0.12}s`,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            } as React.CSSProperties}
            onMouseMove={e => { setHoveredIndex(i); handleMouseMove(e, i); }}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            {/* 3D corner orb — only render when card visible */}
            <CornerOrb
              iconUrl={p.primaryIcon}
              alt={p.primaryAlt}
              hovered={hoveredIndex === i}
            />

            {/* Coloured top bar */}
            <div style={{ height:4, background:`linear-gradient(90deg,${p.color},${p.color}66,transparent)`, borderRadius:'28px 28px 0 0', flexShrink:0 }}/>

            <div style={{ padding:'1.65rem', display:'flex', flexDirection:'column', flexGrow:1, position:'relative', zIndex:2 }}>
              <h3 style={{ fontFamily:"var(--font-syne),'Syne',sans-serif", fontSize:'1.12rem', fontWeight:700, marginBottom:'0.65rem', letterSpacing:'-0.01em' }}>{p.title}</h3>
              <p   style={{ fontFamily:"var(--font-dm),sans-serif",          fontSize:'0.83rem', lineHeight:1.78, color:'var(--muted)', marginBottom:'1.2rem', flexGrow:1 }}>{p.desc}</p>

              {/* Tags with icons */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.2rem' }}>
                {p.tags.map(tag => {
                  const iconUrl = TAG_ICONS[tag];
                  return (
                    <span key={tag} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:'100px', border:`1px solid ${p.color}38`, color:p.color, fontFamily:"var(--font-mono),monospace", fontSize:'0.61rem', letterSpacing:'0.07em', background:`${p.color}14` }}>
                      {iconUrl && <img src={iconUrl} alt={tag} width={12} height={12} style={{ width:12, height:12, objectFit:'contain', flexShrink:0, filter:tag==='Next.js'?'invert(1)':'none' }}/>}
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Links */}
              <div style={{ display:'flex', gap:'1.2rem', alignItems:'center' }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:"var(--font-mono),monospace", fontSize:'0.6rem', letterSpacing:'0.14em', color:'var(--muted)', textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='var(--white)')}
                  onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>↗ GITHUB</a>
                {p.live && (<>
                  <span style={{ color:'rgba(255,255,255,0.1)' }}>·</span>
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:"var(--font-mono),monospace", fontSize:'0.6rem', letterSpacing:'0.14em', color:p.color, textDecoration:'none', transition:'opacity 0.2s' }}
                    onMouseEnter={e=>(e.currentTarget.style.opacity='0.6')}
                    onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>↗ LIVE</a>
                </>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
