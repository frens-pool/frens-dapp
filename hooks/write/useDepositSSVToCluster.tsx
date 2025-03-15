import { parseEther } from "viem";
import { usePrepareContractWrite, useContractWrite, Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";
import { useClusterScanner } from "../read/useClusterScanner";

export function useDepositSSVToCluster({ ownerAddress, operatorIds, amount }: { ownerAddress: Address; operatorIds: number[]; amount: BigInt }) {
  const network = useNetworkName();

  const { data: cluster } = useClusterScanner(ownerAddress, operatorIds);


  const { config, error: prepare_error } = usePrepareContractWrite({
    address: FrensContracts[network].SSVNetworkContract.address,
    abi: FrensContracts[network].SSVNetworkContract.abi,
    functionName: "deposit",
    args: [ownerAddress, operatorIds, amount, cluster?.cluster],
  });



  const { data, isLoading, isSuccess, isError, write, error, status } =
    useContractWrite(config);


  console.log(`----useDepositSSVToCluster`)
  console.log(`ownerAddress`, ownerAddress)
  console.log(`operatorIds`, operatorIds)
  console.log(`amount`, amount)
  console.log(`cluster`, cluster?.cluster)
  console.log(`config`, config)
  console.log(`isLoading`, isLoading)
  console.log(`isSuccess`, isSuccess)
  console.log(`isError`, isError)
  console.log(`error`, error)
  console.log(`status`, status)
  console.log(`useDepositSSVToCluster----`)

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    write,
    error,
    status,
    prepare_error,
  };
}
