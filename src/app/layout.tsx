import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './tokens.css';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wesley Filho Dev · Portfólio',
  description:
    'Sites, landing pages, sistemas web e link bios feitos sob medida para o seu negócio aparecer — e vender — na internet.',
};

export const viewport: Viewport = {
  themeColor: '#07080C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
