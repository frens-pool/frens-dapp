import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";

export function useCreatePool() {
  const { address: ownerAddress } = useAccount();
  const validatorLocked = false;
  const network = useNetworkName();

  const { config } = usePrepareContractWrite({
    address: FrensContracts[network].StakingPoolFactory.address,
    abi: FrensContracts[network].StakingPoolFactory.abi,
    functionName: "create",
    args: [ownerAddress, validatorLocked],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
