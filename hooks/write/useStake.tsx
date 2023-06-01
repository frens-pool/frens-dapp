import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { FrensContracts } from "utils/contracts";

export function useStake({
  poolAddress
}: {
  poolAddress: string;
}) {


  const { config } = usePrepareContractWrite({
    address: poolAddress,
    abi: FrensContracts.StakingPool.abi,
    functionName: "stake"
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
