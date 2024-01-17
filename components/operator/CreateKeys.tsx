import { Address } from "wagmi";
import Link from "next/link";

export const CreateKeys = ({
  nextStep,
  poolAddress,
}: {
  nextStep: () => void;
  poolAddress: Address;
}) => {
  return (
    <div className="w-2/5 mx-auto my-2 p-2">
      <div>use <Link
          href="https://wagyu.gg/"
          className="underline"
          target="_blank"
        >
          Wagyu Key Gen</Link> and set this withdrawal address</div>
      <div className="bg-slate-200 rounded-md p-4 my-2">
        <code>{poolAddress}</code>
      </div>
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
