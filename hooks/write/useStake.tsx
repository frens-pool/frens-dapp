import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function useStake({
  poolAddress
}: {
  poolAddress: string;
}) {
  const network = useNetworkName();

  const { config } = usePrepareContractWrite({
    address: poolAddress,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "stake"
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
