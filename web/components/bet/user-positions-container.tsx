'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { UserPosition } from './user-position';

export function UserPositionsContainer({
  optiona,
  optionb,
}: {
  optiona: string | undefined;
  optionb: string | undefined;
}) {
  const wallet = useWallet();
  return (
    <div className="bg-background-800 p-4 border border-gray-800 rounded-md">
      <h1 className="font-bold text-xl">Your Positions</h1>
      <div>
        {!wallet.publicKey && (
          <h2 className="text-center text-gray-200 font-bold">
            Connect Wallet.
          </h2>
        )}
        <br />

        {wallet.publicKey && (
          <div className="grid grid-cols-2 gap-x-4">
            <UserPosition isBetA={true} option={optiona} />
            <UserPosition isBetA={false} option={optionb} />
          </div>
        )}
      </div>
    </div>
  );
}
