import { useNetwork } from "wagmi";
import { holesky, goerli, mainnet } from "wagmi/chains";
export function useNetworkName() {
  const { chain } = useNetwork();

  switch (chain?.id) {
    case holesky.id:
      return "holesky";
    case goerli.id:
      return "goerli";
    case mainnet.id:
      return "mainnet";
    default: {
      // console.log("unexpected chain", chain?.name)
      return "goerli";
    }
  }
}
