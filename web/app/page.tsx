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
  _id: z.string(),
});
const marketsSchema = z.array(marketSchema);
export type TMarkets = z.infer<typeof marketsSchema>;
export default async function Page() {
  const result = await client.fetch(getMarkets);
  const safeResult = marketsSchema.safeParse(result);

  console.log({ result: result[0].slug, safeResult });
  let markets: TMarkets = [];
  if (safeResult.success) {
    markets = safeResult.data;
  }
  return <HomePage markets={markets} />;
}
