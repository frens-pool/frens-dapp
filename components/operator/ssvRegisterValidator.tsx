import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { useAllowance } from "../../hooks/write/useAllowance";
import SSVNetwork from "../../utils/SSVNetwork.json";

export const SSVRegisterValidator = ({ payloadData }: { payloadData: any }) => {
  const { data: signer } = useSigner();

  const { write: allow } = useAllowance({
    spender: "",
    value: "",
  });

  console.log(payloadData);

  const registerSSVValidator = async () => {
    const ssvNetworkContract = new ethers.Contract(
      "0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04",
      SSVNetwork.abi,
      signer
    );
    const action = "registerValidator";
    const unsignedTx = await ssvNetworkContract.populateTransaction[action](
      ...payloadData
    );

    console.log(unsignedTx, "unsignedTx");

    const tx = await signer.sendTransaction(unsignedTx);

    console.log("tx pending...");
    console.log("\x1b[5m...\x1b[0m");
    const txReceipt = await tx.wait();
    console.log(txReceipt.status);
  };

  return (
    <>
      <button
        className="btn btn-primary my-2 mr-2"
        disabled={!allow}
        onClick={() => allow?.()}
      >
        Allow spending SSV
      </button>
      <button
        className="btn btn-primary my-2 mr-2"
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
    </>
  );
};
