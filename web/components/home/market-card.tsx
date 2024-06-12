import { TiPinOutline, TiStar } from 'react-icons/ti';
import { Button } from '../shared/ui/button';
import Link from 'next/link';
import Image from 'next/image';
interface Props {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  optiona: string;
  optionb: string;
}
export default function Card({
  slug,
  title,
  imageUrl,
  optiona,
  optionb,
}: Props) {
  return (
    <Link href={`/bet/${slug}`}>
      <div className="bg-background-900 p-6 min-w-[300px] rounded-md ">
        <div className="flex items-center gap-x-2">
          <Image
            alt={title}
            width={40}
            height={40}
            src={imageUrl}
            className="h-12 w-12 rounded-full  border-2"
          />
          <h1 className="font-semibold">{title}</h1>
        </div>
        <br />

        <div className="grid grid-cols-2 gap-x-2 font-inter ">
          <Link href={`/bet/${slug}?vote=yes`}>
            <Button role="link" className="w-full" variant="cyan">
              Vote {optionb}
            </Button>
          </Link>

          <Link href={`/bet/${slug}?vote=no`}>
            <Button className="w-full" variant="cyan">
              Vote {optionb}
            </Button>
          </Link>
        </div>
        <div className="flex justify-between font-inter pt-3 text-muted-foreground">
          <div>
            <h3 className="text-sm ">6.5m Bet</h3>
          </div>
          <div className="flex gap-x-2">
            <TiPinOutline />
            <TiStar />
          </div>
        </div>
      </div>
    </Link>
  );
}
