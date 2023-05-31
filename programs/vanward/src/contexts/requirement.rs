use anchor_lang::prelude::*;

use crate::models::certification::Certification;
use crate::models::requirement::Requirement;

#[derive(Accounts)]
#[instruction(module: String)]
pub struct AddRequirement<'info> {
    #[account(init, payer = user, space = 8 + Requirement::INIT_SPACE, seeds = [
        b"requirement",
        module.as_bytes(),
        user.to_account_info().key.as_ref(),
    ], bump)]
    pub requirement: Account<'info, Requirement>,
    pub certification: Account<'info, Certification>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
