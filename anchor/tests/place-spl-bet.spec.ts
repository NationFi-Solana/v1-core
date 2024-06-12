import * as anchor from '@coral-xyz/anchor';
import { BettingDapp } from '../target/types/betting_dapp';
import { helpers } from './helpers';

describe('betting-dapp', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BettingDapp as anchor.Program<BettingDapp>;
  const helperFunctions = helpers();

  const programStateAccountPda = helperFunctions.deriveProgramStateAccountPda(
    program.programId
  );

  const programId = program.programId;

  it('Successfully place SPL Bet', async () => {
    const ownerTokenAddress = await anchor.utils.token.associatedAddress({
      mint: helperFunctions.mint,
      owner: programId,
    });

    const [userSplBalancePda,] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        helperFunctions.tokenAccountforMint.toBuffer(),
        Buffer.from('spl_bet_b'),
      ],
      programId
    );

    const tx = await program.methods
      .placeSplBet(0, new anchor.BN(1000), 9)
      .accounts({
        programStateAccount: programStateAccountPda,
        splTokenMint: helperFunctions.mint,
        programTokenAccountForSpl: ownerTokenAddress,
        userAuthority: helperFunctions.signer.publicKey,
        programAuthority: programId,
        userTokenAccount: helperFunctions.tokenAccountforMint,
        userSplBalance: userSplBalancePda,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log('Your transaction signature', tx);
  });
});
