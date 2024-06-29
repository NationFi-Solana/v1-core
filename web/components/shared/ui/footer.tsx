import { TCategories } from '@/lib/schemas';
import logo from '@/public/nation-logo.webp';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SiDiscord, SiTelegram, SiTwitter } from 'react-icons/si';
export function Footer({
  categories,
}: {
  categories: TCategories | undefined;
}) {
  return (
    <footer className="  py-14  px-4 border-t-2 border-background-700">
      <div className="w-full flex-grow space-y-4 md:flex justify-between items-center  max-w-[1200px] mx-auto ">
        <div className="flex gap-x-10  items-center">
          <div className="flex items-center gap-x-2 ">
            <Image src={logo} width={80} height={80} alt="Logo" />
            <div className="flex items-center ">
              <h2 className="font-archivo text-2xl">NationFI</h2>
            </div>
          </div>

          <div className="">
            <div className="grid gap-x-2 grid-cols-2 gap-y-2">
              <Social>
                <SiTwitter size={20}></SiTwitter>
              </Social>
              <Social>
                <SiDiscord size={20}></SiDiscord>
              </Social>
              <Social>
                <SiTelegram size={20}></SiTelegram>
              </Social>
            </div>
          </div>
        </div>

        <div className="px-4 font-archivo">
          <h2 className="text-white font-bold text-xl">Markets</h2>
          <div className="pt-3"></div>
          <div className="flex flex-col gap-y-2">
            {categories?.map((c) => {
              return (
                <Link
                  key={c.slug?.current}
                  href={`/?category=${c.slug?.current}`}
                >
                  <h3 className="text-gray-300  text-[14px]">{c.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background-700 hover:bg-background-600 cursor-pointer p-2 rounded-md">
      {children}
    </div>
  );
}
