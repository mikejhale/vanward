use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Certification {
    pub authority: Pubkey,
    #[max_len(128)]
    pub id: String,
    #[max_len(480)]
    pub title: String,
    pub requirements_count: u8,
    pub bump: u8,
}
