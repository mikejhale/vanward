use crate::models::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CompleteRequirement<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        has_one = authority,
        constraint = enrollment.certification.key() == certification.key()
    )]
    pub enrollment: Account<'info, Enrollment>,

    #[account(has_one = authority)]
    pub requirement: Account<'info, Requirement>,

    #[account(has_one = authority)]
    pub certification: Account<'info, Certification>,

    // TODO: Is this needed?
    pub system_program: Program<'info, System>,
}
