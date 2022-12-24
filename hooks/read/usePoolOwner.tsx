import { useContractRead, useNetwork } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function usePoolOwner( {
    address,
  }: {
    address: string,
  }) {
    const { chain } = useNetwork();

    const { data, isLoading, isSuccess } = useContractRead({
        address: address,
        abi: StakingPool.abi,
        functionName: 'owner',
    })

    return { data, isLoading, isSuccess };
}
  