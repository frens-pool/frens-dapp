import { useBalance } from "wagmi";

export const PoolInfo = ({ poolAddress }: { poolAddress: any }) => {
  const { data, isError, isLoading } = useBalance({
    address: poolAddress,
  });

  return (
    <div className="my-4 px-6">
      {/* <div className='flex justify-between'>
                <div>Staking Rewards</div>
                <div>8%</div> 
            </div> */}
      <div className="flex justify-between">
        <div>Current Pool Balance</div>
        <div>{data ? data.formatted : "connect to see"}</div>
        {/* <div>{totaldeposits.toString() ?? "0"} ETH</div>  */}
      </div>
    </div>
  );
};
