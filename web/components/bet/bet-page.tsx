import BetCard from '@/components/bet/bet-card/bet-card';
import { client } from '@/lib/sanity';
import Image from 'next/image';
import { getMarket } from './bet.groq';
import { z } from 'zod';
import { slugSchema } from '@/lib/schemas';
import Header from '@/components/header';
import { ProgramProvider } from '@/components/providers/program-provider';
import { UserPositionsContainer } from '@/components/bet/user-positions-container';
import { BetPercents } from './bet-percents';
import { Timestamp } from './timestamp';
const marketSchema = z.object({
  unixTimestamp: z.number(),
  title: z.string(),
  thumb: z.string(),
  description: z.string(),
  optiona: slugSchema,
  id: z.number(),
  optionb: slugSchema,
});

export default async function BetPage({
  params,
}: {
  params: { slug: string };
}) {
  const marketReq = await client.fetch(
    getMarket,
    { slug: params.slug },
    { next: { revalidate: 4 } }
  );

  const safeMarket = marketSchema.safeParse(marketReq[0]);

  if (!safeMarket.success) {
    return (
      <div className="">
        <Header />
        <div className="h-[60vh] flex justify-center items-center">
          <h1 className="text-xl font-archivo">Market does not exist.</h1>
        </div>
      </div>
    );
  } else {
    const optionb = safeMarket.data.optionb?.current.toUpperCase();
    const optiona = safeMarket.data.optiona?.current.toUpperCase();
    return (
      <ProgramProvider _betId={safeMarket.data.id}>
        <div className="">
          <div className="px-4">
            <Header />
          </div>
          <div className="px-4 md:px-8 py-10 max-w-[1300px] mx-auto">
            <div className="lg:flex space-y-4 xl:w-[1200px] 2xl:w-[1400px] gap-x-8 justify-between ">
              <div className="flex-grow w-full lg:min-w-[440px] ">
                <div className="md:flex space-y-2 gap-x-6">
                  <div className="flex">
                    <Image
                      src={safeMarket.data.thumb}
                      alt={safeMarket.data.title}
                      height={100}
                      width={100}
                      className="rounded-md border-2"
                    />

                    {/* <div className="min-w-[6rem] h-[6rem]  rounded-md bg-primary"></div> */}
                  </div>
                  <div className="space-y-2">
                    <Timestamp unixTimestamp={safeMarket.data.unixTimestamp} />
                    <h1 className="text-2xl font-archivo">
                      {safeMarket.data.title}
                    </h1>
                    <h3 className="whitespace-pre-wrap text-gray-400">
                      {safeMarket.data.description}
                    </h3>
                  </div>
                </div>

                <br />
                <div className="grid md:grid-cols-2">
                  <div className="col-span-2">
                    <div className="w-full relative z-0 ">
                      <div className="flex font-archivo text-2xl justify-between ">
                        <h1>{optiona}</h1>
                        <h2>{optionb}</h2>
                      </div>
                      <div className="pt-2"></div>

                      {/* <BetPercents optiona={optiona} optionb={optionb} /> */}
                      {/* <br /> */}
                      {/* <UserPositionsContainer */}
                      {/*   optiona={optiona} */}
                      {/*   optionb={optionb} */}
                      {/* /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                {/* <BetCard */}
                {/*   sluga={safeMarket.data.optiona?.current} */}
                {/*   slugb={safeMarket.data.optionb?.current} */}
                {/* /> */}
              </div>
            </div>
          </div>
        </div>
      </ProgramProvider>
    );
  }
}
