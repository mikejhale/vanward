use anchor_lang::prelude::*;

use crate::models::certification::Certification;
use crate::models::enrollment::Enrollment;

#[derive(Accounts)]
pub struct Enroll<'info> {
    #[account(init, payer = owner, space = 8 + Enrollment::INIT_SPACE, seeds = [
        b"enroll",
        owner.to_account_info().key.as_ref(),
        certification.to_account_info().key.as_ref(),
    ], bump)]
    pub enrollment: Account<'info, Enrollment>,
    pub certification: Account<'info, Certification>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
