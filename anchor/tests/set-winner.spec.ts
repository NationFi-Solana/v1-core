import * as anchor from "@coral-xyz/anchor";
import { BettingDapp } from "../target/types/betting_dapp";
import { helpers } from "./helpers";

describe("betting-dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BettingDapp as anchor.Program<BettingDapp>;
  const helperFunctions = helpers();

  const programId = program.programId;

  it("Set Winner To A", async () => {
    let [programStateAccount, _1] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("state")],
        programId
      );

    const tx = await program.methods
      .setProgramState(1, 1, 1)
      .accounts({
        programStateAccount: programStateAccount,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
