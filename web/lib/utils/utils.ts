import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUnixTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
export function formatDecimal(num: number, fixed?: number) {
  return parseFloat(
    (Math.floor(num * 1000) / 1000).toFixed(fixed ?? 4).toString()
  );
}
export function convertToU8Array(num: number) {
  const a = new Uint16Array([num]);
  return [a[0], a[1]];
}
export function getUserReward(
  totalSolA: number,
  totalSolB: number,
  userSol: number,
  isBetA: boolean
) {
  let userPercent;
  if (!isBetA) {
    userPercent = userSol / totalSolB;
  } else {
    userPercent = userSol / totalSolA;
  }
  const total = totalSolA + totalSolB;
  const userReward = total * userPercent;
  return userReward;
}

export function checkNaN(n: number) {
  if (Number.isFinite(n)) {
    return n;
  } else {
    return 0;
  }
}
