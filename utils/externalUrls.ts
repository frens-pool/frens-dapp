import { Chain } from "wagmi";
import { goerli } from '@wagmi/core'


export function etherscanUrl(chain?: Chain) {
    switch (chain) {
        case goerli : return `https://${chain?.name}.etherscan.io`
        default : return `https://etherscan.io`
    }
}

export function beaconchainUrl(chain?: Chain) {
    switch (chain) {
        case goerli : return `https://${chain?.name}.beaconcha.in`
        default : return `https://beaconcha.in`
    }
}
