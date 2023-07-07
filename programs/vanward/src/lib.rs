use anchor_lang::prelude::*;

mod certification;
mod contexts;
mod enrollment;
mod errors;
mod models;
mod requirement;
use contexts::*;

declare_id!("4AmPAMovn48nui76YZ6pN8ztchfb8QMybnG3a3SYb7eV");

#[program]
pub mod vanward {
    use super::*;

    pub fn add_certification(
        ctx: Context<AddCertification>,
        id: String,
        title: String,
        max_enrollees: u16,
        enrollment_enddate: i64,
    ) -> Result<()> {
        certification::add_certification(ctx, id, title, max_enrollees, enrollment_enddate)
    }

    // add requirement
    pub fn add_requirement(
        ctx: Context<AddRequirement>,
        module: String,
        credits: u8,
    ) -> Result<()> {
        requirement::add_requirement(ctx, module, credits)
    }

    // enroll in certification as a professional
    pub fn enroll(ctx: Context<Enroll>) -> Result<()> {
        enrollment::enroll(ctx)
    }

    // enroll in certification as a professional
    pub fn close_enrollment(ctx: Context<CloseEnrollment>) -> Result<()> {
        enrollment::close_enrollment(ctx)
    }

    // mark requirement as complete
    pub fn complete_requirement(ctx: Context<CompleteRequirement>) -> Result<()> {
        requirement::complete_requirement(ctx)
    }
}
