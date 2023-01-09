export const BalanceComponent = ({
  ethBalance,
  symbol,
}: {
  ethBalance: any;
  symbol: any;
}) => {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Account Balance</div>
        <div className="stat-value">
          {" "}
          {ethBalance} {symbol}
        </div>
      </div>
    </div>
  );
};
