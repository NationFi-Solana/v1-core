import * as anchor from "@project-serum/anchor";

export const helpers = () => {
  function deriveProgramStateAccountPda(programId: anchor.web3.PublicKey) {
    let [pda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("state")],
      programId
    );
    return pda;
  }

  function deriveProgramTokenAccountForSplPDA(
    programId: anchor.web3.PublicKey,
    mintId: anchor.web3.PublicKey
  ) {
    let [pda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [mintId.toBuffer()],
      programId
    );
    return pda;
  }

  const privatekey = Buffer.from([
    162, 191, 149, 171, 79, 168, 83, 169, 15, 250, 229, 135, 176, 83, 199, 96,
    222, 159, 91, 156, 10, 23, 70, 204, 151, 215, 198, 84, 124, 35, 141, 16,
    226, 197, 182, 72, 182, 188, 196, 89, 173, 51, 102, 140, 27, 9, 162, 42,
    186, 60, 80, 234, 90, 185, 94, 74, 125, 64, 183, 142, 163, 71, 73, 236,
  ]);

  const secondPrivateKey = Buffer.from([
    5, 195, 144, 104, 10, 162, 238, 96, 221, 132, 238, 210, 189, 122, 52, 1, 82,
    23, 200, 201, 165, 187, 226, 164, 81, 125, 193, 16, 109, 189, 187, 59, 65,
    161, 58, 81, 199, 104, 62, 176, 25, 154, 157, 19, 177, 193, 177, 133, 247,
    182, 35, 16, 64, 102, 146, 209, 85, 206, 171, 69, 46, 15, 237, 158,
  ]);

  const signer = anchor.web3.Keypair.fromSecretKey(privatekey);
  const secondSigner = anchor.web3.Keypair.fromSecretKey(secondPrivateKey);

  return {
    deriveProgramStateAccountPda,
    deriveProgramTokenAccountForSplPDA,
    signer,
    secondSigner,
    mint: new anchor.web3.PublicKey(
      "3yZEgJVK41MvLuWKvHh6bpaLwqynaQG7BYwB4bPdCnFj"
    ),
    tokenAccountforMint: new anchor.web3.PublicKey(
      "C5r3YfGioRAziHonypJDpMG9qa94yLSN8qXwNjmcjwTs"
    ),
  };
};
