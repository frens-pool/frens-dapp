import { useState } from "react";
import { DropKeys } from "components/operator/DropKeys";
import { Deposit } from "components/operator/Deposit";
import { useBalance, Address } from "wagmi";

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

  const checkDepositData = (data:any) => {
    // check network name of first validator in the deposit data
    const network = data[0]?.network_name;
    return network == "goerli"
  }

  return (
    <div className="my-2 p-2">
      <div>Pool Balance: {balance?.formatted}</div>
      <div className="text-frens-main mb-2">
        Balance of 32 eth required for deposit
      </div>

      <div>upload the deposit file here</div>
      <DropKeys
        onFileReceived={(data: any) => {
          const depositData = JSON.parse(data);
          if (checkDepositData(depositData))
            setDepositFileData(depositData[0]);
          // else TODO
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
