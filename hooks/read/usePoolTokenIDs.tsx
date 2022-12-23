import { useContractRead } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function usePoolTokenIDs( {
  poolAddress,
}: {
  poolAddress: string,
}) {
  const { data, isError, isLoading } = useContractRead({
      address: poolAddress,
      abi: StakingPool.abi,
      functionName: 'getIdsInThisPool',
  })
  return { data, isError, isLoading };
}
  