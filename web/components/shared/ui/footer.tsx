import logo from '@/public/nation-logo.webp';
import Image from 'next/image';
import { SiDiscord, SiTwitter } from 'react-icons/si';
export function Footer() {
  return (
    <footer className="  py-10  px-4 border-t-2 border-background-700">
      <div className="w-full flex-grow  max-w-[1200px] mx-auto ">
        <div className="flex gap-x-10">
          <div className="flex items-center gap-x-2 ">
            <Image src={logo} width={80} height={80} alt="Logo" />
            <h2 className="font-archivo text-2xl">NationFI</h2>
          </div>

          <div>
            <div className="flex flex-col gap-y-2">
              <div className="bg-background-700 p-2 rounded-md">
                <SiDiscord size={20} />
              </div>
              <div className="bg-background-700 p-2 rounded-md">
                <SiTwitter size={20}></SiTwitter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
