import GoerliStakingPool from "./goerli/StakingPool.json";
import GoerliStakingPoolFactory from "./goerli/StakingPoolFactory.json";
import GoerliFrensStorage from "./goerli/FrensStorage.json";
import GoerliFrensMetaHelper from "./goerli/FrensMetaHelper.json";
import GoerliFrensPoolShare from "./goerli/FrensPoolShare.json";
import GoerliFrensPoolShareTokenURI from "./goerli/FrensPoolShareTokenURI.json";
import GoerliFrensArt from "./goerli/FrensArt.json";

import DepositContract from "./DepositContract.json";
import SSVToken from "./SSVToken.json";
import SSVRegistry from "./SSVRegistry.json";
import SSVNetwork from "./SSVNetwork.json";

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
  SSVTokenContract: {
    address: "0x3a9f01091C446bdE031E39ea8354647AFef091E7",
    abi: SSVToken.abi
  },
  SSVNetworkContract: {
    address: "0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04",
    abi: SSVNetwork.abi
  },
  SSVRegistryrContract: {
    address: "0x49D395eFcE6233e116C69333F249e6cF128D5992",
    abi: SSVRegistry.abi
  }
};
