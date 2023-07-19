import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";
import { beaconchainUrl } from "#/utils/externalUrls";
import { ethers } from "ethers";
import { useState } from "react";
import {
  useNetwork,
  useAccount,
  useWalletClient,
  useWaitForTransaction,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { useApprove } from "../../hooks/write/useApprove";
import { useGetAllowance } from "../../hooks/read/useGetAllowance";

export const SSVRegisterValidator = ({ payloadData }: { payloadData: any }) => {
  const [registerTxHash, setRegisterTxHash] = useState<string | undefined>();
  const [clusterData, setClusterData] = useState<any>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();

  const registerContract = FrensContracts[network].SSVNetworkContract;
  const maxApproval = BigInt(2) ** BigInt(256) - BigInt(1);

  const { data, write: approve } = useApprove({
    spender: registerContract.address,
    value: maxApproval.toString(),
  });

  const { data: ssvAllowance } = useGetAllowance({
    address: registerContract.address,
  });

  const { isLoading: allowanceIsLoading, isSuccess: allowanceIsSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const getClusterData = async (payloadData: any) => {
    if (payloadData) {
      const contractAddress =
        FrensContracts[network].SSVNetworkContract.address;
      const clusterParams = {
        contractAddress: contractAddress,
        nodeUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        ownerAddress: walletAddress,
        operatorIds: payloadData.payload.operatorIds,
      };
      const clusterDataTemp = await buildCluster(clusterParams);
      setClusterData(clusterDataTemp.cluster[1]);
    }
  };

  const registerSSVValidator = async () => {
    if (walletAddress && walletClient) {
      const action = "registerValidator";
      const ssvNetworkContract = new ethers.Contract(
        FrensContracts[network].SSVNetworkContract.address,
        FrensContracts[network].SSVNetworkContract.abi,
        walletClient
      );

      const clusterParams = {
        validatorCount: clusterData.validatorCount,
        networkFeeIndex: clusterData.networkFeeIndex,
        index: clusterData.index,
        balance: clusterData.balance,
        active: true,
      };

      let unsignedTx = await ssvNetworkContract.populateTransaction[action](
        payloadData.payload.publicKey,
        payloadData.payload.operatorIds,
        payloadData.payload.sharesData,
        payloadData.tokenAmount,
        clusterParams
      );

      const tx = await walletClient.sendTransaction(unsignedTx);
      setRegisterTxHash(tx?.hash);
    }
  };

  const { isLoading: registerIsLoading, isSuccess: registerIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: registerTxHash,
    });

  // console.log("registerIsLoading", registerIsLoading);
  // console.log("registerIsSuccess", registerIsSuccess);

  // return(<>Allowance:{ssvAllowance}</>)

  if (registerIsLoading) {
    return (
      <div className="my-2 p-2">
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
      <div className="my-2 p-2">
        <div>✅ successfully registered ✅</div>
        <div className="my-2">
          <div>Check it out here:</div>
          <a
            href={`https://explorer.ssv.network/validators/${payloadData.publicKey}`}
            className="link text-frens-main underline px-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            ssv explorer
          </a>
          <a
            href={`${beaconchainUrl(chain)}/validator/${payloadData.publicKey}`}
            className="link text-frens-main underline px-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            beaconcha.in
          </a>
        </div>

        <div>Dashboard for all your stakes/valis coming soon</div>
      </div>
    );
  }

  if (allowanceIsLoading) {
    return (
      <div className="my-2 p-2">
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
      <div className="my-2 p-2">
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
    <div className="my-2 p-2">
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
