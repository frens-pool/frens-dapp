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
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function RootLayout({children,} : { children: React.ReactNode}) {
  const { chains, provider } = configureChains(
    [ chain.goerli],
    [
        alchemyProvider({ apiKey: 'aHVkU8lEB3IHaRGmMkyZ96MKvYmKGWl0' })
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Frens',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <html data-theme="winter">
      <head></head>
      <body className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-300">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Navbar />
            {children}
            <Footer />
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}

