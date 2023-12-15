import GoerliFrensArt from "./abis/frensGoerli/FrensArt.json";
import GoerliFrensMetaHelper from "./abis/frensGoerli/FrensMetaHelper.json";
import GoerliFrensPoolShare from "./abis/frensGoerli/FrensPoolShare.json";
import GoerliFrensPoolShareTokenURI from "./abis/frensGoerli/FrensPoolShareTokenURI.json";
import GoerliFrensStorage from "./abis/frensGoerli/FrensStorage.json";
import GoerliStakingPool from "./abis/frensGoerli/StakingPool.json";
import GoerliStakingPoolFactory from "./abis/frensGoerli/StakingPoolFactory.json";

import GoerliDepositContract from "./abis/DepositContract.json";
import GoerliSSVNetwork from "./abis/ssvGoerli/SSVNetwork.json";
import GoerliSSVViews from "./abis/ssvGoerli/SSVNetworkViews.json";
import GoerliSSVToken from "./abis/ssvGoerli/SSVToken.json";

import MainnetFrensArt from "./mainnet/FrensArt.json";
import MainnetFrensMetaHelper from "./mainnet/FrensMetaHelper.json";
import MainnetFrensPoolShare from "./mainnet/FrensPoolShare.json";
import MainnetFrensPoolShareTokenURI from "./mainnet/FrensPoolShareTokenURI.json";
import MainnetFrensStorage from "./mainnet/FrensStorage.json";
import MainnetStakingPool from "./mainnet/StakingPool.json";
import MainnetStakingPoolFactory from "./mainnet/StakingPoolFactory.json";
import MainnetDepositContract from "./abis/DepositContract.json";
import { Address } from "wagmi";

import {
  GOERLI_FRENS_ART,
  GOERLI_FRENS_META,
  GOERLI_FRENS_ORACLE,
  GOERLI_FRENS_POOLSHARE,
  GOERLI_FRENS_POOLSHARE_TOKENURI,
  GOERLI_FRENS_STORAGE,
  GOERLI_FRENS_STAKINGPOOL_FACTORY,
  GOERLI_DEPOSIT_CONTRACT,
  GOERLI_SSV_NETWORK,
  GOERLI_SSV_NETWORK_VIEWS,
  GOERLI_SSV_NETWORK_TOKEN,
} from "./constants/goerliAddresses";

const unknownABI = { abi: [] };

export const FrensContracts = {
  mainnet: {
    FrensStorage: {
      address: GOERLI_FRENS_STORAGE as Address,
      abi: MainnetFrensStorage.abi,
    },
    StakingPoolFactory: {
      address: GOERLI_FRENS_STAKINGPOOL_FACTORY as Address,
      abi: MainnetStakingPoolFactory.abi,
    },
    FrensMetaHelper: {
      address: GOERLI_FRENS_META as Address,
      abi: MainnetFrensMetaHelper.abi,
    },
    FrensPoolShare: {
      address: GOERLI_FRENS_POOLSHARE as Address,
      abi: MainnetFrensPoolShare.abi,
    },
    FrensPoolShareTokenURI: {
      address: GOERLI_FRENS_POOLSHARE_TOKENURI as Address,
      abi: MainnetFrensPoolShareTokenURI.abi,
    },
    FrensArt: {
      address: GOERLI_FRENS_ART as Address,
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
      abi: GoerliSSVNetwork, // TODO
    },
    SSVRegistryrContract: {
      address: "0x0" as Address,
      abi: GoerliSSVViews, // TODO
    },
  },
  goerli: {
    FrensStorage: {
      address: GOERLI_FRENS_STORAGE as Address,
      abi: GoerliFrensStorage.abi,
    },
    StakingPoolFactory: {
      address: GOERLI_FRENS_STAKINGPOOL_FACTORY as Address,
      abi: GoerliStakingPoolFactory.abi,
    },
    FrensMetaHelper: {
      address: GOERLI_FRENS_META as Address,
      abi: GoerliFrensMetaHelper.abi,
    },
    FrensPoolShare: {
      address: GOERLI_FRENS_POOLSHARE as Address,
      abi: GoerliFrensPoolShare.abi,
    },
    FrensPoolShareTokenURI: {
      address: GOERLI_FRENS_POOLSHARE_TOKENURI as Address,
      abi: GoerliFrensPoolShareTokenURI.abi,
    },
    FrensArt: {
      address: GOERLI_FRENS_ART as Address,
      abi: GoerliFrensArt.abi,
    },
    StakingPool: {
      abi: GoerliStakingPool.abi,
    },
    DepositContract: {
      address: GOERLI_DEPOSIT_CONTRACT as Address,
      abi: GoerliDepositContract,
    },
    SSVTokenContract: {
      address: GOERLI_SSV_NETWORK_TOKEN as Address,
      abi: GoerliSSVToken.abi,
    },
    SSVNetworkContract: {
      address: GOERLI_SSV_NETWORK as Address,
      abi: GoerliSSVNetwork,
    },
    SSVNetworkViewsContract: {
      address: GOERLI_SSV_NETWORK_VIEWS as Address,
      abi: GoerliSSVViews,
    },
  },
};
