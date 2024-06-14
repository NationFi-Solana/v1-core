import * as anchor from "@coral-xyz/anchor";
import { BettingDapp } from "../target/types/betting_dapp";
import { helpers } from "./helpers";

describe("betting-dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BettingDapp as anchor.Program<BettingDapp>;
  const helperFunctions = helpers();

  const programId = program.programId;

  it("Initialize PlaceSOLBet For Bet A", async () => {
    let [userSolBalanceAPda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("sol_bet_a"), helperFunctions.signer.publicKey.toBuffer()],
      programId
    );

    const tx = await program.methods
      .initPlaceSolBetA()
      .accounts({
        userSolBalance: userSolBalanceAPda,
        userAuthority: helperFunctions.signer.publicKey,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
