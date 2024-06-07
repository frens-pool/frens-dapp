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

    return (
      <div className="flex flex-row items-start p-6 justify-start bg-white">
          <Link href={`/pool/${poolContract}`} className="underline font-bold text-frens-blue">
            {link}
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => {
              copyToClipboard(link);
              onFinish();
            }}
          >

         {current_step === "Ready"?
            <p className="ml-6">copied!</p>
              :

            <img
            className="w-5 h-5 ml-8"
            src="/copypaste.png"
          />
          }
          </div>
      </div>
    );

  // return (
  //   <div className="flex flex-col justify-center">
  //     <div className="my-2">
  //       You can now share this link to your friends to stake in this pool
  //     </div>
  //     <div className="my-2 text-center underline">
  //       <Link href={`/pool/${poolContract}`} className="underline">
  //         {link}
  //       </Link>
  //     </div>
  //     <div className="flex justify-center">
  //       <button
  //         className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
  //         onClick={() => {
  //           copyToClipboard(link);
  //           onFinish();
  //         }}
  //       >
  //         Copy link to clipboard
  //       </button>
  //     </div>
  //   </div>
  // );
};
