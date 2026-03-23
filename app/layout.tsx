import type { Metadata } from 'next';
import { Bebas_Neue, Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' });
const syne = Syne({ weight: ['700', '800'], subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const dmSans = DM_Sans({ weight: ['300', '400', '500'], style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-dm', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Pascal Chukwu — Software Developer',
  description: 'Software Developer & Senior Prompt Engineer. Building privacy-first, blockchain-native, and intelligent applications.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
