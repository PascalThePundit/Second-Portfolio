'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer:coarse)').matches) return;
    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    const spark = sparkRef.current!;
    let mx=-100,my=-100,rx=-100,ry=-100;

    const onMove = (e: MouseEvent) => {
      mx=e.clientX; my=e.clientY;
      dot.style.transform=`translate(${mx-4}px,${my-4}px)`;
      spawnSparkle(e.clientX,e.clientY,spark);
    };

    let frame: number;
    const loop = () => {
      rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
      ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;
      frame=requestAnimationFrame(loop);
    };
    frame=requestAnimationFrame(loop);

    window.addEventListener('mousemove',onMove);
    return () => { window.removeEventListener('mousemove',onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed',top:0,left:0,zIndex:9999,width:8,height:8,borderRadius:'50%',background:'var(--blue)',boxShadow:'0 0 8px var(--blue),0 0 20px rgba(56,189,248,0.6)',pointerEvents:'none',willChange:'transform' }} />
      <div ref={ringRef} style={{ position:'fixed',top:0,left:0,zIndex:9998,width:36,height:36,borderRadius:'50%',border:'1px solid rgba(56,189,248,0.55)',pointerEvents:'none',transition:'opacity 0.3s',willChange:'transform' }} />
      <div ref={sparkRef} style={{ position:'fixed',inset:0,zIndex:9997,pointerEvents:'none' }} />
    </>
  );
}

const COLORS=['#38bdf8','#a78bfa','#f59e0b','#f472b6','#ffffff'];
let lastSpawn=0;
function spawnSparkle(x:number,y:number,container:HTMLDivElement){
  const now=Date.now(); if(now-lastSpawn<38)return; lastSpawn=now;
  const el=document.createElement('div');
  const color=COLORS[Math.floor(Math.random()*COLORS.length)];
  const size=3+Math.random()*5;
  const angle=Math.random()*360;
  const dist=14+Math.random()*20;
  const dx=Math.cos(angle*Math.PI/180)*dist;
  const dy=Math.sin(angle*Math.PI/180)*dist;
  el.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:50%;background:${color};box-shadow:0 0 ${size*2}px ${color};pointer-events:none;transform:translate(-50%,-50%);animation:sparkFly 0.65s ease-out forwards;--dx:${dx}px;--dy:${dy}px;`;
  container.appendChild(el);
  setTimeout(()=>el.remove(),700);
}
