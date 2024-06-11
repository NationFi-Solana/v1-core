use anchor_lang::solana_program::{native_token::LAMPORTS_PER_SOL, system_instruction};

use crate::{SignerSOLBalance, SignerSPLBalance};
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::Token;
use {anchor_lang::prelude::*, anchor_spl::associated_token, anchor_spl::token};

use super::errors;
use super::state::*;

pub fn place_sol_bet(ctx: Context<PlaceSOLBet>, is_bet_a: u8, sol_amount: u64) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;
    let user_sol_balance = &mut ctx.accounts.user_sol_balance;
    let program_funds_account = &mut ctx.accounts.program_funds_account;
    let user_authority = &mut ctx.accounts.user_authority;

    let amount = sol_amount * LAMPORTS_PER_SOL;
    let (user_sol_balance_address, _bump) = Pubkey::find_program_address(
        &[if is_bet_a != 0 {
            b"sol_bet_a"
        } else {
            b"sol_bet_b"
        }],
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

    let (program_funds_pda, _bump) =
        Pubkey::find_program_address(&[b"program-funds"], ctx.program_id);

    if program_funds_pda.key() != program_funds_account.key() {
        msg!("Program Funds Account is invalid!");
        return Err(errors::ErrorCode::SignerSolBalanceInvalidOwnership.into());
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

    let user_sol_balance_index = program_state_account
        .sol_balances
        .iter()
        .position(|bet| *bet == user_sol_balance.key());

    if user_sol_balance_index.is_none() {
        program_state_account
            .sol_balances
            .push(user_sol_balance.key())
    }

    program_state_account.total_bets += 1;

    Ok(())
}

pub fn place_spl_bet(
    ctx: Context<PlaceSPLBet>,
    is_bet_a: u8,
    _amount: u64,
    _decimals: u8,
) -> Result<()> {
    let program_state_account = &mut ctx.accounts.program_state_account;

    let spl_token_mint = &mut ctx.accounts.spl_token_mint;
    let program_token_account_for_spl = &mut ctx.accounts.program_token_account_for_spl;
    let user_authority = &mut ctx.accounts.user_authority;
    let program_authority = &ctx.accounts.program_authority;
    let user_token_account = &mut ctx.accounts.user_token_account;
    let user_spl_balance = &mut ctx.accounts.user_spl_balance;

    let program_token_account_for_spl_address =
        associated_token::get_associated_token_address(ctx.program_id, &spl_token_mint.key());

    let (user_spl_balance_address, _bump) = Pubkey::find_program_address(
        &[
            user_token_account.key().as_ref(),
            if is_bet_a != 0 {
                b"spl_bet_a"
            } else {
                b"spl_bet_b"
            },
        ],
        &ctx.program_id,
    );

    if user_spl_balance.key() != user_spl_balance_address {
        msg!("UserSplBalance Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchProgramTokenAccount.into());
    }

    if program_token_account_for_spl.key() != program_token_account_for_spl_address.key() {
        msg!("ProgramTokenAccountForSpl Address Mismatch");
        return Err(errors::ErrorCode::PDAMismatchProgramTokenAccount.into());
    }

    if user_spl_balance.is_bet_a != is_bet_a {
        msg!("UserSPLBalance Is Bet A Mismatch");
        return Err(errors::ErrorCode::PDAMismatchProgramTokenAccount.into());
    }

    if program_token_account_for_spl.data_is_empty() {
        msg!("Creating SPL Token Account For Program...");
        associated_token::create(CpiContext::new(
            ctx.accounts.associated_token_program.to_account_info(),
            associated_token::Create {
                payer: user_authority.to_account_info(),
                associated_token: program_token_account_for_spl.to_account_info(),
                authority: program_authority.to_account_info(),
                mint: spl_token_mint.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                token_program: ctx.accounts.token_program.to_account_info(),
            },
        ))?;
    }

    msg!(
        "Transferring {} SPL Tokens from {} to {}",
        _amount,
        user_token_account.key().to_string(),
        program_token_account_for_spl.key().to_string(),
    );

    let amount = _amount * u64::pow(10, _decimals.into());
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: user_token_account.to_account_info(),
                to: program_token_account_for_spl.to_account_info(),
                authority: user_authority.to_account_info(),
            },
        ),
        amount,
    )?;

    user_spl_balance.balance = user_spl_balance.balance + amount;

    let user_spl_balance_index = program_state_account
        .spl_balances
        .iter()
        .position(|bet| *bet == user_spl_balance.key());

    if user_spl_balance_index.is_none() {
        program_state_account
            .spl_balances
            .push(user_spl_balance.key())
    }

    program_state_account.total_bets += 1;

    Ok(())
}

#[derive(Accounts)]
pub struct PlaceSPLBet<'info> {
    #[account(mut)]
    pub program_state_account: Account<'info, ProgramState>,

    #[account(mut)]
    pub spl_token_mint: Account<'info, token::Mint>,

    /// CHECK: We check if exists, otherwise create - owned by the program
    #[account(mut)]
    pub program_token_account_for_spl: UncheckedAccount<'info>,

    #[account(mut)]
    pub user_authority: Signer<'info>,

    /// CHECK: Only used as authority for new program_token_account_for_spl, must be passed
    pub program_authority: UncheckedAccount<'info>,

    #[account(mut)]
    pub user_token_account: Account<'info, token::TokenAccount>,

    #[account(mut)]
    pub user_spl_balance: Account<'info, SignerSPLBalance>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
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
    #[account(mut, seeds = [b"program-funds"], bump)]
    pub program_funds_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}
