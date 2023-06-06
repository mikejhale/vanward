use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Completion {
    pub authority: Pubkey,
    pub enrollment: Pubkey,
    pub requirement: Pubkey,
    pub completed_date: i64,
    pub bump: u8,
}
