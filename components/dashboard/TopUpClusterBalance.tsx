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
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
    <div className="w-full">
      <div className="my-2">Select SSV amount</div>
      <div className="flex flex-col lg:flex-row items-start justify-start">
        <input
          className="input input-bordered w-full lg:max-w-[300px]"
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
        {walletAddress ? (
          <>
            {approveSuccess ? (
              <button
                className={`${
                  approveLoading
                    ? "btn-medium btn-blue-border mx-4 loading"
                    : "btn-medium btn-blue-border mx-4"
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
                    ? "btn-medium btn-blue-border mx-4 loading"
                    : "btn-medium btn-blue-border mx-4"
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
                  ? "btn-medium opacity-50 text-white blue-to-teal"
                  : "btn-medium opacity-1 text-white blue-to-teal"
              }`}
              onClick={() => {
                topUp();
              }}
              disabled={!clusterData && !cluster && !approveSuccess}
            >
              top up
            </button>
          </>
        ) : (
          <div className="ml-4">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesnt use authentication, you
                // can remove all authenticationStatus checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            className="bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]"
                            onClick={openConnectModal}
                            type="button"
                          >
                            Connect wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            className="bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]"
                            onClick={openChainModal}
                            type="button"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <button
                          className="flex flex-row border-black border-2 bg-black text-white font-semibold text-[14px] py-[8px] pl-3 pr-4 rounded-[22px]"
                          type="button"
                        >
                          <div
                            onClick={openChainModal}
                            style={{ display: "flex", alignItems: "center" }}
                            className="bg-[rgba(255,255,255,0.25)] text-white font-normal text-[14px] px-2 rounded-[10px] mr-2"
                          >
                            {chain.name}
                          </div>
                          <div onClick={openAccountModal}>
                            {account.displayName}
                            <span className="font-normal ml-1 text-[rgba(255,255,255,0.75)]">
                              {account.displayBalance
                                ? `  ${account.displayBalance}`
                                : ""}
                            </span>
                          </div>
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        )}
      </div>
    </div>
  );
};
