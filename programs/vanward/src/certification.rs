use crate::contexts::certification::AddCertification;
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
    cert.authority = *ctx.accounts.user.key;
    cert.id = id;
    cert.year = year;
    cert.title = title;
    cert.bump = *ctx.bumps.get("certification").unwrap();
    Ok(())
}
