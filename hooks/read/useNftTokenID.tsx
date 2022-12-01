import { useContractRead } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function useNftTokenID( {
    poolAddress,
    ownerAddress,
    tokenId
  }: {
    poolAddress: string,
    ownerAddress: string,
    tokenId: number,
  }) {
    const { data, isError, isLoading } = useContractRead({
        addressOrName: poolAddress,
        contractInterface: StakingPool.abi,
        functionName: 'tokenOfOwnerByIndex',
        args: [ownerAddress, tokenId],
    })
    return { data, isError, isLoading };
}
  