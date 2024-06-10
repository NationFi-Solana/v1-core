import './global.css';
import { UiLayout } from '@/components/shared/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

import { Inter } from 'next/font/google';
import { atom } from 'jotai';
// export const metadata = {
//   title: 'betting-nationfi',
//   description: 'Betting app',
// };

const links: { label: string; path: string }[] = [
  // { label: 'Account', path: '/account' },
  // { label: 'Clusters', path: '/clusters' },
];

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });
export const isDarkTheme = atom(true);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' dark bg-background text-foreground'}>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
