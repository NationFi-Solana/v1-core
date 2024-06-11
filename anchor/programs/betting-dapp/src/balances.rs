use anchor_lang::prelude::*;

#[account]
pub struct SignerSPLBalance {
    pub signer_public_key: Pubkey,
    pub signer_token_account: Pubkey,
    pub spl_token_mint: Pubkey,
    pub is_bet_a: u8,
    pub balance: u64,
}

#[account]
pub struct SignerSOLBalance {
    pub signer_public_key: Pubkey,
    pub is_bet_a: u8,
    pub balance: u64,
}

#[account]
pub struct BetTotalSPL {
    pub is_bet_a: u8,
    pub total: u64,
    pub spl_token_mint: Pubkey,
}

#[account]
pub struct BetTotalSOL {
    pub is_bet_a: u8,
    pub total: u64,
}
