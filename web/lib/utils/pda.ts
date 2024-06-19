import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export function getBetStatePDA({ id, programId }: { id: number, programId: PublicKey }) {
    const u16 = new Uint16Array([id])
    const [BetStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from('be'),
            new Uint8Array(u16.buffer),
        ],
        programId
    );
    return { BetStatePDA }
}

export function getUserSolPDA({ id, programId, isBetA, user }: {
    id: number, programId: PublicKey,
    isBetA: boolean, user: PublicKey | null
}) {

    const u16 = new Uint16Array([id])
    const [UserBetSolAccount] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(isBetA ? 'sol_bet_a' : 'sol_bet_b'),
            user?.toBuffer() ?? Buffer.from(''),
            new Uint8Array(u16.buffer),
        ],
        programId
    );
    return UserBetSolAccount
}

export function getBetFundsPDA({ id, programId }: { id: number, programId: PublicKey }) {
    const u16 = new Uint16Array([id])
    const [BetFundsPDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from('program_funds'),
            new Uint8Array(u16.buffer),
        ],
        programId
    );
    return { BetFundsPDA }
}