import Link from "next/link";
import Image from "next/image";
import { formatEther } from "viem";
import { PoolType } from "#/types/commonTypes";

import { useState, useEffect, ChangeEvent } from "react";
import { useNetwork } from "wagmi";
import {
  ssvValidatorCostByOwnerApi,
  ssvClusterListByOwnerApi,
} from "#/utils/externalUrls";
import moment from "moment";
import { PoolStateVisual } from "../shared/PoolStateVisual";

interface PoolCard {
  pool: PoolType;
  creator?: any;
  showClusterInfo: boolean;
  poolState?: any;
}

interface ClusterInfo {
  id: number;
  balance: bigint;
  operators: number[];
  feePerBlockWei: bigint;
}

function PoolCard({ pool, showClusterInfo }: PoolCard) {
  const { chain } = useNetwork();
  const [clusterInfo, setClusterInfo] = useState<ClusterInfo>();
  const [runway, setRunway] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (!chain) return;
    const fetchClusterData = async () => {
      const clusterListdata = await fetch(
        ssvClusterListByOwnerApi(1, 1, pool.contractAddress, chain)
      );
      const clusterListdataJson = await clusterListdata.json();
      const validatorCost = await fetch(
        ssvValidatorCostByOwnerApi(pool.contractAddress, chain)
      );
      const validatorCostJson = await validatorCost.json();

      if (clusterListdataJson?.clusters[0] && validatorCostJson) {
        const balance = BigInt(clusterListdataJson.clusters[0].balance);
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
    fetchClusterData();
  }, [chain]);

  return (
    <Link
      href={`/pool/${pool.contractAddress}`}
      key={pool.contractAddress}
      className="w-full bg-white shadow-[0px_3px_8px_0px_rgba(52,44,91,0.15)] py-[18px] lg:pt-[22px] lg:pb-[19px] px-[18px] lg:px-[35px] rounded-[5px]"
    >
      <div className="w-full grid grid-cols-3 gap-x-8 gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-start">
        <div className="flex flex-1 flex-col items-start justify-end">
          <div className="text-[10px] uppercase text-frens-blue mb-[4px]">
            Pool
          </div>
          <div className="text-[16px] lg:text-[20px] font-bold lg:font-extrabold">
            {`${pool.contractAddress.slice(
              0,
              4
            )}...${pool.contractAddress.slice(-4)}`}
          </div>
        </div>
        {pool.creator && (
          <div className="hidden lg:flex flex-col items-start justify-end lg:ml-10">
            <div className="text-[10px] uppercase text-frens-blue mb-[4px]">
              Pool owner
            </div>
            <div className="font-semibold">
              {`${pool.creator.slice(0, 4)}...${pool.creator.slice(-4)}`}
            </div>
          </div>
        )}

        {showClusterInfo && (
          <div className="flex flex-col items-start justify-end lg:ml-10">
            <div className="text-[10px] uppercase text-frens-blue mb-[4px]">
              Cluster Balance
            </div>
            <div className="font-semibold">
              {clusterInfo && formatEther(BigInt(clusterInfo.balance))} SSV
            </div>
          </div>
        )}

        {showClusterInfo && (
          <div className="flex flex-col items-start justify-end lg:ml-10">
            <div className="text-[10px] uppercase text-frens-blue mb-[4px]">
              Cluster Runway
            </div>
            <div className="font-regular lg:font-semibold">
              {`${moment
                .duration(runway?.toString(), "seconds")
                .locale("en")
                .humanize()}`}
            </div>
          </div>
        )}

        {!showClusterInfo && (
          <div className="flex flex-col items-start justify-end lg:ml-10">
            <div className="text-[10px] uppercase text-frens-blue mb-[4px]">
              Pool Stakes
            </div>
            <div className="font-regular lg:font-semibold">
              {pool.deposits.length}
            </div>
          </div>
        )}

        {!showClusterInfo && (
          <div className="flex flex-col items-start justify-end lg:ml-10">
            <div className="text-[10px] uppercase text-frens-blue mb-[4px]">
              Collected
            </div>
            <div className="font-regular lg:font-semibold">
              {formatEther(
                BigInt(
                  pool.deposits?.reduce(
                    (acc, current) => acc + parseInt(current.amount, 10),
                    0
                  )
                )
              )}{" "}
              ETH
            </div>
          </div>
        )}

        {/* :::::: THIS NEEDS CONDITION OF POOLSTATE :::::: */}
        <div className="hidden lg:flex flex-col items-start justify-end lg:ml-10">
          <div className="text-[10px] uppercase text-frens-blue mb-[4px]">
            Pool Status
          </div>
          <PoolStateVisual poolState={pool.poolState} showDetails={""} />
        </div>
      </div>
    </Link>
  );
}

export default PoolCard;
