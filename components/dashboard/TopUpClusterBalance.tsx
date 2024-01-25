import { useState, useEffect } from "react";
import {
  useNetwork,
  useAccount,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
  Address,
} from "wagmi";
import { parseEther } from "viem";

import { etherscanUrl, ssvClusterListByOwnerApi } from "#/utils/externalUrls";
import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";
import { useApprove } from "#/hooks/write/useApprove";

export const TopUpClusterBalance = ({
  poolAddress,
  updateSSVBalance,
}: {
  poolAddress: Address;
  updateSSVBalance: (addedValue: number) => void;
}) => {
  const [ssvAmount, setSsvAmount] = useState<number | undefined>(undefined);
  const [txHash, setTxHash] = useState<string | undefined>();
  const [clusterData, setClusterData] = useState<any>();
  const [cluster, setCluster] = useState<any>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { data, write: approveSSVSpending } = useApprove({
    spender: walletAddress!,
    value: "20000000000000000000",
  });

  const { isLoading: approveLoading, isSuccess: approveSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const { isLoading: topUpIsLoading, isSuccess: topUpIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: txHash,
      onSuccess: () => {
        if (ssvAmount !== undefined) {
          updateSSVBalance(ssvAmount);
        } else {
          updateSSVBalance(1);
        }
      },
    });

  useEffect(() => {
    if (!chain) return;
    const fetchClusterList = async () => {
      const clusterListdata = await fetch(
        ssvClusterListByOwnerApi(1, 1, poolAddress, chain)
      );
      const clusterListdataJson = await clusterListdata.json();
      setCluster(clusterListdataJson);
      getClusterData(clusterListdataJson.clusters[0].operators);
    };

    fetchClusterList();
  }, []);

  const getClusterData = async (operatorIds: any) => {
    if (operatorIds && poolAddress && chain) {
      const contractAddress =
        FrensContracts[network].SSVNetworkContract.address;
      const nodeUrl = chain.rpcUrls.default.http.at(0)!;
      const clusterParams = {
        contractAddress: contractAddress,
        nodeUrl: nodeUrl,
        ownerAddress: poolAddress,
        operatorIds,
      };
      const clusterDataTemp = await buildCluster(clusterParams);
      setClusterData(clusterDataTemp.cluster[1]);
    }
  };

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
      } else {
        return response.json();
      }
    };

    return await clusterData();
  }

  const topUp = async () => {
    const clusterParams = {
      validatorCount: clusterData.validatorCount,
      networkFeeIndex: clusterData.networkFeeIndex,
      index: clusterData.index,
      balance: clusterData.balance,
      active: true,
    };
    const { request } = await publicClient.simulateContract({
      account: walletAddress,
      address: FrensContracts[network].SSVNetworkContract.address,
      abi: FrensContracts[network].SSVNetworkContract.abi,
      args: [
        poolAddress,
        cluster.clusters[0].operators,
        ssvAmount !== undefined ? parseEther(ssvAmount.toString()) : "1",
        clusterParams,
      ],
      functionName: "deposit",
    });

    if (walletClient) {
      const txHash = await walletClient.writeContract(request);
      setTxHash(txHash);
    }
  };

  if (topUpIsLoading) {
    return (
      <div className="flex flex-col my-2 p-2 justify-center">
        <div>
          <button
            className="btn bg-gradient-to-r from-frens-blue to-frens-teal loading text-white my-2 mr-2"
            disabled
          >
            Register in progress
          </button>
        </div>
        {topUpIsLoading && (
          <div className="mb-2">
            <a
              href={`${etherscanUrl(chain)}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-frens-main underline px-2"
            >
              tx on Etherscan
            </a>
          </div>
        )}
      </div>
    );
  }
  if (topUpIsSuccess) {
    return <div className="w-2/5 mx-auto my-2 p-2">Top was successful</div>;
  }

  return (
    <div className="mt-4">
      <div>
        <div className="text-center font-bold mb-2">Top up cluster balance</div>

        <div className="text-center my-2">Select SSV amount</div>
      </div>
      <div>
        <input
          className="input input-bordered w-2/3"
          type="number"
          placeholder="1"
          min="0"
          value={ssvAmount !== undefined ? ssvAmount : ""}
          onChange={(event) =>
            setSsvAmount(
              event.target.value !== ""
                ? parseFloat(event.target.value)
                : undefined
            )
          }
        />
      </div>
      <div className="mt-2">
        {approveSuccess ? (
          <button
            className={`${
              approveLoading
                ? "btn bg-gradient-to-r from-frens-blue to-frens-teal mt-2 mr-2 loading"
                : "btn btn-info text-white mb-2"
            }`}
            onClick={() => {
              approveSSVSpending!();
            }}
            disabled={approveLoading}
          >
            {approveLoading ? "In progress" : "approve again"}
          </button>
        ) : (
          <button
            className={`${
              approveLoading
                ? "btn bg-gradient-to-r from-frens-blue to-frens-teal mt-2 mr-2 loading"
                : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
            }`}
            onClick={() => {
              approveSSVSpending!();
            }}
            disabled={approveLoading}
          >
            {approveLoading ? "In progress" : "approve ssv"}
          </button>
        )}
        <button
          className={`${
            !approveSuccess
              ? "btn btn-disabled no-animation mt-2 mr-2 ml-2"
              : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white ml-2"
          }`}
          onClick={() => {
            topUp();
          }}
          disabled={!clusterData && !cluster && !approveSuccess}
        >
          top up
        </button>
      </div>
      <div className=""></div>
    </div>
  );
};
