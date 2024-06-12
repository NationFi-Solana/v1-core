import HomePage from '@/components/home/home-page';
import { getMarkets } from './page.groq';
import { client } from '@/lib/sanity';
import { z } from 'zod';
export const metadata = {
  title: 'test',
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
export type TMarkets = z.infer<typeof marketsSchema>;
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const result = await client.fetch(getMarkets);
  const safeResult = marketsSchema.safeParse(result);
  const category = searchParams?.['category'];
  console.log(category, 'CATEGORY');
  console.log({ result: result[1], safeResult });
  let markets: TMarkets = [];
  console.log(safeResult.error);
  if (safeResult.success) {
    markets = safeResult.data;
  }
  console.log(markets, 'MARKETS');
  return <HomePage markets={markets} />;
}
