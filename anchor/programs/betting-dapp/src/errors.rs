use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Bet is already over and winnings have already been distributed")]
    BetOverAndDistributed,

    #[msg("Totals Error!")]
    TotalsInvalidLogic,

    #[msg("An invalid token account was passed for SPL Placement")]
    PDAMismatchProgramTokenAccount,

    #[msg("An invalid account for the program was passed for SOL Placement")]
    PDAMismatchProgramFunds,

    #[msg("User's SignerSolBalance is not owned by program")]
    SignerSolBalanceInvalidOwnership,

    #[msg("Invalid Program ID")]
    InvalidProgramId,
}
