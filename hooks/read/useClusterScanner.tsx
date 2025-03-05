// import { Address } from "wagmi";
import { useState, useEffect } from 'react';
import { ssvClusterApi } from "#/utils/externalUrls";
import { FrensContracts } from "#/utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";
import {
  useNetwork,
} from "wagmi";
import { mainnet, holesky } from "wagmi/chains";
export function useClusterScanner(ownerAddress: string, operatorIDs: number[]) {

  const [data, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { chain } = useNetwork();
  const network = useNetworkName();


  async function buildCluster(
    clusterParams: {
      contractAddress: string;
      nodeUrl: string;
      ownerAddress: string;
      operatorIds: number[];
    } | null
  ) {
    const clusterData = async () => {
      const response = await fetch("/api/clusterScanner", {
        method: "POST",
        body: JSON.stringify(clusterParams),
      });

      if (response.status === 451) {
        // Something went bad
        throw new Error("Cluster scanner error")
      } else {
        return response.json();
      }
    };

    return await clusterData();
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!chain || !network) return;

      try {
        setLoading(true);

        let nodeUrl = "";
        switch (chain?.id) {
          case mainnet.id:
            nodeUrl = `${process.env.NEXT_PUBLIC_RPC_MAINNET}`;
            break;
          case holesky.id:
            nodeUrl = `${process.env.NEXT_PUBLIC_RPC_HOLESKY}`;
            break;
        }
        console.log(`RPC URL=${nodeUrl}`);
        // debugger;
        // const nodeUrl = chain.rpcUrls.default.http.at(0)!;

        const clusterParams = {
          contractAddress: FrensContracts[network].SSVNetworkContract.address,
          nodeUrl: nodeUrl,
          ownerAddress: ownerAddress,
          operatorIds: operatorIDs,
          network,
        };
        const clusterDataTemp = await buildCluster(clusterParams);
        setData(clusterDataTemp);


      } catch (err) {

        setError(err as Error);
      } finally {

        setLoading(false);
      }
    };

    if (!operatorIDs || operatorIDs.length < 4) {
      setError(new Error("No operatorIDs provided"));
      return;
    }
    if (!ownerAddress) {
      setError(new Error("No ownerAddress provided"));
      return;
    }

    fetchData();
  }, [chain, network, ownerAddress, operatorIDs]);

  return { data, isLoading, error };

}
