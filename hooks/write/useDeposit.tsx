import { ethers } from 'ethers';
import {
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import StakingPool from "../../utils/StakingPool.json";

export function useDeposit({ address, val }: { address: string, val: string }) {

  const { config } = usePrepareContractWrite({
    address: address,
    abi: StakingPool.abi,
    functionName: 'depositToPool',
    overrides: {
      value: ethers.utils.parseEther(val),
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  return { data, isLoading, isSuccess, write };
}
