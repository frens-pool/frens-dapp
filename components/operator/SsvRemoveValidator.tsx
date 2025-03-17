import { useState } from "react";
import {
  useNetwork,
  useAccount,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
  Address,
} from "wagmi";
import { parseEther, encodeFunctionData } from "viem";

import { etherscanUrl } from "#/utils/externalUrls";
import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";

export const SSVRemoveValidator = ({
  validatorPubKey,
  clusterData
}: {
  validatorPubKey: any;
  clusterData: any;
}) => {
  const [registerTxHash, setRegisterTxHash] = useState<string | undefined>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();


  const removeValidator = async (cd: any) => {

    const operatorList = cd.cluster.operators
    const cluster = cd.cluster;
    const owner = cd.cluster.Owner;

    // function data to send to the SSV contract
    const encodedFunctionData = encodeFunctionData({
      abi: FrensContracts[network].SSVNetworkContract.abi,
      args: [
        validatorPubKey,
        operatorList,
        cluster
      ],
      functionName: "removeValidator",
    });

    const { request } = await publicClient.simulateContract({
      account: walletAddress,
      address: owner,
      abi: FrensContracts[network].StakingPool.abi,
      args: [encodedFunctionData],
      functionName: "callSSVNetwork",
    });

    if (walletClient) {
      const txHash = await walletClient.writeContract(request);
      setRegisterTxHash(txHash);
    }
  };

  const { isLoading: unRegisterIsLoading, isSuccess: unRegisterIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: registerTxHash,
    });

  if (unRegisterIsLoading) {
    return (
      <div className="flex flex-col my-2 p-2 justify-center">
        <div>
          <button
            className="btn bg-gradient-to-r from-frens-blue to-frens-teal loading text-white my-2 mr-2"
            disabled
          >
            in progress
          </button>
        </div>
        {unRegisterIsLoading && (
          <div className="mb-2">
            <a
              href={`${etherscanUrl(chain)}/tx/${registerTxHash}`}
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
  if (unRegisterIsSuccess) {
    return (
      <div className="w-2/5 mx-auto my-2 p-2">
        <div>✅ successfully unregistered ✅</div>
      </div>
    );
  }



  return (
    <div className="flex flex-col my-2 p-2 justify-center">
      <div>{/* <SelectedOperators /> */}</div>
      <div>
        <button
          className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white my-2 mr-2"
          onClick={() => removeValidator(clusterData)}
        >
          remove validator
        </button>
      </div>
      {/* <pre>CS {JSON.stringify(clusterData, null, 2)}</pre> */}

    </div>
  );
};
