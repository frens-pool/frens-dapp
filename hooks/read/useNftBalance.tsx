import { useContractRead } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function useNftBalance( {
    poolAddress,
    ownerAddress
  }: {
    poolAddress: string,
    ownerAddress: string,
  }) {
    const { data, isError, isLoading } = useContractRead({
        addressOrName: poolAddress,
        contractInterface: StakingPool.abi,
        functionName: 'balanceOf',
        args: [ownerAddress],
    })
    return { data, isError, isLoading };
}
  