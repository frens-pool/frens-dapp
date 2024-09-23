import { Address, Chain } from "wagmi";

const getChainName = (id: Number | undefined) => {
  switch (id) {
    case 5: return "goerli";
    case 17000: return "holesky";
    default: return "mainnet";
  }
}

export function subgraphUrl(chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://api.studio.thegraph.com/query/46611/frens-goerli/version/latest`;
    case 17000:
      return `https://api.studio.thegraph.com/query/46611/frens-holesky/version/latest`;
    default:
      return `https://api.studio.thegraph.com/query/46611/frens-main/version/latest`;
  }
}

export function etherscanUrl(chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://goerli.etherscan.io`;
    case 17000:
      return `https://holesky.etherscan.io`;
    default:
      return `https://etherscan.io`;
  }
}

export function beaconchainUrl(chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://goerli.beaconcha.in`;
    case 17000:
      return `https://holesky.beaconcha.in`;
    default:
      return `https://beaconcha.in`;
  }
}

export function openseaUrl(poolAddress: Address, nftID: string, chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://testnets.opensea.io/assets/goerli/${poolAddress}/${nftID}`;
    case 17000:
      return `https://testnets.opensea.io/assets/holesky/${poolAddress}/${nftID}`;
    default:
      return `https://opensea.io/assets/${poolAddress}/${nftID}`;
  }
}

export function ssvExplorer(publicKey: string, chain?: Chain) {
  // remove `0x` prefix
  const publicKeyWithout0xPrefix = publicKey.replace(/^(0x)/, "");

  switch (chain?.id) {
    case 5:
      return `https://goerli.explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
    case 17000:
      return `https://holesky.explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
    default:
      return `https://explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
  }
}

export function ssvScanUrl(operatorId: number, chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://testnet.ssvscan.io/operator/${operatorId}`;
    case 17000:
      return `https://holesky.ssvscan.io/operator/${operatorId}`;
    default:
      return `https://ssvscan.io/operator/${operatorId}`;
  }
}

export function ssvScanValidatorUrl(validatorPubKey: any, chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://testnet.ssvscan.io/validator/${validatorPubKey}`;
    case 17000:
      return `https://holesky.ssvscan.io/validator/${validatorPubKey}`;
    default:
      return `https://ssvscan.io/validator/${validatorPubKey}`;
  }
}

export function ssvOperatorListApi(
  page: number,
  perPage: number,
  chain?: Chain
) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/operators?page=${page}&perPage=${perPage}&ordering=performance.24h%3Adesc`;
}

export function ssvClusterListByOwnerApi(
  page: number,
  perPage: number,
  owner: string,
  chain?: Chain
) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/clusters/owner/${owner}?page=${page}&perPage=${perPage}&ordering=performance.24h%3Adesc`;
}

export function ssvValidatorCostByOwnerApi(
  ownerAddress: string,
  chain?: Chain
) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/validators/owned_by/${ownerAddress}/cost`;
}

export function ssvOperatorApi(
  page: number,
  perPage: number,
  name: string,
  chain?: Chain
) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/operators?page=${page}&perPage=${perPage}&search=${name}`;
}

export function ssvValidatorApi(publicKey: string, chain?: Chain) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/validators/${publicKey}`;
}

export function ssvAccountApi(owner: Address, chain?: Chain) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/accounts/${owner}`;
}


export function ssvClusterApi(id: Number, chain?: Chain) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/clusters/${id}`;
}

export function ssvOwnerClustersApi(owner: Address, chain?: Chain) {
  return `https://api.ssv.network/api/v4/${getChainName(chain?.id)}/clusters/owner/${owner}`;
}

export function networkNameToId(network?: String) {
  switch (network) {
    case "mainnet":
      return 1;
    case "goerli":
      return 5;
    case "holesky":
      return 17000;
    default:
      return 0;
  }
}
