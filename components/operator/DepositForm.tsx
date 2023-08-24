import { useBalance, Address } from "wagmi";
import { Deposit } from "components/operator/Deposit";

interface Props {
  poolAddress: Address;
  nextStep: () => void;
}

export const DepositForm = ({ nextStep, poolAddress }: Props) => {
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
        <Deposit poolAddress={poolAddress} nextStep={nextStep} />
      ) : (
        <div>
          <div className="text-orange-400">Pool 32 ETH first</div>
          <button className="btn btn-primary mb-2" disabled>
            Deposit ETH to Beacon chain
          </button>
        </div>
      )}
      {/* {nextStep && (
        <button
          className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
          onClick={() => {
            nextStep!();
          }}
        >
          Next
        </button>
      )} */}
    </div>
  );
};
