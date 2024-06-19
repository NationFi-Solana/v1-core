import { useAnchorProvider } from "@/components/solana/solana-provider";
import { getBettingProgram } from "@test/anchor";
import { useMemo } from "react";

export function useGetBetProgram() {
    const provider = useAnchorProvider();
    const program = useMemo(() => {
        return getBettingProgram(provider,)
    }, [provider]);
    return { program, programId: program.programId }
}