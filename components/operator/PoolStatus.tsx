import { SsvValidatorType } from "#/types/commonTypes";
import { Address } from "wagmi";
import { useTokenBalance } from "#/hooks/read/useTokenBalance";
import { FrensContracts } from "#/utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";
import { ethers } from "ethers";

interface PoolStatus {
  poolAddress: Address,
  poolOwner: Address;
  poolState: any;
  poolBalance: number;
  connectedAddress: Address;
  ssvValidator: SsvValidatorType;
}

export const PoolStatus = ({
  poolAddress,
  poolState,
  poolOwner,
  poolBalance,
  connectedAddress,
  ssvValidator,
}: PoolStatus) => {

  const network = useNetworkName();
  const {balance : poolSSVBalance} = useTokenBalance({ tokenAddress: FrensContracts[network].SSVTokenContract.address, accountAddress: poolAddress});

  return (
    <div className="mb-6 text-center overflow-hidden rounded-xl border border-gray-200">
      <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
        <div className="py-6 px-8 text-center md:text-left space-y-2 ">
          <div className="grid grid-cols-2 gap-8 font-medium mb-2">
            <div>Fill Pool: {poolBalance === 32 ? "✅" : "todo"}</div>
            <div>Pool SSV Balance: {poolSSVBalance ? ethers.utils.formatUnits(poolSSVBalance, 18) : ""}</div>
            <div>Deposit ETH: {poolState === "staked" ? "✅" : "todo"}</div>
            <div>Register Vali: {ssvValidator ? "✅" : "todo"}</div>
          </div>
        </div>
      </div>
      <div>
        Operator connected: {poolOwner === connectedAddress ? "✅" : "no"}
      </div>
    </div>
  );
};
