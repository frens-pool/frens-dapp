import { usePrepareContractWrite, useContractWrite, Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { DepositFileData } from "#/utils/DepositFileData";
import { useNetworkName } from "../useNetworkName";

interface Props {
  poolAddress: Address;
  depositFileData: DepositFileData | undefined;
}

export function useSetPubkey({ poolAddress, depositFileData }: Props) {
  const network = useNetworkName();
  const prefix = (data: string | undefined) => `0x${data ?? ""}`;

  const args = [
    prefix(depositFileData?.pubkey),
    prefix(depositFileData?.withdrawal_credentials),
    prefix(depositFileData?.signature),
    prefix(depositFileData?.deposit_data_root),
  ];

  const { config, error: prepare_error } = usePrepareContractWrite({
    address: poolAddress,
    abi: FrensContracts[network].StakingPool.abi,
    functionName: "setPubKey",
    args,
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  return { data, isLoading, isSuccess, write, prepare_error };
}
