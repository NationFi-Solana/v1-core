use anchor_lang::prelude::*;

use super::errors;

pub fn initialize_program_state(ctx: Context<InitializeState>) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;

    program_state_account.bets_closed = 0;
    program_state_account.is_bet_a_winner = 0;
    program_state_account.bet_over_and_distributed = 0;
    program_state_account.total_bets = 0;
    program_state_account.spl_balances = Vec::new();
    program_state_account.sol_balances = Vec::new();

    Ok(())
}

pub fn read_program_state(ctx: Context<ReadState>) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;

    msg!("Bets Closed ST: {}", program_state_account.bets_closed);
    msg!(
        "Bet Over And Distributed: {}",
        program_state_account.bet_over_and_distributed
    );
    msg!("Total Bets: {}", program_state_account.total_bets);
    msg!(
        "Total SPL Balances: {}",
        program_state_account.spl_balances.len()
    );
    msg!(
        "Total SOL Balances: {}",
        program_state_account.sol_balances.len()
    );
    msg!("Is Bet A Winner: {}", program_state_account.is_bet_a_winner);

    Ok(())
}

pub fn set_program_state(
    ctx: Context<SetState>,
    bets_closed: u8,
    is_bet_a_winner: u8,
) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;

    // TODO (Check for Signer)

    // Cannot modify state when bets are over and distributed already
    if program_state_account.bet_over_and_distributed != 0 {
        return Err(errors::ErrorCode::BetOverAndDistributed.into());
    }

    program_state_account.is_bet_a_winner = is_bet_a_winner;
    program_state_account.bets_closed = bets_closed;

    Ok(())
}

#[derive(Accounts)]
pub struct InitializeState<'info> {
    #[account(
        init,
        payer = signer,
        space = 4096,
        seeds = [
            b"state",
        ],
        bump
    )]
    pub program_state_account: Account<'info, ProgramState>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct ProgramState {
    pub bets_closed: u8,
    pub is_bet_a_winner: u8,
    pub bet_over_and_distributed: u8,
    pub total_bets: u64,
    pub spl_balances: Vec<Pubkey>,
    pub sol_balances: Vec<Pubkey>,
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
}
