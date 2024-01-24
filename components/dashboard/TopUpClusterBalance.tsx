import { useState, useEffect } from "react";
import {
  useNetwork,
  useAccount,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
  Address,
} from "wagmi";

import {
  ssvClusterListByOwnerApi,
} from "#/utils/externalUrls";

import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";

export const TopUpClusterBalance = ({
  poolAddress,
}: {
  poolAddress: Address;
}) => {
  const [registerTxHash, setRegisterTxHash] = useState<string | undefined>();
  const [clusterData, setClusterData] = useState<any>();
  const [cluster, setCluster] = useState<any>();
  const network = useNetworkName();
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();


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
      console.log("clusterParams", clusterParams);
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


  useEffect(() => {
    if (!chain) return;
    const fetchClusterList = async () => {
      const clusterListdata = await fetch(
        ssvClusterListByOwnerApi(1, 1, poolAddress, chain)
      );
      const clusterListdataJson = await clusterListdata.json();
      setCluster(clusterListdataJson);
      getClusterData(clusterListdataJson.clusters[0].operators)
    };

    fetchClusterList();
  }, []);



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
        2,
        clusterParams,
      ],
      functionName: "deposit",
    });

    if (walletClient) {
      const txHash = await walletClient.writeContract(request);
      setRegisterTxHash(txHash);
    }
  };

  return (
    <button
      className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white my-2 mr-2"
      onClick={() => { topUp(); }}
      disabled={!clusterData && !cluster}
    >
      top up
    </button>
  )
};
//   if (registerIsLoading) {
//     return (
//       <div className="flex flex-col my-2 p-2 justify-center">
//         <div>
//           <button
//             className="btn bg-gradient-to-r from-frens-blue to-frens-teal loading text-white my-2 mr-2"
//             disabled
//           >
//             Register in progress
//           </button>
//         </div>
//         {registerIsLoading && (
//           <div className="mb-2">
//             <a
//               href={`${etherscanUrl(chain)}/tx/${registerTxHash}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="link text-frens-main underline px-2"
//             >
//               tx on Etherscan
//             </a>
//           </div>
//         )}
//       </div>
//     );
//   }
//   if (registerIsSuccess) {
//     return (
//       <div className="w-2/5 mx-auto my-2 p-2">
//         <div>✅ successfully registered ✅</div>
//         <div className="my-2">
//           <div>Check it out here:</div>
//           <a
//             href={ssvScanValidatorUrl(payloadData.payload.publicKey, chain)}
//             className="link text-frens-main underline px-2"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             ssvscan.io
//           </a>
//           <a
//             href={`${beaconchainUrl(chain)}/validator/${
//               payloadData.payload.publicKey
//             }`}
//             className="link text-frens-main underline px-2"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             beaconcha.in
//           </a>
//         </div>

//         <div>
//           All done?
//           <div>
//             <a
//               className="link text-frens-main underline px-2"
//               href={`/dashboard`}
//             >
//               checkout dashboard
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (sendIsLoading) {
//     return (
//       <div className="flex my-0 p-2 justify-center">
//         <button className="btn btn-primary my-2 mr-2 loading" disabled>
//           Tx pending...
//         </button>
//         <button className="btn btn-primary my-2 mr-2" disabled>
//           Register SSV validator
//         </button>
//       </div>
//     );
//   }

//   if (sendIsSuccess) {
//     return (
//       <div className="flex flex-col my-2 p-2 justify-center">
//         <div className="mt-2">
//           Great. You are now ready to register your SSV validator.
//         </div>
//         <div>
//           <button
//             className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white my-2 mr-2"
//             onClick={() => registerSSVValidator()}
//           >
//             Register SSV validator
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col my-2 p-2 justify-center">
//       <div>{/* <SelectedOperators /> */}</div>
//       <div>
//         <button
//           className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white my-2 mr-2"
//           onClick={() => {
//             if (sendTransaction) {
//               sendTransaction();
//             }
//             getClusterData(payloadData);
//           }}
//         >
//           Send SSV token to Pool
//         </button>
//       </div>

//       <div>
//         <button className="btn btn-primary my-2 mr-2" disabled>
//           Register SSV validator
//         </button>
//       </div>
//     </div>
//   );
// };

// async function buildCluster(
//   clusterParams: {
//     contractAddress: string;
//     nodeUrl: string;
//     ownerAddress: string;
//     operatorIds: number[];
//   } | null
// ) {
//   const clusterData = async () => {
//     const response = await fetch("/api/clusterScanner", {
//       method: "POST",
//       body: JSON.stringify(clusterParams),
//     });

//     if (response.status === 451) {
//       // Something went bad
//     } else {
//       return response.json();
//     }
//   };

//   return await clusterData();
// }

