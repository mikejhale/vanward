# Vanward

Vanward is an app to manage and verify professional certifications leveraging the public, immutable nature of the blockchain to prevent certification fraud and making verification of credentials fast, free, and easy.

Any organization that provides certifications can use Vanward to manage the requirements for those certifications, and provide on-chain verification that someone (a "professional") holds that certification.

## Certifications

Certifications are most often awarded by industry organizations and are based on assessments of skills and knowledge.

A certification is met after meeting a defined set of requirements. A Provider can create and manage certifications, and define the requirements that need to be met for a professional to earn it.

Certification enrollment can end at a set number of enrollees, on a specified date, or manually ended (open enrollment)

## Professionals

Professionals are anyone seeking a certification. Professionals can enroll in a certification, track their progress, and receive proof that they’ve met all the requirements. A professional will receive a certification once they have met all the requirements. They can hold more than one certification at any time.

## Verifier

Anyone can verify if a professional holds a certification by checking the address of the enrollee and certification, or by optionally verifying that that wallet holds a certification NFT.

The workflow for the first version is this:

1. Provider creates a certification, giving it a Title and ID.
2. Provider adds a list of requirements to the certification.
3. A Professional enrolls in a certification using their wallet.
4. Professional takes actions to meet that requirement
5. Provider marks that requirement complete for the enrollee.
6. Once the Professional has completed all the requirements, the provider can issue an NFT certificate.

**Future versions will include:**

- Ability to add Course Providers that offer Continuing Education courses required to meet requirements.
- Requiring a payment or deposit to enroll in a certification.
- Certifications that can/must be renewed
- Requirements have Credits, so a certification may be issued after meeting a set percentage of credits.
- Governmental licensing of professions.
- SDK to mark requirements complete in on-chain programs or custom front-end applications.
- Bulk marking of completed requirements.
- Bulk issuing of certification NFTs.

---

### Devnet Program Address

9aLFmxHoJTUZT6s5ak2dQZ3AXdtYmSNrve6hbRESdT86
