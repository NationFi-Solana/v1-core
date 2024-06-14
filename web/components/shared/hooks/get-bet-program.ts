import { useAnchorProvider } from "@/components/solana/solana-provider";
import { PublicKey } from "@solana/web3.js";
import { getBettingProgram } from "@test/anchor";

export function useGetBetProgram() {

    const provider = useAnchorProvider();
    const addr = 'EsLLsztAmMrXdmGv7hRjdp2MdtSStEErGakmwrLretXQ';
    // const programId = useMemo(() => getBettingProgramId(), []);
    const programId = new PublicKey(addr);
    const program = getBettingProgram(provider, addr);
    return { program, programId }
}