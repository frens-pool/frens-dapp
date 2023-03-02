import GoerliStakingPool from "./goerli/StakingPool.json";
import GoerliStakingPoolFactory from "./goerli/StakingPoolFactory.json";
import GoerliFrensStorage from "./goerli/FrensStorage.json";
import GoerliFrensMetaHelper from "./goerli/FrensMetaHelper.json";
import GoerliFrensPoolShare from "./goerli/FrensPoolShare.json";
import GoerliFrensPoolShareTokenURI from "./goerli/FrensPoolShareTokenURI.json";
import GoerliFrensArt from "./goerli/FrensArt.json";

import DepositContract from "./DepositContract.json";

export const FrensContracts = {
  FrensStorage: {
    address: GoerliFrensStorage.address,
    abi: GoerliFrensStorage.abi,
  },
  StakingPoolFactory: {
    address: GoerliStakingPoolFactory.address,
    abi: GoerliStakingPoolFactory.abi,
  },
  FrensMetaHelper: {
    address: GoerliFrensMetaHelper.address,
    abi: GoerliFrensMetaHelper.abi,
  },
  FrensPoolShare: {
    address: GoerliFrensPoolShare.address,
    abi: GoerliFrensPoolShare.abi,
  },
  FrensPoolShareTokenURI: {
    address: GoerliFrensPoolShareTokenURI.address,
    abi: GoerliFrensPoolShareTokenURI.abi,
  },
  FrensArt: {
    address: GoerliFrensArt.address,
    abi: GoerliFrensArt.abi,
  },
  StakingPool: {
    abi: GoerliStakingPool.abi,
  },
  DepositContract: {
    address: "0xff50ed3d0ec03ac01d4c79aad74928bff48a7b2b",
    abi: DepositContract,
  },
};
