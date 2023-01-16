import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useAccount,
} from "wagmi";

import { FrensContracts } from "utils/contracts";

export function useCreatePool() {
  const { chain } = useNetwork();
  const { address: ownerAddress } = useAccount();

  const { config } = usePrepareContractWrite({
    address: FrensContracts.StakingPoolFactoryNoProxy.address,
    abi: FrensContracts.StakingPoolFactory.abi,
    functionName: "create",
    args: [ownerAddress, false],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
