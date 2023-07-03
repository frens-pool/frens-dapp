export const PoolInfo = ({ poolBalance }: { poolBalance: any }) => {
  return (
    <div className="my-4 px-6">
      {/* <div className="flex justify-between">
        <div>APR</div>
        <div>5%</div>
      </div> */}
      <div className="flex justify-between">
        <div>Pool Balance</div>
        <div>{poolBalance ? poolBalance : "0.0"} ETH</div>
      </div>
    </div>
  );
};
