'use client';

interface Props {
  iconUrl: string;
  alt: string;
  hovered: boolean;
}

export default function CornerOrb({ iconUrl, alt, hovered }: Props) {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      width: 38,
      height: 38,
      zIndex: 10,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      boxShadow: hovered
        ? '0 0 20px rgba(56,189,248,0.4), 0 0 40px rgba(56,189,248,0.15)'
        : '0 0 8px rgba(56,189,248,0.1)',
      transition: 'box-shadow 0.35s ease',
      animation: 'orbFloat 3s ease-in-out infinite',
    }}>
      <img
        src={iconUrl}
        alt={alt}
        width={22}
        height={22}
        style={{
          width: 22,
          height: 22,
          objectFit: 'contain',
          filter: alt === 'Next.js' ? 'invert(1)' : 'none',
          transform: hovered ? 'rotate(360deg)' : 'rotate(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.34,1.2,0.64,1)',
        }}
      />
      <style>{`
        @keyframes orbFloat {
          0%,100% { transform: translateY(0px);   }
          50%      { transform: translateY(-4px);  }
        }
      `}</style>
    </div>
  );
}
