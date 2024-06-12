import { TiPinOutline, TiStar } from 'react-icons/ti';
import { Button } from '../shared/ui/button';
import Link from 'next/link';
import Image from 'next/image';
interface Props {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
}
export default function Card({ slug, title, imageUrl }: Props) {
  return (
    <Link href={`/bet/${slug}`}>
      <div className="bg-background-900 p-6 min-w-[300px] rounded-md ">
        <div className="flex items-center gap-x-2">
          <Image
            alt={title}
            width={40}
            height={40}
            src={imageUrl}
            className="h-10 w-10 rounded-full"
          />
          <h1 className="font-semibold">{title}</h1>
        </div>
        <br />

        <div className="flex gap-x-2 ">
          <Link href={`/bet/${slug}?vote=yes`}>
            <Button role="link" className="basis-1/2" variant="cyan">
              Vote Yes
            </Button>
          </Link>

          <Link href={`/bet/${slug}?vote=no`}>
            <Button className="basis-1/2" variant="cyan">
              Vote No
            </Button>
          </Link>
        </div>
        <div className="flex justify-between pt-3 text-muted-foreground">
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
