import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trendyol Filtre Sayfası Clone',
  description: 'Next.js ve Tailwind ile Trendyol filtre ekranı benzeri frontend çalışma'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
