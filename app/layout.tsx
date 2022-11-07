"use client"

import '@/styles/globals.css';
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  WagmiConfig,
  chain,
} from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy';

export default function RootLayout({children,} : { children: React.ReactNode}) {
  const { chains, provider } = configureChains(
    [ chain.goerli],
    [
        alchemyProvider({ apiKey: 'aHVkU8lEB3IHaRGmMkyZ96MKvYmKGWl0' })
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Institutional Staking',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <html data-theme="garden">
      <head></head>
      <body>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={{
              lightMode: lightTheme({ accentColor: "#E79132" }),
              darkMode: darkTheme({ accentColor: "#E79132" }),
            }}
          >
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}

