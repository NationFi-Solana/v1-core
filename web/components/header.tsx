/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { WalletButton } from './solana/solana-provider';
import React from 'react';

import logo from '@/public/nation-logo.webp';
import Image from 'next/image';
// import { ClusterUiSelect } from './cluster/cluster-ui';

export default function Header() {
  return (
    <div className="flex relative justify-between py-4 bg-transparent text-neutral-content  space-y-2 md:space-y-0  lg:px-10">
      <div className="flex items-center">
        <Link
          className="flex items-center gap-x-2 normal-case text-xl"
          href="/"
        >
          {/* // eslint-disable-next-line @next/next/no-img-element */}
          <h2 className="font-archivo  text-sm lg:text-lg md:block font-bold hidden">
            NationFi Betting
          </h2>
          <h2 className=" font-archivo text-sm md:hidden">NationFi</h2>
          <Image src={logo} className="h-14 w-14" alt="Logo" />
        </Link>
      </div>
      <div className="flex space-x-4   ">
        <div className="flex items-center gap-x-2 text-[0.8rem]"></div>
        <WalletButton className="bg-primary" style={{ color: '#e6f9af' }} />
        {/* <ClusterUiSelect /> */}
      </div>
    </div>
  );
}
