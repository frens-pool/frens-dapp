import { Address, useContractRead, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function usePoolState({ poolAddress }: { poolAddress: Address }) {
  const network = useNetworkName();

  const { data, isLoading, isSuccess } = useContractRead({
    address: poolAddress,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "getState",
  });

  return { data: data, isLoading, isSuccess };
}
