import Image from 'next/image';
import bullseye from '@/public/bullseye-gradient.png';
export function BgSvg() {
  return (
    <div className="absolute right-0 left-0 top-0 bottom-0 rounded-full h-full z-0">
      <Image
        src={bullseye}
        alt=""
        className="object-cover opacity-30 h-full w-full"
      />
    </div>
  );
}
