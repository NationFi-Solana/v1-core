import Image from 'next/image';
import bullseye from '@/public/bullseye-gradient.png';
export function BgSvg() {
  return (
    <div className="absolute right-0 top-0 left-0 w-full h-full z-0">
      <Image src={bullseye} alt="" className="object-cover  h-full w-full" />
    </div>
  );
}
