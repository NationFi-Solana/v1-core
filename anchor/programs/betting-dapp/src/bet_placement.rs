use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

use super::errors;
use super::state::*;
use crate::SignerSOLBalance;

pub fn place_sol_bet(
    ctx: Context<PlaceSOLBet>,
    is_bet_a: u8,
    sol_amount: u64,
    id: [u8; 2],
) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;
    let user_sol_balance = &mut ctx.accounts.user_sol_balance;
    let program_funds_account = &mut ctx.accounts.program_funds_account;
    let user_authority = &mut ctx.accounts.user_authority;
    // check error
    let (program_state_account_pda, _bump) =
        Pubkey::find_program_address(&[b"be", &id], &ctx.program_id);

    if program_state_account.key() != program_state_account_pda {
        msg!("ProgramStateAccount Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchStateProgramAccount.into());
    }

    let amount = sol_amount;
    let (user_sol_balance_address, _bump) = Pubkey::find_program_address(
        &[
            if is_bet_a != 0 {
                b"sol_bet_a"
            } else {
                b"sol_bet_b"
            },
            user_authority.key().as_ref(),
            &id,
        ],
        &ctx.program_id,
    );

    if user_sol_balance.key() != user_sol_balance_address {
        msg!("UserSolBalance Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchProgramTokenAccount.into());
    }

    if user_sol_balance.to_account_info().owner != ctx.program_id {
        msg!("UserSolBalance Is Not Owned By Program");
        return Err(errors::ErrorCode::SignerSolBalanceInvalidOwnership.into());
    }

    let (program_funds_pda, _bump) = Pubkey::find_program_address(
        &[b"program_funds", &program_state_account.id.to_ne_bytes()],
        ctx.program_id,
    );

    if program_funds_pda.key() != program_funds_account.key() {
        msg!("Program Funds Account is invalid!");
        return Err(errors::ErrorCode::PDAMismatchProgramFunds.into());
    }

    if user_sol_balance.is_bet_a != is_bet_a {
        msg!("UserSolBalance Is Bet A Mismatch");
        return Err(errors::ErrorCode::PDAMismatchProgramTokenAccount.into());
    }

    // Create the transfer instruction
    let transfer_instruction =
        system_instruction::transfer(user_authority.key, &program_funds_account.key(), amount);

    // Invoke the transfer instruction
    anchor_lang::solana_program::program::invoke_signed(
        &transfer_instruction,
        &[
            user_authority.to_account_info(),
            program_funds_account.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[],
    )?;

    user_sol_balance.balance = user_sol_balance.balance + amount;

    if is_bet_a != 0 {
        program_state_account.total_sol_a += amount;
        program_state_account.total_bets_a += 1;
    } else {
        program_state_account.total_sol_b += amount;
        program_state_account.total_bets_b += 1;
    }

    program_state_account.total_bets += 1;

    Ok(())
}

#[derive(Accounts)]
pub struct PlaceSOLBet<'info> {
    #[account(mut)]
    pub program_state_account: Account<'info, ProgramState>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    #[account(mut)]
    pub user_sol_balance: Account<'info, SignerSOLBalance>,

    /// CHECK: This is safe because we derive the PDA in the instruction
    #[account(mut, seeds=[b"program_funds", &program_state_account.id.to_ne_bytes()], bump)]
    pub program_funds_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}
