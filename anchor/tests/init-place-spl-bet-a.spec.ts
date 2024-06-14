import { BettingDapp } from "../target/types/betting_dapp";
import { helpers } from "./helpers";
import * as anchor from "@coral-xyz/anchor";

describe("betting-dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BettingDapp as anchor.Program<BettingDapp>;
  const helperFunctions = helpers();

  const programId = program.programId;

  it("Initialize PlaceSPLBet For Bet A", async () => {
    let [userSplBalancePda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        helperFunctions.tokenAccountforMint.toBuffer(),
        Buffer.from("spl_bet_a"),
      ],
      programId
    );

    const tx = await program.methods
      .initPlaceSplBetA()
      .accounts({
        userSplBalance: userSplBalancePda,
        userAuthority: helperFunctions.signer.publicKey,
        splTokenMint: helperFunctions.mint,
        userTokenAccount: helperFunctions.tokenAccountforMint,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
