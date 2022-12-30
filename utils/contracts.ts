import StakingPool from "./StakingPool.json";
import StakingPoolFactory from "./StakingPoolFactory.json";
import FrensPoolShare from "./FrensPoolShare.json";


export const FrensContracts = {
    FrensStorage: {
        address: "0x3703511A5fa20Be3FdBAD50A0A84d5d87E7683F4",
        abi: "TODO"
    },

    FrensInitialiser: {
        address: "0x10B7522A2Fe86891e2739AAb817bb3185508Eaa1",
        abi: "TODO"
    },
    StakingPoolFactory: {
        address: "0x38ED69e7635ADB2083B06c5d00B9fb9C7e55CD34", //"0xf18004821623E928028cD464CB4CA5dD43Efc957",
        abi: StakingPoolFactory.abi
    },
    FrensMetaHelper: {
        address: "0x47daB9f517417cd90a7443Bb5A29dBB1ce5e15Ba",
        abi: "TODO"
    },
    FrensPoolShareTokenURI: {
        address: "0x30938d55B18C1273FD7f5901a2B33127c01cB371", //"0x86ce161B4aD447B35B3a7CE76A854fBc16eB5fcA",
        abi: FrensPoolShare.abi
    },
    FrensArt: {
        address: "0xa6cB974723713F6360894D5314f0eb6e4AF390C5",
        abi: "TODO"
    },
    StakingPool: {
        abi: StakingPool.abi,
    },

}