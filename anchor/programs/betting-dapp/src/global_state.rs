use anchor_lang::{
    prelude::*,
    solana_program::pubkey,
};

pub fn init_global_state(ctx: Context<InitializeGlobalState> ) -> Result<()> {
    let global_state_account = &mut ctx.accounts.global_state_account;
    global_state_account.length = 0;
    Ok(())
}

pub fn read_global_state(ctx: Context<ReadGlobalState>) -> Result<()> {
    let global_state_account = &mut ctx.accounts.global_state_account;
    msg!("Global state length: {}", global_state_account.length);
    Ok(())
}

pub fn add_new_bet(
    ctx: Context<SetGlobalState>, 
) -> Result<()> {
    let global_state_account = &mut ctx.accounts.global_state_account;
    global_state_account.length += 1;
    // TODO (Check for Signer)
    Ok(())
}

#[derive(Accounts)]
pub struct InitializeGlobalState<'info> {
    #[account(init, 
    payer = signer, space=120, seeds=[b"global_state", ], bump )]
    pub global_state_account: Account<'info, GlobalState>,

    #[account(mut, address = pubkey!("EgHH1EqXN6LENFC7utYJX3LcAfoH5wn7CG2RRBtxzmaf"))]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct GlobalState {
    pub length: u16,
}

#[derive(Accounts)]
pub struct ReadGlobalState<'info> {
    #[account(mut)]
    pub global_state_account: Account<'info, GlobalState>,  
}

#[derive(Accounts)]
pub struct SetGlobalState<'info> {
    #[account(mut)]
    pub global_state_account: Account<'info, GlobalState>,
}
