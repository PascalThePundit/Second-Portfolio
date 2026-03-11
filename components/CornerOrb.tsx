'use client';
import { useEffect, useRef } from 'react';

const CORNER_STYLES: Record<string, React.CSSProperties> = {
  tl: { top: 6,    left: 6   },
  tr: { top: 6,    right: 6  },
  bl: { bottom: 6, left: 6   },
  br: { bottom: 6, right: 6  },
};

// Icosahedron vertices (normalized)
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTS: [number,number,number][] = [
  [-1, PHI,0],[1,PHI,0],[-1,-PHI,0],[1,-PHI,0],
  [0,-1,PHI],[0,1,PHI],[0,-1,-PHI],[0,1,-PHI],
  [PHI,0,-1],[PHI,0,1],[-PHI,0,-1],[-PHI,0,1],
];
const VERTS = RAW_VERTS.map(([x,y,z]) => {
  const l = Math.sqrt(x*x+y*y+z*z);
  return [x/l, y/l, z/l] as [number,number,number];
});
const EDGES: [number,number][] = [
  [0,1],[0,5],[0,7],[0,10],[0,11],
  [1,5],[1,7],[1,8],[1,9],
  [2,3],[2,6],[2,10],[2,11],[2,4],
  [3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,8],[7,10],
  [8,9],[10,11],
];

function rotateX(v:[number,number,number], a:number):[number,number,number]{
  const c=Math.cos(a),s=Math.sin(a);
  return [v[0], v[1]*c-v[2]*s, v[1]*s+v[2]*c];
}
function rotateY(v:[number,number,number], a:number):[number,number,number]{
  const c=Math.cos(a),s=Math.sin(a);
  return [v[0]*c+v[2]*s, v[1], -v[0]*s+v[2]*c];
}

interface Props {
  corner: 'tl'|'tr'|'bl'|'br';
  fast?: boolean;
}

export default function CornerOrb({ corner, fast=false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fastRef   = useRef(fast);
  useEffect(() => { fastRef.current = fast; }, [fast]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 52;
    const CX   = SIZE / 2;
    const CY   = SIZE / 2;
    const SCALE = 20;
    let rx = 0, ry = 0;
    let frame: number;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const speed = fastRef.current ? 0.032 : 0.009;
      rx += speed;
      ry += speed * 1.4;

      // Project vertices
      const projected = VERTS.map(v => {
        let p = rotateX(v, rx);
        p = rotateY(p, ry);
        // simple perspective
        const z = p[2] + 2.5;
        return {
          x: CX + (p[0] / z) * SCALE * 2.2,
          y: CY + (p[1] / z) * SCALE * 2.2,
          z: p[2],
        };
      });

      // Draw edges
      ctx.strokeStyle = 'rgba(56,189,248,0.55)';
      ctx.lineWidth   = 0.8;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur  = 4;

      for (const [a,b] of EDGES) {
        const pa = projected[a];
        const pb = projected[b];
        // fade back-facing edges
        const avgZ = (pa.z + pb.z) / 2;
        ctx.globalAlpha = avgZ > 0 ? 0.9 : 0.25;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      width: 52, height: 52,
      pointerEvents: 'none',
      zIndex: 10,
      opacity: 0.7,
      ...CORNER_STYLES[corner],
    }}>
      <canvas
        ref={canvasRef}
        width={52}
        height={52}
        style={{ display:'block' }}
      />
    </div>
  );
}
