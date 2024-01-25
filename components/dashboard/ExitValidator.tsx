import { useState, useEffect } from "react";
import {
  useNetwork,
  useAccount,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
  Address,
} from "wagmi";

import { etherscanUrl, ssvClusterListByOwnerApi } from "#/utils/externalUrls";
import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePoolPubKey } from "#/hooks/read/usePoolPubKey";

export const ExitValidator = ({
  poolAddress
}: {
  poolAddress: Address;
}) => {
  const [txHash, setTxHash] = useState<string | undefined>();
  const [operators, setOperators] = useState<any>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const { data: poolPubKey } = usePoolPubKey({ address: poolAddress });

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
      setOperators(clusterListdataJson.clusters[0]?.operators);
    };
    fetchClusterList();
  }, []);


  const exit = async () => {
    const { request } = await publicClient.simulateContract({
      account: walletAddress,
      address: FrensContracts[network].SSVNetworkContract.address,
      abi: FrensContracts[network].SSVNetworkContract.abi,
      args: [
        poolPubKey,
        operators,
      ],
      functionName: "exitValidator",
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
    return <div className="w-2/5 mx-auto my-2 p-2">Exit was successful</div>;
  }

  return (
    <div className="mt-4">
      <div>

      {walletAddress ? (
      
          <button
            className={`${
              !poolPubKey
                ? "btn btn-disabled no-animation mt-2 mr-2 ml-2"
                : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white ml-2"
            }`}
            onClick={() => {
              exit();
            }}
            disabled={! operators && !poolPubKey}
          >
            Exit Validator!
          </button>
        
      ) : (
        <div className="flex justify-center items-center my-2">
          <ConnectButton />
        </div>
      )}
    </div>
    </div>
  );
};
