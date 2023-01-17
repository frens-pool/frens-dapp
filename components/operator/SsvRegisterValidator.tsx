import { ethers } from "ethers";
import { useWaitForTransaction, useSigner } from "wagmi";
import { useAllowance } from "../../hooks/write/useAllowance";
import SSVNetwork from "../../utils/SSVNetwork.json";

export const SSVRegisterValidator = ({ payloadData }: { payloadData: any }) => {
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

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const registerSSVValidator = async () => {
    const action = "registerValidator";

    let unsignedTx = await ssvNetworkContract.populateTransaction[action](
      ...payloadData
    );

    const tx = await signer?.sendTransaction(unsignedTx);
    console.log(tx);

    // console.log("tx pending...");
    // console.log("\x1b[5m...\x1b[0m");
    // const txReceipt = await tx.wait();
    // console.log(txReceipt.status);
  };

  return (
    <div className="my-2 p-2">
      <button
        className="btn btn-primary my-2 mr-2"
        disabled={!allow}
        onClick={() => allow?.()}
      >
        Allow spending SSV
      </button>
      <button
        className="btn btn-primary my-2 mr-2"
        disabled={!isSuccess}
        onClick={() => registerSSVValidator()}
      >
        Register SSV validator
      </button>
      {/* <a
        className="btn btn-primary"
        href="https://app.ssv.network/join/validator/enter-key"
      >
        Register SSV validator
      </a> */}
    </div>
  );
};
