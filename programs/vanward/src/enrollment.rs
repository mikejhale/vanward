use anchor_lang::prelude::*;

use crate::contexts::enroll::Enroll;

// enroll in certification as a professiona;
pub fn enroll(ctx: Context<Enroll>) -> Result<()> {
    let enrollment = &mut ctx.accounts.enrollment;
    enrollment.certification = ctx.accounts.certification.to_account_info().key();
    enrollment.authority = ctx.accounts.certification.authority;
    enrollment.owner = *ctx.accounts.owner.key;
    enrollment.complete = false;
    enrollment.completed_requirements = 0;
    enrollment.bump = *ctx.bumps.get("enrollment").unwrap();
    Ok(())
}
