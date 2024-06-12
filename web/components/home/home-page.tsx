import { TMarkets } from '@/app/page';
import MarketCard from './market-card';
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';
function HowTo({ num, desc }: { num: number; desc: string }) {
  return (
    <div className="flex relative items-center ml-2">
      <div className="h-14 w-14 absolute -left-2 border-2 border-white  bg-primary  rounded-full flex items-center justify-center text-xl">
        {num}
      </div>
      <h2 className="pl-14 h-14 pr-3 flex items-center rounded-md bg-background-600 whitespace-pre-wrap text-sm w-[340px]">
        {desc}
      </h2>
    </div>
  );
}
export default function HomePage({ markets }: { markets: TMarkets }) {
  return (
    <div className="px-4 font-archivo">
      <h1 className="text-3xl text-center">HOW IT WORKS.</h1>
      <br />
      <div className=" grid md:grid-cols-2 lg:grid-cols-1 gap-y-5 ">
        <div className="flex flex-col lg:flex-row gap-x-3  gap-y-4 justify-between">
          <HowTo desc="CONNECT YOUR WALLET" num={1}></HowTo>
          <HowTo
            desc="PLACE YOUR VOTE ON WHOEVER YOU THINK WILL WIN"
            num={2}
          ></HowTo>
          <HowTo desc="REWARDS DISTRIBUTED" num={3}></HowTo>
        </div>
        <div className="flex  flex-col lg:flex-row gap-y-4 justify-between">
          <HowTo
            desc="PLACE YOUR BET ON WHOEVER YOU THINK WILL WIN"
            num={4}
          ></HowTo>
          <HowTo
            desc="PLACE YOUR BET ON WHOEVER YOU THINK WILL WIN"
            num={5}
          ></HowTo>
          <HowTo
            desc="PLACE YOUR BET ON WHOEVER YOU THINK WILL WIN"
            num={1}
          ></HowTo>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex gap-x-4 items-center">
        <Link
          href="/"
          className="bg-background-600 items-center gap-x-2 p-2 flex rounded-lg transition-all cursor-pointer border-2 border-primary/0 hover:border-primary"
        >
          <span>Featured</span>
          <FaRegStar className="text-primary" />
        </Link>

        <CategoryCard title={'Olympics'} slug={''} />
        <CategoryCard title={'EURO2024'} slug={''} />
      </div>
      <br></br>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {markets.map((m) => {
          return (
            <MarketCard
              imageUrl={m.thumb}
              title={m.title}
              id={m._id}
              slug={m.slug.current}
              key={m.title}
            />
          );
        })}
      </div>
    </div>
  );
}
function CategoryCard({ title }: { title: string; slug: string }) {
  return (
    <div>
      <Link
        href="/"
        className="bg-background-600 p-2 rounded-lg transition-all cursor-pointer border-2 border-primary/0 hover:border-primary"
      >
        {title}
      </Link>
    </div>
  );
}
