export const PoolInfo = ({ poolBalance }: { poolBalance: number }) => {
  return (
    <div className="my-4 px-6">
      <div className="flex justify-between">
        <div>Pool Balance</div>
        <div>{poolBalance ? poolBalance : "0.0"} ETH</div>
      </div>
    </div>
  );
};
