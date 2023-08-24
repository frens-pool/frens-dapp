import { Address, useContractRead } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { BigNumber } from "ethers";
import { useNetworkName } from "../useNetworkName";

export function usePoolShareIDs({ poolAddress }: { poolAddress: Address }) {
  const network = useNetworkName();

  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "getIdsInThisPool",
    watch: true,
  });
  return { data: data as BigNumber[], isError, isLoading };
}
