
interface Props {
    deposit: string
    balance: number | undefined
}
export const useSubmitValid = ({ deposit, balance }: Props) => {
    const amount = parseFloat(deposit)
    if (!balance) {
        return { isValid: false, errorMessage: 'Failed to fetch balance.' }
    }
    const bal = balance / 10 ** 9
    if (amount > bal) {
        return { isValid: false, errorMessage: "Insufficent balance." }
    }
    return { isValid: true }
}