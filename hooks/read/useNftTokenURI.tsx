import { useContractRead } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function useNftTokenURI( {
    poolAddress,
    tokenId
  }: {
    poolAddress: string,
    tokenId: any,
  }) {
    const { data, isError, isLoading } = useContractRead({
        address: poolAddress,
        abi: StakingPool.abi,
        functionName: 'tokenURI',
        args: [tokenId],
    })
    return { data, isError, isLoading };
}
  