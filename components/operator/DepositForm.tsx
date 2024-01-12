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
    <div className="w-2/5 mx-auto my-2 p-2">
      {Number(balance?.formatted) >= 32 ? (
        <div>
          <div>You are ready to deposit</div>
          <Deposit poolAddress={poolAddress} nextStep={nextStep} />
        </div>
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
