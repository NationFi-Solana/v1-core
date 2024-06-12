import { TMarkets } from '@/app/page';
import MarketCard from './market-card';
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';

export default function HomePage({ markets }: { markets: TMarkets }) {
  return (
    <div className="px-4">
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
