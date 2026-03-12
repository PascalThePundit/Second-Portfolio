'use client';
import { useEffect, useRef } from 'react';

const SKILLS=[
  {name:'Flutter',      color:'#54C5F8',icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'},
  {name:'React Native', color:'#38bdf8', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'Rust',         color:'#f97316', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg'},
  {name:'Next.js',      color:'#e2e8f0', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'},
  {name:'React',        color:'#61DAFB', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'JavaScript',   color:'#facc15', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'Python',       color:'#4ade80', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'CSS',          color:'#818cf8', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
  {name:'HTML',         color:'#fb923c', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
  {name:'TypeScript',   color:'#3b82f6', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {name:'Solana',       color:'#9945FF', icon:'https://cdn.simpleicons.org/solana'},
  {name:'Gemini',       color:'#4285F4', icon:'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.17.0/icons/gemini-color.svg'},
  {name:'Claude',       color:'#D97757', icon:'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.17.0/icons/claude-color.svg'},
  {name:'OpenAI',       color:'#10a37f', icon:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg'},
];

export default function Skills(){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)el.classList.add('is-visible');},{threshold:0.12});
    obs.observe(el);return()=>obs.disconnect();
  },[]);

  return(
    <section id="skills" className="section-bg" style={{padding:'clamp(5rem,12vw,9rem) clamp(1.5rem,9vw,9rem)'}}>
      <div ref={ref} className="section-reveal">
        <div style={{display:'flex',alignItems:'baseline',gap:'1.1rem',marginBottom:'3rem'}}>
          <span style={{fontFamily:"var(--font-mono),monospace",fontSize:'0.62rem',letterSpacing:'0.22em',color:'var(--gold)',opacity:0.45}}>02</span>
          <h2 style={{fontFamily:"var(--font-syne),'Syne',sans-serif",fontSize:'clamp(2.2rem,5.5vw,4rem)',fontWeight:800,letterSpacing:'-0.03em'}}>Tech Stack</h2>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'0.85rem'}}>
          {SKILLS.map((s)=>(
            <div key={s.name}
              style={{position:'relative',display:'inline-flex',alignItems:'center',gap:'10px',padding:'10px 20px',borderRadius:'100px',background:`linear-gradient(135deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0.04) 50%,${s.color}0D 100%)`,backdropFilter:'blur(32px) saturate(200%)',WebkitBackdropFilter:'blur(32px) saturate(200%)',border:`1px solid ${s.color}28`,boxShadow:`0 4px 16px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.2)`,fontFamily:"var(--font-mono),monospace",fontSize:'0.73rem',letterSpacing:'0.06em',color:'var(--white)',cursor:'default',transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s ease',overflow:'hidden'}}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.transform='translateY(-5px) scale(1.06)';el.style.borderColor=`${s.color}60`;el.style.boxShadow=`0 12px 36px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.28),0 0 40px ${s.color}22`;}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.transform='translateY(0) scale(1)';el.style.borderColor=`${s.color}28`;el.style.boxShadow=`0 4px 16px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.2)`;}}
            >
              <div style={{position:'absolute',top:0,left:0,right:0,height:'50%',background:'linear-gradient(to bottom,rgba(255,255,255,0.1),transparent)',borderRadius:'100px 100px 0 0',pointerEvents:'none'}}/>
              <img src={s.icon} alt={s.name} width={20} height={20} style={{width:20,height:20,objectFit:'contain',flexShrink:0,filter:s.name==='Next.js'?'invert(1)':'none',borderRadius:3,position:'relative',zIndex:1}}/>
              <span style={{position:'relative',zIndex:1}}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
