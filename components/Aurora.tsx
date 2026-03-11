'use client';
import { useEffect, useRef } from 'react';

export default function Aurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const ratio = Math.max(0, 1 - window.scrollY / window.innerHeight);
      el.style.opacity = String(ratio);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden', background:'#05050f', transition:'opacity 0.12s linear' }}>
      <div style={{ position:'absolute', width:'70vw', height:'70vw', top:'-15%', left:'-10%', borderRadius:'50%', background:'radial-gradient(circle, rgba(56,189,248,0.55) 0%, transparent 70%)', animation:'drift1 12s ease-in-out infinite alternate', willChange:'transform' }} />
      <div style={{ position:'absolute', width:'60vw', height:'60vw', top:'-5%', right:'-8%', borderRadius:'50%', background:'radial-gradient(circle, rgba(167,139,250,0.45) 0%, transparent 70%)', animation:'drift2 15s ease-in-out infinite alternate', willChange:'transform' }} />
      <div style={{ position:'absolute', width:'55vw', height:'55vw', bottom:'5%', left:'25%', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', animation:'drift3 18s ease-in-out infinite alternate', willChange:'transform' }} />
      <div style={{ position:'absolute', width:'45vw', height:'45vw', bottom:'10%', right:'5%', borderRadius:'50%', background:'radial-gradient(circle, rgba(244,114,182,0.28) 0%, transparent 70%)', animation:'drift4 20s ease-in-out infinite alternate', willChange:'transform' }} />
      <style>{`
        @keyframes drift1 { from{transform:translate(0,0) scale(1)} to{transform:translate(8vw,5vh) scale(1.15)} }
        @keyframes drift2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-6vw,8vh) scale(1.1)} }
        @keyframes drift3 { from{transform:translate(0,0) scale(1)} to{transform:translate(5vw,-7vh) scale(1.2)} }
        @keyframes drift4 { from{transform:translate(0,0) scale(1)} to{transform:translate(-8vw,-5vh) scale(1.08)} }
      `}</style>
    </div>
  );
}
