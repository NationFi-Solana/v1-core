import * as anchor from "@coral-xyz/anchor";
import { BettingDapp } from "../target/types/betting_dapp";
import { helpers } from "./helpers";
describe("betting-dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BettingDapp as anchor.Program<BettingDapp>;
  const helperFunctions = helpers();

  const programId = program.programId;

  it("PlaceSolBet for Bet A", async () => {
    let [userSolBalanceAPda, _0] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("sol_bet_a"), helperFunctions.signer.publicKey.toBuffer()],
      programId
    );

    let [programStateAccount, _1] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("state")],
        programId
      );

    let [programFundsAccount, _2] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("program-funds")],
        programId
      );

    const tx = await program.methods
      .placeSolBet(1, new anchor.BN(1))
      .accounts({
        programStateAccount: programStateAccount,
        userAuthority: helperFunctions.signer.publicKey,
        userSolBalance: userSolBalanceAPda,
        programFundsAccount: programFundsAccount,
      })
      .signers([helperFunctions.signer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
