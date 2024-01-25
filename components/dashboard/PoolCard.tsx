import Link from "next/link";
import Image from "next/image";
import { formatEther } from "viem";
import { PoolType } from "#/types/commonTypes";
import { ExitValidator } from "#/components/dashboard/ExitValidator";

import { useState, useEffect, ChangeEvent } from "react";
import { useNetwork } from "wagmi";
import {
  ssvValidatorCostByOwnerApi,
  ssvClusterListByOwnerApi,
} from "#/utils/externalUrls";
import moment from "moment";

interface PoolCard {
  pool: PoolType;
  showClusterInfo: boolean;
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
      className="relative flex flex-col items-center space-x-1 md:space-x-3 rounded-lg border border-gray-300 bg-white px-2 md:px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="w-full flex flex-row justify-between">
        <div className="flex justify-center mr-6">
          <img
            src="/FRENS-logo-coloured.png"
            alt="FRENS logo"
            className="block h-12 w-10 md:h-12 md:w-9"
          />
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          <div className="h-full flex flex-col items-center justify-center">
            <div>Address</div>
            <div>
              {`${pool.contractAddress.slice(
                0,
                4
              )}...${pool.contractAddress.slice(-4)}`}
            </div>
          </div>

          {showClusterInfo && (
            <div className="h-full flex flex-col items-center justify-center">
              <div>Cluster Balance</div>
              <div className="text-frens-main">
                {clusterInfo && formatEther(BigInt(clusterInfo.balance))} SSV
              </div>
            </div>
          )}

          {showClusterInfo && (
            <div className="h-full flex flex-col items-center justify-center">
              <div>Cluster Runway</div>
              <div className="text-frens-main">
                {`${moment
                  .duration(runway?.toString(), "seconds")
                  .locale("en")
                  .humanize()}`}
              </div>
            </div>
          )}

          {!showClusterInfo && (
            <div className="h-full flex flex-col items-center justify-center">
              <div>Deposits</div>
              <div className="text-frens-main">{pool.deposits.length}</div>
            </div>
          )}

          {!showClusterInfo && (
            <div className="h-full flex flex-col items-center justify-center">
              <div>TVL</div>
              <div className="text-frens-main">
                {formatEther(
                  BigInt(
                    pool.deposits?.reduce(
                      (acc, current) => acc + parseInt(current.amount, 10),
                      0
                    )
                  )
                )}{" "}
                Ξ
              </div>
            </div>
          )}
          <ExitValidator poolAddress={pool.contractAddress}/>
        </div>
      </div>
    </Link>
  );
}

export default PoolCard;
