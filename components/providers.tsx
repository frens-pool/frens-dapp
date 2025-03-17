"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
  DisclaimerComponent,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, holesky } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { createPublicClient, webSocket, http } from 'viem';

const apiKey = process.env.NEXT_PUBLIC_INFURA_KEY || "";
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_RPC_MAINNET)
});

const holeskyPublicClient = createPublicClient({
  chain: holesky,
  transport: http(process.env.NEXT_PUBLIC_RPC_HOLESKY)
});

const webSocketPublicClient = createPublicClient({
  chain: mainnet,
  transport: webSocket(process.env.NEXT_PUBLIC_RPC_MAINNET_WSS)
});

const holeskyWebSocketPublicClient = createPublicClient({
  chain: holesky,
  transport: webSocket(process.env.NEXT_PUBLIC_RPC_HOLESKY_WSS)
});

const chains = [mainnet, holesky];

const { connectors } = getDefaultWallets({
  appName: "Frens",
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: ({ chainId }) => 
    chainId === mainnet.id ? publicClient : holeskyPublicClient,
  webSocketPublicClient: ({ chainId }) =>
    chainId === mainnet.id ? webSocketPublicClient : holeskyWebSocketPublicClient,
});


console.log(`wagmiconfig`,wagmiConfig)

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="https://app.frens.fun/terms">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href="https://app.frens.fun/disclaimer">Disclaimer</Link>
  </Text>
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: "FRENS",
          disclaimer: Disclaimer,
        }}
        theme={lightTheme({
          accentColor: "#3F19EE",
        })}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
