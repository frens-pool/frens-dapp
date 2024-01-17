import { useAccount, useContractWrite, usePrepareContractWrite, Address } from "wagmi";

import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function useClaimReward({ poolAddress, nftID }: { poolAddress: Address, nftID: string }) {
  const network = useNetworkName();

  const { config } = usePrepareContractWrite({
    address: poolAddress ,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "claim",
    args: [nftID],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
