use anchor_lang::prelude::*;

declare_id!("ARvEkVp3yEwfAyLxRrEqCULMgNJBHNGjwSdEqSwDgCQ5");

#[program]
pub mod counter {
    use super::*;

    // Every function here is an instruction
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.bump = ctx.bumps.counter;
        msg!("Counter account created with count: {}", counter.count);
        msg!("Counter bump: {}", counter.bump);
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        msg!("Previous Counter: {}", counter.count);

        counter.count = counter.count.checked_add(1).unwrap();
        msg!("Counter incremented! Current count: {}", counter.count);
        Ok(())
    }
}

// Account required by the initialize instruction
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        seeds=[b"counter"],
        bump,
        payer = user,
        space = 8 + Counter::INIT_SPACE,
    )]
    pub counter: Account<'info, Counter>,
    pub system_program: Program<'info, System>,
}

// Account required by the increment instruction
#[derive(Accounts)]
pub struct Increment<'info> {
    // Generate PDA
    #[account(mut,
    seeds = [b"counter"],
bump=counter.bump,)]
    pub counter: Account<'info, Counter>, // specify account is counter type
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

// COUNTER STRUCT: Defines what the counter will look like
#[account]
#[derive(InitSpace)]
pub struct Counter {
    pub count: u64,
    pub bump: u8,
}
