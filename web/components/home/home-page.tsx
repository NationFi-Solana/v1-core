import MarketCard from './market-card';
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';

import { CategoryCard } from './category-card';
import { Button } from '../shared/ui/button';
import { BgSvg } from '../shared/svgs/bg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FaVoteYea } from 'react-icons/fa';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import Header from '../header';
import { TCategories, TMarkets } from '@/lib/schemas';

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
    <div className=" font-archivo relative">
      <BgSvg />
      <div className="rounded-md  relative px-4">
        <Header />
        <div className="max-w-[1200px] mx-auto py-8 relative">
          <div className="relative ">
            <div className="z-10 relative py-3">
              <div className="flex z-10">
                <h1 className="text-4xl font-extrabold lg:text-5xl lg:w-[600px] text-transparent bg-gradient-to-r via-primary-100 from-white to-primary  bg-clip-text">
                  VOTE FOR YOUR NATION.
                </h1>
              </div>
              <br />
              <div className="lg:w-[540px] z-10 font-inter font-semibold text-[18px]">
                <h2>
                  Predict who{"'"}s going to win for the Teams you support!
                  Higher Odds equal higher rewards, get your ballots in!
                </h2>
                <h3 className="text-gray-300 text-[12px] pt-2">
                  GOOD LUCK VOTING.
                </h3>
              </div>
              <div className="pt-4"></div>
              <div>
                <Link href="#markets">
                  <Button variant="primary">VOTE NOW</Button>
                </Link>
              </div>
              <br />
            </div>
          </div>

          <br />
          <br />
          <br />

          <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-1 gap-y-10 ">
            <h1 className="text-3xl text-center font-bold">HOW IT WORKS.</h1>
            <div className="flex flex-col lg:grid grid-cols-3 gap-x-20  gap-y-4 justify-between">
              <HowTo desc="CONNECT YOUR WALLET" num={1}>
                <MdOutlineAccountBalanceWallet />
              </HowTo>
              <HowTo desc="PLACE YOUR WAGER" num={2}>
                <FaVoteYea />
              </HowTo>
              <HowTo desc="REWARDS DISTRIBUTED" num={3}>
                <FaMoneyBillWaveAlt />
              </HowTo>
            </div>
          </div>
        </div>
      </div>
      <div id="markets" className=" relative max-w-[1200px] px-4 py-20 mx-auto">
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
        <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-4">
          {markets.map((m) => {
            return <MarketCard key={m._id} {...m} />;
          })}
        </div>
      </div>
    </div>
  );
}

function HowTo({
  num,
  desc,
  children,
}: {
  num: number;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative items-center ml-2 w-full">
      <div className="h-14 w-14 absolute -left-2 border-2 border-white  bg-primary  rounded-full flex items-center justify-center text-xl">
        {children}
      </div>
      <h2 className="pl-14 h-14 font-bold w-full pr-3 ml-2 flex items-center rounded-md bg-background-700 whitespace-pre-wrap text-sm ">
        {desc}
      </h2>
    </div>
  );
}
