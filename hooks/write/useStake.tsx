import { usePrepareContractWrite, useContractWrite } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";

export function useStake({
  poolAddress,
  depositFileData,
}: {
  poolAddress: string;
  depositFileData: any;
}) {
  const args = [
    `0x${depositFileData.pubkey}`,
    `0x${depositFileData.withdrawal_credentials}`,
    `0x${depositFileData.signature}`,
    `0x${depositFileData.deposit_data_root}`,
  ];

  // console.log("ARGS=", args);

  const { config } = usePrepareContractWrite({
    address: poolAddress,
    abi: StakingPool.abi,
    functionName: "stake",
    args,
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
