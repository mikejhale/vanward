use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Completion {
    pub authority: Pubkey,
    pub owner: Pubkey,
    pub requirement: Pubkey,
    pub bump: u8,
}
