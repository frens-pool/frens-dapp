import Link from "next/link";
import Image from "next/image";
import { formatEther } from "viem";
import { PoolType } from "#/types/commonTypes";

import { useState, useEffect, ChangeEvent } from "react";
import { useNetwork, Address } from "wagmi";
import {
  ssvValidatorCostByOwnerApi,
  ssvClusterListByOwnerApi,
} from "#/utils/externalUrls";
import moment from "moment";
import { TopUpClusterBalance } from "./TopUpClusterBalance";

interface ClusterInfo {
  id: number;
  balance: bigint;
  operators: number[];
  feePerBlockWei: bigint;
}

interface PoolSSVBalance {
  poolAddress: Address;
}

function PoolSSVBalance({ poolAddress }: PoolSSVBalance) {
  const { chain } = useNetwork();
  const [clusterInfo, setClusterInfo] = useState<ClusterInfo>();
  const [clusterBalance, setClusterBalance] = useState<bigint>(BigInt(0));
  const [runway, setRunway] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (!chain) return;
    fetchClusterData();
  }, [chain]);

  const fetchClusterData = async () => {
    const clusterListdata = await fetch(
      ssvClusterListByOwnerApi(1, 1, poolAddress, chain)
    );
    const clusterListdataJson = await clusterListdata.json();
    const validatorCost = await fetch(
      ssvValidatorCostByOwnerApi(poolAddress, chain)
    );
    const validatorCostJson = await validatorCost.json();

    if (clusterListdataJson?.clusters[0] && validatorCostJson) {
      const balance = BigInt(clusterListdataJson.clusters[0].balance);
      setClusterBalance(balance);
      const feePerBlockWei = BigInt(validatorCostJson.fees?.per_block?.wei);
      setClusterInfo({
        id: clusterListdataJson.clusters[0].id,
        balance,
        operators: clusterListdataJson.clusters[0].operators,
        feePerBlockWei,
      });

      const r =
        feePerBlockWei === BigInt(0)
          ? BigInt(0)
          : (balance * BigInt(12)) / feePerBlockWei;
      setRunway(r);
    }
  };

  const updateSSVBalance = (addedValue: number) => {
    setClusterBalance(
      (prevBal: bigint) => prevBal + BigInt(addedValue * 1000000000000000000)
    );
  };

  console.log("clusterBalance", clusterBalance);

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="mt-4 w-full grid grid-cols-2 gap-2">
        <div className="h-full flex flex-col items-center justify-center">
          <div>Cluster Balance</div>
          <div className="text-frens-main">
            {formatEther(clusterBalance)} SSV
          </div>
        </div>

        <div className="h-full flex flex-col items-center justify-center">
          <div>Cluster Runway</div>
          <div className="text-frens-main">
            {`${moment
              .duration(runway?.toString(), "seconds")
              .locale("en")
              .humanize()}`}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <TopUpClusterBalance
          poolAddress={poolAddress}
          updateSSVBalance={updateSSVBalance}
        />
      </div>
    </div>
  );
}

export default PoolSSVBalance;
