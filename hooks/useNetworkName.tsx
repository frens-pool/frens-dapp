import { useNetwork } from "wagmi";
import { goerli, mainnet} from "@wagmi/chains"
export function useNetworkName() {
  const { chain } = useNetwork();

  switch (chain?.id) {
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
