import { z } from 'zod';
export const slugSchema = z
  .object({ _type: z.string(), current: z.string() })
  .nullable();

export const marketSchema = z.object({
  unixTimestamp: z.number(),
  title: z.string(),
  thumb: z.string(),
  slug: z.object({ _type: z.string(), current: z.string() }),
  // optiona: z.object({ _type: z.string(), current: z.string() }).nullable(),
  // optionb: z.object({ _type: z.string(), current: z.string() }).nullable(),
  optiona: z.string(),
  optionb: z.string(),
  id: z.number(),
  _id: z.string(),
});
export const marketsSchema = z.array(marketSchema);

export const categorySchema = z.object({
  slug: slugSchema,
  title: z.string(),
});
export const categoriesSchema = z.array(categorySchema);
export type TMarket = z.infer<typeof marketSchema>;
export type TMarkets = z.infer<typeof marketsSchema>;
export type TCategories = z.infer<typeof categoriesSchema>;
