import Link from "next/link";
import Image from "next/image";
import { formatEther } from "viem";
import { PoolType } from "#/types/commonTypes";
import { useGetNetworkFee, useGetMinimumLiquidationCollateral } from "../../hooks/read/useSSVNetworkViews";

export const SSVCard = () => {

  const { data: networkFee, isLoading, isSuccess } = useGetNetworkFee()
  const { data: minimumLiquidationCollateral } = useGetMinimumLiquidationCollateral()

  return (
    <div>Network fee = {networkFee?.toString()} - minimumLiquidationCollateral={minimumLiquidationCollateral?.toString()}</div>
  );
}
