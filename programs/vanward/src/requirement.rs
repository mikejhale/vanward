use crate::certification::certification_is_complete;
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
    req.bump = *ctx.bumps.get("requirement").unwrap();

    let cert = &mut ctx.accounts.certification;
    cert.requirements
        .push(*ctx.accounts.requirement.to_account_info().key);

    Ok(())
}

pub fn complete_requirement(ctx: Context<CompleteRequirement>) -> Result<()> {
    // dont set complete if already in enrollment.complete_requirements
    require!(
        !ctx.accounts
            .enrollment
            .completed_requirements
            .contains(&ctx.accounts.requirement.to_account_info().key()),
        RequirementError::RequirementAlreadyComplete
    );

    // dont set complete if enrollment is already complete
    require!(
        !ctx.accounts.enrollment.complete,
        RequirementError::EnrollmentAlreadyComplete
    );

    let completion = &mut ctx.accounts.completion;
    completion.authority = *ctx.accounts.authority.key;
    completion.enrollment = *ctx.accounts.enrollment.to_account_info().key;
    completion.requirement = *ctx.accounts.requirement.to_account_info().key;
    completion.completed_date = Clock::get()?.unix_timestamp;
    completion.bump = *ctx.bumps.get("completion").unwrap();

    // save completed requirement to enrollment
    ctx.accounts
        .enrollment
        .completed_requirements
        .push(*ctx.accounts.requirement.to_account_info().key);

    // if this is the last requirement then complete_certification
    if certification_is_complete(
        &ctx.accounts.certification.requirements,
        &ctx.accounts.enrollment.completed_requirements,
    ) {
        ctx.accounts.enrollment.complete = true;
        ctx.accounts.enrollment.completed_date = Clock::get()?.unix_timestamp;
    }

    Ok(())
}
