"use client";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "components/shared/Header";
import { useClusterScanner } from "#/hooks/read/useClusterScanner";
import { SSVRemoveValidator } from "#/components/operator/SsvRemoveValidator";
import { Address, useAccount, useBalance, useNetwork } from "wagmi";
import { usePoolPubKey } from "#/hooks/read/usePoolPubKey";
import { ssvOwnerClustersApi } from "#/utils/externalUrls";

const Clusters: NextPage = () => {
  const params = useParams();
  const poolAddress = params?.pool as Address;
  const { chain } = useNetwork();
  const [clusters, setClusters] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(ssvOwnerClustersApi(poolAddress, chain));
      const data = await response.json();
      debugger;
      setClusters(data.clusters);
    };
    fetchData();
  }, []);

  if (!clusters) {
    return null;
  }

  return (
    <div>
      <Header />
      {/* Content */}
      <main className="relative -mt-32 ">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg px-5 py-6 shadow sm:px-6">
            <div className="relative isolate overflow-hidden pt-0">
              <div>
                CL
                {clusters.map((cluster: any, i: any) => {
                  return (
                    <li key={i}>
                      Cluster #{i}
                      <br />
                      <pre>{JSON.stringify(cluster, null, 2)}</pre>
                      <br />
                      {cluster.validator_count > 0 && (
                        <ClusterRemoveValidator
                          poolAddress={cluster.owner_address}
                          operatorIDs={cluster.operators}
                        />
                      )}
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ClusterRemoveValidator = ({
  poolAddress,
  operatorIDs,
}: {
  poolAddress: Address;
  operatorIDs: number[];
}) => {
  const { data: clusterData, isLoading: isLoadingClusterScanner } =
    useClusterScanner(poolAddress, operatorIDs);
  const { data: poolPubKey, isLoading: isLoadingPoolPubKey } = usePoolPubKey({
    address: poolAddress,
  });

  if (isLoadingClusterScanner || isLoadingPoolPubKey) {
    return "LOADING";
  }

  return (
    <>
      <SSVRemoveValidator
        validatorPubKey={poolPubKey}
        clusterData={clusterData}
      />
    </>
  );
};

export default Clusters;
