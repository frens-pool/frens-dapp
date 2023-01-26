import { useStake } from "../../hooks/write/useStake";
import { useWaitForTransaction } from "wagmi";

export const Deposit = ({
  poolAddress,
  depositFileData,
}: {
  poolAddress: string;
  depositFileData: any;
}) => {
  const { data, write: stake } = useStake({ poolAddress, depositFileData });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <button
        className="btn bg-gradient-to-r from-blue-500 to-teal-400 text-white mb-2"
        onClick={() => {
          if (stake) stake();
        }}
      >
        Deposit ETH to Beacon chain
      </button>
      {isLoading && (
        <div className="my-2">
          Deposit in progress
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>
              tx on Etherscan
            </a>
          </div>
        </div>
      )}
      {isSuccess && <div className="my-2">Deposit successful</div>}
    </div>
  );
};
