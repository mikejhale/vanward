use anchor_lang::prelude::*;

use crate::models::certification::Certification;
use crate::models::enrollment::Enrollment;

#[derive(Accounts)]
pub struct Enroll<'info> {
    #[account(init, payer = user, space = 8 + Enrollment::INIT_SPACE, seeds = [
        b"enroll",
        user.to_account_info().key.as_ref(),
        certification.to_account_info().key.as_ref(),
    ], bump)]
    pub enrollment: Account<'info, Enrollment>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub certification: Account<'info, Certification>,
    pub system_program: Program<'info, System>,
}
