use anchor_lang::prelude::*;

use crate::contexts::completion::CompleteRequirement;

// enroll in certification as a professiona;
pub fn complete(ctx: Context<CompleteRequirement>) -> Result<()> {
    let completion = &mut ctx.accounts.completion;
    completion.authority = *ctx.accounts.user.key;
    completion.owner = *ctx.accounts.owner.to_account_info().key;
    completion.requirement = *ctx.accounts.requirement.to_account_info().key;
    completion.bump = *ctx.bumps.get("completion").unwrap();
    Ok(())
}
