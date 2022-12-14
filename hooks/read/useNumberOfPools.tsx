import { useContractRead, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";

export function useNumberOfPools() {

    const { data, isError, isLoading } = useContractRead({
        address: FrensContracts.StakingPoolFactory.address,
        abi: FrensContracts.StakingPoolFactory.abi,
        functionName: 'numberOfStakingPools',
    })

    return { data, isError, isLoading };
}
