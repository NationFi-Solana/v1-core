import { Metadata } from 'next';
import BetPage from '@/components/bet/bet-page';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return {
    title: `NATIONFI - ${slug}`,
  };
}
export default async function Page({ params }: { params: { slug: string } }) {
  return <BetPage params={{ slug: params.slug }} />;
}
