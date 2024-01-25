import { useEffect, useState } from "react";
import {
  useNetwork,
  usePublicClient,
  useWalletClient,
  useAccount,
  Address,
  useWaitForTransaction,
} from "wagmi";
import { encodeFunctionData } from "viem";
import { ssvAccountApi } from "#/utils/externalUrls";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";

interface FeeRecCheckSetInterface {
  poolAddress: Address;
}

function FeeRecCheckSet({ poolAddress }: FeeRecCheckSetInterface) {
  const [queriedFeeRecipient, setQueriedFeeRecipient] = useState<Address>();
  const [registerTxHash, setRegisterTxHash] = useState<string | undefined>();
  const { chain } = useNetwork();
  const network = useNetworkName();
  const publicClient = usePublicClient();
  const { address: walletAddress } = useAccount();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const fetchSsvValidator = async () => {
      const response = await fetch(ssvAccountApi(poolAddress, chain));
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        if (data.data) {
          // console.log(data);
          setQueriedFeeRecipient(data.data.recipientAddress);
        }
      }
    };
    fetchSsvValidator().catch(console.error);
  }, []);

  const setOnChainFeeRecipient = async () => {
    const encodedFunctionData = encodeFunctionData({
      abi: FrensContracts[network].SSVNetworkContract.abi,
      args: [poolAddress],
      functionName: "setFeeRecipientAddress",
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
      setRegisterTxHash(txHash);
    }
  };

  const { isLoading, isSuccess } = useWaitForTransaction({
    // @ts-ignore
    hash: registerTxHash,
    onSuccess: () => {
      setQueriedFeeRecipient(poolAddress);
    },
  });

  if (isLoading) return <></>;

  if (queriedFeeRecipient) return <></>;

  if (walletAddress) {
    return (
      <div>
        <div className="mt-8">
          🚨 You should set your execution layer reward address 🚨
        </div>
        <button
          className={`${
            isLoading
              ? "btn btn-info no-animation mt-2 mr-2 loading"
              : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white mb-2"
          }`}
          onClick={() => {
            setOnChainFeeRecipient();
          }}
          disabled={isLoading}
        >
          {isLoading ? "In progress" : "Set Fee Recipient"}
        </button>
      </div>
    );
  }

  return <></>;
}

export default FeeRecCheckSet;
