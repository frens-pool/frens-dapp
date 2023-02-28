import StakingPool from "./StakingPool.json";
import StakingPoolFactory from "./StakingPoolFactory.json";
import FrensPoolShare from "./FrensPoolShare.json";

export const FrensContracts = {
  FrensStorage: {
    address: "0x3703511A5fa20Be3FdBAD50A0A84d5d87E7683F4",
    goerliAddress: "0x3703511A5fa20Be3FdBAD50A0A84d5d87E7683F4",
    abi: "TODO",
  },
  FrensInitialiser: {
    address: "0x10B7522A2Fe86891e2739AAb817bb3185508Eaa1",
    goerliAddress: "0x10B7522A2Fe86891e2739AAb817bb3185508Eaa1",
    abi: "TODO",
  },
  StakingPoolFactory: {
    address: "0x8ECf3067cc29a79B0Ff51BA03C1e317d89e34076",
    goerliAddress: "0x8ECf3067cc29a79B0Ff51BA03C1e317d89e34076",
    abi: StakingPoolFactory.abi,
  },
  StakingPoolFactoryNoProxy: {
    address: "0x7702372f8DB89afd4A619f94F43d398d6E06d961",
    goerliAddress: "0x7702372f8DB89afd4A619f94F43d398d6E06d961",
  },
  FrensMetaHelper: {
    address: "0x47daB9f517417cd90a7443Bb5A29dBB1ce5e15Ba",
    goerliAddress: "0x47daB9f517417cd90a7443Bb5A29dBB1ce5e15Ba",
    abi: "TODO",
  },
  FrensPoolShareTokenURI: {
    address: "0x30938d55B18C1273FD7f5901a2B33127c01cB371",
    goerliAddress: "0x30938d55B18C1273FD7f5901a2B33127c01cB371",
    abi: FrensPoolShare.abi,
  },
  FrensArt: {
    address: "0xa6cB974723713F6360894D5314f0eb6e4AF390C5",
    goerliAddress: "0xa6cB974723713F6360894D5314f0eb6e4AF390C5",
    abi: "TODO",
  },
  StakingPool: {
    abi: StakingPool.abi,
  },
};
