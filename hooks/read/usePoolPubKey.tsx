import { Address, useContractRead, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";

export function usePoolPubKey({
  address,
}: {
  address: Address,
}) {
  const { chain } = useNetwork();

  const { data, isLoading, isSuccess } = useContractRead({
    address: address,
    abi: FrensContracts.StakingPool.abi,
    functionName: 'pubKey',
  })

  return { data: data as Address, isLoading, isSuccess };
}
