import { FrensContracts } from "#/utils/contracts";
import { useContractRead, useNetwork } from "wagmi";
  
export function useSSVReadTest() {
    const { chain } = useNetwork();
    const contract = FrensContracts.SSVRegistryrContract

    const { data, isError, isLoading } = useContractRead({
        address: contract.address,
        abi: contract.abi,
        functionName: 'version',
    })

    return { data, isError, isLoading };
}
  