import { FrensContracts } from "#/utils/contracts";
import { useContractRead, useNetwork } from "wagmi";
import { useNetworkName } from "../useNetworkName";

export function useSSVReadTest() {
    const network = useNetworkName();

    const { data, isError, isLoading } = useContractRead({
        address: FrensContracts[network].SSVRegistryrContract.address,
        abi: FrensContracts[network].SSVRegistryrContract.abi,
        functionName: 'version',
    })

    return { data, isError, isLoading };
}
