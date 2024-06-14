interface Props {
  deposit: string | undefined;
  balance: number | undefined;
  vote: string | null;
}
export const useSubmitValid = ({ deposit, balance, vote }: Props) => {

  if (!balance) {
    return { errorMessage: '', isValid: false }
  }
  const bal = balance / 10 ** 9;
  if (!vote && parseFloat(deposit ?? '0') <= balance) {
    return { errorMessage: 'Select a vote.', isValid: false }
  }

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
  if (amount > bal) {
    return { isValid: false, errorMessage: 'Insufficent balance.' };
  }

  return { isValid: true };
};
