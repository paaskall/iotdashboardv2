import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RUANG KONTROL — Gas Leak & IoT Monitoring',
  description: 'Dashboard monitoring IoT dummy dengan sensor deteksi kebocoran gas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
