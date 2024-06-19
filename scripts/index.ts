import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { BettingDapp } from "../anchor/target/types/betting_dapp";
import fs from 'fs'
import { idl } from './idl'
import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
export function getBettingProgram(provider: AnchorProvider, address: string) {
    const idlA = { ...idl, address };
    return new Program(idlA as BettingDapp, provider);
}

function main() {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
    // Load the wallet keypair from a file
    const walletKeypair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(fs.readFileSync('./key/my-keypair.json', 'utf8')))
    );
    const wallet = new Wallet(walletKeypair)
    const provider = new AnchorProvider(connection, wallet)
    const program = getBettingProgram(provider, 'DAWzUuyZVRej6i3xAH4Cui3BW13TVCSZ3jdA4vbBLLQw')
    initProgramState(program)
    // ProgramFunds(program)
    // setWinner(program)
}
main()

async function initProgramState(
    program: Program<BettingDapp>
) {
    const result = await program.methods.initializeProgramState().accounts({}).rpc()
    return result
}
async function ProgramFunds(program: Program<BettingDapp>) {

    const [statePda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('program-funds')],
        new PublicKey(program.programId))
    console.log(statePda.toString())
}
async function setWinner(program: Program<BettingDapp>) {

    const [statePda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('state')],
        new PublicKey(program.programId))
    const result = await program.methods.setProgramState(1, 1, 1).accounts({ programStateAccount: statePda }).rpc()
    return result
}