import { usePrepareContractWrite, useContractWrite, Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";
import { useEffect } from 'react'

export function useStake({
  poolAddress
}: {
  poolAddress: Address;
}) {
  const network = useNetworkName();

  const { config , error : prepError, isError: isPrepError} = usePrepareContractWrite({
    address: poolAddress,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "stake"
  });


  useEffect(() => {
    if (isPrepError && prepError) {
      console.error('Preparation Error:', prepError.message)
      // You can also display the error to the user if needed
    }
  }, [isPrepError, prepError])

  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

  return { data, isLoading, isSuccess, write, error };
}
