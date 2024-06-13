import { TCategories, TMarkets } from '@/app/page';
import MarketCard from './market-card';
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';

import { CategoryCard } from './category-card';
import { Button } from '../shared/ui/button';
import { BgSvg } from '../shared/svgs/bg';

export default function HomePage({
  markets,
  categories,
  category,
}: {
  markets: TMarkets;
  categories: TCategories;
  category: string | string[] | undefined;
}) {
  return (
    <div className="px-4 font-archivo">
      <div className="rounded-md ">
        <div className="mx-auto px-20 relative ">
          <BgSvg />
          <div className="z-10 relative py-3">
            <div className="flex z-10">
              <h1 className="text-5xl w-[350px] text-transparent bg-gradient-to-r via-primary-100 from-white to-primary  bg-clip-text">
                LOREM IPSUM HERO TEXT.
              </h1>
            </div>
            <br />
            <div className="w-[540px] z-10 font-inter font-semibold text-[18px]">
              <h2>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical.
              </h2>
              <h3 className="text-gray-300 text-[12px] pt-2">
                LOREM IPSUM TEXT HERE!
              </h3>
            </div>
            <div className="pt-4"></div>
            <div>
              <Button variant="primary">VOTE NOW</Button>
            </div>
            <br />
          </div>
        </div>

        <br />
        <br />
        <br />

        <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-1 gap-y-10 ">
          <h1 className="text-3xl text-center">HOW IT WORKS.</h1>
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
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="flex gap-x-4 items-center">
        <Link
          href="/"
          scroll={false}
          className={`bg-background-600 items-center gap-x-2 p-2 flex rounded-lg transition-all cursor-pointer border-2 ${
            category ? 'border-primary/0' : 'border-primary'
          } hover:border-primary`}
        >
          <span>Featured</span>
          <FaRegStar className="text-primary" />
        </Link>
        {categories?.map((c) => {
          return (
            <CategoryCard
              key={c.slug?.current}
              title={c.title}
              slug={c.slug?.current}
            />
          );
        })}
        {/* <CategoryCard title={'EURO2024'} slug={''} /> */}
      </div>
      <br></br>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {markets.map((m) => {
          return <MarketCard key={m._id} {...m} />;
        })}
      </div>
    </div>
  );
}

function HowTo({ num, desc }: { num: number; desc: string }) {
  return (
    <div className="flex relative items-center ml-2">
      <div className="h-14 w-14 absolute -left-2 border-2 border-white  bg-primary  rounded-full flex items-center justify-center text-xl">
        {num}
      </div>
      <h2 className="pl-14 h-14 pr-3 ml-2 flex items-center rounded-md bg-background-900 whitespace-pre-wrap text-sm w-[340px]">
        {desc}
      </h2>
    </div>
  );
}
