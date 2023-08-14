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
import { Address } from "wagmi";

const unknownABI = { abi: [] };

export const FrensContracts = {
  mainnet: {
    FrensStorage: {
      address: MainnetFrensStorage.address as Address,
      abi: MainnetFrensStorage.abi,
    },
    StakingPoolFactory: {
      address: MainnetStakingPoolFactory.address as Address,
      abi: MainnetStakingPoolFactory.abi,
    },
    FrensMetaHelper: {
      address: MainnetFrensMetaHelper.address as Address,
      abi: MainnetFrensMetaHelper.abi,
    },
    FrensPoolShare: {
      address: MainnetFrensPoolShare.address as Address,
      abi: MainnetFrensPoolShare.abi,
    },
    FrensPoolShareTokenURI: {
      address: MainnetFrensPoolShareTokenURI.address as Address,
      abi: MainnetFrensPoolShareTokenURI.abi,
    },
    FrensArt: {
      address: MainnetFrensArt.address as Address,
      abi: MainnetFrensArt.abi,
    },
    StakingPool: {
      abi: MainnetStakingPool.abi,
    },
    DepositContract: {
      address: "0x00000000219ab540356cBB839Cbe05303d7705Fa" as Address,
      abi: MainnetDepositContract,
    },
    SSVTokenContract: {
      address: "0x0" as Address,
      abi: GoerliSSVToken.abi, // TODO
    },
    SSVNetworkContract: {
      address: "0x0" as Address,
      abi: GoerliSSVNetwork.abi, // TODO
    },
    SSVRegistryrContract: {
      address: "0x0" as Address,
      abi: GoerliSSVRegistry.abi, // TODO
    },
  },
  goerli: {
    FrensStorage: {
      address: GoerliFrensStorage.address as Address,
      abi: GoerliFrensStorage.abi,
    },
    StakingPoolFactory: {
      address: GoerliStakingPoolFactory.address as Address,
      abi: GoerliStakingPoolFactory.abi,
    },
    FrensMetaHelper: {
      address: GoerliFrensMetaHelper.address as Address,
      abi: GoerliFrensMetaHelper.abi,
    },
    FrensPoolShare: {
      address: GoerliFrensPoolShare.address as Address,
      abi: GoerliFrensPoolShare.abi,
    },
    FrensPoolShareTokenURI: {
      address: GoerliFrensPoolShareTokenURI.address as Address,
      abi: GoerliFrensPoolShareTokenURI.abi,
    },
    FrensArt: {
      address: GoerliFrensArt.address as Address,
      abi: GoerliFrensArt.abi,
    },
    StakingPool: {
      abi: GoerliStakingPool.abi,
    },
    DepositContract: {
      address: "0xff50ed3d0ec03ac01d4c79aad74928bff48a7b2b" as Address,
      abi: GoerliDepositContract,
    },
    SSVTokenContract: {
      address: "0x3a9f01091C446bdE031E39ea8354647AFef091E7" as Address,
      abi: GoerliSSVToken.abi,
    },
    SSVNetworkContract: {
      address: "0xC3CD9A0aE89Fff83b71b58b6512D43F8a41f363D" as Address,
      abi: GoerliSSVNetwork.abi,
    },
    SSVRegistryrContract: {
      address: "0x8dB45282d7C4559fd093C26f677B3837a5598914" as Address,
      abi: GoerliSSVRegistry.abi,
    },
  },
};
