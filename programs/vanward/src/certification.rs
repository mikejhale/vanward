use crate::contexts::*;
use anchor_lang::prelude::*;

//use crate::errors::*;
//use crate::models::*;

// add certification
pub fn add_certification(
    ctx: Context<AddCertification>,
    id: String,
    title: String,
    max_enrollees: u16,
    enrollment_enddate: i64,
) -> Result<()> {
    let cert = &mut ctx.accounts.certification;
    cert.authority = *ctx.accounts.authority.key;
    cert.id = id;
    cert.title = title;
    cert.enrollment_enddate = enrollment_enddate;
    cert.max_enrollees = max_enrollees;
    cert.enrollment_open = true;
    cert.requirements_count = 0;
    cert.bump = *ctx.bumps.get("certification").unwrap();
    Ok(())
}
