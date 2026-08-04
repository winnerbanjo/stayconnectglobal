import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Stay Connect Hotels | Luxury Multi-Property Hotel Group',
  description: 'World-class luxury hotel booking and multi-property management platform in Lekki Phase 1, Lagos, Nigeria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#FAF9F6] text-[#111111] font-sans antialiased selection:bg-[#C6A15B] selection:text-[#111111]">
        {children}
      </body>
    </html>
  );
}
