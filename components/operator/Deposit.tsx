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
        className={`${
          isLoading
            ? "btn btn-info no-animation my-2 mr-2"
            : "btn bg-gradient-to-r from-blue-500 to-teal-400 text-white mb-2"
        }`}
        onClick={() => {
          if (stake) stake();
        }}
        disabled={isLoading}
      >
        {isLoading ? "Deposit in progress..." : "Deposit ETH to Beacon chain"}
      </button>
      {isLoading && (
        <div className="my-2">
          <a
            href={`https://etherscan.io/tx/${data?.hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            tx on Etherscan
          </a>
        </div>
      )}
      {isSuccess && <div className="my-2">Deposit successful</div>}
    </div>
  );
};
