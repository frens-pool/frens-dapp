import { useFeeRecipient } from "#/hooks/write/useFeeRecipient";
import { ssvAccountApi } from "#/utils/externalUrls";
import { useEffect, useState } from "react";
import { Address, useNetwork, useWaitForTransaction } from "wagmi";

interface FeeRecCheckSetInterface {
  owner: Address;
}

function FeeRecCheckSet({ owner }: FeeRecCheckSetInterface) {
  const [feeRecipient, setFeeRecipient] = useState<Address>();
  const { chain } = useNetwork();
  const { data, write: setOnchainFeeRecipient } = useFeeRecipient({
    feeRecipient: owner,
  });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    const fetchSsvValidator = async () => {
      const response = await fetch(ssvAccountApi(owner, chain));
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        if (data.data) {
          console.log(data);
          setFeeRecipient(data.data.recipientAddress);
        }
      }
    };
    fetchSsvValidator().catch(console.error);
  }, []);

  // console.log(feeRecipient);

  if (feeRecipient) {
    return <div></div>;
  }

  return (
    <div>
      <div className="my-4">
        You should set your execution layer reward address
      </div>
      <button
        className={`${
          isLoading
            ? "btn btn-info no-animation my-2 mr-2 loading"
            : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white mb-2"
        }`}
        onClick={() => {
          console.log("clicked");
          console.log(setOnchainFeeRecipient);
          if (setOnchainFeeRecipient) setOnchainFeeRecipient();
        }}
        disabled={isLoading}
      >
        {isLoading ? "In progress" : "Set Fee Recipient"}
      </button>
    </div>
  );
}

export default FeeRecCheckSet;
