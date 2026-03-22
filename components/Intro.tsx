'use client';
import { useEffect, useState } from 'react';

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'loading'|'splitting'|'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false);
  const [scrambledName, setScrambledName] = useState('______\n_______');

  // Scramble effect
  useEffect(() => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const target = 'PASCAL\nCHUKWU';
    const chars = target.split('');
    const resolved = chars.map(() => false);
    let iter = 0;

    const t = setTimeout(() => {
      setNameVisible(true);
      const interval = setInterval(() => {
        setScrambledName(
          chars.map((ch, i) => {
            if (ch === '\n') return '\n';
            if (resolved[i]) return ch;
            if (iter > i * 1.4) { resolved[i] = true; return ch; }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        iter++;
        if (resolved.every(Boolean)) clearInterval(interval);
      }, 38);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  // Role text
  useEffect(() => {
    const t = setTimeout(() => setRoleVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Progress bar
  useEffect(() => {
    const start = Date.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // ease out
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  // Trigger split after progress done
  useEffect(() => {
    if (progress < 1) return;
    const t = setTimeout(() => {
      setPhase('splitting');
      setTimeout(() => {
        setPhase('done');
        onDone();
      }, 900);
    }, 300);
    return () => clearTimeout(t);
  }, [progress, onDone]);

  if (phase === 'done') return null;

  const splitting = phase === 'splitting';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      pointerEvents: splitting ? 'none' : 'all',
    }}>
      {/* Top half */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: '#05050f',
        transform: splitting ? 'translateY(-100%)' : 'translateY(0)',
        transition: splitting ? 'transform 0.85s cubic-bezier(0.76,0,0.24,1)' : 'none',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: 0,
        overflow: 'hidden',
      }}>
        {/* Top half content — name top portion */}
        <div style={{
          textAlign: 'center',
          paddingBottom: '0.5rem',
          opacity: nameVisible ? 1 : 0,
          transform: nameVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
            fontSize: 'clamp(3.5rem,13vw,10rem)',
            lineHeight: 0.88,
            letterSpacing: '0.06em',
            color: '#fff',
            whiteSpace: 'pre',
            // clip to only show top half of name
            clipPath: 'inset(0 0 50% 0)',
          }}>
            {scrambledName}
          </div>
        </div>
      </div>

      {/* Bottom half */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: '#05050f',
        transform: splitting ? 'translateY(100%)' : 'translateY(0)',
        transition: splitting ? 'transform 0.85s cubic-bezier(0.76,0,0.24,1)' : 'none',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: 0,
        overflow: 'hidden',
      }}>
        {/* Bottom half — name bottom portion + role + bar */}
        <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
          <div style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',Impact,sans-serif",
            fontSize: 'clamp(3.5rem,13vw,10rem)',
            lineHeight: 0.88,
            letterSpacing: '0.06em',
            color: '#fff',
            whiteSpace: 'pre',
            opacity: nameVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            // clip to only show bottom half of name
            clipPath: 'inset(50% 0 0 0)',
          }}>
            {scrambledName}
          </div>

          {/* Role */}
          <div style={{
            fontFamily: "var(--font-mono),monospace",
            fontSize: 'clamp(0.6rem,1.4vw,0.8rem)',
            letterSpacing: '0.38em',
            color: 'rgba(56,189,248,0.9)',
            textTransform: 'uppercase',
            marginTop: '1.2rem',
            opacity: roleVisible ? 1 : 0,
            transform: roleVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}>
            Software Developer &nbsp;·&nbsp; Prompt Engineer
          </div>

          {/* Progress bar */}
          <div style={{
            width: 'clamp(160px,30vw,280px)',
            height: 1,
            background: 'rgba(255,255,255,0.08)',
            margin: '2rem auto 0',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, var(--blue), var(--violet))',
              borderRadius: 2,
              transition: 'width 0.05s linear',
              boxShadow: '0 0 8px rgba(56,189,248,0.6)',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
