use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Bet is already over")]
    BetOver,

    #[msg("Totals Error!")]
    TotalsInvalidLogic,

    #[msg("An invalid token account was passed for SPL Placement")]
    PDAMismatchProgramTokenAccount,

    #[msg("Invalid State Program Account")]
    PDAMismatchStateProgramAccount,

    #[msg("User has no balance to cash out")]
    UserHasNoBalance,

    #[msg("No Bet Found For User To Cashout")]
    NoBetFoundToCashout,

    #[msg("An invalid account for the program was passed for SOL Placement")]
    PDAMismatchProgramFunds,

    #[msg("An invalid account for the program was passed for SOL Placement")]
    PDAProgramFundsNotOwnedByProgram,

    #[msg("User's SignerSolBalance is not owned by program")]
    SignerSolBalanceInvalidOwnership,

    #[msg("Invalid Program ID")]
    InvalidProgramId,

    #[msg("Program Already Initialized")]
    ProgramAlreadyInitialized,

    #[msg("Bets Are Closed")]
    BetsClosedNotOver,

    #[msg("Bets Are Closed")]
    BetsAreClosed,

    #[msg("Bet Is Not Over")]
    BetNotOver,

    #[msg("User tried to cash winnings but didnt win")]
    UserLostBet,
}
