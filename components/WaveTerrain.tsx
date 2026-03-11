'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WaveTerrain() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    /* ── Renderer ─────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    /* ── Scene & Camera ───────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 7, 14);
    camera.lookAt(0, 0, 0);

    /* ── Shared Geometry ──────────────────────────── */
    const geometry = new THREE.PlaneGeometry(36, 36, 90, 90);
    geometry.rotateX(-Math.PI / 2);

    /* ── Solid dark mesh ──────────────────────────── */
    const solidMat = new THREE.MeshPhongMaterial({
      color: 0x030312,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
      shininess: 5,
    });
    const solidMesh = new THREE.Mesh(geometry, solidMat);
    scene.add(solidMesh);

    /* ── Blue wireframe overlay ───────────────────── */
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.11,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.position.y = 0.005;
    scene.add(wireMesh);

    /* ── Violet accent wireframe ──────────────────── */
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.055,
    });
    const wireMesh2 = new THREE.Mesh(geometry, wireMat2);
    wireMesh2.position.y = 0.01;
    scene.add(wireMesh2);

    /* ── Lights ───────────────────────────────────── */
    const ambient = new THREE.AmbientLight(0x10103a, 3);
    scene.add(ambient);

    const bluePoint = new THREE.PointLight(0x38bdf8, 4, 25);
    bluePoint.position.set(-6, 6, -4);
    scene.add(bluePoint);

    const goldPoint = new THREE.PointLight(0xf59e0b, 2, 20);
    goldPoint.position.set(8, 4, 4);
    scene.add(goldPoint);

    const violetPoint = new THREE.PointLight(0xa78bfa, 2.5, 18);
    violetPoint.position.set(0, 5, -8);
    scene.add(violetPoint);

    /* ── Scroll Fade ──────────────────────────────── */
    const handleScroll = () => {
      if (!mountRef.current) return;
      const ratio = Math.max(0, 1 - window.scrollY / window.innerHeight);
      mountRef.current.style.opacity = String(ratio);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ── Resize ───────────────────────────────────── */
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    /* ── Animation Loop ───────────────────────────── */
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y =
          Math.sin(x * 0.38 + t * 0.65) * 0.62 +
          Math.sin(z * 0.45 + t * 0.50) * 0.55 +
          Math.sin((x + z) * 0.28 + t * 0.40) * 0.35 +
          Math.cos(x * 0.22 - z * 0.3 + t * 0.30) * 0.22;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals();

      // Slow camera drift
      camera.position.x = Math.sin(t * 0.08) * 1.2;
      camera.position.z = 14 + Math.cos(t * 0.06) * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      solidMat.dispose();
      wireMat.dispose();
      wireMat2.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.15s ease',
      }}
    />
  );
}
