'use client';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import SidebarName from '@/components/SidebarName';

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false });
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Cursor />
      <SidebarName />
      <Aurora />
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
