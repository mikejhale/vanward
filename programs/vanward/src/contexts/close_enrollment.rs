use crate::models::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CloseEnrollment<'info> {
    #[account(mut, has_one = authority, close = owner)]
    enrollment: Account<'info, Enrollment>,
    #[account(mut)]
    /// CHECK: OK, just where to send rent to
    owner: AccountInfo<'info>,
    pub authority: Signer<'info>,
}
