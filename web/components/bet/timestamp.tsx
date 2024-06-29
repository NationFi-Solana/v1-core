'use client';
import { useState, useEffect, useMemo } from 'react';
import { formatUnixTimestamp } from '@/lib/utils/utils';
import { MdAccessTime } from 'react-icons/md';
import { useAnchorProvider } from '../solana/solana-provider';
import { getBettingProgram } from '@test/anchor';
export function Timestamp({
  unixTimestamp,
}: {
  unixTimestamp: number | undefined;
}) {
  const [timestamp, setTimestamp] = useState<string | undefined>();

  const provider = useAnchorProvider();

  const program = useMemo(() => {
    return getBettingProgram(provider);
  }, [provider]);

  useEffect(() => {
    if (unixTimestamp) {
      setTimestamp(formatUnixTimestamp(unixTimestamp));
    }
  }, [unixTimestamp]);

  return (
    <h4 className="text-gray-400 text-sm flex items-center gap-x-1">
      <MdAccessTime size={18} /> {timestamp}
    </h4>
  );
}
