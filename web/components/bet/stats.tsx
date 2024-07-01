import { useProgram } from '../providers/program-provider';

import { SiSolana } from 'react-icons/si';
export default function Stats() {
  const { programData } = useProgram();
  const a = parseFloat(programData?.totalSolA);
  const b = parseFloat(programData?.totalSolB);
  return (
    <div className="space-y-3 text-sm pt-2">
      <div className="flex justify-between">
        <h3 className="text-gray-300">Fee</h3>
        <h3 className="text-red-400">5%</h3>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray-300">Market Cap</h3>
        <h3>
          {(a + b) / 10 ** 9} <SiSolana className="text-primary" />{' '}
        </h3>
      </div>
    </div>
  );
}
