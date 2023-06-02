use anchor_lang::prelude::*;

use crate::models::*;

#[derive(Accounts)]
pub struct CompleteCertification<'info> {
    #[account(init,
        payer = authority,
        space = 8 + Completion::INIT_SPACE,
        seeds = [
            b"completecert",
            enrollment.to_account_info().key.as_ref(),
            requirement.to_account_info().key.as_ref(),
        ],
        bump
    )]
    pub completion: Account<'info, Completion>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub enrollment: Account<'info, Enrollment>,
    #[account(has_one = authority)]
    pub requirement: Account<'info, Requirement>,
    #[account(has_one = authority)]
    pub certification: Account<'info, Certification>,
    pub system_program: Program<'info, System>,
}
