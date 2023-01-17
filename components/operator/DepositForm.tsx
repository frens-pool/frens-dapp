import { useState } from "react";
import { DropKeys } from "components/operator/DropKeys";
import { Deposit } from "components/operator/Deposit";
import { useBalance } from "wagmi";

export const DepositForm = ({
  setStep,
  poolAddress,
}: {
  setStep: any;
  poolAddress: any;
}) => {
  const [depositFileData, setDepositFileData] = useState();
  const { data: balance } = useBalance({
    address: poolAddress,
  });

  return (
    <div className="my-2 p-2 border border-slate-700 rounded-md">
      <div>2. Deposit ETH</div>
      <div>upload the deposit file here</div>
      <DropKeys
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
      <button
        className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
        onClick={() => {
          setStep(3);
        }}
      >
        Next
      </button>
    </div>
  );
};
