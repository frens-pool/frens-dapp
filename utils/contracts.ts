import GoerliFrensArt from "./goerli/FrensArt.json";
import GoerliFrensMetaHelper from "./goerli/FrensMetaHelper.json";
import GoerliFrensPoolShare from "./goerli/FrensPoolShare.json";
import GoerliFrensPoolShareTokenURI from "./goerli/FrensPoolShareTokenURI.json";
import GoerliFrensStorage from "./goerli/FrensStorage.json";
import GoerliStakingPool from "./goerli/StakingPool.json";
import GoerliStakingPoolFactory from "./goerli/StakingPoolFactory.json";

import DepositContract from "./DepositContract.json";
import SSVNetwork from "./SSVNetwork.json";
import SSVRegistry from "./SSVRegistry.json";
import SSVToken from "./SSVToken.json";

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
    abi: SSVToken.abi,
  },
  SSVNetworkContract: {
    address: "0xAfdb141Dd99b5a101065f40e3D7636262dce65b3",
    abi: SSVNetwork.abi,
  },
  SSVRegistryrContract: {
    address: "0x8dB45282d7C4559fd093C26f677B3837a5598914",
    abi: SSVRegistry.abi,
  },
};
