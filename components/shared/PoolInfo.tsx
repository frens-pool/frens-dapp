export const PoolInfo = ({ poolBalance }: { poolBalance: any }) => {
  return (
    <div className="my-4 px-6">
      {/* <div className='flex justify-between'>
                <div>Staking Rewards</div>
                <div>8%</div> 
            </div> */}
      <div className="flex justify-between">
        <div>Current Pool Balance</div>
        <div>{poolBalance ? poolBalance : "connect to see"}</div>
        {/* <div>{totaldeposits.toString() ?? "0"} ETH</div>  */}
      </div>
    </div>
  );
};
