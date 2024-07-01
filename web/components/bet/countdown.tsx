'use client';
import { useProgram } from '../providers/program-provider';
import { useCountdown } from '../shared/hooks/countdown';

export function Countdown({ unixtimestamp }: { unixtimestamp: number }) {
  console.log(unixtimestamp);
  const [days, hours, minutes, seconds] = useCountdown(unixtimestamp * 1000);
  const { programData } = useProgram();
  if (programData?.betOver) {
    return undefined;
  }
  return (
    <div className="flex justify-between">
      <h2 className="text-gray-400 text-xl">Bets Close In </h2>
      <h2 className=" text-2xl ">
        {days}d<Cln />
        {hours}h<Cln />
        {minutes}m<Cln />
        {seconds}s
      </h2>{' '}
    </div>
  );
}

export function Cln() {
  return <span className="text-gray-400  px-[2px]">:</span>;
}
