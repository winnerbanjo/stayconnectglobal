import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import WhatsAppFloatingWidget from '@/components/ui/WhatsAppFloatingWidget';
import { ThemeProvider } from '@/context/ThemeContext';

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
  title: 'Stay Connect Global | Luxury Hospitality Platform & Ecosystem',
  description: 'Discover luxury hotels, serviced apartments, premium residences, chauffeur mobility, and concierge experiences across Nigeria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white font-sans antialiased selection:bg-[#C6A15B] selection:text-[#111111] relative transition-colors duration-300">
        <ThemeProvider>
          {children}
          <WhatsAppFloatingWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
