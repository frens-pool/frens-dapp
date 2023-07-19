import GoerliFrensArt from "./goerli/FrensArt.json";
import GoerliFrensMetaHelper from "./goerli/FrensMetaHelper.json";
import GoerliFrensPoolShare from "./goerli/FrensPoolShare.json";
import GoerliFrensPoolShareTokenURI from "./goerli/FrensPoolShareTokenURI.json";
import GoerliFrensStorage from "./goerli/FrensStorage.json";
import GoerliStakingPool from "./goerli/StakingPool.json";
import GoerliStakingPoolFactory from "./goerli/StakingPoolFactory.json";

import GoerliDepositContract from "./DepositContract.json";
import GoerliSSVNetwork from "./GoerliSSVNetwork.json";
import GoerliSSVRegistry from "./GoerliSSVRegistry.json";
import GoerliSSVToken from "./GoerliSSVToken.json";

import MainnetFrensArt from "./mainnet/FrensArt.json";
import MainnetFrensMetaHelper from "./mainnet/FrensMetaHelper.json";
import MainnetFrensPoolShare from "./mainnet/FrensPoolShare.json";
import MainnetFrensPoolShareTokenURI from "./mainnet/FrensPoolShareTokenURI.json";
import MainnetFrensStorage from "./mainnet/FrensStorage.json";
import MainnetStakingPool from "./mainnet/StakingPool.json";
import MainnetStakingPoolFactory from "./mainnet/StakingPoolFactory.json";
import MainnetDepositContract from "./DepositContract.json";

const unknownABI = { abi: [] };

export const FrensContracts = {
  mainnet: {
    FrensStorage: {
      address: MainnetFrensStorage.address,
      abi: MainnetFrensStorage.abi,
    },
    StakingPoolFactory: {
      address: MainnetStakingPoolFactory.address,
      abi: MainnetStakingPoolFactory.abi,
    },
    FrensMetaHelper: {
      address: MainnetFrensMetaHelper.address,
      abi: MainnetFrensMetaHelper.abi,
    },
    FrensPoolShare: {
      address: MainnetFrensPoolShare.address,
      abi: MainnetFrensPoolShare.abi,
    },
    FrensPoolShareTokenURI: {
      address: MainnetFrensPoolShareTokenURI.address,
      abi: MainnetFrensPoolShareTokenURI.abi,
    },
    FrensArt: {
      address: MainnetFrensArt.address,
      abi: MainnetFrensArt.abi,
    },
    StakingPool: {
      abi: MainnetStakingPool.abi,
    },
    DepositContract: {
      address: "0x00000000219ab540356cBB839Cbe05303d7705Fa",
      abi: MainnetDepositContract,
    },
    SSVTokenContract: {
      address: "0x0",
      abi: GoerliSSVToken.abi, // TODO
    },
    SSVNetworkContract: {
      address: "0x0",
      abi: GoerliSSVNetwork.abi, // TODO
    },
    SSVRegistryrContract: {
      address: "0x0",
      abi: GoerliSSVRegistry.abi, // TODO
    },
  },
  goerli: {
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
      abi: GoerliDepositContract,
    },
    SSVTokenContract: {
      address: "0x3a9f01091C446bdE031E39ea8354647AFef091E7",
      abi: GoerliSSVToken.abi,
    },
    SSVNetworkContract: {
      address: "0xC3CD9A0aE89Fff83b71b58b6512D43F8a41f363D",
      abi: GoerliSSVNetwork.abi,
    },
    SSVRegistryrContract: {
      address: "0x8dB45282d7C4559fd093C26f677B3837a5598914",
      abi: GoerliSSVRegistry.abi,
    },
  },
};
