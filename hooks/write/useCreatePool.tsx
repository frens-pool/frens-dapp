import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useAccount,
} from "wagmi";

import { FrensContracts } from "utils/contracts";

export function useCreatePool(
  validatorLocked: boolean,
  frensLocked: boolean,
  poolMin: string,
  poolMax: string,
  merkleRoot: any
) {
  const { address: ownerAddress } = useAccount();
  const { config } = usePrepareContractWrite({
    address: FrensContracts.StakingPoolFactory.address,
    abi: FrensContracts.StakingPoolFactory.abi,
    functionName: "create",
    args: [ownerAddress, validatorLocked, frensLocked, poolMin, poolMax, merkleRoot],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
