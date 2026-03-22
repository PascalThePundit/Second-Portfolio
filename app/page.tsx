'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import SidebarName from '@/components/SidebarName';

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false });
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <Intro onDone={() => setIntroComplete(true)} />}
      <main style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Cursor />
        <SidebarName />
        <Aurora />
        <Nav />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
