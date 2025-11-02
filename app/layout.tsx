import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-next';
import { ReactPlugin } from '@21st-extension/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fashion Store - Premium Clothing & Accessories',
  description: 'Discover the latest trends in fashion. Shop premium clothing, shoes, and accessories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
