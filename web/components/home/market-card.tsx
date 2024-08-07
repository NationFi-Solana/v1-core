'use client';
import { Button } from '../shared/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { formatUnixTimestamp } from '@/lib/utils/utils';

import { MdAccessTime } from 'react-icons/md';
import { useCountdown } from '../shared/hooks/countdown';
import { TMarket } from '@/lib/schemas';
export default function Card({
  slug,
  unixTimestamp,
  title,
  thumb,
  optiona,
  optionb,
}: TMarket) {
  const timestamp = formatUnixTimestamp(unixTimestamp);
  const [days, hours, minutes, seconds] = useCountdown(unixTimestamp * 1000);

  return (
    <Link href={`/bet/${slug.current}`} className="">
      <div className="bg-background-700 p-2 md:p-6 min-w-[250px]  rounded-md ">
        <div className="flex items-center gap-x-2">
          <Image
            alt={title}
            width={40}
            height={40}
            src={thumb}
            className="h-12 w-12 rounded-full  border-2"
          />
          <h1 className="font-semibold">{title}</h1>
        </div>
        <br />
        <div className="grid grid-cols-2 gap-x-2 font-inter ">
          <Link
            scroll={false}
            href={`/bet/${slug.current}?vote=${optiona?.toLowerCase()}`}
          >
            <Button role="link" className="w-full" variant="primary">
              {optiona?.toUpperCase()}
            </Button>
          </Link>

          <Link href={`/bet/${slug.current}?vote=${optionb?.toLowerCase()}`}>
            <Button className="w-full" variant="primary">
              {optionb?.toUpperCase()}
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center pt-3">
          <h2 className="text-gray-400">
            {days}:{hours}:{minutes}:{seconds}
          </h2>

          <h2 className="text-gray-500  text-sm flex items-center gap-x-1">
            {' '}
            <MdAccessTime /> {timestamp}
          </h2>
        </div>
        {/* <div className="flex justify-between font-inter pt-3 text-muted-foreground">
          <div>
            <h3 className="text-sm ">6.5m Bet</h3>
          </div>
          <div className="flex gap-x-2">
            <TiPinOutline />
            <TiStar />
          </div>
        </div> */}
      </div>
    </Link>
  );
}
