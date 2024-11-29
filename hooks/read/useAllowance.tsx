import { Address, useContractRead, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function useAllowance(address: Address) {
  const network = useNetworkName();

  const { data, isLoading, isSuccess } = useContractRead({
    address: FrensContracts[network].SSVTokenContract.address,
    abi: FrensContracts[network].SSVTokenContract.abi,
    functionName: "allowance",
    args: [address, FrensContracts[network].SSVNetworkContract.address],
  });

  return { data, isLoading, isSuccess };
}
