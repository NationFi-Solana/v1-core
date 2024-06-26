use anchor_lang::{
    prelude::*,
    solana_program::{ pubkey},
};
use solana_program::system_instruction;

use crate::global_state::GlobalState;

use super::errors;

pub fn initialize_program_state(ctx: Context<InitializeState> ) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;
    let global_state_account = &mut ctx.accounts.global_state_account;
    let bet_funds_account = &mut ctx.accounts.program_funds_account;
    let user_authority = &mut ctx.accounts.user_authority;

    program_state_account.id = global_state_account.length; //2 
    program_state_account.bets_closed = 0; //1 3  
    program_state_account.is_bet_a_winner = 0; //1 4
    program_state_account.bet_over = 0; //1  5
    program_state_account.total_bets = 0; //8 13
    program_state_account.total_sol_a = 0; //8 21 
    program_state_account.total_sol_b = 0; //8 29
    program_state_account.total_bets_a = 0; //8 37
    program_state_account.total_bets_b = 0;  //8 45
    program_state_account.is_initialized = 1; //1 46


    let (program_funds_pda, _bump) =
        Pubkey::find_program_address(&[b"program_funds", &global_state_account.length.to_ne_bytes()], ctx.program_id);

    if program_funds_pda.key() != bet_funds_account.key() {
        // msg!("Program Funds Account is invalid!");
        return Err(errors::ErrorCode::PDAMismatchProgramFunds.into());
    }

    let transfer_instruction = system_instruction::transfer(
        user_authority.key,
        &bet_funds_account.key(),
        990880,
    );

    anchor_lang::solana_program::program::invoke_signed(
        &transfer_instruction,
        &[
            user_authority.to_account_info(),
            bet_funds_account.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[],
    )?;
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
    #[account(init, 
    payer = signer, space=46 + 8, seeds=[b"be",&global_state_account.length.to_le_bytes()], bump )]
    pub program_state_account: Account<'info, ProgramState>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    #[account(mut,seeds = [b"global_state"], bump) ]
    pub global_state_account: Account<'info, GlobalState>,

    #[account(mut, address = pubkey!("5bwTiogGZYCe33ZAcZQbjYmRyK39DMjnViiDpMJYZBSW"))]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,


    /// CHECK: This is safe because we derive the PDA in the instruction
    #[account(mut)]
    pub program_funds_account: AccountInfo<'info>,
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

    #[account(mut, address = pubkey!("5bwTiogGZYCe33ZAcZQbjYmRyK39DMjnViiDpMJYZBSW"))]
    pub signer: Signer<'info>,

    #[account(mut,seeds = [b"global_state"], bump) ]
    pub global_state_account: Account<'info, GlobalState>,
}
