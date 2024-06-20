import './global.css';
import { UiLayout } from '@/components/shared/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

import { Inter, Archivo } from 'next/font/google';
import { categoriesSchema } from '@/lib/schemas';
import { client } from '@/lib/sanity';
import { getCategories } from './page.groq';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from '@/components/providers/toast-provider';

// export const metadata = {
//   title: 'betting-nationfi',
//   description: 'Betting app',
// };

const links: { label: string; path: string }[] = [
  // { label: 'Account', path: '/account' },
  // { label: 'Clusters', path: '/clusters' },
];

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const arc = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await client.fetch(getCategories);
  const safeCats = categoriesSchema.safeParse(categories);
  return (
    <html lang="en">
      <body
        className={`
          dark bg-background text-foreground ${arc.variable} ${inter.variable} font-archivo`}
      >
        <ToastProvider>
          <ReactQueryProvider>
            <ClusterProvider>
              <SolanaProvider>
                <UiLayout
                  categories={safeCats.success ? safeCats.data : undefined}
                  links={links}
                >
                  {children}
                </UiLayout>
              </SolanaProvider>
            </ClusterProvider>
          </ReactQueryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
