use crate::contexts::*;
use crate::errors::*;
use crate::models::*;
use anchor_lang::prelude::*;

// add requirement
pub fn add_requirement(ctx: Context<AddRequirement>, module: String, credits: u8) -> Result<()> {
    let req: &mut Account<Requirement> = &mut ctx.accounts.requirement;
    req.authority = *ctx.accounts.authority.key;
    req.certification = *ctx.accounts.certification.to_account_info().key;
    req.module = module;
    req.credits = credits;
    req.bump = ctx.bumps.requirement;

    let cert = &mut ctx.accounts.certification;
    cert.requirements_count = cert.requirements_count.checked_add(1).unwrap();
    req.order = cert.requirements_count;

    Ok(())
}

pub fn complete_requirement(ctx: Context<CompleteRequirement>) -> Result<()> {
    let order = ctx.accounts.requirement.order;
    let completed = ctx.accounts.enrollment.completed_requirements;

    // dont set complete if already completed
    require!(
        completed & (1 << (order - 1)) == 0,
        RequirementError::RequirementAlreadyComplete
    );

    // set requirement as complete
    ctx.accounts.enrollment.completed_requirements |= 1 << (order - 1);

    // check that all requierements are complete
    let complete_num: u64 =
        ((1 << ctx.accounts.certification.requirements_count) - 1) ^ ((1 << (1 - 1)) - 1);
    let checked_num: u64 = ctx.accounts.enrollment.completed_requirements & complete_num;

    if complete_num == checked_num {
        ctx.accounts.enrollment.complete = true;
        ctx.accounts.enrollment.completed_date = Clock::get()?.unix_timestamp;
    }

    Ok(())
}
