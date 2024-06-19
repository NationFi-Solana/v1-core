use anchor_lang::{
    prelude::*,
    solana_program::{ pubkey},
};
use anchor_lang::prelude::Pubkey;
use crate::global_state::GlobalState;

use super::errors;

pub fn initialize_program_state(ctx: Context<InitializeState> ) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;
    let global_state_account = &mut ctx.accounts.global_state_account;
    program_state_account.id = global_state_account.length;
    program_state_account.bets_closed = 0;
    program_state_account.is_bet_a_winner = 0;
    program_state_account.bet_over = 0;
    program_state_account.total_bets = 0;
    program_state_account.total_sol_a = 0;
    program_state_account.total_sol_b = 0;
    program_state_account.total_bets_a = 0;
    program_state_account.total_bets_b = 0;
    program_state_account.is_initialized = 1;

    Ok(())
}

pub fn read_program_state(ctx: Context<ReadState>) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;

    msg!("Bets Closed ST: {}", program_state_account.bets_closed);
    msg!("Bet Over: {}", program_state_account.bet_over);
    msg!("Total Bets: {}", program_state_account.total_bets);
    msg!("Total SOL Bet A: {}", program_state_account.total_sol_a);
    msg!("Total SOL Bet B: {}", program_state_account.total_sol_b);
    msg!("Total Bets A: {}", program_state_account.total_bets_a);
    msg!("Total Bets B: {}", program_state_account.total_bets_b);
    msg!("Is Bet A Winner: {}", program_state_account.is_bet_a_winner);

    Ok(())
}

pub fn set_program_state(
    ctx: Context<SetState>,
    bets_closed: u8,
    is_bet_a_winner: u8,
    bet_over: u8,
    
) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;

    // TODO (Check for Signer)

    // Cannot modify state when bets are over already
    if program_state_account.bet_over != 0 {
        return Err(errors::ErrorCode::BetOver.into());
    }

    program_state_account.is_bet_a_winner = is_bet_a_winner;

    if bets_closed == 1 && program_state_account.bets_closed != 1 {
        program_state_account.bets_closed = 1;
    }

    if bet_over == 1 && program_state_account.bet_over != 1 {
        program_state_account.bet_over = 1;
        program_state_account.bets_closed = 1;
    }

    Ok(())
}

#[derive(Accounts)]
pub struct InitializeState<'info> {
    #[account(
        init, 
        payer = signer,
        space=4096,
        seeds=[b"be",&global_state_account.length.to_ne_bytes()],
        bump
    )]
    pub program_state_account: Account<'info, ProgramState>,

    #[account(mut,seeds = [b"global_state"], bump) ]
    pub global_state_account: Account<'info, GlobalState>,

    #[account(mut, address = pubkey!("EgHH1EqXN6LENFC7utYJX3LcAfoH5wn7CG2RRBtxzmaf"))]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct ProgramState {
    pub id: u16,
    pub bets_closed: u8,
    pub is_bet_a_winner: u8,
    pub bet_over: u8,
    pub total_bets: u64,

    pub total_sol_a: u64,
    pub total_sol_b: u64,
    pub total_bets_a: u64,
    pub total_bets_b: u64,

    pub is_initialized: u8,
}

#[derive(Accounts)]
pub struct ReadState<'info> {
    #[account(mut)]
    pub program_state_account: Account<'info, ProgramState>,
   
}

#[derive(Accounts)]
pub struct SetState<'info> {
    #[account(mut)]
    pub program_state_account: Account<'info, ProgramState>,

    #[account(mut, address = pubkey!("EgHH1EqXN6LENFC7utYJX3LcAfoH5wn7CG2RRBtxzmaf"))]
    pub signer: Signer<'info>,

    #[account(mut,seeds = [b"global_state"], bump) ]
    pub global_state_account: Account<'info, GlobalState>,
}
