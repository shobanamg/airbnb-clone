import './globals.css';

import { Inter } from 'next/font/google';

import ClientOnly from './components/ClientOnly';
import { Navbar } from './components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone with Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
