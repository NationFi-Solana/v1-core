use anchor_lang::prelude::*;

pub mod balances;
pub mod bet_placement;
pub mod bet_placement_initialization;
pub mod errors;
pub mod state;

use balances::*;
use bet_placement::*;
use bet_placement_initialization::*;
use state::*;

declare_id!("83gCS2t7QEqG4EmbPriCPjD7f5qcrDuBEfwqa6H8SwMS");

#[program]
pub mod betting_dapp {
    use super::*;

    pub fn initialize_program_state(ctx: Context<InitializeState>) -> Result<()> {
        state::initialize_program_state(ctx)
    }

    pub fn read_program_state(ctx: Context<ReadState>) -> Result<()> {
        state::read_program_state(ctx)
    }

    pub fn set_program_state(
        ctx: Context<SetState>,
        bets_closed: u8,
        is_bet_a_winner: u8,
    ) -> Result<()> {
        state::set_program_state(ctx, bets_closed, is_bet_a_winner)
    }

    pub fn init_place_spl_bet_a(ctx: Context<InitPlaceSPLBetA>) -> Result<()> {
        bet_placement_initialization::init_place_spl_bet_a(ctx)
    }

    pub fn init_place_spl_bet_b(ctx: Context<InitPlaceSPLBetB>) -> Result<()> {
        bet_placement_initialization::init_place_spl_bet_b(ctx)
    }

    pub fn place_spl_bet(
        ctx: Context<PlaceSPLBet>,
        is_bet_a: u8,
        amount: u64,
        decimals: u8,
    ) -> Result<()> {
        bet_placement::place_spl_bet(ctx, is_bet_a, amount, decimals)
    }
}
