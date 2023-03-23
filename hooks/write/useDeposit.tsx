import { ethers } from 'ethers';
import {
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { FrensContracts } from "utils/contracts";

export function useDeposit({ address, val }: { address: string, val: string }) {

  const { config } = usePrepareContractWrite({
    address: address,
    abi: FrensContracts.StakingPool.abi,
    functionName: 'depositToPool',
    overrides: {
      value: ethers.utils.parseEther(val),
    },
  })
  const { data, isLoading, isSuccess, isError, write } = useContractWrite(config)
  return { data, isLoading, isSuccess, isError, write };
}
