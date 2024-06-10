import { TMarkets } from '@/app/page';
import MarketCard from './market-card';

export default function HomePage({ markets }: { markets: TMarkets }) {
  return (
    <div>
      <h1 className="text-center font-bold">LOREM IPSUM</h1>
      <br></br>
      <br></br>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 gap-4">
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
