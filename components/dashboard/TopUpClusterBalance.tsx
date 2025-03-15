import { useState, useEffect } from "react";
import {
  useNetwork,
  useAccount,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
  Address,
} from "wagmi";
import { parseEther, encodeFunctionData } from "viem";

import { etherscanUrl, ssvClusterListByOwnerApi } from "#/utils/externalUrls";
import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";
import { useAllowance } from "#/hooks/read/useAllowance";
import { useApprove } from "#/hooks/write/useApprove";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useTokenBalance } from "#/hooks/read/useTokenBalance";
import { useClusterScanner } from "#/hooks/read/useClusterScanner";
import { useClusterBalance } from "#/hooks/read/useClusterBalance";
import { useDepositSSVToCluster } from "#/hooks/write/useDepositSSVToCluster";

export const TopUpClusterBalance = ({
  poolAddress,
  updateSSVBalance,
}: {
  poolAddress: Address;
  updateSSVBalance: (addedValue: number) => void;
}) => {
  const [ssvAmount, setSsvAmount] = useState<BigInt>(BigInt(0));
  // const [txHash, setTxHash] = useState<string | undefined>();
  // const [clusterData, setClusterData] = useState<any>();
  const [cluster, setCluster] = useState<any>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { data: allowance } = useAllowance(walletAddress ?? "0x")
  const { balance: ssvBalance } = useTokenBalance({
    tokenAddress: FrensContracts[network].SSVTokenContract.address,
    accountAddress: walletAddress ?? "0x"
  })
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { data, write: approveSSVSpending } = useApprove({
    spender: FrensContracts[network].SSVNetworkContract.address!,
    value: "20000000000000000000", // 20 SSV
  });

  const { data: clusterOnChainBalance } = useClusterBalance(poolAddress, cluster?.clusters[0]?.operators)

  console.log(`clusterOnChainBalance`, clusterOnChainBalance)
  console.log(`ssvAmount`,ssvAmount?.toString())

  const { isLoading: approveLoading, isSuccess: approveSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });


    const {
      data: depositTx,
      write: depositToCluster,
      isError,
      prepare_error,
    } = useDepositSSVToCluster({ ownerAddress: poolAddress, operatorIds: cluster?.clusters[0]?.operators, amount: ssvAmount });
  
  
    console.log(`depositToCluster data=`,depositTx?.hash)

  const { isLoading: topUpIsLoading, isSuccess: topUpIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: depositTx?.hash,
      onSuccess: () => {
        // if (ssvAmount !== undefined) {
        //   updateSSVBalance(parseFloat(ssvAmount.toLocaleString()));
        // } else {
        //   updateSSVBalance(1);
        // }
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
      console.log(`CD`, clusterListdataJson);
      // getClusterData(clusterListdataJson.clusters[0].operators);
    };

    fetchClusterList();
  }, []);

  const { data: clusterData, isLoading: isLoadingClusterScanner } =
    useClusterScanner(poolAddress, cluster?.clusters[0]?.operators)



  const topUp = async () => {
    depositToCluster && depositToCluster();

    // const clusterParams = {
    //   validatorCount: clusterData.cluster.validatorCount,
    //   networkFeeIndex: clusterData.cluster.networkFeeIndex,
    //   index: clusterData.cluster.index,
    //   balance: clusterData.cluster.balance,
    //   active: clusterData.cluster.active,
    // };

    // const functionArgs = [
    //   poolAddress,
    //   clusterData.cluster.operators,
    //   ssvAmount !== undefined ? parseEther(ssvAmount.toString()) : "1",
    //   clusterParams,
    // ];

    // const encodedFunctionData = encodeFunctionData({
    //   abi: FrensContracts[network].SSVNetworkContract.abi,
    //   args: functionArgs,
    //   functionName: "deposit",
    // });

    // const { request } = await publicClient.simulateContract({
    //   account: walletAddress,
    //   address: poolAddress,
    //   abi: FrensContracts[network].StakingPool.abi,
    //   args: [encodedFunctionData],
    //   functionName: "callSSVNetwork",
    // });

    // if (walletClient) {
    //   const txHash = await walletClient.writeContract(request);
    //   setTxHash(txHash);
    // }
  };


  // const reactivate = async () => {
  //   const clusterParams = {
  //     validatorCount: clusterData.validatorCount,
  //     networkFeeIndex: clusterData.networkFeeIndex,
  //     index: clusterData.index,
  //     balance: clusterData.balance,
  //     active: clusterData.active,
  //   };

  //   const functionArgs = [
  //     cluster.clusters[0].operators,
  //     ssvAmount !== undefined ? parseEther(ssvAmount.toString()) : "1",
  //     clusterParams,
  //   ];

  //   const encodedFunctionData = encodeFunctionData({
  //     abi: FrensContracts[network].SSVNetworkContract.abi,
  //     args: functionArgs,
  //     functionName: "reactivate",
  //   });

  //   const { request } = await publicClient.simulateContract({
  //     account: walletAddress,
  //     address: poolAddress,
  //     abi: FrensContracts[network].StakingPool.abi,
  //     args: [encodedFunctionData],
  //     functionName: "callSSVNetwork",
  //   });

  //   if (walletClient) {
  //     const txHash = await walletClient.writeContract(request);
  //     setTxHash(txHash);
  //   }
  // };

  // // liquidate the cluster (WARNING)! 

  // const liquidate = async () => {

  //   if (!clusterData.active === true) {
  //     throw new Error("Cannot liquidate an inactive cluster")
  //   }

  //   const clusterParams = {
  //     validatorCount: clusterData.validatorCount,
  //     networkFeeIndex: clusterData.networkFeeIndex,
  //     index: clusterData.index,
  //     balance: clusterData.balance,
  //     active: clusterData.active,
  //   };

  //   const functionArgs = [
  //     poolAddress,
  //     cluster.clusters[0].operators,
  //     clusterParams,
  //   ];

  //   const encodedFunctionData = encodeFunctionData({
  //     abi: FrensContracts[network].SSVNetworkContract.abi,
  //     args: functionArgs,
  //     functionName: "liquidate",
  //   });

  //   const { request } = await publicClient.simulateContract({
  //     account: walletAddress,
  //     address: poolAddress,
  //     abi: FrensContracts[network].StakingPool.abi,
  //     args: [encodedFunctionData],
  //     functionName: "callSSVNetwork",
  //   });

  //   if (walletClient) {
  //     const txHash = await walletClient.writeContract(request);
  //     setTxHash(txHash);
  //   }
  // };

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
              href={`${etherscanUrl(chain)}/tx/${depositTx?.hash}`}
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

      <div className="my-2 text-sm">Cluster SSV balance: {clusterOnChainBalance ? Number.parseFloat(ethers.utils.formatUnits((clusterOnChainBalance), 18)).toFixed(4) : ""} SSV</div>
      <div className="my-2 text-sm">Available SSV balance in your wallet: {ssvBalance ? Number.parseFloat(ethers.utils.formatUnits((ssvBalance), 18)).toFixed(4) : ""} SSV</div>
      <div className="my-2 text-sm">Select SSV amount</div>
      <div className="flex flex-col lg:flex-row items-start justify-start">
        <input
          className="input input-bordered w-full lg:max-w-[300px] mb-4"
          type="text"
          placeholder="1"
          min="0"
          // value={ssvAmount !== undefined ? ssvAmount : ""}
          onChange={(event) => {
            const value = event.target.value;
            // Allow empty input and dot for decimal
            if (value === "" || value === ".") {
              event.target.value = value;
              setSsvAmount(BigInt(0));
              return;
            }
            // Only allow numbers and one decimal point
            if (/^\d*\.?\d*$/.test(value)) {
              event.target.value = value;
              try {
                setSsvAmount(BigInt(parseEther(value)));
              } catch {
                setSsvAmount(BigInt(0));
              }
            }
          }}
        />
        {walletAddress ? (
          <>

            {clusterData ? (
              <>
                {allowance.toString() === "0" && (
                  <button
                    className={`${approveLoading
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
                {/* these actions can be performed when the cluster is active */}
                {clusterData.cluster?.active === true && (
                  <div className="flex flex-row gap-4">
                    <button
                      className={`${allowance < ssvAmount
                        ? "btn-medium opacity-50 text-white blue-to-teal"
                        : "btn-medium opacity-1 text-white blue-to-teal"
                        }`}
                      onClick={() => {
                        topUp();
                      }}
                      // disabled={!clusterData && !cluster}
                    >
                      top up
                    </button>
{/* 
                    <button
                      className={`${!approveSuccess
                        ? "btn-medium opacity-50 text-white blue-to-teal"
                        : "btn-medium opacity-1 text-white blue-to-teal"
                        }`}
                      onClick={() => {
                        liquidate();
                      }}
                      disabled={!clusterData && !cluster}
                    >
                      liquidate!
                    </button> */}
                  </div>
                )}
                {/* these actions can be performed when the cluster is not active */}
                {/* {clusterData.active === false && (
                  <button
                    className="btn-medium opacity-50 text-white blue-to-teal"
                    onClick={() => {
                      reactivate();
                    }}
                  >
                    reactivate with {ssvAmount} SSV!
                  </button>
                )} */}
              </>
            ) : (<span>Running ClusterScanner... <span className="loading loading-spinner loading-lg text-frens-main"></span></span>)}


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
