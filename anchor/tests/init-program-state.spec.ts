import * as anchor from "@coral-xyz/anchor"
import { BettingDapp } from "../target/types/betting_dapp";
import { helpers } from "./helpers";

describe("betting-dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BettingDapp as anchor.Program<BettingDapp>;
  const helperFunctions = helpers();

  const programStateAccountPda = helperFunctions.deriveProgramStateAccountPda(
    program.programId
  );

  it("Successfully initialize program state account", async () => {
    const tx = await program.methods
      .initializeProgramState()
      .accounts({
        signer: helperFunctions.signer.publicKey,
        // programStateAccount: programStateAccountPda,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
