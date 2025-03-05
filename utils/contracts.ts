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

import HoleskyFrensArt from "./abis/frensHolesky/FrensArt.json";
import HoleskyFrensMetaHelper from "./abis/frensHolesky/FrensMetaHelper.json";
import HoleskyFrensPoolShare from "./abis/frensHolesky/FrensPoolShare.json";
import HoleskyFrensPoolShareTokenURI from "./abis/frensHolesky/FrensPoolShareTokenURI.json";
import HoleskyFrensStorage from "./abis/frensHolesky/FrensStorage.json";
import HoleskyStakingPool from "./abis/frensHolesky/StakingPool.json";
import HoleskyStakingPoolFactory from "./abis/frensHolesky/StakingPoolFactory.json";


import HoleskyDepositContract from "./abis/DepositContract.json";
import HoleskySSVNetwork from "./abis/ssvHolesky/SSVNetwork.json";
import HoleskySSVViews from "./abis/ssvHolesky/SSVNetworkViews.json";
import HoleskySSVToken from "./abis/ssvHolesky/SSVToken.json";

import MainnetFrensArt from "./abis/frensGoerli/FrensArt.json";
import MainnetFrensMetaHelper from "./abis/frensGoerli/FrensMetaHelper.json";
import MainnetFrensPoolShare from "./abis/frensGoerli/FrensPoolShare.json";
import MainnetFrensPoolShareTokenURI from "./abis/frensGoerli/FrensPoolShareTokenURI.json";
import MainnetFrensStorage from "./abis/frensGoerli/FrensStorage.json";
import MainnetStakingPool from "./abis/frensGoerli/StakingPool.json";
import MainnetStakingPoolFactory from "./abis/frensGoerli/StakingPoolFactory.json";

import MainnetDepositContract from "./abis/DepositContract.json";
import MainnetSSVNetwork from "./abis/ssvMainnet/SSVNetwork.json";
import MainnetSSVViews from "./abis/ssvMainnet/SSVNetworkViews.json";
import MainnetSSVToken from "./abis/ssvMainnet/SSVToken.json";

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

import {
  HOLESKY_FRENS_ART,
  HOLESKY_FRENS_META,
  HOLESKY_FRENS_ORACLE,
  HOLESKY_FRENS_POOLSHARE,
  HOLESKY_FRENS_POOLSHARE_TOKENURI,
  HOLESKY_FRENS_STORAGE,
  HOLESKY_FRENS_STAKINGPOOL_FACTORY,
  HOLESKY_DEPOSIT_CONTRACT,
  HOLESKY_SSV_NETWORK,
  HOLESKY_SSV_NETWORK_VIEWS,
  HOLESKY_SSV_NETWORK_TOKEN,
} from "./constants/holeskyAddresses";

import {
  MAINNET_FRENS_ART,
  MAINNET_FRENS_META,
  MAINNET_FRENS_ORACLE,
  MAINNET_FRENS_POOLSHARE,
  MAINNET_FRENS_POOLSHARE_TOKENURI,
  MAINNET_FRENS_STORAGE,
  MAINNET_FRENS_STAKINGPOOL_FACTORY,
  MAINNET_DEPOSIT_CONTRACT,
  MAINNET_SSV_NETWORK,
  MAINNET_SSV_NETWORK_VIEWS,
  MAINNET_SSV_NETWORK_TOKEN,
} from "./constants/mainnetAddresses";

const unknownABI = { abi: [] };

export const FrensContracts = {
  mainnet: {
    FrensStorage: {
      address: MAINNET_FRENS_STORAGE as Address,
      abi: MainnetFrensStorage.abi,
    },
    StakingPoolFactory: {
      address: MAINNET_FRENS_STAKINGPOOL_FACTORY as Address,
      abi: MainnetStakingPoolFactory.abi,
    },
    FrensMetaHelper: {
      address: MAINNET_FRENS_META as Address,
      abi: MainnetFrensMetaHelper.abi,
    },
    FrensPoolShare: {
      address: MAINNET_FRENS_POOLSHARE as Address,
      abi: MainnetFrensPoolShare.abi,
    },
    FrensPoolShareTokenURI: {
      address: MAINNET_FRENS_POOLSHARE_TOKENURI as Address,
      abi: MainnetFrensPoolShareTokenURI.abi,
    },
    FrensArt: {
      address: MAINNET_FRENS_ART as Address,
      abi: MainnetFrensArt.abi,
    },
    StakingPool: {
      abi: MainnetStakingPool.abi,
    },
    DepositContract: {
      address: MAINNET_DEPOSIT_CONTRACT as Address,
      abi: MainnetDepositContract,
    },
    SSVTokenContract: {
      address: MAINNET_SSV_NETWORK_TOKEN as Address,
      abi: MainnetSSVToken,
    },
    SSVNetworkContract: {
      address: MAINNET_SSV_NETWORK as Address,
      abi: MainnetSSVNetwork,
    },
    SSVNetworkViewsContract: {
      address: MAINNET_SSV_NETWORK_VIEWS as Address,
      abi: MainnetSSVViews,
    },
  },
  holesky: {
    FrensStorage: {
      address: HOLESKY_FRENS_STORAGE as Address,
      abi: HoleskyFrensStorage.abi,
    },
    StakingPoolFactory: {
      address: HOLESKY_FRENS_STAKINGPOOL_FACTORY as Address,
      abi: HoleskyStakingPoolFactory.abi,
    },
    FrensMetaHelper: {
      address: HOLESKY_FRENS_META as Address,
      abi: HoleskyFrensMetaHelper.abi,
    },
    FrensPoolShare: {
      address: HOLESKY_FRENS_POOLSHARE as Address,
      abi: HoleskyFrensPoolShare.abi,
    },
    FrensPoolShareTokenURI: {
      address: HOLESKY_FRENS_POOLSHARE_TOKENURI as Address,
      abi: HoleskyFrensPoolShareTokenURI.abi,
    },
    FrensArt: {
      address: HOLESKY_FRENS_ART as Address,
      abi: HoleskyFrensArt.abi,
    },
    StakingPool: {
      abi: HoleskyStakingPool.abi,
    },
    DepositContract: {
      address: HOLESKY_DEPOSIT_CONTRACT as Address,
      abi: HoleskyDepositContract,
    },
    SSVTokenContract: {
      address: HOLESKY_SSV_NETWORK_TOKEN as Address,
      abi: HoleskySSVToken.abi,
    },
    SSVNetworkContract: {
      address: HOLESKY_SSV_NETWORK as Address,
      abi: HoleskySSVNetwork,
    },
    SSVNetworkViewsContract: {
      address: HOLESKY_SSV_NETWORK_VIEWS as Address,
      abi: HoleskySSVViews,
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
