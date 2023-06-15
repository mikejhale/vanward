import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
  setProvider,
  workspace,
  getProvider,
} from '@coral-xyz/anchor';
import { PublicKey, Keypair, Commitment } from '@solana/web3.js';
import { expect } from 'chai';
import { Vanward } from '../target/types/vanward';
const crypto = require('crypto');

const commitment: Commitment = 'confirmed'; // processed, confirmed, finalized

describe('vanward', async () => {
  const certificationId = 'CERT' + (Math.floor(Math.random() * 90000) + 10000);
  const certificationTitle = 'My Other Certification - 2023';
  const certificationYear = 2024;

  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env();
  provider.opts.commitment = commitment;
  setProvider(provider);
  const program = workspace.Vanward as Program<Vanward>;

  let certPda = '';
  let enrollPda = '';
  let reqPda = '';
  let reqPda2 = '';

  const [certificationPda, certBump] =
    await web3.PublicKey.findProgramAddressSync(
      [
        utils.bytes.utf8.encode('certification'),
        utils.bytes.utf8.encode(certificationId),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

  certPda = certificationPda.toString();

  const enrollee = new Keypair();

  it('Airdrop', async () => {
    await Promise.all(
      [enrollee].map(async (k) => {
        return await getProvider().connection.requestAirdrop(
          k.publicKey,
          100 * web3.LAMPORTS_PER_SOL
        );
      })
    ).then(confirmTxs);
  });

  it('can add a certification', async () => {
    const tx = await program.methods
      .addCertification(certificationId, certificationTitle)
      .accounts({
        certification: certificationPda,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    let certAccount = await program.account.certification.fetch(
      certificationPda
    );

    expect(certAccount.id).to.equal(certificationId);
    expect(certAccount.title).to.equal(certificationTitle);
  });

  it('can add a requirement', async () => {
    const module = 'Week 1';
    const credits = 1;

    const [requirementPda, requirementBump] =
      await web3.PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode('requirement'),
          utils.bytes.utf8.encode(module),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

    reqPda = requirementPda.toString();

    const tx = await program.methods
      .addRequirement(module, credits)
      .accounts({
        requirement: requirementPda,
        certification: certificationPda,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    let reqAccount = await program.account.requirement.fetch(
      requirementPda.toString()
    );
    expect(reqAccount.module).to.equal(module);
    expect(reqAccount.credits).to.equal(credits);
    expect(reqAccount.order).to.equal(1);

    let certAccount = await program.account.certification.fetch(
      certificationPda.toString()
    );

    expect(certAccount.requirementsCount).to.equal(1);

  });

  it('can add a second requirement', async () => {
    const module = 'Week 2';
    const credits = 1;

    const [requirementPda, requirementBump] =
      await web3.PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode('requirement'),
          utils.bytes.utf8.encode(module),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

    reqPda2 = requirementPda.toString();

    const tx = await program.methods
      .addRequirement(module, credits)
      .accounts({
        requirement: requirementPda,
        certification: certificationPda,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    let reqAccount = await program.account.requirement.fetch(
      requirementPda.toString()
    );
    expect(reqAccount.module).to.equal(module);
    expect(reqAccount.credits).to.equal(credits);
    expect(reqAccount.order).to.equal(2);

    let certAccount = await program.account.certification.fetch(
      certificationPda.toString()
    );

    expect(certAccount.requirementsCount).to.equal(2);

  });

  // it('can get certification requirements', async () => {
  //   let reqAccounts = await program.account.requirement.all([
  //     {
  //       memcmp: {
  //         offset: 8,
  //         bytes: certificationPda.toBase58(),
  //       },
  //     },
  //   ]);
  //   expect(reqAccounts[0].account.module).to.equal(certificationId);
  // });

  it('can enroll', async () => {
    const [enrollmentPda, enrollBump] =
      await web3.PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode('enroll'),
          enrollee.publicKey.toBuffer(),
          certificationPda.toBuffer(),
        ],
        program.programId
      );

    enrollPda = enrollmentPda.toString();

    const tx = await program.methods
      .enroll()
      .accounts({
        enrollment: enrollmentPda,
        certification: certificationPda,
        owner: enrollee.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([enrollee])
      .rpc();

    let enrollAccount = await program.account.enrollment.fetch(
      enrollmentPda.toString()
    );
    expect(enrollAccount.certification.toString()).to.equal(
      certificationPda.toString()
    );
    expect(enrollAccount.complete).to.equal(false);
  });

  it('can mark requirement as complete', async () => {

    const tx = await program.methods
      .completeRequirement()
      .accounts({
        authority: provider.wallet.publicKey,
        enrollment: enrollPda,
        requirement: reqPda,
        certification: certificationPda.toString(),
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc()

    let enrollmentAccount = await program.account.enrollment.fetch(enrollPda);
    expect(enrollmentAccount.complete).to.equal(false);
    expect(enrollmentAccount.completedRequirements.toString()).to.equal("1");
  });

  it('can mark second requirement as complete', async () => {

    const tx = await program.methods
      .completeRequirement()
      .accounts({
        authority: provider.wallet.publicKey,
        enrollment: enrollPda,
        requirement: reqPda2,
        certification: certificationPda.toString(),
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc()

    let enrollmentAccount = await program.account.enrollment.fetch(enrollPda);

    expect(enrollmentAccount.completedRequirements.toString()).to.equal("3");
    expect(enrollmentAccount.complete).to.equal(true);
  });

});

const confirmTx = async (signature: string) => {
  const latestBlockhash = await getProvider().connection.getLatestBlockhash();
  await getProvider().connection.confirmTransaction(
    {
      signature,
      ...latestBlockhash,
    },
   commitment
  );
};

const confirmTxs = async (signatures: string[]) => {
  await Promise.all(signatures.map(confirmTx));
};
