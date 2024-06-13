interface Props {
  deposit: string | undefined;
  balance: number | undefined;
  vote: string | null;
}
export const useSubmitValid = ({ deposit, balance, vote }: Props) => {
  if (!vote) {
    return { isValid: false, errorMessage: '' };
  }
  if (parseFloat(deposit ?? '0') <= 0 || !deposit) {
    return { isValid: false, errorMessage: '' };
  }
  const amount = parseFloat(deposit);
  if (!balance) {
    return { isValid: false, errorMessage: 'Failed to fetch balance.' };
  }
  const bal = balance / 10 ** 9;
  if (amount > bal) {
    return { isValid: false, errorMessage: 'Insufficent balance.' };
  }
  return { isValid: true };
};
