use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Certification {
    pub authority: Pubkey,
    #[max_len(128)]
    pub id: String,
    #[max_len(480)]
    pub title: String,
    pub enrollee_count: u16,
    pub max_enrollees: u16,
    pub enrollment_enddate: i64,
    pub enrollment_open: bool,
    pub requirements_count: u8,
    #[max_len(480)]
    pub nft_uri: String,
    pub bump: u8,
}
