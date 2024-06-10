import '@/src/styles/home/global.css';
import { inter } from '@/src/components/layout/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Staytion Dashboard',
    default: 'Staytion Dashboard',
  },
  description: 'On-demand access to flexible coworking, office and lifestyle spaces worldwide.',
  metadataBase: new URL('https://gostaytion.com/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
