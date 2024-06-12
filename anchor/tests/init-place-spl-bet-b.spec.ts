import * as anchor from "@coral-xyz/anchor";
import { BettingDapp } from "../target/types/betting_dapp";
import { helpers } from "./helpers";

describe("betting-dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BettingDapp as anchor.Program<BettingDapp>;
  const helperFunctions = helpers();

  const programId = program.programId;

  it("Successfully place SPL Bet B", async () => {
    const [userSplBalancePda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        helperFunctions.tokenAccountforMint.toBuffer(),
        Buffer.from("spl_bet_b"),
      ],
      programId
    );

    const tx = await program.methods
      .initPlaceSplBetB()
      .accounts({
        userAuthority: helperFunctions.signer.publicKey,
        splTokenMint: helperFunctions.mint,
        userTokenAccount: helperFunctions.tokenAccountforMint,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
