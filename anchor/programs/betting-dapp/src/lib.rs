use anchor_lang::prelude::*;

pub mod balances;
pub mod bet_placement;
pub mod bet_placement_initialization;
pub mod cashout;
pub mod errors;
pub mod global_state;
pub mod state;
use balances::*;
use bet_placement::*;
use bet_placement_initialization::*;
use cashout::*;
use global_state::*;
use state::*;
declare_id!("5pTgM2iB8Huogi6m9PBSBQKT1Vpr7W8pTJpjstcQJ9TS");

#[program]
pub mod betting_dapp {

    use super::*;

    pub fn initialize_program_state(ctx: Context<InitializeState>) -> Result<()> {
        let program_state_account = &mut ctx.accounts.program_state_account;
        if program_state_account.is_initialized != 0 {
            return Err(errors::ErrorCode::ProgramAlreadyInitialized.into());
        }

        state::initialize_program_state(ctx)
    }
    pub fn init_global_state(ctx: Context<InitializeGlobalState>) -> Result<()> {
        global_state::init_global_state(ctx)
    }
    pub fn add_new_bet(ctx: Context<SetGlobalState>) -> Result<()> {
        global_state::add_new_bet(ctx)
    }

    pub fn set_program_state(
        ctx: Context<SetState>,
        bets_closed: u8,
        is_bet_a_winner: u8,
        bet_over: u8,
    ) -> Result<()> {
        state::set_program_state(ctx, bets_closed, is_bet_a_winner, bet_over)
    }

    pub fn init_place_sol_bet_a(ctx: Context<InitPlaceSOLBetA>) -> Result<()> {
        bet_placement_initialization::init_place_sol_bet_a(ctx)
    }

    pub fn init_place_sol_bet_b(ctx: Context<InitPlaceSOLBetB>) -> Result<()> {
        bet_placement_initialization::init_place_sol_bet_b(ctx)
    }

    pub fn place_sol_bet(
        ctx: Context<PlaceSOLBet>,
        is_bet_a: u8,
        sol_amount: u64,
        id: [u8; 2],
    ) -> Result<()> {
        let program_state_account = &mut ctx.accounts.program_state_account;
        if program_state_account.bets_closed != 0 {
            return Err(errors::ErrorCode::BetsAreClosed.into());
        }

        bet_placement::place_sol_bet(ctx, is_bet_a, sol_amount, id)
    }

    // pub fn cashout_bet(ctx: Context<CashoutBet>, is_bet_a: u8) -> Result<()> {
    //     let program_state_account = &mut ctx.accounts.program_state_account;

    //     // If Bets Are Open And The Bet Is Not Over, Cashout Is Possible

    //     if program_state_account.bets_closed == 0 && program_state_account.bet_over == 0 {
    //         return cashout::cashout_bet(ctx, is_bet_a);
    //     }

    //     Err(errors::ErrorCode::BetsClosedNotOver.into())
    // }

    pub fn cashout_winnings(ctx: Context<CashoutBet>, is_bet_a: u8, bet_id: u16) -> Result<()> {
        let program_state_account = &mut ctx.accounts.program_state_account;

        // If Bets Are Closed And Bet Is Over, Cashout Is Possible

        if program_state_account.bets_closed != 0 && program_state_account.bet_over == 1 {
            return cashout::cashout_winnings(ctx, is_bet_a, bet_id);
        }

        return Err(errors::ErrorCode::BetsClosedNotOver.into());
    }
}
