import './globals.css';
import Head from 'next/head';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Pallet-IA-zer',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.',
  icons: {
    icon: '/kovix.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
