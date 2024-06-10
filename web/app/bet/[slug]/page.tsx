import BetCard from '@/components/bet/bet-card';
import { LineChart } from '@/components/bet/line-chart';
import { client } from '@/lib/sanity';
import Image from 'next/image';
import { MdAccessTime } from 'react-icons/md';
import { getMarket } from './bet.groq';
import { z } from 'zod';
import { formatUnixTimestamp } from '@/lib/utils';
const marketSchema = z.object({
  unixTimestamp: z.number(),
  title: z.string(),
  thumb: z.string(),
  description: z.string(),
});
export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params);
  const marketReq = await client.fetch(getMarket, { slug: params.slug });
  console.log({ marketReq });
  const safeMarket = marketSchema.safeParse(marketReq[0]);

  if (!safeMarket.success) {
    return (
      <div className="h-full">
        <h1>Market does not exist.</h1>
      </div>
    );
  } else {
    const timestamp = formatUnixTimestamp(safeMarket.data.unixTimestamp);
    return (
      <div className=" px-4 md:px-8">
        <div className=" lg:flex space-y-4 xl:w-[1200px]  2xl:w-[1400px] gap-x-8 justify-between ">
          <div className="flex-grow w-full min-w-[440px]">
            <div className="flex gap-x-6">
              <div className="flex">
                <Image
                  src={safeMarket.data.thumb}
                  alt={safeMarket.data.title}
                  height={100}
                  width={100}
                  className="rounded-md"
                />
                {/* <div className="min-w-[6rem] h-[6rem]  rounded-md bg-primary"></div> */}
              </div>
              <div className="space-y-2">
                <h4 className="text-gray-400 text-sm flex items-center gap-x-1">
                  <MdAccessTime size={18} /> {timestamp}
                </h4>
                <h1 className="text-2xl">{safeMarket.data.title}</h1>
                <h3 className="whitespace-pre-wrap text-gray-400">
                  {safeMarket.data.description}
                </h3>
              </div>
            </div>

            <br />
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="py-2 space-y-1 pl-1">
                  <h2 className="text-gray-400">Yes</h2>
                  <h3 className="text-2xl">$30</h3>
                </div>
                <div className="w-full">
                  <LineChart
                    data={[
                      { time: '2018-12-12', value: 14 },
                      { time: '2018-12-13', value: 16 },
                      { time: '2018-12-14', value: 16 },
                      { time: '2018-12-15', value: 8 },
                      { time: '2018-12-16', value: 11 },
                    ]}
                    dataTwo={[]}
                    colors={undefined}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <BetCard />
          </div>
        </div>
      </div>
    );
  }
}
