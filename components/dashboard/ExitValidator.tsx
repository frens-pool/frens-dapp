import { useEffect, useState } from "react";
import { toBytes } from "viem";
import {
  useNetwork,
  usePublicClient,
  useWalletClient,
  useAccount,
  Address,
  useWaitForTransaction,
} from "wagmi";
import { encodeFunctionData } from "viem";
import { ssvValidatorApi } from "#/utils/externalUrls";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";
import { usePoolPubKey } from "#/hooks/read/usePoolPubKey";

interface ExitValidatorInterface {
  poolAddress: Address;
}

function ExitValidator({ poolAddress }: ExitValidatorInterface) {
  const [ssvValidator, setssvValidator] = useState<any>();
  const [registerTxHash, setRegisterTxHash] = useState<string | undefined>();
  const { chain } = useNetwork();
  const network = useNetworkName();
  const publicClient = usePublicClient();
  const { address: walletAddress } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { data: poolPubKey } = usePoolPubKey({ address: poolAddress });

  useEffect(() => {
    const fetchSsvValidator = async () => {
      const response = await fetch(ssvValidatorApi(poolPubKey, chain));
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        setssvValidator(data);
        console.log(data);
        if (data) {
          //   setStep(STEP.DONE);
        }
      }
    };
    fetchSsvValidator().catch(console.error);
  }, []);

  const exitValidatorOnChain = async () => {
    const encodedFunctionData = encodeFunctionData({
      abi: FrensContracts[network].SSVNetworkContract.abi,
      args: [poolPubKey, [124, 139, 154, 306]],
      functionName: "exitValidator",
    });
    console.log(encodedFunctionData);

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
      // setQueriedFeeRecipient(poolAddress);
    },
  });

  //   if (isLoading) return <></>;

  //   if (ssvValidator) return <></>;

  if (walletAddress) {
    return (
      <div>
        <div className="mt-8">🚨 Exit validator 🚨</div>
        <button
          className={`${
            isLoading
              ? "btn btn-info no-animation mt-2 mr-2 loading"
              : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white mb-2"
          }`}
          onClick={() => {
            exitValidatorOnChain();
          }}
          disabled={isLoading}
        >
          {isLoading ? "In progress" : "Exit validator"}
        </button>
      </div>
    );
  }

  return <></>;
}

export default ExitValidator;
