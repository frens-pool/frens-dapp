import { parseEther } from "viem";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function useDeposit({ address, val }: { address: string; val: string }) {
  const network = useNetworkName();

  const { config, error: prepare_error } = usePrepareContractWrite({
    address: address as `0x${string}`,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "depositToPool",
    value: parseEther(val),
  });
  const { data, isLoading, isSuccess, isError, write, error, status } =
    useContractWrite(config);
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    write,
    error,
    status,
    prepare_error,
  };
}
