import HomePage from '@/components/home/home-page';
import { getCategories, getMarkets, getMarketsByCategory } from './page.groq';
import { client } from '@/lib/sanity';

import {
  TCategories,
  TMarkets,
  categoriesSchema,
  marketsSchema,
} from '@/lib/schemas';
export const metadata = {
  title: 'NATIONFI VOTE',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.['category'];
  const result = category
    ? await client.fetch(
        getMarketsByCategory,
        { category },
        { next: { revalidate: 5 } }
      )
    : await client.fetch(getMarkets, {}, { next: { revalidate: 5 } });
  console.log(result, 'RESULT');
  const categories = await client.fetch(getCategories);
  const safeCats = categoriesSchema.safeParse(categories);

  const safeResult = marketsSchema.safeParse(result);

  let markets: TMarkets = [];
  let cats: TCategories = [];
  if (safeResult.success) {
    markets = safeResult.data;
  }
  if (safeCats.success) {
    cats = safeCats.data;
  }
  return <HomePage category={category} categories={cats} markets={markets} />;
}
