import { Address, useContractRead, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
  
export function usePoolOwner( {
    address,
  }: {
    address: Address,
  }) {
    const { chain } = useNetwork();

    const { data, isLoading, isSuccess } = useContractRead({
        address: address,
        abi: FrensContracts.StakingPool.abi,
        functionName: 'owner',
    })

    return { data: data as Address, isLoading, isSuccess };
}
  