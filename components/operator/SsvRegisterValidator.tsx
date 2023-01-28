import { useState } from "react";
import { ethers } from "ethers";
import { useWaitForTransaction, useSigner } from "wagmi";
import { useAllowance } from "../../hooks/write/useAllowance";
import SSVNetwork from "../../utils/SSVNetwork.json";

export const SSVRegisterValidator = ({ payloadData }: { payloadData: any }) => {
  const [registerTxHash, setRegisterTxHash] = useState<string | undefined>();

  const { data: signer } = useSigner();

  const ssvNetworkContract = new ethers.Contract(
    "0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04",
    SSVNetwork.abi,
    signer as any
  );

  const { data, write: allow } = useAllowance({
    spender: "",
    value: "",
  });

  const { isLoading: allowanceIsLoading, isSuccess: allowanceIsSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const registerSSVValidator = async () => {
    const action = "registerValidator";

    let unsignedTx = await ssvNetworkContract.populateTransaction[action](
      ...payloadData
    );

    const tx = await signer?.sendTransaction(unsignedTx);
    setRegisterTxHash(tx?.hash);
  };

  const { isLoading: registerIsLoading, isSuccess: registerIsSuccess } =
    useWaitForTransaction({
      // @ts-ignore
      hash: registerTxHash,
    });

  // console.log("registerIsLoading", registerIsLoading);
  // console.log("registerIsSuccess", registerIsSuccess);

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
            href={`https://explorer.ssv.network/validators/${payloadData[0].slice(
              2
            )}`}
            className="link text-frens-main underline px-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            ssv explorer
          </a>
          <a
            href={`https://prater.beaconcha.in/validator/${payloadData[0].slice(
              2
            )}`}
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
          onClick={() => allow?.()}
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
        onClick={() => allow?.()}
      >
        Allow spending SSV
      </button>

      <button className="btn btn-primary my-2 mr-2" disabled>
        Register SSV validator
      </button>
    </div>
  );
};
