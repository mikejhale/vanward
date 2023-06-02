use crate::contexts::*;
use anchor_lang::prelude::*;

// use crate::errors::CertificationError;

// add certification
pub fn add_certification(
    ctx: Context<AddCertification>,
    id: String,
    year: u16,
    title: String,
) -> Result<()> {
    let cert = &mut ctx.accounts.certification;
    cert.authority = *ctx.accounts.authority.key;
    cert.id = id;
    cert.year = year;
    cert.title = title;
    cert.bump = *ctx.bumps.get("certification").unwrap();
    cert.requirements = Vec::new();
    Ok(())
}

pub fn complete_certification(ctx: Context<CompleteCertification>) -> Result<()> {
    let completion = &mut ctx.accounts.completion;
    completion.authority = *ctx.accounts.authority.key;
    completion.enrollment = *ctx.accounts.enrollment.to_account_info().key;
    completion.requirement = *ctx.accounts.requirement.to_account_info().key;
    completion.bump = *ctx.bumps.get("completion").unwrap();
    Ok(())
}
