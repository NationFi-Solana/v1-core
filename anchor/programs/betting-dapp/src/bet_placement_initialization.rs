use crate::SignerSPLBalance;

use {anchor_lang::prelude::*, anchor_spl::associated_token, anchor_spl::token};

use super::balances::*;
use super::errors;
use super::state::*;

pub fn init_place_spl_bet_a(ctx: Context<InitPlaceSPLBetA>) -> Result<()> {
    let signer_spl_balance_account = &mut ctx.accounts.user_spl_balance;
    let user_authority = &mut ctx.accounts.user_authority;
    let spl_token_mint = &mut ctx.accounts.spl_token_mint;
    let signer_token_account = &mut ctx.accounts.user_token_account;

    signer_spl_balance_account.spl_token_mint = spl_token_mint.key();
    signer_spl_balance_account.signer_public_key = user_authority.key();
    signer_spl_balance_account.signer_token_account = signer_token_account.key();
    signer_spl_balance_account.balance = 0;
    signer_spl_balance_account.is_bet_a = 1;

    Ok(())
}

pub fn init_place_spl_bet_b(ctx: Context<InitPlaceSPLBetB>) -> Result<()> {
    let signer_spl_balance_account = &mut ctx.accounts.user_spl_balance;
    let user_authority = &mut ctx.accounts.user_authority;
    let spl_token_mint = &mut ctx.accounts.spl_token_mint;
    let signer_token_account = &mut ctx.accounts.user_token_account;

    signer_spl_balance_account.spl_token_mint = spl_token_mint.key();
    signer_spl_balance_account.signer_public_key = user_authority.key();
    signer_spl_balance_account.signer_token_account = signer_token_account.key();
    signer_spl_balance_account.balance = 0;
    signer_spl_balance_account.is_bet_a = 0;

    Ok(())
}

#[derive(Accounts)]
pub struct InitPlaceSPLBetA<'info> {
    #[account(init,
              payer = user_authority,
              space=120,
              seeds = [user_token_account.key().as_ref(), b"spl_bet_a"],
              bump
    )]
    pub user_spl_balance: Account<'info, SignerSPLBalance>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    #[account(mut)]
    pub spl_token_mint: Account<'info, token::Mint>,

    #[account(mut)]
    pub user_token_account: Account<'info, token::TokenAccount>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitPlaceSPLBetB<'info> {
    #[account(init,
              payer = user_authority,
              space=120,
              seeds = [user_token_account.key().as_ref(), b"spl_bet_b"],
              bump
    )]
    pub user_spl_balance: Account<'info, SignerSPLBalance>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    #[account(mut)]
    pub spl_token_mint: Account<'info, token::Mint>,

    #[account(mut)]
    pub user_token_account: Account<'info, token::TokenAccount>,

    pub system_program: Program<'info, System>,
}
