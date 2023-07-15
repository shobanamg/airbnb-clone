import './globals.css';

import { Inter } from 'next/font/google';

import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import { Navbar } from './components/navbar/Navbar';
import ToasterProvider from './providers/ToasterProvider';

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
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
