import HomePage from '@/components/home/home-page';
import { getCategories, getMarkets, getMarketsByCategory } from './page.groq';
import { client } from '@/lib/sanity';
import { z } from 'zod';
import { slugSchema } from '@/lib/schemas';
export const metadata = {
  title: 'NATIONFI VOTE',
};

const marketSchema = z.object({
  unixTimestamp: z.number(),
  title: z.string(),
  thumb: z.string(),
  slug: z.object({ _type: z.string(), current: z.string() }),
  optiona: z.object({ _type: z.string(), current: z.string() }).nullable(),
  optionb: z.object({ _type: z.string(), current: z.string() }).nullable(),
  _id: z.string(),
});
const marketsSchema = z.array(marketSchema);

const categorySchema = z.object({
  slug: slugSchema,
  title: z.string(),
});
const categoriesSchema = z.array(categorySchema);
export type TMarket = z.infer<typeof marketSchema>;
export type TMarkets = z.infer<typeof marketsSchema>;
export type TCategories = z.infer<typeof categoriesSchema>;
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
