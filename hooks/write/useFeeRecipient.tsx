import { usePrepareContractWrite, useContractWrite, Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function useFeeRecipient({ feeRecipient }: { feeRecipient: Address }) {
  const network = useNetworkName();

  const { config } = usePrepareContractWrite({
    address: FrensContracts[network].SSVNetworkContract.address,
    abi: FrensContracts[network].SSVNetworkContract.abi,
    functionName: "setFeeRecipientAddress",
    args: [feeRecipient],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
