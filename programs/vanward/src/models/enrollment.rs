use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Enrollment {
    pub authority: Pubkey,
    pub owner: Pubkey,
    pub certification: Pubkey,
    pub bump: u8,
}
