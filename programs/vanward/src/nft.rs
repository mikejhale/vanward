use crate::contexts::mint_nft::MintNFT;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{
        create_master_edition_v3, create_metadata_accounts_v3, mpl_token_metadata::types::DataV2,
        CreateMasterEditionV3, CreateMetadataAccountsV3, Metadata,
    },
    token::{mint_to, Mint, MintTo, Token, TokenAccount},
};
use mpl_token_metadata::pda::{find_master_edition_account, find_metadata_account};

pub fn mint_nft(
    ctx: Context<MintNFT>,
    creator_key: Pubkey,
    symbol: String,
    uri: String,
    title: String,
) -> Result<()> {
    // create mint account
    let cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        },
    );

    mint_to(cpi_context, 1)?;

    // create metadata account
    let cpi_context = CpiContext::new(
        ctx.accounts.token_metadata_program.to_account_info(),
        CreateMetadataAccountsV3 {
            metadata: ctx.accounts.metadata.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            mint_authority: ctx.accounts.payer.to_account_info(),
            update_authority: ctx.accounts.payer.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
        },
    );

    let data_v2 = DataV2 {
        name: title,
        symbol: symbol,
        uri: uri,
        seller_fee_basis_points: 0,
        creators: None,
        collection: None,
        uses: None,
    };

    create_metadata_accounts_v3(cpi_context, data_v2, false, true, None)?;

    //create master edition account
    let cpi_context = CpiContext::new(
        ctx.accounts.token_metadata_program.to_account_info(),
        CreateMasterEditionV3 {
            edition: ctx.accounts.master_edition.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            update_authority: ctx.accounts.payer.to_account_info(),
            mint_authority: ctx.accounts.payer.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            metadata: ctx.accounts.metadata.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
        },
    );

    create_master_edition_v3(cpi_context, None)?;
    // let cpi_accounts = MintTo {
    //     mint: ctx.accounts.mint.to_account_info(),
    //     to: ctx.accounts.token_account.to_account_info(),
    //     authority: ctx.accounts.payer.to_account_info(),
    // };

    // let cpi_program = ctx.accounts.token_program.to_account_info();
    // let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    // token::mint_to(cpi_ctx, 1)?;
    // msg!("Token Minted");

    // let account_info = vec![
    //     ctx.accounts.metadata.to_account_info(),
    //     ctx.accounts.mint.to_account_info(),
    //     ctx.accounts.mint_authority.to_account_info(),
    //     ctx.accounts.payer.to_account_info(),
    //     ctx.accounts.token_metadata_program.to_account_info(),
    //     ctx.accounts.token_program.to_account_info(),
    //     ctx.accounts.system_program.to_account_info(),
    //     ctx.accounts.rent.to_account_info(),
    // ];

    // let creator = vec![
    //     mpl_token_metadata::state::Creator {
    //         address: creator_key,
    //         verified: false,
    //         share: 100,
    //     },
    //     mpl_token_metadata::state::Creator {
    //         address: ctx.accounts.mint_authority.key(),
    //         verified: false,
    //         share: 0,
    //     },
    // ];

    // invoke(
    //     &create_metadata_accounts_v3(
    //         ctx.accounts.token_metadata_program.key(),
    //         ctx.accounts.metadata.key(),
    //         ctx.accounts.mint.key(),
    //         ctx.accounts.mint_authority.key(),
    //         ctx.accounts.payer.key(),
    //         ctx.accounts.payer.key(),
    //         title,
    //         symbol,
    //         uri,
    //         Some(creator),
    //         1,
    //         true,
    //         false,
    //         None,
    //         None,
    //         None,
    //     ),
    //     account_info.as_slice(),
    // )?;

    // let master_edition_infos = vec![
    //     ctx.accounts.master_edition.to_account_info(),
    //     ctx.accounts.mint.to_account_info(),
    //     ctx.accounts.mint_authority.to_account_info(),
    //     ctx.accounts.payer.to_account_info(),
    //     ctx.accounts.metadata.to_account_info(),
    //     ctx.accounts.token_metadata_program.to_account_info(),
    //     ctx.accounts.token_program.to_account_info(),
    //     ctx.accounts.system_program.to_account_info(),
    //     ctx.accounts.rent.to_account_info(),
    // ];

    // invoke(
    //     &create_master_edition_v3(
    //         ctx.accounts.token_metadata_program.key(),
    //         ctx.accounts.master_edition.key(),
    //         ctx.accounts.mint.key(),
    //         ctx.accounts.payer.key(),
    //         ctx.accounts.mint_authority.key(),
    //         ctx.accounts.metadata.key(),
    //         ctx.accounts.payer.key(),
    //         Some(0),
    //     ),
    //     master_edition_infos.as_slice(),
    // )?;
    msg!("Master Edition Nft Minted");
    Ok(())
}
