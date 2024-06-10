import * as anchor from "@project-serum/anchor";
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

  it("Successfully read program state", async () => {
    const tx = await program.methods
      .readProgramState()
      .accounts({
        programStateAccount: programStateAccountPda,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
