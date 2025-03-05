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

export const ExitValidator = ({
  poolAddress,
}: {
  poolAddress: Address;
}) => {
  const { data: allowance } = useAllowance(poolAddress)
  const [ssvAmount, setSsvAmount] = useState<number | undefined>(undefined);
  const [txHash, setTxHash] = useState<string | undefined>();
  // const [clusterData, setClusterData] = useState<any>();
  const [cluster, setCluster] = useState<any>();
  const network = useNetworkName();
  const { balance: ssvBalance } = useTokenBalance({ tokenAddress: FrensContracts[network].SSVTokenContract.address, accountAddress: poolAddress })
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { data, write: approveSSVSpending } = useApprove({
    spender: FrensContracts[network].SSVNetworkContract.address!,
    value: "20000000000000000000",
  });

  // const { isLoading: approveLoading, isSuccess: approveSuccess } =
  //   useWaitForTransaction({
  //     hash: data?.hash,
  //   });

  const { isLoading: exitIsLoading, isSuccess: exitIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: txHash,
      onSuccess: () => {

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
    };

    fetchClusterList();
  }, []);

  const { data: clusterData, isLoading: isLoadingClusterScanner } =
    useClusterScanner(poolAddress, cluster?.clusters[0].operators);


  const exitValidator = async () => {
    const clusterParams = {
      validatorCount: clusterData.validatorCount,
      networkFeeIndex: clusterData.networkFeeIndex,
      index: clusterData.index,
      balance: clusterData.balance,
      active: clusterData.active,
    };

    const functionArgs = [
      "0xpubkey",
      cluster.clusters[0].operators,
      ssvAmount !== undefined ? parseEther(ssvAmount.toString()) : "1",
      clusterParams,
    ];

    const encodedFunctionData = encodeFunctionData({
      abi: FrensContracts[network].SSVNetworkContract.abi,
      args: functionArgs,
      functionName: "exitValidator",
    });

    const { request } = await publicClient.simulateContract({
      account: walletAddress,
      address: poolAddress,
      abi: FrensContracts[network].StakingPool.abi,
      args: [encodedFunctionData],
      functionName: "callSSVNetwork",
    });

    if (walletClient) {
      const txHash = await walletClient.writeContract(request);
      setTxHash(txHash);
    }
  };


  if (exitIsLoading) {
    return (
      <div className="flex flex-col my-2 p-2 justify-center">
        <div>
          <button
            className="btn bg-gradient-to-r from-frens-blue to-frens-teal loading text-white my-2 mr-2"
            disabled
          >
            Eit in progress
          </button>
        </div>
        {exitIsLoading && (
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
  if (exitIsSuccess) {
    return <div className="w-2/5 mx-auto my-2 p-2">Exit successful</div>;
  }

  return (
    <div className="w-full">

      <div className="flex flex-col lg:flex-row items-start justify-start">
        <button
          className={`${!clusterData && !cluster
            ? "btn-medium opacity-50 text-white blue-to-teal"
            : "btn-medium opacity-1 text-white blue-to-teal"
            }`}
          onClick={() => {
            exitValidator();
          }}
          disabled={!clusterData && !cluster}
        >
          Exit validator
        </button>
      </div>
    </div>
  );
};
