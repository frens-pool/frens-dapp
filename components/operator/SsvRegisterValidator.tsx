import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";
import { beaconchainUrl, ssvExplorer } from "#/utils/externalUrls";
import { useState } from "react";
import {
  useNetwork,
  useAccount,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
  Address
} from "wagmi";
import { SelectedOperators } from "./SelectedOperators";
import { useApprove } from "../../hooks/write/useApprove";
import { useGetAllowance } from "../../hooks/read/useGetAllowance";

export const SSVRegisterValidator = ({
  payloadData,
  operators,
  poolAddress
}: {
  payloadData: any;
  operators: any;
  poolAddress: Address
}) => {

console.log("payload=",payloadData)

  const [registerTxHash, setRegisterTxHash] = useState<string | undefined>();
  const [clusterData, setClusterData] = useState<any>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const registerContract = FrensContracts[network].SSVNetworkContract;
  const maxApproval = BigInt(2) ** BigInt(256) - BigInt(1);

  const { data: approveData, write: approve } = useApprove({
    spender: registerContract.address,
    value: maxApproval.toString(),
  });

  const { data: ssvAllowance } = useGetAllowance({
    address: registerContract.address,
  });

  const { isLoading: allowanceIsLoading, isSuccess: allowanceIsSuccess } =
    useWaitForTransaction({
      hash: approveData?.hash,
    });

  const getClusterData = async (payloadData: any) => {
    if (payloadData && poolAddress && chain) {
      const nodeUrl = chain.rpcUrls.default.http.at(0)!;
      const contractAddress =
        FrensContracts[network].SSVNetworkContract.address;
      const clusterParams = {
        contractAddress: contractAddress,
        nodeUrl: nodeUrl,
        ownerAddress: poolAddress,
        operatorIds: payloadData.payload.operatorIds,
      };
      const clusterDataTemp = await buildCluster(clusterParams);
      setClusterData(clusterDataTemp.cluster[1]);
      console.log("getClusterData output=",clusterDataTemp)
    }
  };


  const registerSSVValidator = async () => {
    console.log("clusterdata=",clusterData);
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
        payloadData.payload.publicKey,
        payloadData.payload.operatorIds,
        payloadData.payload.sharesData,
        payloadData.tokenAmount,
        clusterParams,
      ],
      functionName: "registerValidator",
    });

    if (walletClient) {
      const txHash = await walletClient.writeContract(request);
      setRegisterTxHash(txHash);
    }
  };

  const { isLoading: registerIsLoading, isSuccess: registerIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: registerTxHash,
    });

  if (registerIsLoading) {
    return (
      <div className="flex my-2 p-2 justify-center">
        <div>{/* <SelectedOperators /> */}</div>
        <button className="btn btn-primary my-2 mr-2" disabled>
          Allow again
        </button>
        <button
          className="btn btn-primary loading text-white my-2 mr-2"
          disabled
        >
          Register in progress
        </button>
      </div>
    );
  }
  if (registerIsSuccess) {
    return (
      <div className="w-2/5 mx-auto my-2 p-2">
        <div>✅ successfully registered ✅</div>
        <div className="my-2">
          <div>Check it out here:</div>
          <a
            href={ssvExplorer(payloadData.payload.publicKey, chain)}
            className="link text-frens-main underline px-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            ssv explorer
          </a>
          <a
            href={`${beaconchainUrl(chain)}/validator/${
              payloadData.payload.publicKey
            }`}
            className="link text-frens-main underline px-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            beaconcha.in
          </a>
        </div>

        <div>
          Or{" "}
          <a href={`/pool/${payloadData.payload.publicKey}`}>
            checkout your validator dashboard
          </a>
        </div>
      </div>
    );
  }

  if (allowanceIsLoading) {
    return (
      <div className="flex my-0 p-2 justify-center">
        <button className="btn btn-primary my-2 mr-2 loading" disabled>
          Tx pending...
        </button>
        <button className="btn btn-primary my-2 mr-2" disabled>
          Register SSV validator
        </button>
      </div>
    );
  }

  if (allowanceIsSuccess) {
    return (
      <div className="flex my-2 p-2 justify-center">
        <button
          className="btn btn-info no-animation my-2 mr-2"
          onClick={() => {
            approve?.();
            getClusterData(payloadData);
          }}
        >
          Allow again
        </button>
        <button
          className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white my-2 mr-2"
          onClick={() => registerSSVValidator()}
        >
          Register SSV validator
        </button>
      </div>
    );
  }

  return (
    <div className="flex my-2 p-2 justify-center">
      <button
        className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white my-2 mr-2"
        onClick={() => {
          approve?.();
          getClusterData(payloadData);
        }}
      >
        Allow spending SSV
      </button>

      <button className="btn btn-primary my-2 mr-2" disabled>
        Register SSV validator
      </button>
    </div>
  );
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
