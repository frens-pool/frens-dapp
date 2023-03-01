import { Address, useContractRead } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { BigNumber } from "ethers";

export function usePoolTokenIDs( {
  poolAddress,
}: {
  poolAddress: Address,
}) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: FrensContracts.StakingPool.abi,
    functionName: 'getIdsInThisPool',
  })
  return { data: data as BigNumber[], isError, isLoading };
}