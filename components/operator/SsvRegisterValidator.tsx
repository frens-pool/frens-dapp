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
      {allow ? (
        <button
          className="btn bg-gradient-to-r from-blue-500 to-teal-500 text-white my-2 mr-2"
          onClick={() => allow?.()}
        >
          Allow spending SSV
        </button>
      ) : (
        <button className="btn btn-primary my-2 mr-2" disabled>
          Allow spending SSV
        </button>
      )}
      {isSuccess ? (
        <button
          className="btn bg-gradient-to-r from-blue-500 to-teal-500 text-white my-2 mr-2"
          onClick={() => registerSSVValidator()}
        >
          Register SSV validator
        </button>
      ) : (
        <button className="btn btn-primary my-2 mr-2" disabled>
          Register SSV validator
        </button>
      )}
    </div>
  );
};
