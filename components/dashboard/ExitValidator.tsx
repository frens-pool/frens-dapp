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
import { usePoolPubKey } from "#/hooks/read/usePoolPubKey";

export const ExitValidator = ({
  poolAddress,
}: {
  poolAddress: Address;
}) => {
  const [txHash, setTxHash] = useState<string | undefined>();
  // const [clusterData, setClusterData] = useState<any>();
  const [cluster, setCluster] = useState<any>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

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

  const { isLoading: exitIsLoading, isSuccess: exitIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: txHash,
      onSuccess: () => {

      },
    });

  const {
    data: poolPubKey,
    isLoading,
    isSuccess,
  } = usePoolPubKey({ address: poolAddress });

  const exitValidator = async () => {

    const functionArgs = [
      poolPubKey,
      cluster?.clusters[0].operators,
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
            Exit in progress
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
          className={`${!poolPubKey
            ? "btn-medium opacity-50 text-white blue-to-teal"
            : "btn-medium opacity-1 text-white blue-to-teal"
            }`}
          onClick={() => {
            exitValidator();
          }}
          disabled={!poolPubKey}
        >
          Exit validator
        </button>
      </div>
    </div>
  );
};
