import { ethers } from 'ethers';
import {
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { FrensContracts } from "utils/contracts";

export function useDeposit({ address, val, proof }: { address: string, val: string, proof: string[] }) {

  const { config } = usePrepareContractWrite({
    address: address,
    abi: FrensContracts.StakingPool.abi,
    functionName: 'depositToPool',
    overrides: {
      value: ethers.utils.parseEther(val),
    },
    args: [proof],
  })
  const { data, isLoading, isSuccess, isError, write, error, status } = useContractWrite(config)
  return { data, isLoading, isSuccess, isError, write };
}
