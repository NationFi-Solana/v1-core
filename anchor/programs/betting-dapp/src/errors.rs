use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Bet is already over and winnings have already been distributed")]
    BetOverAndDistributed,

    #[msg("An invalid token account was passed for SPL Placement")]
    PDAMismatchProgramTokenAccount,
}
