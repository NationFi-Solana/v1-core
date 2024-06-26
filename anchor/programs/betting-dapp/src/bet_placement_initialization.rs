use crate::{GlobalState, ProgramState, SignerSPLBalance};

use {anchor_lang::prelude::*, anchor_spl::token};

use super::balances::*;

pub fn init_place_sol_bet_a(ctx: Context<InitPlaceSOLBetA>) -> Result<()> {
    let user_authority = &mut ctx.accounts.user_authority;
    let user_sol_balance = &mut ctx.accounts.user_sol_balance;

    user_sol_balance.is_bet_a = 1;
    user_sol_balance.balance = 0;
    user_sol_balance.signer_public_key = user_authority.key();

    Ok(())
}

pub fn init_place_sol_bet_b(ctx: Context<InitPlaceSOLBetB>) -> Result<()> {
    let user_authority = &mut ctx.accounts.user_authority;
    let user_sol_balance = &mut ctx.accounts.user_sol_balance;

    user_sol_balance.is_bet_a = 0;
    user_sol_balance.balance = 0;
    user_sol_balance.signer_public_key = user_authority.key();

    Ok(())
}

#[derive(Accounts)]
pub struct InitPlaceSOLBetA<'info> {
    #[account(init,
        payer= user_authority,
        space=41 + 8,
        seeds=[b"sol_bet_a",
        user_authority.key().as_ref(),
        &program_state_account.id.to_ne_bytes()],
     bump)]
    pub user_sol_balance: Account<'info, SignerSOLBalance>,

    #[account(mut,seeds = [b"global_state"], bump) ]
    pub global_state_account: Account<'info, GlobalState>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    #[account(mut)]
    pub program_state_account: Account<'info, ProgramState>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitPlaceSOLBetB<'info> {
    #[account(init, payer= user_authority, space=41+8, seeds=[b"sol_bet_b", user_authority.key().as_ref(), &program_state_account.id.to_ne_bytes()], bump)]
    pub user_sol_balance: Account<'info, SignerSOLBalance>,

    #[account(mut,seeds = [b"global_state"], bump) ]
    pub global_state_account: Account<'info, GlobalState>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    #[account(mut)]
    pub program_state_account: Account<'info, ProgramState>,

    pub system_program: Program<'info, System>,
}
