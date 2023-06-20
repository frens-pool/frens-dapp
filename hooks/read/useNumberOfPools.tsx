import { FrensContracts } from "utils/contracts";
import { useContractRead } from "wagmi";
import { useNetworkName } from "../useNetworkName";

export function useNumberOfPools() {
  const network = useNetworkName();

  const { data, isError, isLoading } = useContractRead({
    address: FrensContracts[network].StakingPoolFactory.address,
    abi: FrensContracts[network].StakingPoolFactory.abi,
    functionName: "numberOfStakingPools",
  });

  return { data, isError, isLoading };
}
