import { Address, useContractRead, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function usePoolPubKey({ address }: { address: Address }) {
  const network = useNetworkName();

  const { data, isLoading, isSuccess } = useContractRead({
    address: address,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "pubKey",
  });

  return { data: data as Address, isLoading, isSuccess };
}
