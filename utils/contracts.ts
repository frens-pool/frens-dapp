import GoerliFrensArt from "./goerli/FrensArt.json";
import GoerliFrensMetaHelper from "./goerli/FrensMetaHelper.json";
import GoerliFrensPoolShare from "./goerli/FrensPoolShare.json";
import GoerliFrensPoolShareTokenURI from "./goerli/FrensPoolShareTokenURI.json";
import GoerliFrensStorage from "./goerli/FrensStorage.json";
import GoerliStakingPool from "./goerli/StakingPool.json";

import DepositContract from "./DepositContract.json";
import StakingPoolFactory from "./StakingPoolFactory.json";

export const FrensContracts = {
  FrensStorage: {
    address: GoerliFrensStorage.address,
    abi: GoerliFrensStorage.abi,
  },
  StakingPoolFactory: {
    address: "0x347B8146a0668F4beC261780E2DaDc90DEb11f96",
    goerliAddress: "0x347B8146a0668F4beC261780E2DaDc90DEb11f96",
    abi: StakingPoolFactory.abi,
  },
  StakingPoolFactoryNoProxy: {
    address: "0x91F87Ab371b70a37E6F5664692B8c231E809d3B4",
    goerliAddress: "0x91F87Ab371b70a37E6F5664692B8c231E809d3B4",
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
