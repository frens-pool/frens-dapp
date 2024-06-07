import { Address } from "wagmi";
import Link from "next/link";

export const CreateKeys = ({
  nextStep,
  poolAddress,
  itemDone
}: {
  nextStep: () => void;
  poolAddress: Address;
  itemDone: Boolean;
}) => {
  return (
    <div className="w-full flex flex-col items-end justify-start">
      <div>use <Link
          href="https://wagyu.gg/"
          className="underline"
          target="_blank"
        >
          Wagyu Key Gen</Link> and set this withdrawal address</div>
      <div className="flex flex-row items-start justify-start text-frens-blue border-[1px] border-frens-blue text-[14px] leading-[20px] p-3 mt-2 mb-6">
        <code className="break-all">{poolAddress}</code>
        <img
              className="w-5 h-5 mb-3 ml-4"
              src="/copypaste.png"
            />
      </div>
      {itemDone?
      <p className="font-extrabold text-frens-teal">Done!</p>
      :
      <button
        className="w-[244px] btn-medium blue-to-purple text-white"
        onClick={() => {
          nextStep();
        }}
      >
        yup, keys created
      </button>
      }
    </div>
  );
};
