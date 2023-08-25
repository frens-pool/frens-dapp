import { parseEther } from "viem";
import { usePrepareContractWrite, useContractWrite, Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function useDeposit({ address, val }: { address: Address; val: string }) {
  const network = useNetworkName();

  const { config, error: prepare_error } = usePrepareContractWrite({
    address: address,
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
