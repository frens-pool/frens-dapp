import { FrensContracts } from "#/utils/contracts";
import { usePrepareContractWrite, useContractWrite, useNetwork } from "wagmi";

export function useAllowance({
  spender,
  value,
}: {
  spender: string;
  value: string;
}) {
  const { chain } = useNetwork();

  const SSVTokenContract = FrensContracts.SSVTokenContract
  const registerContract = FrensContracts.SSVNetworkContract

  const { config } = usePrepareContractWrite({
    address: SSVTokenContract.address,
    abi: SSVTokenContract.abi,
    functionName: "approve",
    args: [registerContract.address, "21342395400000000000"],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
