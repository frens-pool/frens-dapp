import { useContractRead } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function usePoolTokenIDs( {
  poolAddress,
}: {
  poolAddress: string,
}) {
  const { data, isError, isLoading } = useContractRead({
      addressOrName: poolAddress,
      contractInterface: StakingPool.abi,
      functionName: 'getIdsInThisPool',
  })
  return { data, isError, isLoading };
}
  