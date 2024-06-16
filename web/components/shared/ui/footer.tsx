import logo from '@/public/nation-logo.webp';
import Image from 'next/image';
export function Footer() {
  return (
    <footer className="  py-10  px-4 border-t-2 border-gray-500">
      <div className="w-full flex-grow max-w-[1200px] mx-auto ">
        <div className="flex items-center gap-x-4">
          <Image src={logo} width={100} height={100} alt="Logo" />
          <h2 className="font-archivo text-2xl">NATIONFI</h2>
        </div>
      </div>
    </footer>
  );
}
