import { useContractRead, useNetwork } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function usePoolOwner( {
    address,
  }: {
    address: string,
  }) {
    const { chain } = useNetwork();

    const { data, isError, isLoading } = useContractRead({
        address: address,
        abi: StakingPool.abi,
        functionName: 'getOwner',
    })

    return { data, isError, isLoading };
}
  