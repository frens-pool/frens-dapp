import { FrensContracts } from "#/utils/contracts";
import { useContractRead } from "wagmi";
import { useNetworkName } from "../useNetworkName";

function genericCall({ functionName }: { functionName: string }) {
  const network = useNetworkName();

  const { data, isLoading, isSuccess } = useContractRead({
    address: FrensContracts[network].SSVNetworkViewsContract.address,
    abi: FrensContracts[network].SSVNetworkViewsContract.abi,
    functionName: functionName
  })

  return { data, isLoading, isSuccess };
}


export function useGetNetworkFee() {
  return genericCall({ functionName: 'getNetworkFee' })
}

export function useGetMinimumLiquidationCollateral() {
  return genericCall({ functionName: 'getMinimumLiquidationCollateral' })
}
