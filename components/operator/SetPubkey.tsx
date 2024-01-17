import { Address, useNetwork, useWaitForTransaction } from "wagmi";

import { etherscanUrl } from "#/utils/externalUrls";
import { useState } from "react";

import { DropKeys, validateFileFunction } from "components/operator/DropKeys";
import { DepositFileData } from "#/utils/DepositFileData";
import { useSetPubkey } from "#/hooks/write/useSetPubkey";

interface Props {
  poolAddress: Address;
  nextStep: () => void;
  updatePubKeyState: any;
}

export const SetPubkey = ({
  poolAddress,
  nextStep,
  updatePubKeyState,
}: Props) => {
  const [depositFileData, setDepositFileData] = useState<DepositFileData>();
  const {
    data,
    write: writeDepositFileData,
    prepare_error,
  } = useSetPubkey({ poolAddress, depositFileData });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (data) => {
      updatePubKeyState(depositFileData?.pubkey);
      nextStep();
    },
  });
  const { chain } = useNetwork();

  // validate first validator in the deposit data
  const checkDepositData = (fileContent: any) => {
    try {
      const depositData = JSON.parse(fileContent)[0] as DepositFileData;

      const network = depositData.network_name;
      const withdrawal_credentials =
        depositData.withdrawal_credentials.toLowerCase();
      const expectedWithdrawalAddress =
        `010000000000000000000000${poolAddress.substring(2)}`.toLowerCase();

      if (network !== chain?.network) {
        return { success: false, error: `Invalid network ${network}` };
      }
      if (withdrawal_credentials !== expectedWithdrawalAddress) {
        return {
          success: false,
          error: `Invalid withdrawal address ${withdrawal_credentials}`,
        };
      }
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, error: "Invalid JSON file" };
    }
  };

  const getErrorMessage = (prepare_error: any) => {
    const message = prepare_error.message;

    return message;
  };

  return (
    <div className="w-2/5 mx-auto my-2 p-2">
      <DropKeys
        filename="deposit_data-xxxxxxxxxx.json"
        validateFile={checkDepositData}
        onFileReceived={(data: any) => {
          const depositData = JSON.parse(data);
          setDepositFileData(depositData[0] as DepositFileData);
        }}
      />
      <div>
        <div>
          <button
            className={`${
              isLoading
                ? "btn bg-gradient-to-r from-frens-blue to-frens-teal mb-2 loading"
                : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white mb-2"
              }`}
            onClick={() => {
              if (writeDepositFileData) writeDepositFileData();
            }}
            disabled={isLoading}
          >
            {isLoading
              ? "Deposit configuration in progress..."
              : "Set deposit file"}
          </button>
        </div>
        {prepare_error && depositFileData && (
          <div className="text-center font-medium my-2">
            <div>Ur a true fren but unfortunatly</div>
            <div className="text-red-500">{getErrorMessage(prepare_error)}</div>
          </div>
        )}
        {isLoading && (
          <div className="my-2">
            <a
              href={`${etherscanUrl(chain)}/tx/${data?.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-frens-main underline px-2"
            >
              tx on Etherscan
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
