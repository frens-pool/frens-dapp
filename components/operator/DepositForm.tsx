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
  const { data: balance } = useBalance({
    address: poolAddress,
  });

  return (
    <div className="my-2 p-2">
      <div>Pool Balance: {balance?.formatted}</div>
      <div className="text-frens-main mb-2">
        Balance of 32 eth required for deposit
      </div>

      {Number(balance?.formatted) >= 32 ? (
        <Deposit poolAddress={poolAddress} />
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
