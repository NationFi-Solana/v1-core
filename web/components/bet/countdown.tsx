'use client';
import { useProgram } from '../providers/program-provider';
import { useCountdown } from '../shared/hooks/countdown';

export function Countdown({ unixtimestamp }: { unixtimestamp: number }) {
  const [days, hours, minutes, seconds] = useCountdown(unixtimestamp);
  const { programData } = useProgram();
  if (programData?.betOver) {
    return undefined;
  }
  return (
    <div className="flex justify-between">
      <h2 className="text-gray-400 text-xl">Bets Close In </h2>
      <h2 className="text-gray-100 text-2xl ">
        {days}d:{hours}h:{minutes}m:{seconds}s
      </h2>{' '}
    </div>
  );
}
