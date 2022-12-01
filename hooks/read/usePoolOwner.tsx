import { useContractRead, useNetwork } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function usePoolOwner( {
    address,
  }: {
    address: string,
  }) {
    const { chain } = useNetwork();

    const { data, isError, isLoading } = useContractRead({
        addressOrName: address,
        contractInterface: StakingPool.abi,
        functionName: 'getOwner',
    })

    return { data, isError, isLoading };
}
  