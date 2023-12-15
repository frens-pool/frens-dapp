import { STEP_TYPE } from "#/app/create/page";
import Link from "next/link";

export const InviteFrens = ({
  poolContract,
  onFinish,
  current_step,
}: {
  poolContract: string;
  onFinish: () => void;
  current_step: STEP_TYPE;
}) => {
  const link = `https://app.frens.fun/pool/${poolContract}`;

  function copyToClipboard(copyMe: string): void {
    navigator.clipboard.writeText(copyMe);
  }

  if (current_step === "Run") {
    return (
      <div className="flex flex-col justify-center my-3 text-center underline text-frens-main">
        <Link
          href={`/pool/${poolContract}`}
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
            onFinish();
          }}
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  );
};
