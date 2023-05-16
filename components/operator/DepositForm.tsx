import { useState } from "react";
import { DropKeys, validateFileFunction } from "components/operator/DropKeys";
import { Deposit } from "components/operator/Deposit";
import { useBalance, Address, useNetwork } from "wagmi";

type depositData = {
  pubkey: string;
  withdrawal_credentials: string;
  amount: bigint;
  signature: string;
  deposit_message_root: string;
  deposit_data_root: string;
  fork_version: string;
  network_name: string;
  deposit_cli_version: string;
};

export const DepositForm = ({
  nextStep,
  poolAddress,
}: {
  nextStep?: () => void;
  poolAddress: Address;
}) => {
  const [depositFileData, setDepositFileData] = useState();
  const { data: balance } = useBalance({
    address: poolAddress,
  });

  const { chain } = useNetwork();

  // validate first validator in the deposit data
  const checkDepositData = (fileContent: any) => {
    try {
      const depositData = JSON.parse(fileContent)[0] as depositData;

      const network = depositData.network_name;
      const withdrawal_credentials =
        depositData.withdrawal_credentials.toLowerCase();
      const expectedWithdrawalAddress =
        `010000000000000000000000${poolAddress.substring(2)}`.toLowerCase();

      // temp out for goerli demo
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

  return (
    <div className="my-2 p-2">
      <div>Pool Balance: {balance?.formatted}</div>
      <div className="text-frens-main mb-2">
        Balance of 32 eth required for deposit
      </div>

      <div>upload the deposit file here</div>
      <DropKeys
        validateFile={checkDepositData}
        onFileReceived={(data: any) => {
          const depositData = JSON.parse(data);
          setDepositFileData(depositData[0]);
        }}
      />
      {depositFileData && Number(balance?.formatted) >= 32 ? (
        <Deposit poolAddress={poolAddress} depositFileData={depositFileData} />
      ) : (
        <div>
          {/* <div className="text-orange-400">Pool 32 ETH first</div> */}
          <button className="btn btn-primary mb-2" disabled>
            Deposit ETH to Beacon chain
          </button>
        </div>
      )}
      {nextStep && (
        <button
          className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
          onClick={() => {
            nextStep!();
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};
