export const InviteFrens = ({
  poolContract,
  setStep,
  step,
}: {
  poolContract: string;
  setStep: any;
  step: any;
}) => {
  const link = `https://app.frens.fun/pool/${poolContract}`;

  function copyToClipboard(copyMe: string): void {
    navigator.clipboard.writeText(copyMe);
  }

  if (step === 3) {
    return (
      <div className="flex flex-col justify-center">
        <div className="my-2 text-center">{link}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="my-2 text-center">{link}</div>
      <div className="flex justify-center">
        <button
          className="btn bg-gradient-to-r from-blue-500 to-teal-400 text-white"
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
