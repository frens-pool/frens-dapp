import Link from "next/link";
import { Address } from "wagmi";

export const InviteFrens = ({
  poolContract,
  setStep,
  step,
  allowedAddresses
}: {
  poolContract: string;
  setStep: any;
  step: any;
  allowedAddresses: Address[]
}) => {
  const link = `/pool/${poolContract}?a=${allowedAddresses.join(",")}`;

  function copyToClipboard(copyMe: string): void {
    navigator.clipboard.writeText(copyMe);
  }

  if (step === 3) {
    return (
      <div className="flex flex-col justify-center my-3 text-center underline text-frens-main">
        <Link
          href={link}
          className="underline text-frens-main"
        >
          {link}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="my-2 text-center underline">
        <Link href={`/pool/${poolContract}`} className="underline">
          {link}
        </Link>
      </div>
      <div className="flex justify-center">
        <button
          className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
          onClick={() => {
            copyToClipboard(link);
            setStep(3);
          }}
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  );
};
