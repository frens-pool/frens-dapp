import { Address } from "wagmi";

export const CreateKeys = ({
  nextStep,
  poolAddress,
}: {
  nextStep: () => void;
  poolAddress: Address;
}) => {
  return (
    <div className="my-2 p-2">
      <div>use this deposit-cli command:</div>
      <div className="bg-slate-200 rounded-md p-4 my-2">
        <code>
          ./deposit new-mnemonic --eth1_withdrawal_address {poolAddress}
        </code>
      </div>{" "}
      <button
        className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
        onClick={() => {
          nextStep();
        }}
      >
        Next
      </button>
    </div>
  );
};
