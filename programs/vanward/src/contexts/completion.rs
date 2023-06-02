use anchor_lang::prelude::*;

use crate::models::completion::Completion;
use crate::models::enrollment::Enrollment;
use crate::models::requirement::Requirement;

#[derive(Accounts)]
pub struct CompleteRequirement<'info> {
    #[account(init,
        payer = user,
        space = 8 + Completion::INIT_SPACE,
        seeds = [
            b"complete",
            owner.to_account_info().key.as_ref(),
            requirement.to_account_info().key.as_ref(),
        ],
        bump
    )]
    pub completion: Account<'info, Completion>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub owner: Account<'info, Enrollment>,
    #[account(
        constraint = requirement.authority == user.key(),
    )]
    pub requirement: Account<'info, Requirement>,
    pub system_program: Program<'info, System>,
}
