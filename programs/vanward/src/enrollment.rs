use anchor_lang::prelude::*;

use crate::contexts::enrollment::Enroll;

// enroll in certification as a professiona;
pub fn enroll(ctx: Context<Enroll>) -> Result<()> {
    let enrollment = &mut ctx.accounts.enrollment;
    enrollment.authority = ctx.accounts.certification.authority;
    enrollment.certification = ctx.accounts.certification.to_account_info().key();
    enrollment.owner = *ctx.accounts.user.key;
    enrollment.bump = *ctx.bumps.get("enrollment").unwrap();
    Ok(())
}
