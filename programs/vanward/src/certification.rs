use crate::contexts::*;
use anchor_lang::prelude::*;

//use crate::errors::*;
//use crate::models::*;

// add certification
pub fn add_certification(ctx: Context<AddCertification>, id: String, title: String) -> Result<()> {
    let cert = &mut ctx.accounts.certification;
    cert.authority = *ctx.accounts.authority.key;
    cert.id = id;
    cert.title = title;
    cert.requirements_count = 0;
    cert.bump = *ctx.bumps.get("certification").unwrap();
    Ok(())
}
