import { TMarkets } from '@/app/page';
import MarketCard from './market-card';

export default function HomePage({ markets }: { markets: TMarkets }) {
  return (
    <div className="px-4">
      <div className="flex gap-x-4">
        <div className="bg-background-600 p-2 rounded-lg transition-all cursor-pointer border border-primary/0 hover:border-primary">
          Olympics
        </div>
        <div className="bg-background-600 p-2 rounded-lg transition-all cursor-pointer border border-primary/0 hover:border-primary">
          EURO
        </div>
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
