import { FrensContracts } from "#/utils/contracts";
import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  Address,
} from "wagmi";
import { useNetworkName } from "../useNetworkName";

export function useApprove({
  spender,
  value,
}: {
  spender: Address;
  value: string;
}) {
  const network = useNetworkName();

  const SSVTokenContract = FrensContracts[network].SSVTokenContract;

  const { config } = usePrepareContractWrite({
    address: SSVTokenContract.address,
    abi: SSVTokenContract.abi,
    functionName: "approve",
    args: [spender, value],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
