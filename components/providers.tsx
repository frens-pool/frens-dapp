"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

const appInfo = {
  appName: "FRENS",
};
const apiKey = process.env.NEXT_PUBLIC_INFURA_KEY || "";
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "default-project-id";

const { chains, publicClient } = configureChains(
  [goerli],
  [
    infuraProvider({
      apiKey: apiKey,
    }),
    publicProvider(),
  ]
);

const needsInjectedWalletFallback =
  typeof window !== "undefined" &&
  (window as any).ethereum &&
  !(window as any).ethereum.isMetaMask &&
  !(window as any).ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
  {
    groupName: "Wallets",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      ...(needsInjectedWalletFallback ? [injectedWallet({ chains })] : []),
    ],
  },
]);

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
