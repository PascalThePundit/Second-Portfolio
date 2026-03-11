'use client';
import { useEffect, useRef, useState } from 'react';

export default function Hero(){
  const [mounted,setMounted]=useState(false);
  const [nameText, setNameText] = useState('________\n_______');
  const scrambleKey = useRef(0);

  const triggerScramble = () => {
    scrambleKey.current += 1;
    const key = scrambleKey.current;
    const target = 'PASCAL\nCHUKWU';
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const chars = target.split('');
    const resolved = chars.map(() => false);
    let iter = 0;

    // Start with a fully scrambled state immediately
    setNameText(chars.map(ch => ch === '\n' ? '\n' : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));

    const interval = setInterval(() => {
      if (scrambleKey.current !== key) { clearInterval(interval); return; }
      setNameText(
        chars.map((ch, i) => {
          if (ch === '\n') return '\n';
          if (resolved[i]) return ch;
          if (iter > i * 2.8) { resolved[i] = true; return ch; }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iter++;
      if (resolved.every(Boolean)) clearInterval(interval);
    }, 64);
  };

  useEffect(() => {
    const t = setTimeout(triggerScramble, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(()=>{const t=setTimeout(()=>setMounted(true),100);return()=>clearTimeout(t);},[]);

  return(
    <section id="hero" style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',zIndex:1,padding:'0 1.5rem',backgroundImage:'linear-gradient(to bottom,rgba(4,4,10,0.55) 0%,rgba(4,4,10,0.1) 25%,rgba(4,4,10,0.1) 60%,rgba(4,4,10,1) 100%)'}}>
      
      <div
        className="name-fade"
        onMouseEnter={triggerScramble}
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease',
          transitionDelay: '0.25s',
          zIndex: 2,
          lineHeight: 0.86,
          whiteSpace: 'pre',
          marginTop: '2rem',
          cursor: 'default',
          pointerEvents: 'auto'
        }}
      >
        {nameText}
      </div>

      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',marginTop:'1.8rem',opacity:mounted?1:0,transform:mounted?'translateY(0)':'translateY(14px)',transition:'all 0.9s ease',transitionDelay:'0.55s',zIndex:2}}>
        <span style={{fontFamily:"var(--font-mono),monospace",fontSize:'clamp(0.68rem,1.6vw,0.88rem)',letterSpacing:'0.36em',color:'var(--blue)',textTransform:'uppercase'}}>Software Developer</span>
        <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}}>
          <span style={{width:28,height:1,background:'linear-gradient(to right,transparent,rgba(240,244,255,0.3))'}}/>
          <span style={{fontFamily:"var(--font-mono),monospace",fontSize:'clamp(0.56rem,1.2vw,0.68rem)',letterSpacing:'0.28em',color:'var(--muted)',textTransform:'uppercase'}}>Senior Prompt Engineer</span>
          <span style={{width:28,height:1,background:'linear-gradient(to left,transparent,rgba(240,244,255,0.3))'}}/>
        </div>
      </div>

      <div style={{display:'flex',gap:'2.4rem',marginTop:'2.4rem',opacity:mounted?1:0,transform:mounted?'translateY(0)':'translateY(12px)',transition:'all 0.9s ease',transitionDelay:'0.8s',zIndex:2}}>
        {[{value:'1+',label:'Year Exp'},{value:'15+',label:'Projects'},{value:'5+',label:'Live Apps'}].map(s=>(
          <div key={s.label} style={{textAlign:'center'}}>
            <div style={{fontFamily:"var(--font-bebas),'Bebas Neue',Impact,sans-serif",fontSize:'clamp(1.8rem,4vw,2.6rem)',letterSpacing:'0.06em',background:'linear-gradient(135deg,var(--blue),var(--violet))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1}}>{s.value}</div>
            <div style={{fontFamily:"var(--font-mono),monospace",fontSize:'0.52rem',letterSpacing:'0.22em',color:'var(--muted)',textTransform:'uppercase',marginTop:'0.25rem'}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{position:'absolute',bottom:'4rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',opacity:mounted?0.55:0,transition:'opacity 1s ease',transitionDelay:'1.2s', zIndex: 10}}>
        <span style={{fontFamily:"var(--font-mono),monospace",fontSize:'0.54rem',letterSpacing:'0.28em',color:'var(--muted)',textTransform:'uppercase'}}>Scroll</span>
        <div style={{width:1,height:48,background:'linear-gradient(to bottom,rgba(240,244,255,0.5),transparent)',animation:'scrollPulse 2.2s ease-in-out infinite'}}/>
      </div>
    </section>
  );
}
