use anchor_lang::prelude::*;

use crate::{
    contexts::close_enrollment::CloseEnrollment, contexts::enroll::Enroll, errors::EnrollmentError,
};

// enroll in certification as a professiona;
pub fn enroll(ctx: Context<Enroll>) -> Result<()> {
    let enrollment = &mut ctx.accounts.enrollment;

    // check max enrollees
    if ctx.accounts.certification.max_enrollees > 0 {
        require!(
            ctx.accounts.certification.enrollee_count < ctx.accounts.certification.max_enrollees,
            EnrollmentError::MaxEnrollmentreached
        );
    }

    // check enrollment end date
    if ctx.accounts.certification.enrollment_enddate > 0 {
        require!(
            ctx.accounts.certification.enrollment_enddate < Clock::get()?.unix_timestamp,
            EnrollmentError::EnrollmentExpired
        );
    }

    ctx.accounts.certification.enrollee_count = ctx
        .accounts
        .certification
        .enrollee_count
        .checked_add(1)
        .unwrap();

    enrollment.certification = ctx.accounts.certification.to_account_info().key();
    enrollment.authority = ctx.accounts.certification.authority;
    enrollment.owner = *ctx.accounts.owner.key;
    enrollment.complete = false;
    enrollment.completed_requirements = 0;
    enrollment.bump = ctx.bumps.enrollment;
    Ok(())
}

pub fn close_enrollment(_ctx: Context<CloseEnrollment>) -> Result<()> {
    Ok(())
}
