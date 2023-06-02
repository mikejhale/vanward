use anchor_lang::prelude::*;

mod certification;
mod completion;
mod contexts;
mod enrollment;
mod errors;
mod models;
mod requirement;
use contexts::*;

declare_id!("Hh89oGmpZ15RCsDgueaAAcSNG9WVuy79HzYdcgLUp1d3");

#[program]
pub mod vanward {
    use super::*;

    pub fn add_certification(
        ctx: Context<AddCertification>,
        id: String,
        year: u16,
        title: String,
    ) -> Result<()> {
        certification::add_certification(ctx, id, year, title)
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

    // mark requirement as complete
    pub fn complete(ctx: Context<CompleteRequirement>) -> Result<()> {
        completion::complete(ctx)
    }
}
