use anchor_lang::prelude::*;

use anchor_lang::solana_program::system_instruction;

use super::errors;
use super::state::*;
use crate::SignerSOLBalance;

pub fn cashout_bet(ctx: Context<CashoutBet>, is_bet_a: u8) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;
    let user_authority = &mut ctx.accounts.user_authority;
    let user_sol_balance = &mut ctx.accounts.user_sol_balance;
    let program_funds_account = &mut ctx.accounts.program_funds_account;

    let (program_state_account_pda, _bump) =
        Pubkey::find_program_address(&[b"state"], &ctx.program_id);

    if program_state_account.key() != program_state_account_pda {
        msg!("ProgramStateAccount Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchStateProgramAccount.into());
    }

    let (program_funds_pda, program_funds_bump) =
        Pubkey::find_program_address(&[b"program-funds"], ctx.program_id);

    if program_funds_pda.key() != program_funds_account.key() {
        msg!("Program Funds Account is invalid!");
        return Err(errors::ErrorCode::PDAMismatchProgramFunds.into());
    }

    let (user_sol_balance_address, _bump) = Pubkey::find_program_address(
        &[
            if is_bet_a != 0 {
                b"sol_bet_a"
            } else {
                b"sol_bet_b"
            },
            user_authority.key().as_ref(),
        ],
        &ctx.program_id,
    );

    if user_sol_balance.key() != user_sol_balance_address {
        msg!("UserSolBalance Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchProgramTokenAccount.into());
    }

    if user_sol_balance.balance <= 0 {
        msg!("User has no balance to cashout");
        return Err(errors::ErrorCode::UserHasNoBalance.into());
    }

    // Create the transfer instruction
    let transfer_instruction = system_instruction::transfer(
        &program_funds_account.key(),
        user_authority.key,
        user_sol_balance.balance,
    );

    let pda_seed_word = "program-funds";

    // Invoke the transfer instruction
    anchor_lang::solana_program::program::invoke_signed(
        &transfer_instruction,
        &[
            program_funds_account.to_account_info(),
            user_authority.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[&[&pda_seed_word.as_bytes(), &[program_funds_bump]]],
    )?;

    user_sol_balance.balance = 0;

    if is_bet_a != 0 {
        program_state_account.total_sol_a -= user_sol_balance.balance;
    } else {
        program_state_account.total_sol_b -= user_sol_balance.balance;
    }

    return Ok(());
}

pub fn cashout_winnings(ctx: Context<CashoutBet>, is_bet_a: u8) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;

    if program_state_account.bet_over == 0 {
        return Err(errors::ErrorCode::BetNotOver.into());
    }

    if program_state_account.is_bet_a_winner != 0 && is_bet_a != 1 {
        return Err(errors::ErrorCode::UserLostBet.into());
    }

    let user_authority = &mut ctx.accounts.user_authority;
    let user_sol_balance = &mut ctx.accounts.user_sol_balance;
    let program_funds_account = &mut ctx.accounts.program_funds_account;

    let (program_state_account_pda, _bump) =
        Pubkey::find_program_address(&[b"state"], &ctx.program_id);

    if program_state_account.key() != program_state_account_pda {
        msg!("ProgramStateAccount Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchStateProgramAccount.into());
    }

    let (program_funds_pda, program_funds_bump) =
        Pubkey::find_program_address(&[b"program-funds"], ctx.program_id);

    if program_funds_pda.key() != program_funds_account.key() {
        msg!("Program Funds Account is invalid!");
        return Err(errors::ErrorCode::PDAMismatchProgramFunds.into());
    }

    let (user_sol_balance_address, _bump) = Pubkey::find_program_address(
        &[
            if is_bet_a != 0 {
                b"sol_bet_a"
            } else {
                b"sol_bet_b"
            },
            user_authority.key().as_ref(),
        ],
        &ctx.program_id,
    );

    if user_sol_balance.key() != user_sol_balance_address {
        msg!("UserSolBalance Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchProgramTokenAccount.into());
    }

    if user_sol_balance.balance <= 0 {
        msg!("User has no balance to cashout");
        return Err(errors::ErrorCode::UserHasNoBalance.into());
    }

    let total_pool_amount = program_state_account.total_sol_a + program_state_account.total_sol_b;
    let winning_pool_amount = if is_bet_a != 0 {
        program_state_account.total_sol_a
    } else {
        program_state_account.total_sol_b
    };

    let winnings_lamports = (user_sol_balance.balance / winning_pool_amount) * total_pool_amount;

    // Create the transfer instruction
    let transfer_instruction = system_instruction::transfer(
        &program_funds_account.key(),
        user_authority.key,
        winnings_lamports,
    );

    let pda_seed_word = "program-funds";

    // Invoke the transfer instruction
    anchor_lang::solana_program::program::invoke_signed(
        &transfer_instruction,
        &[
            program_funds_account.to_account_info(),
            user_authority.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[&[&pda_seed_word.as_bytes(), &[program_funds_bump]]],
    )?;

    return Ok(());
}

#[derive(Accounts)]
pub struct CashoutBet<'info> {
    #[account(mut, seeds = [b"state"], bump)]
    pub program_state_account: Account<'info, ProgramState>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    #[account(mut)]
    pub user_sol_balance: Account<'info, SignerSOLBalance>,

    /// CHECK: This is safe because we derive the PDA in the instruction
    #[account(mut, seeds = [b"program-funds"], bump)]
    pub program_funds_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}
