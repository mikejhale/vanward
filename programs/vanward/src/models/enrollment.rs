use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Enrollment {
    pub authority: Pubkey,
    pub owner: Pubkey,
    pub certification: Pubkey,
    pub complete: bool,
    pub completed_date: i64,
    #[max_len(32)]
    pub completed_requirements: Vec<Pubkey>,
    pub bump: u8,
}
