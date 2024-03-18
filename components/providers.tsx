"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli, holesky } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const appInfo = {
  appName: "FRENS",
};
const apiKey = process.env.NEXT_PUBLIC_INFURA_KEY || "";
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const { chains, publicClient } = configureChains(
  [mainnet, goerli, holesky],
  [
    // infuraProvider({
    //   apiKey: apiKey,
    // }),
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://ethereum-holesky.core.chainstack.com/9bd2c053e76cb4859e12390e23609994",
        };
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Frens",
  projectId,
  chains,
});

// const connectors = connectorsForWallets([
//   ...wallets,
//   {
//     groupName: "Wallets",
//     wallets: [
//       injectedWallet({ chains }),
//       metaMaskWallet({ projectId, chains }),
//     ],
//   },
// ]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={appInfo}
        theme={lightTheme({
          accentColor: "#3F19EE",
        })}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
