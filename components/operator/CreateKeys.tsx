export const CreateKeys = ({
  setStep,
  poolAddress,
}: {
  setStep: any;
  poolAddress: string;
}) => {
  return (
    <div className="my-2 p-2 border border-slate-700 rounded-md">
      <div>1. create staking keys</div>
      <div>using this command:</div>
      <div>
        <code>
          deposit new-mnemonic --eth1_withdrawal_address {poolAddress}
        </code>
      </div>{" "}
      <button
        className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
        onClick={() => {
          setStep(2);
        }}
      >
        Next
      </button>
    </div>
  );
};
