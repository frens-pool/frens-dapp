import { Address, Chain } from "wagmi";

export function etherscanUrl(chain?: Chain) {
  switch (chain?.id) {
    case 7:
      return `https://goerli.etherscan.io`;
    default:
      return `https://etherscan.io`;
  }
}

export function beaconchainUrl(chain?: Chain) {
  switch (chain?.id) {
    case 7:
      return `https://goerli.beaconcha.in`;
    default:
      return `https://beaconcha.in`;
  }
}

export function ssvExplorer(publicKey: string, chain?: Chain) {
  // remove `0x` prefix
  const publicKeyWithout0xPrefix = publicKey.replace(/^(0x)/, "");

  switch (chain?.id) {
    case 7:
      return `https://goerli.explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
    default:
      return `https://goerli.explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
  }
}

export function openseaUrl(poolAddress: Address, nftID: string, chain?: Chain) {
  switch (chain?.id) {
    case 7:
      return `https://testnets.opensea.io/assets/goerli/${poolAddress}/${nftID}`;
    default:
      return `https://opensea.io/assets/${poolAddress}/${nftID}`;
  }
}
