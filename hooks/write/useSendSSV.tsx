import { usePrepareContractWrite, useContractWrite, Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";
import { BigNumber } from "ethers";

export function useSendSSV({
  recipient,
  amount,
}: {
  recipient: Address;
  amount: BigInt;
}) {
  const network = useNetworkName();

  const { config } = usePrepareContractWrite({
    address: FrensContracts[network].SSVTokenContract.address,
    abi: FrensContracts[network].SSVTokenContract.abi,
    functionName: "transfer",
    args: [recipient, amount],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
