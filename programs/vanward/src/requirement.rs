use crate::contexts::requirement::AddRequirement;
use crate::models::requirement::Requirement;
use anchor_lang::prelude::*;

// add requirement
pub fn add_requirement(ctx: Context<AddRequirement>, module: String, credits: u8) -> Result<()> {
    let req: &mut Account<Requirement> = &mut ctx.accounts.requirement;
    req.authority = *ctx.accounts.authority.key;
    req.certification = *ctx.accounts.certification.to_account_info().key;
    req.module = module;
    req.credits = credits;
    req.bump = *ctx.bumps.get("requirement").unwrap();
    Ok(())
}
