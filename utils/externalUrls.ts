import { Chain } from "wagmi";

export function etherscanUrl(chain?: Chain) {
  switch (chain?.id) {
    case 7:
      return `https://goerli.etherscan.io`;
    default:
      return `https://goerli.etherscan.io`;
  }
}

export function beaconchainUrl(chain?: Chain) {
  switch (chain?.id) {
    case 7:
      return `https://goerli.beaconcha.in`;
    default:
      return `https://prater.beaconcha.in`;
  }
}
